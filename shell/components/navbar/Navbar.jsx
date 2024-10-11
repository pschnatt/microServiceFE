import "./navbar.css";
import { useNavigate } from "react-router-dom";
import React,{ useState, useEffect } from "react";
// import Cookies from 'js-cookie'; 

const Navbar = () => {

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const navigate = useNavigate();

  const handleRegisterClick = () => {
    navigate("/register");
  };

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleLogoutClick = () => {
    Cookies.remove('token'); 
    navigate("/login");
  };

  const handleHistory = () => {
    navigate("/bookinghistory");
  };

  const handlePreviousClick = () => {
    navigate(-1);
  };

  // useEffect(() => {
  //   const token = Cookies.get('token')
  //   setIsLoggedIn(token !== undefined)
    
  // }, []);  

  return (
    <div className="navbar">
      <div className="navContainer">
        <span className="logo">SukSaang</span>
        <div className="navItems">
          {isLoggedIn ? (
            <>
              <button className="navButton" onClick={handleHistory}>History</button>
              <button className="navButton" onClick={handleLogoutClick}>Logout</button>
            </>
          ) : (
            <>
              <button className="navButton" onClick={handleRegisterClick}>Register</button>
              <button className="navButton" onClick={handleLoginClick}>Login</button>
            </>
          )}
          <button className="navButton" onClick={handlePreviousClick}>Previous</button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
