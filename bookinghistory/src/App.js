import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { parse, format } from 'date-fns';
import BookingUpdateForm from './components/BookingUpdateForm.jsx';

const App = () => {
  console.log("Rendering MFE 3");
  const [filter, setFilter] = useState('ALL');
  const [history, setHistory] = useState([]);
  const [error, setError] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    const fetchBookings = async () => {
      console.log('Fetching bookings Inside...');
      const token = localStorage.getItem('jwt_token'); // Get the token from local storage
      if (!token) {
        console.error('No token available. User is not authenticated.');
        return; // Exit if there's no token
      }
      try {
        const decodedToken = jwtDecode(token);
        const userId = decodedToken.userId;

        const currentTime = Date.now() / 1000;
        if (decodedToken.exp < currentTime) {
          console.error('Token has expired. User needs to log in again.');
          localStorage.removeItem('jwt_token');
          return;
        }
        const response = await axios.get(`http://127.0.0.1:8080/api/booking/get/userId/${userId}`);
        
        if (Array.isArray(response.data.bookings)) {
          setHistory(response.data.bookings);
        } else {
          setError("history data is not in expected format");
        }
      } catch (err) {
        setError("Failed to fetch history data");
      }
    };
    console.log("Fetching bookings...");
    fetchBookings();
    console.log("Fetching bookings complete...");
  }, []);

  const filteredBookings = history.filter(
    (booking) => filter === 'ALL' || booking.bookingStatus === filter
  );

  const [selectedDate] = useState(new Date());
  const [destination] = useState("");

  const navigate = useNavigate(); // This should work as long as it's wrapped by a Router in the shell app

  const homeroute = async (e) => {
      e.preventDefault();
      console.log("Successfully clicked the Login button");
      navigate("/"); // Ensure this route exists in your shell app
  };

  const handleEdit = async (bookingData) => {
    console.log("Booking ID:", bookingData.bookingId);
    console.log("Booking Data:",bookingData.bookingData);
    const userId = "670d1de86a105f57483f4291";
    try {
      const response = await axios.put(`http://127.0.0.1:8080/api/booking/${userId}/update/${bookingData.bookingId}`, bookingData.bookingData);
      console.log(response);
      if (response.status === 200) {
        console.log("Booking updated successfully:", response.data);
      } else {
        throw new Error('Failed to update the booking');
      }
    } catch (error) {
      console.error("Error updating booking:", error.message);
    }
    setIsFormOpen(false);
  };

  const handleDelete = async (bookingId) => {
    const userId = "670d1de86a105f57483f4291";
    try {
      const response = await axios.delete(`http://127.0.0.1:8080/api/booking/${userId}/cancel/${bookingId}`);
      console.log("Delete response:", response.data);
      
    } catch (error) {
      console.error("Failed to delete booking:", error);
      setError("Failed to delete booking. Please try again.");
    }
  };

  return (
      <div className="booking-history">
        <button className="back-button" onClick={homeroute}>Back to Home</button>
        {/* <button className="back-button" onClick={handleList}>Back to List</button> */}
        <h2>Booking History</h2>
        <div className="filters">
          <button className={filter === 'ALL' ? 'active' : ''} onClick={() => setFilter('ALL')}>
            ALL
          </button>
          <button className={filter === 'Pending' ? 'active' : ''} onClick={() => setFilter('Pending')}>
            PENDING
          </button>
          <button className={filter === 'Cancelled' ? 'active' : ''} onClick={() => setFilter('Cancelled')}>
            CANCELLED
          </button>
          <button className={filter === 'Completed' ? 'active' : ''} onClick={() => setFilter('Completed')}>
            COMPLETED
          </button>
        </div>
        <table>
          <thead>
            <tr>
              <th>#ID</th>
              <th>Restaurant Name</th>
              <th>Date</th>
              <th>Cost</th>
              <th>Seat</th>
              <th>Status</th>
              <th>Del/Edit</th>
            </tr>
          </thead>
          <tbody>
            {filteredBookings.map((booking) => {
              const parsedDate = parse(booking.createdWhen, 'ddMMyyyy', new Date());
              const formattedDate = format(parsedDate, 'MMMM do, yyyy');

              return (
              <tr key={`${booking.bookingId} : ${formattedDate}`}>
                <td>{booking.bookingId}</td>
                <td>{booking.reservationRequest}</td>
                <td>{formattedDate}</td>
                <td>{booking.costPerPerson}</td>
                <td>{booking.guestNumber}</td>
                <td className={booking.bookingStatus}>{booking.bookingStatus}</td>
                <td>
                  <button onClick={() => setIsFormOpen(true)} className="btn-small">Edit</button>
                  <button onClick={() => handleDelete(booking.bookingId)} className="btn-small">Delete</button>
                </td>
                {isFormOpen && (
                  <BookingUpdateForm onSubmit={handleEdit} onClose={() => setIsFormOpen(false)} bookingId={booking.bookingId} />
                )}
              </tr>
              );
            })}
          </tbody>
        </table>
        <button className="details-button" style={{ marginTop: '20px' }}>
          Load More
        </button>
        
      </div>
  );
};

export default App;
