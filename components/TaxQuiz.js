import StateItem from "../components/StateItem";
import StateList from "../components/StateList";
import USAMap from "react-usa-map";
import { useState, useCallback, useEffect } from "react";
import FirmItem from "./FirmItem";
import { useAppContext } from "../contexts/state.js";

const TaxQuiz = ({ states, firms, setQuizModalState }) => {
  //const unitedStates = states[0]
  const { addClick, addLead } = useAppContext();

  const size = useWindowSize();
  const [state, setStateVal] = useState("");
  const [quizPage, setQuizPage] = useState(1);
  const setState = useCallback((e) => {
    setStateVal(e.target.value);
    setQuizPage(quizPage + 1);
  }, []);
  const mapHandler = (event) => {
    setStateVal(event.target.dataset.name);
    setQuizPage(quizPage + 1);
    addClick({
      loc: "taxQuiz",
      time: `${new Date().getTime()}`,
      btn: "mapclick",
    });
  };

  const [lead, setLead] = useState({
    compliant: "",
    filingStatus: "",
    cpa: "",
    amount: 0,
    type: "",
    income: 0,
    employment: "",
    name: "",
    phone: "",
    email: "",
    optout: false,
  });

  const [infoState, setInfoState] = useState(false);
  const onChange = (e) => {
    setLead({ ...lead, [e.target.name]: e.target.value });
  };

  const onClick = (e) => {
    setQuizPage(quizPage - 8);
    addLead(lead);
    addClick({
      loc: "taxQuiz",
      time: `${new Date().getTime()}`,
      btn: "submitquiz",
    });
    setQuizModalState();
  };

  const {
    amount,
    type,
    compliant,
    filingStatus,
    cpa,
    income,
    employment,
    name,
    phone,
    email,
    optout,
  } = lead;

  return (
    <div className='container'>
      {quizPage === 1 ? (
        <div>
          <h3 className='text-center lead text-primary'>Where Are you From?</h3>
          {size.width < 751 ? (
            <StateList setState={setState} />
          ) : (
            <USAMap onClick={mapHandler} />
          )}
        </div>
      ) : (
        ""
      )}

      {quizPage === -1 ? (
        <div className='card all-center'>
          <h3>
            You probably do not qualify for tax relief and should contact the
            taxing authorities directly. If you have more questions please call{" "}
            <a href='tel:+8008291040'>The IRS</a> or contact your state to pay
            taxes directly at{" "}
          </h3>{" "}
          <br />{" "}
          {state.length > 0
            ? states
                .filter((st) => st.abbv === state)
                .map((st) => <StateItem state={st} key={st.state} />)
            : ""}
          <button
            onClick={setQuizModalState}
            className='btn btn-primary py-3 text-center btn-block'>
            Next
          </button>
        </div>
      ) : (
        ""
      )}

      {quizPage === 2 ? (
        <div className='card grid-2'>
          <div>
            <label htmlFor='amount'>How Much Tax Debt Do You Have</label>
            <input
              type='text'
              name='amount'
              value={amount}
              onChange={onChange}
            />
            <label htmlFor='type'>Do You Owe State Taxes?</label> <br />
            <input
              type='radio'
              name='type'
              value='statefed'
              onClick={() =>
                addClick({
                  loc: "taxQuiz",
                  time: `${new Date().getTime()}`,
                  btn: "type:statefed",
                })
              }
              checked={type === "statefed"}
              onChange={onChange}
            />{" "}
            Yes, I owe state and federal taxes . <br />
            <input
              type='radio'
              name='type'
              value='state'
              onClick={() =>
                addClick({
                  loc: "taxQuiz",
                  time: `${new Date().getTime()}`,
                  btn: "type:state",
                })
              }
              checked={type === "state"}
              onChange={onChange}
            />{" "}
            Yes, but I ONLY owe state taxes.
            <br />
            <input
              type='radio'
              name='type'
              value='federal'
              onClick={() =>
                addClick({
                  loc: "taxQuiz",
                  time: `${new Date().getTime()}`,
                  btn: "type:federal",
                })
              }
              checked={type === "federal"}
              onChange={onChange}
            />{" "}
            No, I only owe federal taxes.
          </div>
          <div>
            <div className='card'>
              If you think you might owe state taxes as well please call your
              state below to verify savings opportunities. <br />{" "}
              {state.length > 0
                ? states
                    .filter((st) => st.abbv === state)
                    .map((st) => <StateItem state={st} key={st.state} />)
                : ""}
            </div>
          </div>
          {amount > 5000 && amount < 999999 ? (
            <button
              onClick={() => setQuizPage(quizPage + 1)}
              className='btn btn-primary py-3 text-center btn-block'>
              Next
            </button>
          ) : (
            <button
              onClick={() => setQuizPage(quizPage - 3)}
              className='btn btn-primary py-3 text-center btn-block'>
              Next
            </button>
          )}
        </div>
      ) : (
        ""
      )}

      {quizPage === 3 ? (
        <div className='grid-2'>
          <div className='card'>
            <form action=''>
              <div>
                <h5 className='text-center'>Have You Filed All Your Taxes?</h5>
                <input
                  type='radio'
                  name='compliant'
                  value='filed'
                  onClick={() =>
                    addClick({
                      loc: "taxQuiz",
                      time: `${new Date().getTime()}`,
                      btn: "compliant:filed",
                    })
                  }
                  checked={compliant === "filed"}
                  onChange={onChange}
                />{" "}
                Yes all of my taxes including the most recent year have been
                filed <br />
                <input
                  type='radio'
                  name='compliant'
                  value='unfiledrecent'
                  onClick={() =>
                    addClick({
                      loc: "taxQuiz",
                      time: `${new Date().getTime()}`,
                      btn: "compliant:unfiledrecent",
                    })
                  }
                  checked={compliant === "unfiledrecent"}
                  onChange={onChange}
                />{" "}
                No I need to file the most recent tax year.
                <br />
                <input
                  type='radio'
                  name='compliant'
                  value='unfiledmultiple'
                  onClick={() =>
                    addClick({
                      loc: "taxQuiz",
                      time: `${new Date().getTime()}`,
                      btn: "compliant:unfiledmultiple",
                    })
                  }
                  checked={compliant === "unfiledmultiple"}
                  onChange={onChange}
                />{" "}
                No I need to file multiple years of taxes.
                <button
                  onClick={() => setQuizPage(quizPage + 1)}
                  className='btn btn-primary py-3 text-center btn-block'>
                  Next
                </button>
              </div>
            </form>
          </div>
          <div className='card'>
            If you think you might owe state taxes as well please call your
            state below to verify savings opportunities. <br />{" "}
            {state.length > 0
              ? states
                  .filter((st) => st.abbv === state)
                  .map((st) => <StateItem state={st} key={st.state} />)
              : ""}
          </div>
        </div>
      ) : (
        ""
      )}
      {quizPage === 4 ? (
        <div className='grid-2'>
          <div className='card'>
            <form action=''>
              <div>
                <h5 className='text-center'>How Do you File Your Taxes?</h5>
                <input
                  className=''
                  type='radio'
                  name='filingStatus'
                  value='marriedjoint'
                  onClick={() =>
                    addClick({
                      loc: "taxQuiz",
                      time: `${new Date().getTime()}`,
                      btn: "filingStatus:marriedjoint",
                    })
                  }
                  checked={filingStatus === "marriedjoint"}
                  onChange={onChange}
                />{" "}
                Married Filing Jointly <br />
                <input
                  className=''
                  type='radio'
                  name='filingStatus'
                  value='marriedseperate'
                  onClick={() =>
                    addClick({
                      loc: "taxQuiz",
                      time: `${new Date().getTime()}`,
                      btn: "filingStatus:marriedseperate",
                    })
                  }
                  checked={filingStatus === "marriedseperate"}
                  onChange={onChange}
                />{" "}
                Married Filing Seperate <br />
                <input
                  type='radio'
                  name='filingStatus'
                  value='single'
                  onClick={() =>
                    addClick({
                      loc: "taxQuiz",
                      time: `${new Date().getTime()}`,
                      btn: "filingStatus:single",
                    })
                  }
                  checked={filingStatus === "single"}
                  onChange={onChange}
                />{" "}
                Single{"   "}
                <br />
                <input
                  type='radio'
                  name='filingStatus'
                  value='hoh'
                  onClick={() =>
                    addClick({
                      loc: "taxQuiz",
                      time: `${new Date().getTime()}`,
                      btn: "filingStatus:hoh",
                    })
                  }
                  checked={filingStatus === "hoh"}
                  onChange={onChange}
                />{" "}
                Head Of Household{"   "}
                <button
                  onClick={() => setQuizPage(quizPage + 1)}
                  className=' py-3 btn btn-primary text-center btn-block'>
                  Next
                </button>
              </div>
            </form>
          </div>
          <div className='card'>
            If you think you might owe state taxes as well please call your
            state below to verify savings opportunities. <br />{" "}
            {state.length > 0
              ? states
                  .filter((st) => st.abbv === state)
                  .map((st) => <StateItem state={st} key={st.state} />)
              : ""}
          </div>
        </div>
      ) : (
        ""
      )}

      {quizPage === 5 ? (
        <div className='grid-2'>
          <div className='card'>
            <form action=''>
              <div>
                <h5 className='text-center'>
                  Is someone currently helping you prepare your taxes?
                </h5>
                <input
                  type='radio'
                  name='cpa'
                  value='nocpa'
                  onClick={() =>
                    addClick({
                      loc: "taxQuiz",
                      time: `${new Date().getTime()}`,
                      btn: "cpa:nocpa",
                    })
                  }
                  checked={cpa === "nocpa"}
                  onChange={onChange}
                />{" "}
                No, I currently do not employ any tax professionals to do my
                taxes <br />
                <input
                  type='radio'
                  name='cpa'
                  value='nationalcpa'
                  onClick={() =>
                    addClick({
                      loc: "taxQuiz",
                      time: `${new Date().getTime()}`,
                      btn: "cpa:nationalcpa",
                    })
                  }
                  checked={cpa === "nationalcpa"}
                  onChange={onChange}
                />
                Yes, I currently employ a tax professional from a national
                company to review or prepare my taxes.
                <br />
                <input
                  type='radio'
                  name='cpa'
                  value='localcpa'
                  onClick={() =>
                    addClick({
                      loc: "taxQuiz",
                      time: `${new Date().getTime()}`,
                      btn: "cpa:localcpa",
                    })
                  }
                  checked={cpa === "localcpa"}
                  onChange={onChange}
                />
                Yes, I currently employ a local CPA to prepare my tax return.
                <button
                  onClick={() => setQuizPage(quizPage + 1)}
                  className=' py-3 btn btn-primary text-center btn-block'>
                  Next
                </button>
              </div>
            </form>
          </div>
          <div className='card'>
            If you think you might owe state taxes as well please call your
            state below to verify savings opportunities. <br />{" "}
            {state.length > 0
              ? states
                  .filter((st) => st.abbv === state)
                  .map((st) => <StateItem state={st} key={st.state} />)
              : ""}
          </div>
        </div>
      ) : (
        ""
      )}

      {quizPage === 6 ? (
        <div className='grid-2'>
          <div className='card'>
            <label htmlFor='income'>What is your monthly income?</label>
            <input
              type='text'
              name='income'
              value={income}
              onChange={onChange}
            />
            <h5 className='text-center'>Are You currently fully employed?</h5>
            <input
              type='radio'
              name='employment'
              value='employed'
              onClick={() =>
                addClick({
                  loc: "taxQuiz",
                  time: `${new Date().getTime()}`,
                  btn: "employment:employed",
                })
              }
              checked={employment === "employed"}
              onChange={onChange}
            />{" "}
            Yes, I am fully employed
            <br />
            <input
              type='radio'
              name='employment'
              value='unemployed'
              onClick={() =>
                addClick({
                  loc: "taxQuiz",
                  time: `${new Date().getTime()}`,
                  btn: "employment:unemployed",
                })
              }
              checked={employment === "unemployed"}
              onChange={onChange}
            />
            No, I am only partially employed or unemployed
            <br />
            <input
              type='radio'
              name='employment'
              value='retired'
              onClick={() =>
                addClick({
                  loc: "taxQuiz",
                  time: `${new Date().getTime()}`,
                  btn: "employment:retired",
                })
              }
              checked={employment === "retired"}
              onChange={onChange}
            />
            No, I am retired.
          </div>
          <div>
            <FirmItem firms={firms} />
          </div>
          <div>
            <button
              onClick={() => setQuizPage(quizPage + 1)}
              className=' py-3 btn btn-primary text-center btn-block'>
              Last Step
            </button>
          </div>
        </div>
      ) : (
        ""
      )}

      {quizPage === 7 ? (
        <div className='grid-2'>
          <div className='card'>
            {infoState === false ? (
              <div>
                <div>
                  <label htmlFor='income'>What Is Your Name?</label>
                  <input
                    type='text'
                    name='name'
                    value={name}
                    onChange={onChange}
                  />

                  <label htmlFor='income'>What Is Your Phone Number?</label>
                  <input
                    type='text'
                    name='phone'
                    value={phone}
                    onChange={onChange}
                  />

                  <label htmlFor='income'>What Is Your Email Address?</label>
                  <input
                    type='text'
                    name='email'
                    value={email}
                    onChange={onChange}
                  />
                </div>
                <div className='grid-2a'>
                  <div className=''>
                    {" "}
                    <button
                      className='btn'
                      onClick={() => setInfoState((prevState) => !prevState)}>
                      Information Sharing Policy
                    </button>{" "}
                  </div>

                  <div className=''>
                    <input
                      type='checkbox'
                      name='optout'
                      value='true'
                      checked={optout === "true"}
                      onChange={onChange}
                    />{" "}
                    I do not wish to share this info{" "}
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <div className='card'>
                  <h3>Advertising and information sharing policy</h3>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Enim quis reprehenderit atque iusto qui ducimus,
                    accusantium, modi in rerum illum blanditiis. Qui distinctio
                    dolor obcaecati suscipit veritatis impedit laboriosam, ipsa
                    voluptas omnis consequatur ut vitae aspernatur
                    necessitatibus ipsam aliquam velit voluptatem quidem vero
                    optio id sit nam? Cum, odio possimus?
                  </p>

                  <div className='text-center'>
                    <button
                      onClick={() => setInfoState((prevState) => !prevState)}
                      className='btn btn-sm'>
                      Ok
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div>
            <FirmItem firms={firms} />
          </div>
          <div>
            <button
              onClick={() => setQuizPage(quizPage + 1)}
              className=' py-3 btn btn-primary text-center btn-block'>
              Do I Qualify For Tax Relief
            </button>
          </div>
        </div>
      ) : (
        ""
      )}

      {quizPage === 8 ? (
        <div className='card all-center'>
          <div className='grid-2'>
            <div className='text-center'>
              {lead.income > 0 && lead.income < 2000 ? (
                <h3>
                  You probably qualify for a hardship based tax relief and can
                  contact the taxing authorities directly, please call{" "}
                  <a href='tel:+8008291040'>The IRS</a>
                </h3>
              ) : (
                <h3>
                  You probably qualify for tax relief, but you should seek legal
                  representation to protect your assets.
                </h3>
              )}
            </div>
            <div>
              {lead.income === 0 || lead.income > 2000 ? (
                <div>
                  <FirmItem firms={firms} />
                </div>
              ) : (
                <div className='card'>
                  If you think you might owe state taxes as well please call
                  your state below to verify savings opportunities. <br />{" "}
                  {state.length > 0
                    ? states
                        .filter((st) => st.abbv === state)
                        .map((st) => <StateItem state={st} key={st.state} />)
                    : ""}
                </div>
              )}
            </div>
          </div>

          <button
            onClick={onClick}
            className='btn btn-primary py-3 text-center btn-block'>
            Good to know!
          </button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

function useWindowSize() {
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    // only execute all the code below in client side
    if (typeof window !== "undefined") {
      // Handler to call on window resize
      function handleResize() {
        // Set window width/height to state
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }

      // Add event listener
      window.addEventListener("resize", handleResize);

      // Call handler right away so state gets updated with initial window size
      handleResize();

      // Remove event listener on cleanup
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []); // Empty array ensures that effect is only run on mount
  return windowSize;
}

export default TaxQuiz;
