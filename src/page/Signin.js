/* eslint-disable no-lone-blocks */
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";

import { Section1 } from "../components/Mainsection";
import { BiShow, BiHide } from "react-icons/bi";
import axios from "axios";

const Signin = () => {
  const navigate = useNavigate();
  //for password show and hide
  const [showpassword, setshowpassword] = useState();
  const [token, settoken]= useState(null)
  const [IsTypePassword, setIsTypePassword] = useState(true);
  const [ErrorMessage, setErrorMessage] = useState("");
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
   if ( localStorage.getItem("usertoken")) {
    settoken(localStorage.getItem("usertoken"))
    navigate("/main")
   }
  }, [token])
  
 

 

  const handleChange = e => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };
  
  const login = async () => {
    try {
      const resp = await axios.post("https://netflix-tqvq.onrender.com/login",user);
      if(resp.data.success){
        console.log(resp.data);
        const Usertoken  = localStorage.setItem("usertoken",resp.data.token);
        settoken(Usertoken)
       
      }else{
        setErrorMessage(resp.data.message)
      }
    } catch (error) {
      setErrorMessage(error.message)
    }
  };
  return (
    <div className="signin">
      <Section1 />
      <div className="signin-container">
        <p
          style={{ fontSize: "0.90rem", textAlign: "center", color: "#eb8703" }}
        >
          {ErrorMessage}
        </p>

        <section className="inputs-container">
          <h2>Sign in</h2>
          <br />
          <label>E-mail</label> <br />
          <input
            name="email"
            value={user.email}
            onChange={handleChange}
            placeholder="Enter your Email"
            type={"email"}
          />
          <br />
          <label>Password</label> <br />
          <div>
            <input
              type={showpassword?"text":"password"}
              name="password"
              value={user.password}
              onChange={handleChange}
              placeholder="Enter your Password"/>
             
            {showpassword ? (
              <BiHide
                onClick={() => {
                  setshowpassword(!showpassword);
                }}
                className="showhideicon"
              />
            ) : (
              <BiShow
                onClick={() => {
                  setshowpassword(!showpassword);
                }}
                className="showhideicon"
              />
            )}
          </div>
          <br />
          <section style={{ margin: "20px 0" }}>
            <button onClick={login} className="submit-btn btn-read btn">
              Log in
            </button>
            <br />
            <div
              className="w-100"
              style={{ textAlign: "center", margin: "10px 0 10px 0" }}
            ></div>

            <button
              onClick={() => {  navigate("/signup")}}
              className="submit-btn btn-read btn"
              style={{
                fontSize: "0.90rem",
                textAlign: "center",
              }}
            >
              Sign up
            </button>
          </section>
        </section>
      </div>
    </div>
  );
};

export default Signin;
