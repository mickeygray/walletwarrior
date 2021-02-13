import Router from "next/router";
import { useEffect, useState } from "react";

const ArticleBox = ({ vertical, setVidModalState }) => {
  const thisVertical = vertical[0];

  return (
    <div
      onClick={setVidModalState}
      style={{ height: "150px" }}
      className='card bg-light text-center text-primary'>
      <h3 className='text-primary'>{thisVertical.vlogTitle}</h3>
      <p className='lead text-secondary'>
        {thisVertical.vertical === "tax" ? (
          <i className='fas fa-chalkboard-teacher'></i>
        ) : (
          ""
        )}
        {thisVertical.vertical === "annuity" ? (
          <i className='fas fa-umbrella-beach'></i>
        ) : (
          ""
        )}
        {thisVertical.vertical === "asset" ? (
          <i className='fas fa-dollar-sign'></i>
        ) : (
          ""
        )}
        {thisVertical.vertical === "credit" ? (
          <i className='fas fa-cookie-bite '></i>
        ) : (
          ""
        )}
        {thisVertical.vertical === "software" ? (
          <i className='fas fa-code-branch'></i>
        ) : (
          ""
        )}
      </p>
    </div>
  );
};

export default ArticleBox;
