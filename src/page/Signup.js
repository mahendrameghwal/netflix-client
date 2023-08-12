import React, { useState, useEffect } from "react";
import { Section1 } from "../components/Mainsection";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const navigate = useNavigate();

  //! User information
  const [user, setuser] = useState({
    name: "",
    email: "",
    password: "",
    conforimpassword: "",
  });
  const [errmsg, seterrmsg] = useState("");
  
  const Handlechange = e => {
    const { name, value } = e.target;
   
    setuser({
      ...user,
      [name]: value,
    });
  };
  const token =localStorage.getItem("usertoken")
  useEffect(() => {
    if (token) {
     navigate("/main")
    }
     
   
   }, [token])
  const RegisterUser = async() => {
    try {
     const resp = await axios.post('https://netflix-tqvq.onrender.com/register',user);
     resp.data.success?navigate('/signin'):seterrmsg(resp.data.message)
    } catch (error) {
      seterrmsg(error.message)
      
    }

  };

  return (
    <div className="signin">
      <Section1 />

      <div className=" signin-container">
        <section className="inputs-container">
          <p
            style={{
              fontSize: "0.90rem",
              textAlign: "center",
              color: "#eb8703",
            }}
          >
            {errmsg}
          </p>
          <h2>Sign up</h2>

          {}
          <input
            onChange={Handlechange}
            placeholder="username"
            type="text"
            required
            name="name"
          />
          <br />

          <input
            onChange={Handlechange}
            placeholder="email"
            type="email"
            required
            autoComplete="on"
            name="email"
          />
          <br />
          <input
            onChange={Handlechange}
            type="password"
            placeholder="password"
            required
            name="password"
          />
          <input
            onChange={Handlechange}
            type="password"
            placeholder="conforim password"
            required
            name="conforimpassword"
          />
          <button
            onClick={RegisterUser}
            type="submit"
            className="submit-btn btn-read btn"
          >
            Create acount
          </button>
          <div style={{ margin: "4px 0" }} className="tc">
            <p>OR</p>
          </div>
          <button
            onClick={() => {
              navigate("/signin");
            }}
            className="submit-btn btn-read btn"
            style={{
              fontSize: "0.90rem",
              textAlign: "center",
            }}
          >
            Log in
          </button>
        </section>
      </div>
    </div>
  );
};
export default Signup;
