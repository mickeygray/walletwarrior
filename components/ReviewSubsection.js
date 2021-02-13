import Image from "next/image";

const ReviewSubsection = ({ review: { company, stars, review, logo } }) => {
  return (
    <div className='card grid-2'>
      <div className='bg-primary all-center'>
        <Image src={logo} alt={company} height='200' width='200' />
        <p className='lead'>{company}</p>
      </div>
      <div className='py-3'>
        <div className='mx-3'>Rated: {stars}</div>
        <p style={{ textIndent: "15px" }}>{review}</p>
      </div>
    </div>
  );
};

export default ReviewSubsection;
