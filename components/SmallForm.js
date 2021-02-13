import { useState, useEffect } from "react";
import { useAppContext } from "../contexts/state.js";
import fetch from "isomorphic-fetch";

const SmallForm = () => {
  const { addClick, addLead } = useAppContext();

  const onClick = (e) => {
    submitForm(form);
    addClick({ loc: `Small Form Btn`, time: `${new Date().getTime()}` });
    addLead(form);
    clearAll();
  };

  useEffect(() => {
    setForm({
      fullName: "",
      email: "",
    });
  }, []);

  const [form, setForm] = useState({
    fullName: "",
    email: "",
  });

  const onSubmit = (e) => {
    e.preventDefault();
  };

  const onChange = (e) =>
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

  const clearAll = () => {
    setForm({
      fullName: "",
      email: "",
    });
  };

  const submitForm = (form) => {
    fetch("/api/contact", {
      method: "post",
      headers: {
        "Accept": "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    }).then((res) => {
      res.status === 200 ? console.log("22 skadoo") : "";
    });
  };

  const { fullName, email } = form;

  return (
    <div>
      <form className='navbar' onSubmit={onSubmit}>
        <div className='grid-3'>
          <input
            type='text'
            placeholder='Name'
            name='fullName'
            value={fullName}
            onChange={onChange}
          />
          <input
            type='text'
            name='email'
            value={email}
            onChange={onChange}
            placeholder='Email'
          />
          <button
            onClick={onClick}
            className='btn btn-primary btn-sm'
            style={{ borderRadius: "20px" }}>
            Lets Get Started!
          </button>
        </div>
      </form>
    </div>
  );
};

export default SmallForm;
