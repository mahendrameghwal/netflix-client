import React,{Fragment, useEffect, useState} from "react";
import HomeContent from "../components/HomeContent";
import UpcomingMovies from "../components/UpcomingMovies";
import { useNavigate } from "react-router-dom";
import ErrorPages from "../Error/ErrorPages";

const Main = () => {
  const navigate = useNavigate();
  const [mytoken,settoken]= useState();
  const token = localStorage.getItem("usertoken");
useEffect(()=>{
if (token) {
  settoken(token)
  navigate("/main")
}else{
  navigate("/")
}
},[token])

  return (
    <>
     {
      mytoken ?
      <Fragment>
      <UpcomingMovies />
      <HomeContent />
      </Fragment>
      :<ErrorPages/>
     }
    </>
  );
};

export default Main;
