import React , {useEffect} from 'react' ;

import { Section1 , Section2  , FAQ, } from '../components/Mainsection';
import { Navigate } from 'react-router-dom';


const Home = () => {

 

  return (
    <div>
   <Section1/>
   <Section2/>
   <FAQ/>
  
    </div>
  )
}

export default Home;