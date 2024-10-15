import React, { useState, useEffect } from "react";
import axios from 'axios';
import "./App.css";
import { useNavigate, Link } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const CreatePaymentDetail = () => {
    const navigate = useNavigate();
    const [userId, setUserId] = useState(null);
  const [formData, setFormData] = useState({
    fullName: "",
    nameOnCard: "",
    expMonth: "",
    expYear: "",
    cvv: "",
    creditCardNumber: "",
  });

  useEffect(() => {
    const verifyUser = async () => {
      const token = localStorage.getItem('jwt_token');
      if (!token) {
        console.error('No token available. User is not authenticated.');
        return;
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

  // Handles form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handles form submission to create payment details
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formatDateTime = (month, year) => {
        const date = new Date(`${year}-${month}-01T00:00:00Z`); // Start with the 1st of the month, at midnight UTC
        return date.toISOString().replace('.000Z', '.000+00:00'); // Adjust the format to match the required format
      };

    // Build payment data payload
    const paymentData = {
      fullName: formData.fullName,
      paymentType: "Credit Card", // Assuming the payment type is fixed for now
      creditCardNumber: formData.creditCardNumber,
      expiredMonth: formatDateTime(formData.expMonth, formData.expYear),
      cvv: formData.cvv,
    };

    try {
      const response = await axios.post(`http://127.0.0.1:8080/api/payment/${userId}/create`, paymentData);

      if (response.status === 201) {
        alert("Payment created successfully!");
        navigate('/paymentdetail')
      } else {
        throw new Error("Failed to create payment detail");
      }
    } catch (error) {
      console.error("Error creating payment detail:", error.message);
    }
  };

  return (
    <div className="Large-Container">
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="row">
            {/* Billing Address Section */}
            <div className="col">
              <h3 className="title">Billing Address</h3>

              <div className="inputBox">
                <span>Full Name:</span>
                <input
                  type="text"
                  name="fullName"
                  placeholder="John Doe"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="inputBox">
                <span>Name on Card:</span>
                <input
                  type="text"
                  name="nameOnCard"
                  placeholder="Mr. John Doe"
                  value={formData.nameOnCard}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="inputBox">
                <span>Exp Month:</span>
                <input
                  type="text"
                  name="expMonth"
                  placeholder="January"
                  value={formData.expMonth}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="flex">
                <div className="inputBox">
                  <span>Exp Year:</span>
                  <input
                    type="number"
                    name="expYear"
                    placeholder="2023"
                    value={formData.expYear}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="inputBox">
                  <span>CVV:</span>
                  <input
                    type="text"
                    name="cvv"
                    placeholder="123"
                    value={formData.cvv}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Payment Section */}
            <div className="col">
              <h3 className="title">Payment</h3>

              <div className="inputBox">
                <span>Credit Card Number:</span>
                <input
                  type="text"
                  name="creditCardNumber"
                  placeholder="1111-2222-3333-4444"
                  value={formData.creditCardNumber}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>

          <input type="submit" value="Proceed to Checkout" className="submit-btn" />
        </form>
      </div>
    </div>
  );
};

export default CreatePaymentDetail;
