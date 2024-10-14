import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import "./App.css";

const App = () => {
    const [bookingData, setBookingData] = useState(null); // State to hold booking data
    const { bookingId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        // Function to fetch booking details
        const fetchBookingDetails = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8080/api/booking/get/bookingId/${bookingId}`);
                const booking = response.data.booking;
                setBookingData(booking); // Set the fetched booking data
            } catch (error) {
                console.error("Error fetching booking details:", error);
            }
        };

        fetchBookingDetails();
    }, [bookingId]);

    const handleBack = () => {
        navigate("/"); // Navigate back to the home page
    };

    if (!bookingData) {
        return <div>Loading...</div>; // Loading state while fetching booking data
    }

    // Destructure with default values
    const {
        paymentId = '',
        reservationDate = '',
        reservationRequest = '',
        guestNumber = 0,
        costPerPerson = 0,
        totalAmount = 0,
        status = ''
    } = bookingData;

    // Constructing the QR code URL safely
    const qrCodeUrl = totalAmount ? `https://promptpay.io/0824468446/${totalAmount}.png` : '';

    return (
        <div className="HeaderContainer">
            <div className="container">
                <h3>Booking Receipt</h3>
                <div className="receipt">
                    <h4>Booking Details</h4>
                    <p><strong>Payment ID:</strong> {paymentId}</p>
                    <p><strong>Reservation Date:</strong> {reservationDate}</p>
                    <p><strong>Reservation Request:</strong> {reservationRequest}</p>
                    <p><strong>Guest Number:</strong> {guestNumber}</p>
                    <p><strong>Cost Per Person:</strong> ${costPerPerson}</p>
                    <p><strong>Total Amount:</strong> ${totalAmount}</p>
                    <p><strong>Status:</strong> {status}</p>
                    {qrCodeUrl && (
                        <div className="qr-code-container">
                            <h4>Payment QR Code</h4>
                            <img src={qrCodeUrl} alt="Payment QR Code" className="qr-code" />
                        </div>
                    )}
                </div>
                <div className="button-container">
                    <button onClick={handleBack} className="billingPage-input">Back to Home</button>
                </div>
            </div>
        </div>
    );
};

export default App;
