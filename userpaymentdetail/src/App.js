import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import { jwtDecode } from 'jwt-decode'
import { useNavigate, Link } from 'react-router-dom';;

const App = () => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState();
  const [paymentDetails, setPaymentDetails] = useState({
    fullName: "",
    nameOnCard: "",
    expiredMonth: "",
    expYear: "",
    cvv: "",
    creditCardNumber: "",
  });

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
        const decodedToken = jwtDecode(token);
        console.log(decodedToken);
        const userId = decodedToken.userId; // Extract user ID from the decoded token

        // Optional: Check if the token is expired
        const currentTime = Date.now() / 1000; // Current time in seconds
        if (decodedToken.exp < currentTime) {
          console.error('Token has expired. User needs to log in again.');
          localStorage.removeItem('jwt_token'); // Optionally remove the expired token
          return; // Exit if the token is expired
        }
        
        console.log("USER ID BELOW");
        console.log(userId);
        setUserId(userId);
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    };

    verifyUser();
  }, []);

  useEffect(() => {
    // Only fetch payment details if userId is defined
    if (userId) {
      const fetchPaymentDetails = async () => {
        try {
          console.log("Fetching payment details for User ID:", userId);
          const response = await axios.get(`http://127.0.0.1:8080/api/payment/payments/${userId}`);
          console.log(response.data);
          setPaymentDetails(response.data.payment); // Assuming response.data contains the payment details
        } catch (error) {
          console.error("Error fetching payment details:", error);
        }
      };

      fetchPaymentDetails();
    }
  }, [userId]); // Dependency on userId

  const handleCheckout = () => {
    navigate('/'); // Navigate to the home page
  };

  return (
    <div className="Large-Container">
      <div className="container">
        <form action="">
          <div className="row">
            {/* Billing Address Section */}
            <div className="col">
              <h3 className="title">Billing Address</h3>

              <div className="inputBox">
                <span>Full Name:</span>
                <div>{paymentDetails.fullName ? paymentDetails.fullName : "Loading..."}</div>
              </div>

              <div className="inputBox">
                <span>Name on Card:</span>
                <div>{paymentDetails.fullName ? paymentDetails.fullName : "Loading..."}</div>
              </div>

              <div className="inputBox">
                <span>Exp Month:</span>
                <div>{paymentDetails.expiredMonth ? paymentDetails.expiredMonth : "Loading..."}</div>
              </div>

              <div className="flex">
                <div className="inputBox">
                  <span>Exp Year:</span>
                  <div>{paymentDetails.expiredMonth ? paymentDetails.expiredMonth : "Loading..."}</div>
                </div>

                <div className="inputBox">
                  <span>CVV:</span>
                  <div>{paymentDetails.cvv ? paymentDetails.cvv : "Loading..."}</div>
                </div>
              </div>
            </div>

            {/* Payment Section */}
            <div className="col">
              <h3 className="title">Payment</h3>

              <div className="inputBox">
                <span>Cards Accepted:</span>
                <img
                  src="https://e7.pngegg.com/pngimages/698/862/png-clipart-credit-card-logo-encapsulated-postscript-visa-eps-blue-cdr.png"
                  alt="Accepted Cards"
                />
              </div>

              <div className="inputBox">
                <span>Credit Card Number:</span>
                <div>{paymentDetails.creditCardNumber ? paymentDetails.creditCardNumber : "Loading..."}</div>
              </div>
            </div>
          </div>

          <input
            type="button"
            value="Proceed to Checkout"
            className="submit-btn"
            onClick={handleCheckout} // Call handleCheckout on click
          />
        </form>
      </div>
    </div>
  );
};

export default App;
