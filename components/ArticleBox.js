import Router from "next/router";
import { useEffect, useState } from "react";

const ArticleBox = ({ vertical }) => {
  const thisVertical = vertical[0];

  const onClick = (e) => {
    Router.push({
      pathname: href,
    });
  };

  const [href, setHref] = useState("");
  useEffect(() => {
    if (thisVertical.vertical === "tax") {
      setHref("/taxcompanies");
    } else if (thisVertical.vertical === "annuity") {
      setHref("/annuityadvisor");
    } else if (thisVertical.vertical === "asset") {
      setHref("/bestinvest");
    } else if (thisVertical.vertical === "credit") {
      setHref("/creditaffect");
    } else if (thisVertical.vertical === "software") {
      setHref("/customerp");
    }
  }, [thisVertical, href]);
  return (
    <div style={{ height: "150px" }} onClick={onClick}>
      <div className='card bg-light text-center text-primary'>
        <h3 className='text-primary'>{thisVertical.articleTitle}</h3>
        <p className='lead text-secondary'>
          {thisVertical.vertical === "tax" ? (
            <i className='fas fa-question'></i>
          ) : (
            ""
          )}
          {thisVertical.vertical === "annuity" ? (
            <i className='fas fa-coins'></i>
          ) : (
            ""
          )}
          {thisVertical.vertical === "asset" ? (
            <i className='fas fa-chart-line'></i>
          ) : (
            ""
          )}
          {thisVertical.vertical === "credit" ? (
            <i className='fas fa-comments-dollar '></i>
          ) : (
            ""
          )}
          {thisVertical.vertical === "software" ? (
            <i className='fas fa-chart-area'></i>
          ) : (
            ""
          )}
        </p>
      </div>
    </div>
  );
};

export default ArticleBox;
