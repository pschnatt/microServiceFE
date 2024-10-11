import React, { useEffect, useState } from 'react';
import { Suspense, lazy } from 'react';
import './App.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import SearchItem from "./SearchItem";

const Mfe3 = lazy(() => import('mfe3/App'));

const mockRestaurant = [
  {
    restaurantId: "1234455",
    imageUrl: "https://media-cdn.tripadvisor.com/media/photo-s/27/9f/45/bc/restaurant.jpg",
    name: "TESTTT",
    address: "123 Main St",
    phoneNumber: "12341244",
    startingPrice: 12,
    rating: 10,
    totalSeats: 10,
    description: "asdfafsdf"
  },
  {
    restaurantId: "77777777776",
    imageUrl: "https://media-cdn.tripadvisor.com/media/photo-s/27/9f/45/bc/restaurant.jpg",
    name: "SECONDD",
    address: "123 Main St",
    phoneNumber: "990099009",
    startingPrice: 99.99,
    rating: 5,
    totalSeats: 10,
    description: "Hello world"
  },
  {
    restaurantId: "1234455",
    imageUrl: "https://media-cdn.tripadvisor.com/media/photo-s/27/9f/45/bc/restaurant.jpg",
    name: "TESTTT",
    address: "123 Main St",
    phoneNumber: "12341244",
    startingPrice: 12,
    rating: 10,
    totalSeats: 10,
    description: "asdfafsdf"
  },
  {
    restaurantId: "77777777776",
    imageUrl: "https://media-cdn.tripadvisor.com/media/photo-s/27/9f/45/bc/restaurant.jpg",
    name: "SECONDD",
    address: "123 Main St",
    phoneNumber: "990099009",
    startingPrice: 99.99,
    rating: 5,
    totalSeats: 10,
    description: "Hello world"
  },
  {
    restaurantId: "1234455",
    imageUrl: "https://media-cdn.tripadvisor.com/media/photo-s/27/9f/45/bc/restaurant.jpg",
    name: "TESTTT",
    address: "123 Main St",
    phoneNumber: "12341244",
    startingPrice: 12,
    rating: 10,
    totalSeats: 10,
    description: "asdfafsdf"
  },
  {
    restaurantId: "77777777776",
    imageUrl: "https://media-cdn.tripadvisor.com/media/photo-s/27/9f/45/bc/restaurant.jpg",
    name: "SECONDD",
    address: "123 Main St",
    phoneNumber: "990099009",
    startingPrice: 99.99,
    rating: 5,
    totalSeats: 10,
    description: "Hello world"
  },
];

const App = () => {
  console.log("Rendering MFE 4");
  const [date, setDate] = useState(new Date());
  const [openDate, setOpenDate] = useState(false);
  const [seats, setSeats] = useState(1);
  const [restaurants, setRestaurants] = useState(mockRestaurant);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredRestaurants = restaurants.filter((restaurant) =>
    restaurant.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="listContainer">
        <div className="listWrapper">
          <div className="listSearch">
            <h1 className="lsTitle">Search</h1>
            <div className="lsItem">
              <label>Restaurant Name</label>
              <input
                placeholder="Enter restaurant name"
                type="text"
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>
            <div className="lsItem">
              <label>Check-in Date</label>
              <span onClick={() => setOpenDate(!openDate)}>{`${format(date, "MM/dd/yyyy")}`}</span>
              {openDate && (
                <DatePicker
                  selected={date}
                  onChange={(newDate) => setDate(newDate)}
                  dateFormat="MM/dd/yyyy"
                  className="headerDatePicker"
                  inline
                />
              )}
            </div>
            <div className="lsItem">
              <label>Options</label>
              <div className="lsOptions">
                <div className="lsOptionItem">
                  <span className="lsOptionText">Seat</span>
                  <input
                    type="number"
                    min={1}
                    className="lsOptionInput"
                    placeholder={seats}
                  />
                </div>
              </div>
            </div>
            <button>Search</button>
          </div>
          <div className="listSidebar">
            <div className="listResult">
              {filteredRestaurants.map((restaurant) => (
                <SearchItem
                  id={restaurant.restaurantId}
                  imageUrl={restaurant.imageUrl || "https://media-cdn.tripadvisor.com/media/photo-s/27/9f/45/bc/restaurant.jpg"}
                  title={restaurant.name}
                  address={restaurant.address || "N/A"}
                  phoneNumber={restaurant.phoneNumber}
                  startprice={restaurant.startingPrice || "20"}
                  Rating={restaurant.rating || "N/A"}
                  maxseats={restaurant.totalSeats || "30"}
                />
              ))}
            </div>
            <Mfe3 />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
