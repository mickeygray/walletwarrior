import { router, withRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import StickyNavbar from "../../components/StickyNavbar";
import ReviewItem from "../../components/ReviewItem";
import Footer from "../../components/Footer";
import path from "path";
import fs from "fs";
import fetch from "isomorphic-fetch";
import { useAppContext } from "../../contexts/state.js";
const Profile = ({ firm, verticals }) => {
  let thisFirm = firm[0];
  const { addClick } = useAppContext();

  if (process.browser) {
    window.onbeforeunload = () => {
      const lead = JSON.parse(sessionStorage.getItem("lead"));
      const clicks = JSON.parse(sessionStorage.getItem("click"));
      const ip = JSON.parse(sessionStorage.getItem("ip"));

      const packet = { lead, clicks, ip };

      sessionStorage.clear();
      fetch("/api/lookup", {
        method: "post",
        headers: {
          "Accept": "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(packet),
        keepalive: true,
      }).then((res) => {
        res.status === 200 ? console.log("gotcha!") : "";
      });
    };
  }
  return (
    <div className='color-background'>
      <StickyNavbar verticals={verticals[0].verticals} />

      <div className='container ' style={{ backgroundColor: "#dbd7d2" }}>
        <h3 className='text-primary'>{thisFirm.name}</h3>
        <i>Founded {thisFirm.years} ago</i>
        <div className='grid-3a'>
          <div className='card p-3'>
            Conact Info:
            <br />
            {thisFirm.address} <br />
            {thisFirm.city}, {thisFirm.state} <br />
            {thisFirm.email} <br />
            {thisFirm.phone}
            <br />
          </div>
          <div>
            {" "}
            <h3 className='lead text-primary text-center'>
              About this company:
            </h3>
            <br />
            <p style={{ textIndent: "10px" }} className='py-1'>
              {thisFirm.profileCopy}
            </p>
          </div>
          <div>
            <br />
            <br />
            On The Web: <br />
            <a
              target='_blank'
              rel='noreferrer noopener'
              onClick={() =>
                addClick({
                  loc: `${firm.name}`,
                  time: `${new Date().getTime()}`,
                  btn: "Visted firm website from their profile",
                })
              }
              href={thisFirm.website}
              className='lead'>
              Their Site
            </a>{" "}
            <br />
            <a
              onClick={() =>
                addClick({
                  loc: `${firm.name}`,
                  time: `${new Date().getTime()}`,
                  btn: "Visted firm BBB from their profile",
                })
              }
              target='_blank'
              rel='noreferrer noopener'
              href={thisFirm.bbb}
              className='lead'>
              Their BBB
            </a>
          </div>
        </div>
        <br />
        <div>
          {" "}
          <h3 className='text-center text-primary lead'> Meet The CPA </h3>
          <br />
          <h4 className='text-center text-secondary lead'>{thisFirm.cpa}</h4>
          <div className='all-center round-img'>
            <Image
              src={thisFirm.cpapic}
              alt='Tax Expert CPA'
              className='round-img'
              width='100px'
              height='100px'
            />{" "}
          </div>
          <div className='mx-3'>
            <p style={{ textIndent: "10px" }}>{thisFirm.cpabio}</p>
          </div>
        </div>
        <br />
        <br />
        <div>
          <h3 className='text-center text-primary lead'>Pros and Cons</h3>
          <div className='grid-2'>
            <div className='card all-center'>
              Pros: <br />
              <ul>
                {thisFirm.pros.map((pro, i) => (
                  <li key={i}>
                    <i class='fas fa-plus'></i> {pro}
                  </li>
                ))}
              </ul>
            </div>
            <div className='card all-center'>
              Cons: <br />
              <ul>
                {thisFirm.cons.map((con, i) => (
                  <li key={i}>
                    <i className='fas fa-minus'></i> {con}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <br />
        <br />
        <div>
          <h3 className='text-center text-primary lead'>Services offered</h3>
          <div className='grid-3'>
            <div className='card'>
              Federal Tax : <br />
              <ul>
                {thisFirm.services.federal.map((fed, i) => (
                  <li key={i}>
                    <i className='fas fa-check'></i> {fed}
                  </li>
                ))}
              </ul>
            </div>
            <div className='card'>
              State Tax: <br />
              <ul>
                {thisFirm.services.state.map((state, i) => (
                  <li key={i}>
                    <i className='fas fa-check'></i> {state}
                  </li>
                ))}
              </ul>
            </div>
            <div className='card'>
              Accounting: <br />
              <ul>
                {thisFirm.services.accounting.map((account, i) => (
                  <li key={i}>
                    <i className='fas fa-check'></i> {account}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <br />
        <br />
        <div>
          <h3 className='text-center text-primary lead'>
            More About Their Fees:
          </h3>

          <div className='text-center'>
            <h3>Pricing Information</h3>
            Minimum Debt: {thisFirm.minimum} <br />
            Average Fees: {thisFirm.cost} <br />
            Exploration Cost: {thisFirm.exploration} <br />
            Average Client Savings: {thisFirm.avgsavings}
          </div>

          <p style={{ textIndent: "10px" }}>{thisFirm.fees}</p>
        </div>
        <br />
        <br />{" "}
        <div>
          <h3 className='text-center text-primary lead'>
            Read Real Customer Reviews:
          </h3>
          <div className='all-center'>
            {thisFirm.reviews.map((review, i) => (
              <ReviewItem review={review} key={i} />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default withRouter(Profile);

export async function getStaticPaths() {
  const postsDirectory = path.join(process.cwd(), "firms");
  const filenames = fs.readdirSync(postsDirectory);

  const firms = filenames.map((filename) => {
    const filePath = path.join(postsDirectory, filename);
    const firms = JSON.parse(fs.readFileSync(filePath, "utf8"));

    // Generally you would parse/transform the contents
    // For example you can transform markdown to HTML here

    return firms;
  });

  return {
    paths: firms[0].map((firm) => ({ params: { id: firm.id } })), //firms[0].map(firm => { params: { id: firm.id}}),
    fallback: false, // See the "fallback" section below
  };
}

export async function getStaticProps({ params }) {
  // Call an external API endpoint to get posts.
  // You can use any data fetching library
  const postsDirectory = path.join(process.cwd(), "firms");
  const filenames = fs.readdirSync(postsDirectory);

  const firms = filenames.map((filename) => {
    const filePath = path.join(postsDirectory, filename);
    const firms = JSON.parse(fs.readFileSync(filePath, "utf8"));

    return firms;
  });

  const gostsDirectory = path.join(process.cwd(), "verticals");
  const gilenames = fs.readdirSync(gostsDirectory);

  const verticals = gilenames.map((filename) => {
    const filePath = path.join(gostsDirectory, filename);
    const verticals = JSON.parse(fs.readFileSync(filePath, "utf8"));

    return {
      verticals,
    };
  });

  const firm = firms[0].filter((firm) => firm.id === params.id);

  return {
    props: {
      firm,
      verticals,
    },
  };
}
