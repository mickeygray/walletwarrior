import { useState, useEffect } from "react";
import "isomorphic-fetch";
import { useAppContext } from "../contexts/state.js";
const FormItem = () => {
  const { addLead } = useAppContext();
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    city: "",
    state: "",
  });
  const [problems, setProblems] = useState([]);

  const onChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const onChange2 = (e) => {
    setProblems([...problems, e.target.value]);
  };

  useEffect(() => {
    if (problems.length > 0 && new Set(problems).size !== problems.length) {
      function filterByCount(array, count) {
        return array.filter(function (value) {
          return (
            array.filter(function (v) {
              return v === value;
            }).length === count
          );
        });
      }

      setProblems(filterByCount(problems, 1));
    }
  }, [problems]);

  const { fullName, phone, email, city, state } = form;

  const submission = { fullName, phone, email, city, state, problems };

  const submitForm = (submission) => {
    fetch("/api/contact", {
      method: "post",
      headers: {
        "Accept": "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(submission),
    }).then((res) => {
      res.status === 200 ? addLead(submission) : "";
    });
  };

  return (
    <div className='card bg-secondary container'>
      <form>
        <div className='grid-2'>
          <div>
            <input
              type='text'
              name='fullName'
              placeholder='Full Name'
              onChange={onChange}
              value={fullName}
            />
            <input
              type='text'
              name='email'
              placeholder='e-mail'
              onChange={onChange}
              value={email}
            />
            <input
              type='text'
              name='phone'
              placeholder='Phone Number'
              onChange={onChange}
              value={phone}
            />
            <input
              type='text'
              name='city'
              placeholder='City'
              onChange={onChange}
              value={city}
            />
            <input
              type='text'
              name='state'
              placeholder='State'
              onChange={onChange}
              value={state}
            />
          </div>
          <div>
            <div className='py-1'>
              <label htmlFor='years'>
                I am looking for a Tax Attorney or CPA
              </label>
              <input
                type='checkbox'
                name='problems'
                value='taxes'
                onChange={onChange2}
              />
              <br />
              <label htmlFor='years'>I am looking for an Annuity Advisor</label>
              <input
                type='checkbox'
                name='problems'
                value='annuities'
                onChange={onChange2}
              />
              <br />
              <label htmlFor='years'>
                I am looking to invest in precious metals{" "}
              </label>
              <input
                type='checkbox'
                name='problems'
                value='invest'
                onChange={onChange2}
              />
              <br />
              <label htmlFor='years'>I am looking for credit solutions</label>
              <input
                type='checkbox'
                name='problems'
                value='credit'
                onChange={onChange2}
              />
              <br />
              <label htmlFor='years'>
                I am looking for financial software{" "}
              </label>
              <input
                type='checkbox'
                name='problems'
                value='software'
                onChange={onChange2}
              />

              <div>
                <br />
                <button
                  onClick={() => submitForm(submission)}
                  className='btn btn-dark btn-block'>
                  Let Us Help You
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
      <div></div>
    </div>
  );
};

export default FormItem;
