import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";

const ListItem = ({ firm }) => {
  const router = useRouter();

  //<Link href={firm.name}><a className='lead' style={{color:'#f4f4f4'}}></a></Link>
  const stars = [];

  for (let i = 1; i <= Math.floor(firm.stars); i++) {
    let num = 0;
    num = num + 1;
    stars.push(<i key={num} aria-hidden className='fas fa-star'></i>);
  }

  if (Number.isInteger(firm.stars) === false) {
    let num = 0;
    num = num + 1;
    stars.push(<i key={num} aria-hidden className='fas fa-star-half'></i>);
  }

  return (
    <div className='card bg-secondary'>
      <div className='grid-3'>
        <div>
          {" "}
          Company: <br /> <p className='lead'>{firm.name}</p>{" "}
        </div>
        <div>
          {" "}
          <p className='lead text-center'>
            Contact:
            <br />{" "}
            <a href={`tel:${firm.phone}`}>
              <i aria-hidden className='fas fa-phone-square' />
            </a>{" "}
            <a href={`${firm.website}`}>
              {" "}
              <i aria-hidden className='fas fa-globe' />
            </a>{" "}
            <a href={`${firm.bbb}`}>
              <i aria-hidden className='fas fa-search' />
            </a>
          </p>
        </div>
        <div className='text-right'>
          <Image src={firm.logo} alt={firm.name} height='100px' width='200px' />
        </div>
      </div>
      <div className='grid-3'>
        <div className='card bg-light'>
          <h5>Average Cost</h5> <br />
          <p className='lead'>{firm.cost}</p>
        </div>
        <div className='card bg-dark'>
          <h5>Exploration Fees</h5> <br />
          <p className='lead'>{firm.exploration}</p>
        </div>
        <div className='card bg-light'>
          <h5>Minimum Debt Amount</h5> <br />
          <p className='lead'>{firm.minimum}</p>
        </div>
      </div>
      <div className='grid-3'>
        <div>
          <p>This company is best for</p>
          <ul>
            {firm.types.map((type, i) => (
              <li key={type}>{type}</li>
            ))}
          </ul>
        </div>
        <div>
          Rated:{stars} {firm.stars}/5 Stars
        </div>
        <div className='py-3'>
          <button
            className='lead btn-primary btn btn-block'
            onClick={() => {
              router.push({
                pathname: `/firm/${firm.id}`,
                query: { data: firm.id },
              });
            }}>
            View Their Profile and Reviews
          </button>
        </div>
      </div>
    </div>
  );
};

export default ListItem;
