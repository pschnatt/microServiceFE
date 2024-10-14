import React from 'react';
import './searchItem.css';
import { useNavigate } from 'react-router-dom';
import { startTransition } from 'react';


const SearchItem = ({ id, imageUrl, title, address, phoneNumber, startprice, Rating, maxseats }) => {

  const navigate = useNavigate();

  const userId = 100;

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
      
      // Remove the deleted restaurant from the UI
      setRestaurants((prevRestaurants) =>
        prevRestaurants.filter((restaurant) => restaurant.id !== id)
      );
    } catch (error) {
      console.error("Failed to delete restaurant:", error);
      setError("Failed to delete restaurant. Please try again.");
    }
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
          {userId === 200 && (
            <button className="siDeleteButton" onClick={handleDelete}>Delete</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchItem;
