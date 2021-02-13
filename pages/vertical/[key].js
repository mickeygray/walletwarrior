import Router, { withRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import StickyNavbar from "../../components/StickyNavbar";
import Footer from "../../components/Footer";
import path from "path";
import SubHero from "../../components/SubHero";
import fs from "fs";
import BlogItem from "../../components/BlogItem";
import Pagination from "../../components/Pagination";
import { useState, useCallback, useEffect } from "react";
import TaxQuiz from "../../components/TaxQuiz";
import ListItem from "../../components/ListItem";
import QuizBox from "../../components/QuizBox";
import ArticleBox from "../../components/ArticleBox";
import VideoBox from "../../components/VideoBox";
import styled, { css } from "styled-components";
import VideoGallery from "../../components/VideoGallery";
import ReviewBox from "../../components/ReviewBox";
import { useAppContext } from "../../contexts/state.js";
import fetch from "isomorphic-fetch";
const ModalContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 300vh;
  background: rgba(0, 0, 0, 0.5);
  z-index: 99998;
`;

const Modal = styled.div`
  background: #fff;
  position: absolute;
  top: 15%;
  left: 15%;
  border: 1px solid #000;
  padding: 20px;
  min-height: 200px;
  z-index: 99999;
`;

const index = ({
  vertical,
  verticals,
  bloglist,
  reviewlist,
  states,
  firms,
}) => {
  const { addClick } = useAppContext();

  const thisVertical = vertical[0];

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(4);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = bloglist.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const [modalState, setModalState] = useState(false);
  const [projectorState, setProjector] = useState(false);

  const setQuizModalState = useCallback(() => {
    setModalState((prevState) => !prevState);
  }, []);

  const setVidModalState = useCallback(() => {
    setProjector((prevState) => !prevState);
  }, []);

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
      <StickyNavbar verticals={verticals[0]} />
      <SubHero vertical={vertical} />
      <div className='container'>
        <div className='grid-3'>
          <div
            onClick={() =>
              addClick({
                loc: `${thisVertical.vertical}`,
                time: `${new Date().getTime()}`,
                btn: "start quiz",
              })
            }>
            <QuizBox
              vertical={vertical}
              setQuizModalState={setQuizModalState}
            />
          </div>
          <div
            onClick={() =>
              addClick({
                loc: `${thisVertical.vertical}`,
                time: `${new Date().getTime()}`,
                btn: "read article",
              })
            }>
            <ArticleBox vertical={vertical} />
          </div>
          <div
            onClick={() =>
              addClick({
                loc: `${thisVertical.vertical}`,
                time: `${new Date().getTime()}`,
                btn: "watched videos",
              })
            }>
            <VideoBox vertical={vertical} setVidModalState={setVidModalState} />
          </div>
        </div>
        <div>
          <h4 className='lead text-center text-primary'>
            How Can We Help You Solve Your{" "}
            {thisVertical.vertical.slice(0, 1).toUpperCase() +
              thisVertical.vertical.slice(1, thisVertical.vertical.length)}{" "}
            Problems Today?
          </h4>
          <div className='lead grid-2c my-2'>
            <div>{thisVertical.summary}</div>
            <div>
              <Image src={thisVertical.img3} width='400' height='400' />
            </div>
          </div>
        </div>
        {projectorState === true ? (
          <ModalContainer>
            <Modal>
              <VideoGallery
                setVidModalState={setVidModalState}
                firms={firms[0]}
                vertical={vertical}
              />
            </Modal>
          </ModalContainer>
        ) : (
          ""
        )}
        {modalState === true && thisVertical.vertical === "tax" ? (
          <ModalContainer>
            <Modal>
              <TaxQuiz
                setQuizModalState={setQuizModalState}
                states={states[0]}
                firms={firms[0]}
              />
            </Modal>
          </ModalContainer>
        ) : (
          ""
        )}
        <div>
          <h3>Our Latest In Depth Reviews For {thisVertical.name}</h3>

          <div className='grid-3'>
            {reviewlist.map((review) => (
              <ReviewBox vertical={vertical} review={review} key={review.id} />
            ))}
          </div>
        </div>
        <div>
          <h3>Learn More About Our Featured Partners In {thisVertical.name}</h3>
          {firms[0]
            .filter((firm) => firm.vertical === thisVertical.vertical)
            .map((firm) => (
              <ListItem firm={firm} key={firm.id} />
            ))}
        </div>
        <div className='mx-3'>
          <h3>Read From The blog</h3>
          <Pagination
            postsPerPage={postsPerPage}
            totalPosts={bloglist.length}
            paginate={paginate}
          />
          <div className='grid-2'>
            {currentPosts.map((blog) => (
              <BlogItem key={blog.id} blog={blog} />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default withRouter(index);

export async function getStaticPaths() {
  const postsDirectory = path.join(process.cwd(), "verticals");
  const filenames = fs.readdirSync(postsDirectory);

  const verticals = filenames.map((filename) => {
    const filePath = path.join(postsDirectory, filename);
    const verticals = JSON.parse(fs.readFileSync(filePath, "utf8"));

    // Generally you would parse/transform the contents
    // For example you can transform markdown to HTML here

    return verticals;
  });

  return {
    paths: verticals[0].map((firm) => ({ params: { key: firm.key } })), //firms[0].map(firm => { params: { id: firm.id}}),
    fallback: false, // See the "fallback" section below
  };
}

export async function getStaticProps({ params }) {
  // Call an external API endpoint to get posts.
  // You can use any data fetching library
  const postsDirectory = path.join(process.cwd(), "verticals");
  const filenames = fs.readdirSync(postsDirectory);

  const verticals = filenames.map((filename) => {
    const filePath = path.join(postsDirectory, filename);
    const verts = JSON.parse(fs.readFileSync(filePath, "utf8"));

    return verts;
  });

  const bostsDirectory = path.join(process.cwd(), "blogs");
  const bilenames = fs.readdirSync(bostsDirectory);
  const blogs = bilenames.map((filename) => {
    const filePath = path.join(bostsDirectory, filename);
    const blogs = JSON.parse(fs.readFileSync(filePath, "utf8"));

    return blogs;
  });

  const sostsDirectory = path.join(process.cwd(), "states");
  const silenames = fs.readdirSync(sostsDirectory);
  const states = silenames.map((filename) => {
    const filePath = path.join(sostsDirectory, filename);
    const states = JSON.parse(fs.readFileSync(filePath, "utf8"));

    return states;
  });

  const dostsDirectory = path.join(process.cwd(), "firms");
  const dilenames = fs.readdirSync(dostsDirectory);
  const firms = dilenames.map((filename) => {
    const filePath = path.join(dostsDirectory, filename);
    const firms = JSON.parse(fs.readFileSync(filePath, "utf8"));

    return firms;
  });

  const wostsDirectory = path.join(process.cwd(), "reviews");
  const wilenames = fs.readdirSync(wostsDirectory);
  const reviews = wilenames.map((filename) => {
    const filePath = path.join(wostsDirectory, filename);
    const reviews = JSON.parse(fs.readFileSync(filePath, "utf8"));

    return reviews;
  });

  const vertical = verticals[0].filter((firm) => firm.key === params.key);

  const bloglist = blogs[0].filter(
    (blog) => blog.vertical === vertical[0].vertical
  );

  const reviewlist = reviews[0].filter(
    (review) => review.vertical === vertical[0].vertical
  );
  return {
    props: {
      vertical,
      verticals,
      bloglist,
      states,
      firms,
      reviewlist,
    },
  };
}
