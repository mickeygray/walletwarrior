import YouTube from "react-youtube";

const VideoGallery = ({ vertical, firms, setVidModalState }) => {
  const thisVertical = vertical[0];
  const opts = {
    height: "350",
    width: "350",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 0,
    },
  };
  return (
    <div>
      <span
        className='bg-light lead'
        onClick={setVidModalState}
        style={{ float: "right" }}>
        <a>X</a>
      </span>
      <h3 className='text-center lead text-primary'>{thisVertical.video}</h3>
      <p className='text-center text-secondary'>{thisVertical.videoSummary}</p>

      <div className='grid-3'>
        <YouTube videoId={thisVertical.vid1} opts={opts} />
        <YouTube videoId={thisVertical.vid2} opts={opts} />
        <YouTube videoId={thisVertical.vid3} opts={opts} />
      </div>
    </div>
  );
};

export default VideoGallery;
