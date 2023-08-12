import { useEffect } from "react";
import { logo } from "../images/image";
import { Link, useNavigate } from "react-router-dom";


const Header = () => {
 
  const navigate = useNavigate();
 
  
  const token = localStorage.getItem("usertoken")
  

  const onLogout = () => {
    localStorage.removeItem("usertoken");
    navigate("/signin")
  
  };


  return (
    <div className="fixed-header header ">
      <div>
        <Link to={token?"/main":"/"}>
          <img alt="netflix-logo" className="logo" src={logo} />
        </Link>
      </div>

      <div>
        <button className="btn btn-header transparent">English</button>

        {token ? 
          <button onClick={onLogout} className="btn btn-header btn-read">Sign out </button>:  <Link to={"/signin"}><button className="btn btn-header btn-read"> Sign in</button></Link>
        }
      </div>
    </div>
  );
};

export default Header;
