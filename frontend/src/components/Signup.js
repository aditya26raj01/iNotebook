import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Signup = (props) => {

  const navigate = useNavigate();
  
  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    }
  }, [])
  const [creds, setCreds] = useState({ name: "", email: "", password: "" })

  const onChange = (e) => {
    setCreds({ ...creds, [e.target.name]: e.target.value });
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: creds.name, email: creds.email, password: creds.password })
    });
    const json = await response.json();
    if (json.success) {
      //redirect
      localStorage.setItem("token", json.authToken);
      navigate("/");
      props.showAlert("Account Created Sucessfully!", "success");
    } else {
      props.showAlert("This email already exists. Try Logging in!", "danger");
    }
  }

  return (
    <form onSubmit={onSubmit} >
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input type="text" onChange={onChange} name="name" className="form-control" id="name" placeholder="Enter Name" />
      </div>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input type="email" onChange={onChange} name="email" className="form-control" id="email" placeholder="Enter Email" />
      </div>
      <div className="form-group">
        <label htmlFor="password">Create Password</label>
        <input type="password" onChange={onChange} name="password" className="form-control" id="password" placeholder="Password" />
      </div>
      <button type="submit" className="btn btn-primary">Submit</button>
    </form>
  )
}

export default Signup;