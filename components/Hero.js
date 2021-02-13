import React, { Fragment, useState } from "react";
import Image from "next/image";
import SmallForm from "./SmallForm";
import YouTube from "react-youtube";
import styled, { css } from "styled-components";
import { useAppContext } from "../contexts/state.js";
const ModalContainer = styled.div`
  position: absolute;
  top: 30;
  left: 30;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 99998;
`;
const Hero = () => {
  const { addClick } = useAppContext();
  const [videoStyle, setVideoStyle] = useState(false);
  const opts = {
    height: "350",
    width: "350",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 0,
    },
  };

  const onClick = (e) => {
    setVideoStyle((prevState) => !prevState);
    addClick({
      loc: "Front Page",
      time: `${new Date().getTime()}`,
      btn: "Learn More",
    });
  };
  return (
    <Fragment>
      <div className='grid-hero'>
        <div
          className='overlay'
          style={{ backgroundColor: "black", opacity: "50%" }}>
          <Image
            src='/hero.png'
            height='80vh'
            width='100vw'
            alt='English Direct Rebecca Warner'
          />
        </div>
        <div className='homecopy'>
          <div className='mx-3 grid-2'>
            <div>
              <h2 className='text-primary'>The Wallet Warriors</h2>
              <h3 className='text-danger'>
                Giving You The Tools To Protect Your Assets
              </h3>
              <p>
                <b>
                  We help you make all the right choices when it comes to
                  finding <br />
                  the companies who can protect and make your money grow.
                </b>
              </p>
              <br />

              <button
                onClick={onClick}
                className='btn btn-primary all-center'
                style={{ borderRadius: "5px", width: "200px" }}>
                Learn More
              </button>
            </div>
            <div>
              {videoStyle ? (
                <div className='homevideo'>
                  <YouTube videoId='kh8Gtj-E1JE' opts={opts} />
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
          <div className='all-center'>
            <SmallForm />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Hero;
