import React, { Fragment } from "react";
import Image from "next/image";
import SmallForm from "./SmallForm";

const SubHero = ({ vertical }) => {
  let thisVertical;

  if (Array.isArray(vertical)) {
    thisVertical = vertical[0];
  } else {
    thisVertical = vertical;
  }

  console.log(thisVertical, "123324");

  return (
    <Fragment>
      <div className='grid-subhero'>
        <div
          className='solsimg'
          style={{ backgroundColor: "black", opacity: "50%" }}>
          <Image
            src={thisVertical.img2}
            height='50vh'
            width='100vw'
            alt='Wallet Warriors'
          />
        </div>
        <div className='conscopy'>
          <div className='container mx-3'>
            <h2 className='text-primary'>{thisVertical.name}</h2>
            <h3 className='text-danger'>{thisVertical.descrip1}</h3>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default SubHero;
