import Image from "next/image";
import { useRouter } from "next/router";

const ReviewBox = ({ review }) => {
  const { reviewName, date, img1 } = review;
  const router = useRouter();

  return (
    <div
      onClick={() =>
        router.push({
          pathname: `/review/${review.id}`,
          query: { data: review.id },
        })
      }
      className='card bg-light grid-2'>
      <div>
        <h3>{reviewName}</h3>
        <h4>{date}</h4>
      </div>
      <div>
        <Image src={img1} alt={reviewName} height='100%' width='100%' />
      </div>
    </div>
  );
};

export default ReviewBox;
