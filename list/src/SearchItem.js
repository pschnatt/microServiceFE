import React, { useState, useEffect } from 'react';
import './searchItem.css';
import { useNavigate } from 'react-router-dom';
import { startTransition } from 'react';
import axios from 'axios'; 
import { jwtDecode } from 'jwt-decode';
import RestaurantUpdateForm from './components/RestaurantUpdateForm.jsx';

const SearchItem = ({ id, imageUrl, title, address, phoneNumber, startprice, Rating, maxseats }) => {

  const navigate = useNavigate();
  const [userId, setUserId] = useState(null);
  const [restaurants, setRestaurants] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    const verifyUser = async () => {
      const token = localStorage.getItem('jwt_token'); // Get the token from local storage
      if (!token) {
        console.error('No token available. User is not authenticated.');
        return; // Exit if there's no token
      }

      try {
        // Decode the token to get the user ID
        console.log(token);
        const decodedToken = jwtDecode(token); // Ensure you're using the correct function
        console.log(decodedToken);
        const userId = decodedToken.userId; // Extract user ID from the decoded token

        // Optional: You can check if the token is expired and handle it accordingly
        const currentTime = Date.now() / 1000; // Current time in seconds
        if (decodedToken.exp < currentTime) {
          console.error('Token has expired. User needs to log in again.');
          localStorage.removeItem('jwt_token'); // Optionally remove the expired token
          return; // Exit if the token is expired
        }

        console.log(userId);
        setUserId(userId); // Set user ID from the decoded token
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    };

    verifyUser();
  }, []);

  const handleMoreDetail = async (e) => {
    e.preventDefault();
    console.log("Successfully clicked the More Detail button");
    startTransition(() => {
      navigate(`/restaurantde/${id}`);
    });
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`http://127.0.0.1:8080/api/restaurant/${userId}/delete/${id}`);
      console.log("Delete response:", response.data);
      navigate('/restaurant');
      
      setRestaurants((prevRestaurants) =>
        prevRestaurants.filter((restaurant) => restaurant.id !== id)
      );
    } catch (error) {
      console.error("Failed to delete restaurant:", error);
      setError("Failed to delete restaurant. Please try again.");
    }
  };

  const handleUpdate = (restaurantData) =>  {
    console.log(restaurantData)
    const userId = "670d1de86a105f57483f4291";
    try {
      const response = axios.put(`http://127.0.0.1:8080/api/restaurant/${userId}/update/${id}`, restaurantData);
        if (response.status === 200) {
            console.log("Restaurant updated successfully:", response.data);
        } else {
            throw new Error('Failed to update the restaurant');
        }
    } catch (error) {
      console.error("Error updating restaurant:", error.message);
    }
    setIsFormOpen(false);
  };

  return (
    <div className="searchItem" key={id}>
      <img src={imageUrl} alt={title} className="siImg" />
      <div className="siDesc">
        <h1 className="siTitle">{title}</h1>
        <span className="siDistance">{address}</span>
        <span className="siTaxiOp">Free Wifi</span>
        <span className="siSubtitle">Phone: {phoneNumber}</span>
        <span className="siFeatures"></span>
        <span className="siCancelOp">Free cancellation</span>
        <span className="siCancelOpSubtitle">Max seats are {maxseats}</span>
      </div>
      <div className="siDetails">
        <div className="siRating">
          <span>Excellent</span>
          <button>{Rating}</button>
        </div>
        <div className="siDetailTexts">
          <span className="siPrice">Starting Price: ${startprice}</span>
          <span className="siTaxOp">Includes taxes and fees</span>
          <button className="siCheckButton" onClick={handleMoreDetail}>More Detail</button>
          {userId === "670d1de86a105f57483f4291" && (
            <>
              <button className="siDeleteButton" onClick={handleDelete}>Delete</button>
              <button className="siDeleteButton" onClick={() => setIsFormOpen(true)}>Update</button>
            </>
          )}
        </div>
      </div>
      {isFormOpen && (
                <RestaurantUpdateForm onSubmit={handleUpdate} onClose={() => setIsFormOpen(false)} />
            )}
    </div>
  );
};

export default SearchItem;