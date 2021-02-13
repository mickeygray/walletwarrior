import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";

const ListItem = ({ firm }) => {
  const router = useRouter();

  //<Link href={firm.name}><a className='lead' style={{color:'#f4f4f4'}}></a></Link>
  const stars = [];

  for (let i = 1; i <= Math.floor(firm.stars); i++) {
    stars.push(<i aria-hidden className='fas fa-star'></i>);
  }

  if (Number.isInteger(firm.stars) === false) {
    stars.push(<i aria-hidden className='fas fa-star-half'></i>);
  }

  console.log(Number.isInteger(firm.stars));
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
        <div className='text-center bg-dark'>
          <Image src={firm.logo} alt={firm.name} height='100px' width='200px' />{" "}
          <br />
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
