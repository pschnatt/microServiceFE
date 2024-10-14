import React, { useEffect, useState, lazy } from 'react';
import './App.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import SearchItem from "./SearchItem";
import axios from 'axios'; 

const Mfe3 = lazy(() => import('mfe3/App'));

const App = () => {
  console.log("Rendering MFE 4");
  const [date, setDate] = useState(new Date());
  const [openDate, setOpenDate] = useState(false);
  const [seats, setSeats] = useState(1);
  const [restaurants, setRestaurants] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState(null); 

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8080/api/restaurant/get');
        console.log(response.data);
        
        if (Array.isArray(response.data.restaurants)) {
          setRestaurants(response.data.restaurants); // Set the fetched restaurant data
        } else {
          setError("Restaurants data is not in expected format");
        }
      } catch (err) {
        setError("Failed to fetch restaurant data");
      }
    };

    fetchRestaurants();
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredRestaurants = restaurants.filter((restaurant) =>
    restaurant.restaurantName.toLowerCase().includes(searchTerm.toLowerCase()) // Use restaurantName
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
                  key={restaurant.restaurantId} 
                  id={restaurant.restaurantId}
                  imageUrl={restaurant.imageUrl || "https://media-cdn.tripadvisor.com/media/photo-s/27/9f/45/bc/restaurant.jpg"}
                  title={restaurant.restaurantName}
                  address={restaurant.location || "N/A"}
                  phoneNumber={restaurant.contactInfo.phoneNumber}
                  startprice={restaurant.cost || "20"}
                  Rating={restaurant.type || "American"}
                  maxseats={restaurant.capaicity || "30"}
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