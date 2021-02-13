import { router, withRouter } from "next/router";
import parse from "html-react-parser";
import StickyNavbar from "../../components/StickyNavbar";
import Footer from "../../components/Footer";
import Image from "next/image";
import path from "path";
import fs from "fs";
import fetch from "isomorphic-fetch";
import { useAppContext } from "../../contexts/state";
const BlogPage = ({ blog, verticals }) => {
  let thisBlog = blog[0];
  const { sharedState, addIp } = useAppContext();
  const { clicks, lead, ip } = sharedState;
  console.log(verticals);
  const packet = { ip, clicks, lead };
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
      <StickyNavbar verticals={verticals[0].verticals} />
      <div className='container bg-light'>
        <div className='all-center'>
          <h3 className='lead'>{thisBlog.title}</h3>
          <h5>
            <i>{thisBlog.date}</i>
          </h5>
        </div>
        <div className='m-2 container' style={{ textIndent: "25px" }}>
          <div>{parse(thisBlog.p1)}</div>
          <br />
          <div className='all-center'>
            <Image
              src={thisBlog.img2}
              alt='professional tax help and advice'
              height='300px'
              width='300px'
            />{" "}
          </div>
          <br />
          <div className=''>{parse(thisBlog.p2)}</div>
          <br />
          <div className='grid-2'>
            <div style={{ margin: "auto" }}>{parse(thisBlog.p3)}</div>
            <div>
              <Image
                src={thisBlog.img3}
                alt='professional tax help and advice'
                height='600px'
                width='600px'
              />{" "}
            </div>
          </div>
          <br />
          <div className=''>{parse(thisBlog.p4)}</div>
          <br />
          <div className=''>{parse(thisBlog.p5)}</div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default withRouter(BlogPage);

export async function getStaticPaths() {
  const postsDirectory = path.join(process.cwd(), "blogs");
  const filenames = fs.readdirSync(postsDirectory);

  const blogs = filenames.map((filename) => {
    const filePath = path.join(postsDirectory, filename);
    const blogs = JSON.parse(fs.readFileSync(filePath, "utf8"));

    // Generally you would parse/transform the contents
    // For example you can transform markdown to HTML here

    return blogs;
  });

  return {
    paths: blogs[0].map((firm) => ({ params: { id: firm.id } })), //firms[0].map(firm => { params: { id: firm.id}}),
    fallback: false, // See the "fallback" section below
  };
}

export async function getStaticProps({ params }) {
  // Call an external API endpoint to get posts.
  // You can use any data fetching library
  const postsDirectory = path.join(process.cwd(), "blogs");
  const filenames = fs.readdirSync(postsDirectory);

  const blogs = filenames.map((filename) => {
    const filePath = path.join(postsDirectory, filename);
    const blogs = JSON.parse(fs.readFileSync(filePath, "utf8"));

    // Generally you would parse/transform the contents
    // For example you can transform markdown to HTML here

    return blogs;
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
  const blog = blogs[0].filter((blog) => blog.id === params.id);
  // By returning { props: posts }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      blog,
      verticals,
    },
  };
}
