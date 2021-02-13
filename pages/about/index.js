import StickyNavbar from "../../components/StickyNavbar";
import Footer from "../../components/Footer";
import Image from "next/image";
import path from "path";
import fs from "fs";
import FormItem from "../../components/FormItem";
import { useAppContext } from "../../contexts/state.js";
import fetch from "isomorphic-fetch";

const About = ({ verticals }) => {
  const { addClick } = useAppContext();

  if (process.browser) {
    window.onbeforeunload = () => {
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
      <StickyNavbar verticals={verticals[0]} />
      <div className='container'>
        <div className='grid-2c'>
          <div>
            <h3>Our Mission Statement:</h3>

            <p>
              {" "}
              Our goal is to provide you with honest reviews about excellent
              companies. Where as many reviews use basic statistics that are
              publically available to create fairly generic reviews, we have
              spent several hours communicating with these companies to provide
              more thorough and accurate coverage. We also attempt to look at
              our guide in terms of the problem of the tax payer, because after
              all the meeting the needs of the consumer by providing them with
              recommendations for the right company.{" "}
            </p>

            <div
              onClick={() =>
                addClick({
                  loc: `about page`,
                  time: `${new Date().getTime()}`,
                  btn: "filled out form on about page",
                })
              }>
              <FormItem />
            </div>
          </div>

          <div>
            <h3>Our Advertising and Partnership Policy</h3>
            <p>
              Wallet Warriors is a free online resource that strives to provide
              both business and individual taxpayers with company comparisons
              and free content. Companies cannot pay for a better position as
              part of our service. However, we may get compensated by a company
              when you call or request a quote from our website.{" "}
            </p>{" "}
            <br />{" "}
            <p>
              Our partners include Nationwide Tax Experts, Anthem Tax, Tax
              Advocate Group and Tax Advantage Advisors
            </p>
          </div>
        </div>
        <br />
      </div>

      <Footer />
    </div>
  );
};

export default About;
export async function getStaticProps() {
  // Call an external API endpoint to get posts.
  // You can use any data fetching library
  const postsDirectory = path.join(process.cwd(), "verticals");
  const filenames = fs.readdirSync(postsDirectory);

  const verticals = filenames.map((filename) => {
    const filePath = path.join(postsDirectory, filename);
    const verticals = JSON.parse(fs.readFileSync(filePath, "utf8"));

    return verticals;
  });

  return {
    props: {
      verticals,
    },
  };
}
