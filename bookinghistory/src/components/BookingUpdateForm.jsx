import React, { useState } from 'react';
import './BookingUpdateForm.css';

const BookingUpdateForm = ({ onSubmit, onClose, bookingId }) => {
    const [openTime, setOpenTime] = useState('');
    const [closeTime, setCloseTime] = useState('');
    const [reservationRequest, setReservationRequest] = useState('');
    const [cost, setCost] = useState('');
    const [guestNumber, setGuestNumber] = useState('');
    const [paymentStatus, setPaymentStatus] = useState('');
    const [bookingStatus, setBookingStatus] = useState('');

    const formatDateTime = (dateString) => {
        const date = new Date(dateString);
        return date.toISOString().slice(0, 19); // Returns 'YYYY-MM-DDTHH:MM:SS' format
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const bookingData = {
            paymentId: "",
            reservationDate: {
                startFrom: formatDateTime(openTime), // Format to match Python datetime
                to: formatDateTime(closeTime),
            },
            reservationRequest,
            guestNumber: parseInt(guestNumber),
            costPerPerson: parseInt(cost),
            paymentStatus,
            bookingStatus,
        };
        const fullData = {
            bookingId,
            bookingData
        };

        onSubmit(fullData);
        onClose(); // Close the form after submission
    };

    return (
        <div className="body-container">
            <div className="overlay-container show">
                <div className="popup-box">
                    <h2 style={{ color: 'green' }}>Update Booking</h2>
                    <form className="form-container" onSubmit={handleSubmit}>
                        
                        <label className="form-label" htmlFor="openTime">Open Time:</label>
                        <input
                            className="form-input"
                            type="datetime-local"
                            id="openTime"
                            name="openTime"
                            value={openTime}
                            onChange={(e) => setOpenTime(e.target.value)}
                            required
                        />

                        <label className="form-label" htmlFor="closeTime">Close Time:</label>
                        <input
                            className="form-input"
                            type="datetime-local"
                            id="closeTime"
                            name="closeTime"
                            value={closeTime}
                            onChange={(e) => setCloseTime(e.target.value)}
                            required
                        />

                        <label className="form-label" htmlFor="reservationRequest">Reservation Request:</label>
                        <textarea
                            className="form-input"
                            placeholder="Enter Request"
                            id="reservationRequest"
                            name="reservationRequest"
                            value={reservationRequest}
                            onChange={(e) => setReservationRequest(e.target.value)}
                            required
                        />

                        <label className="form-label" htmlFor="guestNumber">Guest Number:</label>
                        <input
                            className="form-input"
                            type="number"
                            placeholder="Enter Guest Number"
                            id="guestNumber"
                            name="guestNumber"
                            value={guestNumber}
                            onChange={(e) => setGuestNumber(e.target.value)}
                            required
                        />

                        <label className="form-label" htmlFor="cost">Cost Per Person:</label>
                        <input
                            className="form-input"
                            type="number"
                            placeholder="Enter Cost Per Person"
                            id="cost"
                            name="cost"
                            value={cost}
                            onChange={(e) => setCost(e.target.value)}
                            required
                        />

                        <label className="form-label" htmlFor="paymentStatus">Payment Status:</label>
                        <select
                            className="form-input"
                            id="paymentStatus"
                            name="paymentStatus"
                            value={paymentStatus}
                            onChange={(e) => setPaymentStatus(e.target.value)}
                            required
                        >
                            <option value="">Select Payment Status</option>
                            <option value="Unpaid">Unpaid</option>
                            <option value="Paid">Paid</option>
                            <option value="Cash Pending">Cash Pending</option>
                        </select>

                        <label className="form-label" htmlFor="bookingStatus">Booking Status:</label>
                        <select
                            className="form-input"
                            id="bookingStatus"
                            name="bookingStatus"
                            value={bookingStatus}
                            onChange={(e) => setBookingStatus(e.target.value)}
                            required
                        >
                            <option value="">Select Booking Status</option>
                            <option value="Completed">Completed</option>
                            <option value="Pending">Pending</option>
                            <option value="Cancelled">Cancelled</option>
                        </select>

                        <button className="btn-submit" type="submit">Submit</button>
                    </form>

                    <button className="btn-close-popup" onClick={onClose}>Close</button>
                </div>
            </div>
        </div>
    );
};

export default BookingUpdateForm;
