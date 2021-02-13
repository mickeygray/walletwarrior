const QuizBox = ({ vertical, setQuizModalState }) => {
  const thisVertical = vertical[0];

  return (
    <div
      style={{ height: "150px" }}
      onClick={setQuizModalState}
      className='card bg-light text-center text-primary'>
      <h3 className='text-primary'>{thisVertical.quizTitle}</h3>
      <p className='lead text-secondary'>
        {thisVertical.vertical === "tax" ? (
          <i className='fas fa-life-ring'></i>
        ) : (
          ""
        )}
        {thisVertical.vertical === "annuity" ? (
          <i className='fas fa-money-bill-alt'></i>
        ) : (
          ""
        )}
        {thisVertical.vertical === "asset" ? (
          <i className='fas fa-seedling'></i>
        ) : (
          ""
        )}
        {thisVertical.vertical === "credit" ? (
          <i className='fab fa-cc-visa'></i>
        ) : (
          ""
        )}
        {thisVertical.vertical === "software" ? (
          <i className='fas fa-save'></i>
        ) : (
          ""
        )}
      </p>
    </div>
  );
};

export default QuizBox;
