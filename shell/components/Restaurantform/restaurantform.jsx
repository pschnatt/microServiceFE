import React, { useState } from 'react';
import './RestaurantForm.css';

const RestaurantForm = ({ onSubmit, onClose }) => {
    const [restaurantName, setRestaurantName] = useState('');
    const [location, setLocation] = useState('');
    const [capacity, setCapacity] = useState('');
    const [description, setDescription] = useState('');
    const [type, setType] = useState(''); // Should match the RestaurantType Enum
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState(''); // Optional field
    const [openTime, setOpenTime] = useState('');
    const [closeTime, setCloseTime] = useState('');
    const [cost, setCost] = useState('');

    const formatDateTime = (dateString) => {
        const date = new Date(dateString);
        return date.toISOString().slice(0, 19); // Returns 'YYYY-MM-DDTHH:MM:SS' format
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const restaurantData = {
            restaurantName,
            location,
            type,
            contactInfo: {
                phoneNumber,
                email,
            },
            operatingHour: {
                openTime: formatDateTime(openTime), // Format to match Python datetime
                closeTime: formatDateTime(closeTime),
            },
            capacity: parseInt(capacity),
            description,
            cost: parseInt(cost),
        };

        onSubmit(restaurantData);
        onClose(); // Close the form after submission
    };

    return (
        <div className="body-container">
            <div className="overlay-container show">
                <div className="popup-box">
                    <h2 style={{ color: 'green' }}>Create Restaurant</h2>
                    <form className="form-container" onSubmit={handleSubmit}>
                        <label className="form-label" htmlFor="restaurantName">Restaurant Name:</label>
                        <input
                            className="form-input"
                            type="text"
                            placeholder="Enter Restaurant Name"
                            id="restaurantName"
                            name="restaurantName"
                            value={restaurantName}
                            onChange={(e) => setRestaurantName(e.target.value)}
                            required
                        />

                        <label className="form-label" htmlFor="location">Location:</label>
                        <input
                            className="form-input"
                            type="text"
                            placeholder="Enter Location"
                            id="location"
                            name="location"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            required
                        />

                        <label className="form-label" htmlFor="capacity">Capacity:</label>
                        <input
                            className="form-input"
                            type="number"
                            placeholder="Enter Capacity"
                            id="capacity"
                            name="capacity"
                            value={capacity}
                            onChange={(e) => setCapacity(e.target.value)}
                            required
                        />

                        <label className="form-label" htmlFor="description">Description:</label>
                        <textarea
                            className="form-input"
                            placeholder="Enter Description"
                            id="description"
                            name="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />

                        <label className="form-label" htmlFor="type">Type:</label>
                        <input
                            className="form-input"
                            type="text"
                            placeholder="Enter Type (e.g., American, Italian)"
                            id="type"
                            name="type"
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                            required
                        />

                        <label className="form-label" htmlFor="phoneNumber">Phone Number:</label>
                        <input
                            className="form-input"
                            type="text"
                            placeholder="Enter Phone Number"
                            id="phoneNumber"
                            name="phoneNumber"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            required
                        />

                        <label className="form-label" htmlFor="email">Email (Optional):</label>
                        <input
                            className="form-input"
                            type="email"
                            placeholder="Enter Email"
                            id="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <label className="form-label" htmlFor="openTime">Open Time:</label>
                        <input
                            className="form-input"
                            type="datetime-local" // Use appropriate format for datetime
                            id="openTime"
                            name="openTime"
                            value={openTime}
                            onChange={(e) => setOpenTime(e.target.value)}
                            required
                        />

                        <label className="form-label" htmlFor="closeTime">Close Time:</label>
                        <input
                            className="form-input"
                            type="datetime-local" // Use appropriate format for datetime
                            id="closeTime"
                            name="closeTime"
                            value={closeTime}
                            onChange={(e) => setCloseTime(e.target.value)}
                            required
                        />

                        <label className="form-label" htmlFor="cost">Cost:</label>
                        <input
                            className="form-input"
                            type="number"
                            placeholder="Enter Average Cost"
                            id="cost"
                            name="cost"
                            value={cost}
                            onChange={(e) => setCost(e.target.value)}
                            required
                        />

                        <button className="btn-submit" type="submit">Submit</button>
                    </form>

                    <button className="btn-close-popup" onClick={onClose}>Close</button>
                </div>
            </div>
        </div>
    );
};

export default RestaurantForm;
