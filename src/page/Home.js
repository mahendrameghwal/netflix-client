

import { useEffect } from 'react';
import { Section1 , Section2  , FAQ, } from '../components/Mainsection';
import {  useNavigate } from 'react-router-dom';



const Home = () => {
const navigate = useNavigate()
const token = localStorage.getItem("usertoken");
console.log(token);

useEffect(()=>{
  token &&  navigate("/main")
},[token])
 

  return (
    <div>
   <Section1/>
   <Section2/>
   <FAQ/>
  
    </div>
  )
}

export default Home;