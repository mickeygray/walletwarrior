import { useEffect, useState } from "react";
import Image from "next/image";
import { useAppContext } from "../contexts/state.js";
const FirmItem = ({ firms }) => {
  const { addClick } = useAppContext();
  useEffect(() => {
    function shuffleArray(array) {
      let i = array.length - 1;
      for (; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }
      return array;
    }

    const shuffledFirms = shuffleArray(firms);

    setFirm({
      name: shuffledFirms[0].name,
      phone: shuffledFirms[0].phone,
      website: shuffledFirms[0].website,
      logo: shuffledFirms[0].logo,
    });
  }, []);

  const [firm, setFirm] = useState({
    name: "",
    website: "",
    phone: "",
    logo: "",
  });

  console.log(firm);

  return (
    <div className='bg-secondary'>
      <div>
        <div className='all-center'>
          <a
            onClick={() =>
              addClick({
                loc: `${firm.name}`,
                time: `${new Date().getTime()}`,
                btn: "logoclick",
              })
            }
            href={firm ? firm.website : "#"}>
            <Image
              src={firm.logo ? firm.logo : "/ntetax-logo"}
              alt={firm ? firm.name : "nte"}
              height='200px'
              width='300px'
            />
          </a>
          <br></br>
          {firm ? (
            <a
              onClick={() =>
                addClick({
                  loc: `${firm.name}`,
                  time: `${new Date().getTime()}`,
                  btn: "nameclick",
                })
              }
              href={firm.phone ? `tel+${firm.phone}` : ""}>
              {firm.name}
            </a>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default FirmItem;
