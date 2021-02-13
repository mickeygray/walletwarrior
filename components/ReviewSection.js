import ReviewSubsection from "./ReviewSubsection";
import FirmItem from "./FirmItem";

const ReviewSection = ({ review, firms }) => {
  const {
    companies,
    stars,
    reviews,
    logos,
    category,
    categorySummary,
  } = review;

  const mappedStars = stars.map(function (value, index) {
    let str = [];

    for (let i = 1; i <= Math.floor(value); i++) {
      str.push(<i aria-hidden className='fas fa-star'></i>);
    }

    if (Number.isInteger(value) === false) {
      str.push(<i aria-hidden className='fas fa-star-half'></i>);
    }
    return str;
  });

  const combinedReviews = companies.map(function (value, index) {
    let obj = {
      company: value,
      stars: mappedStars[index],
      review: reviews[index],
      logo: logos[index],
      id: index,
    };
    return obj;
  });

  console.log(combinedReviews);

  return (
    <div className='grid-2d my-3'>
      <div className='card bg-light mx-3'>
        <h3 className='text-center'>{category}</h3>
        <h4>{categorySummary}</h4>

        {combinedReviews.map((review) => (
          <ReviewSubsection review={review} key={review.id} />
        ))}
      </div>
      <div className='my-4'>
        <FirmItem firms={firms} />
      </div>
    </div>
  );
};

export default ReviewSection;
