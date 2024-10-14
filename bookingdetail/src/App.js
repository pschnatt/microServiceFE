import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

import './App.css';

const App = () => {
  const [user, setUser] = useState();
  const [userId, setUserId] = useState(null);
  const [tableNumber, setTableNumber] = useState('');
  const [seats, setSeats] = useState('');
  const [startDate, setStartDate] = useState(''); // Changed from date to startDate
  const [endDate, setEndDate] = useState(''); // New state for end date
  const [specialReq, setSpecialReq] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Pay at check-in');
  const [status] = useState('Pending');
  const { restaurantId } = useParams();
  const [restaurant, setRestaurant] = useState({});

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

        // Optional: Check if the token is expired
        const currentTime = Date.now() / 1000; // Current time in seconds
        if (decodedToken.exp < currentTime) {
          console.error('Token has expired. User needs to log in again.');
          localStorage.removeItem('jwt_token'); // Optionally remove the expired token
          return; // Exit if the token is expired
        }
        console.log("USER ID BELOW")
        console.log(userId);
        setUserId(userId);
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    };

    verifyUser();
  }, []);

  useEffect(() => {
    const fetchRestaurantDetails = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8080/api/restaurant/get/${restaurantId}`);
        setRestaurant(response.data.restaurant);
        console.log(response.data.restaurant)
      } catch (error) {
        console.error("Error fetching restaurant resources:", error);
      }
    };

    fetchRestaurantDetails(); 
  }, [restaurantId]);

  const navigate = useNavigate(); // Initialize the navigate function from useNavigate
  
  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().slice(0, 19); // Returns 'YYYY-MM-DDTHH:MM:SS' format
  };

  const handlePayByCash = async (e) => {
    e.preventDefault();
    try {
      const startFrom = formatDateTime(startDate);
      const to = formatDateTime(endDate);

      const response = await axios.post(`http://127.0.0.1:8080/api/booking/${userId}/${restaurantId}/create`, {        
        paymentId: "test2005",
        reservationDate: { startFrom, to },
        reservationRequest: specialReq,
        guestNumber: parseInt(seats),
        costPerPerson: parseInt(tableNumber),
        paymentStatus: "Cash Pending",
        bookingStatus: "Completed"
      });
      console.log(response)
      
      if (response.status === 201) {
        navigate('/completeBooking');
      }
    } catch (error) {
      console.error("Error creating booking:", error);
    }
  };

  const handlePayNow = () => {
    // Navigate to /payment if the user chooses to pay now
    navigate('/payment');
  };

  return (
    <div>
      {/* <Navbar /> */}
      <div className="bookingPageContainer">
        <div className="leftSection">
          <div className="bookingDetails">
            <img
              src="https://media-cdn.tripadvisor.com/media/photo-s/27/9f/45/bc/restaurant.jpg"
              alt="Property"
              className="propertyImage"
            />
            <div className="propertyInfo">
              <h2>{restaurant?.restaurantName}</h2>
              <p>{restaurant?.location}</p>
              <p>{restaurant?.restaurantName}</p>
            </div>
          </div>

          <div className="bookingInputs">
            <div className="inputGroup">
              <label>From (Reservation Date)</label>
              <input
                type="date"
                placeholder="08/14/2024"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            <div className="inputGroup">
              <label>To (Reservation Date)</label>
              <input
                type="date"
                placeholder="08/14/2024"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
            <div className="inputGroup">
              <label>Seats</label>
              <input
                type="number"
                placeholder={1}
                value={seats}
                onChange={(e) => setSeats(e.target.value)}
              />
            </div>
            <div className="inputGroup">
              <label>Cost Per Person</label>
              <input
                type="text"
                value={tableNumber}
                onChange={(e) => setTableNumber(e.target.value)}
              />
            </div>
            <button className="updateDetailsButton">Update details</button>
          </div>

          <div className="houseRules">
            <h3>House rules</h3>
            <div className="rule">
              <p>Pets are not allowed</p>
            </div>
            <div className="rule">
              <p>No Food or Drink From outside</p>
            </div>
            <div className="rule">
              <p>No yelling or disrupting customers in Restaurant</p>
            </div>
          </div>

          <div className="paymentMode">
            <h3>Please select your preferred payment mode</h3>
            <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
              <option>Pay at check-in</option>
              <option>Credit Card</option>
              <option>PayPal</option>
            </select>
            <p>Pay the full booking amount only at check-in.</p>
          </div>
          <div className="inputGroup2">
            <label>Special Requests</label>
            <input
              type="text"
              value={specialReq}
              onChange={(e) => setSpecialReq(e.target.value)}
            />
          </div>
        </div>

        <div className="rightSection">
          <div className="invoice">
            <h3>Invoice</h3>
            <div className="invoiceItem">
              <span>Reservation Name:</span>
              <span>{user?.username} Puriwat</span>
            </div>
            <div className="invoiceItem">
              <span>Contact Email:</span>
              <span>{user?.username} finalpuriwat888@gmail.com</span>
            </div>
            <div className="invoiceItem">
              <span>Contact Number:</span>
              <span>0829199347</span>
            </div>
            <div className="invoiceItem">
              <span>Seat</span>
              <span>{seats}</span>
            </div>
            <div className="invoiceItem">
              <span>Cost</span>
              <span>{tableNumber}</span>
            </div>
            <div className="invoiceItem">
              <span>Payment Method</span>
              <span>{paymentMethod}</span>
            </div>
            <div className="invoiceItem">
              <span>Special Request</span>
              <span>{specialReq}</span>
            </div>
            <div className="buttonContainer">
              <button className="confirmButton cashButton" onClick={handlePayByCash}>Pay by Cash</button>
              <button className="confirmButton payNowButton" onClick={handlePayNow}>Pay Now</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
