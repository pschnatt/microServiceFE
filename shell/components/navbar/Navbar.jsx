import "./navbar.css";
import { useNavigate } from "react-router-dom";
import React,{ useState, useEffect } from "react";
import Cookies from 'js-cookie'; 
import axios from 'axios';
import RestaurantForm from '../Restaurantform/restaurantform.jsx';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
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

  useEffect(() => {
    const token = Cookies.get('jwt_token');
    console.log("JWT Token:", token); // Log the token value
    setIsLoggedIn(token !== undefined);
    
  }, []);  

  const CreateRestaurant = () => {
    setIsFormOpen(true);
  };

  // Function to handle form submission
  const handleCreateRestaurant = (restaurantData) => {
    console.log(restaurantData)
    const userId = "12345";
    try {
        const response = axios.post(`http://127.0.0.1:8080/api/restaurant/${userId}/create`, restaurantData);
        if (response.status === 200) {
            console.log("Restaurant created successfully:", response.data);
        } else {
            throw new Error('Failed to create the restaurant');
        }
    } catch (error) {
        console.error("Error creating restaurant:", error.message);
    }

    setIsFormOpen(false);
};


  return (
    <div className="navbar">
      <div className="navContainer">
        <span className="logo">SukSaang</span>
        <div className="navItems">
          {isLoggedIn ? (
            <>
              <button className="navButton" onClick={() => setIsFormOpen(true)}>Create Restaurant</button>
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
      {isFormOpen && (
                <RestaurantForm onSubmit={handleCreateRestaurant} onClose={() => setIsFormOpen(false)} />
            )}
    </div>
  );
};

export default Navbar;
