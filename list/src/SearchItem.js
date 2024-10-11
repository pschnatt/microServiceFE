import React from 'react';
import './searchItem.css';

const SearchItem = ({ id, imageUrl, title, address, phoneNumber, startprice, Rating, maxseats }) => {
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
          <button className="siCheckButton">More Detail</button>
        </div>
      </div>
    </div>
  );
};

export default SearchItem;
