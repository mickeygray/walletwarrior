import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { useAppContext } from "../contexts/state.js";

/*<Image
          onClick={onClick}
            src={style.background=== "black" ? "/logo2.png" : "/logo.png"}
            alt='Find Nationally Rated CPA Firms Near Me'
    
              width= "200px"
              height= "100px"
         
 
          />
*/
const StickyNavbar = ({ verticals }) => {
  const router = useRouter();
  const { addClick } = useAppContext();
  const [style, setStyle] = useState({});
  let position;
  if (process.browser) {
    position = window.pageYOffset;
  }

  const onClick = () => {
    if (process.browser) {
      window.scrollTo(0, 0);
    }
  };
  useEffect(() => {
    if (process.browser) {
      window.addEventListener("scroll", onScroll);
      setStyle({
        backgroundColor: "#333",
        overflowY: "hidden",
        width: "95vw",
        marginLeft: "100px",
        overflowX: "hidden",
      });
    }
  }, []);

  useEffect(() => {
    if (position === 0) {
      setStyle({
        backgroundColor: "#333",
        zIndex: "999999999999999",
      });
    }
  }, [position, setStyle]);

  const onScroll = () => {
    setStyle({
      overflowY: "hidden",
      overflowX: "hidden",
      position: "sticky",
      top: "0",
      background: "black",
      color: "white",
      height: "100%",
      zIndex: "999999999999999",
    });
  };

  const onClick = (e) => {};

  return (
    <div className='navbar' onScroll={onScroll} style={style}>
      <div className='grid-2c'>
        <div>
          <h2>
            {" "}
            <Link href='/'>
              <a>
                <Image
                  src='/logo.png'
                  height='100px'
                  width='100px'
                  alt='tax relief reviews'
                />{" "}
              </a>
            </Link>{" "}
          </h2>
        </div>
        <div className='py-2 p-1'>
          <ul>
            {verticals.map((vertical) => (
              <li
                key={vertical.key}
                onClick={() => {
                  router.push({
                    pathname: `/vertical/${vertical.key}`,
                    query: { data: vertical.key },
                  });
                  addClick({
                    loc: `${vertical.vertical}`,
                    time: `${new Date().getTime()}`,
                    btn: "clicked navbar link",
                  });
                }}
                onClick={() => {}}>
                <button className='btn btn-primary'>{vertical.navtext}</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default StickyNavbar;
