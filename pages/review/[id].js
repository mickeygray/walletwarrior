import { router, withRouter } from "next/router";
import ReviewSection from "../../components/ReviewSection";
import StickyNavbar from "../../components/StickyNavbar";
import Footer from "../../components/Footer";
import SubHero from "../../components/SubHero";
import ListItemSmall from "../../components/ListItemSmall";
import Image from "next/image";
import path from "path";
import fs from "fs";
import { useAppContext } from "../../contexts/state.js";
import fetch from "isomorphic-fetch";
const Review = ({ review, firmlist, verticals, vertical }) => {
  const {
    reviewBody,
    reviewName,
    date,
    summary,
    verticalName,
    img2,
  } = review[0];

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
      <SubHero vertical={vertical} />;
      <div>
        <div className='grid-2'>
          <div className='mx-3 text-primary text-center lead'>
            <h3>{reviewName}</h3>
            <h4>{date}</h4>
          </div>
          <div>
            <Image
              src={img2}
              alt='professional tax help and advice'
              height='300px'
              width='300px'
            />
          </div>
        </div>

        <div className='lead text-primary text-center'>
          {" "}
          Our Latest {verticalName} Review. <br /> For more information please
          consult our individual company profiles below.{" "}
        </div>
        <div style={{ textIndent: "15px" }} className='text-secondary mx-3'>
          {summary}
        </div>
        <div
          onClick={() =>
            addClick({
              loc: `${review.reviewName}`,
              time: `${new Date().getTime()}`,
              btn: "Interacted with Review Screen",
            })
          }>
          {reviewBody.map((review) => (
            <ReviewSection
              firms={firmlist}
              review={review}
              key={review.category}
            />
          ))}
        </div>
        <div className='container'>
          {firmlist.map((firm) => (
            <ListItemSmall firm={firm} key={firm.id} />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default withRouter(Review);

export async function getStaticPaths() {
  const postsDirectory = path.join(process.cwd(), "reviews");
  const filenames = fs.readdirSync(postsDirectory);

  const reviews = filenames.map((filename) => {
    const filePath = path.join(postsDirectory, filename);
    const reviews = JSON.parse(fs.readFileSync(filePath, "utf8"));

    // Generally you would parse/transform the contents
    // For example you can transform markdown to HTML here

    return reviews;
  });

  return {
    paths: reviews[0].map((firm) => ({ params: { id: firm.id } })), //firms[0].map(firm => { params: { id: firm.id}}),
    fallback: false, // See the "fallback" section below
  };
}

export async function getStaticProps({ params }) {
  // Call an external API endpoint to get posts.
  // You can use any data fetching library
  const postsDirectory = path.join(process.cwd(), "reviews");
  const filenames = fs.readdirSync(postsDirectory);

  const reviews = filenames.map((filename) => {
    const filePath = path.join(postsDirectory, filename);
    const reviews = JSON.parse(fs.readFileSync(filePath, "utf8"));

    // Generally you would parse/transform the contents
    // For example you can transform markdown to HTML here

    return reviews;
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

  const dostsDirectory = path.join(process.cwd(), "firms");
  const dilenames = fs.readdirSync(dostsDirectory);
  const firms = dilenames.map((filename) => {
    const filePath = path.join(dostsDirectory, filename);
    const firms = JSON.parse(fs.readFileSync(filePath, "utf8"));

    return firms;
  });
  const review = reviews[0].filter((blog) => blog.id === params.id);

  const firmlist = firms[0].filter(
    (vertical) => vertical.vertical === review[0].vertical
  );

  const vertical = verticals[0].verticals.filter(
    (vertical) => vertical.vertical === review[0].vertical
  );

  // By returning { props: posts }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      verticals,
      firmlist,
      vertical,
      review,
    },
  };
}
