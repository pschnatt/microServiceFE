import React from 'react';
import './searchItem.css';
import { useNavigate } from 'react-router-dom';
import { startTransition } from 'react';


const SearchItem = ({ id, imageUrl, title, address, phoneNumber, startprice, Rating, maxseats }) => {

  const navigate = useNavigate(); // This should work as long as it's wrapped by a Router in the shell app

  const handleMoreDetail = async (e) => {
    e.preventDefault();
    console.log("Successfully clicked the More Detail button");
  
    startTransition(() => {
      navigate("/restaurantde");
    });
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
        </div>
      </div>
    </div>
  );
};

export default SearchItem;
