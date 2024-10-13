import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';

const mockHistory = [
  {
    restaurantid: 1,
    restaurantname: 'Pasta Palace',
    date: '2024-10-01',
    price: 50,
    seat: 2,
    status: 'Completed',
  },
  {
    restaurantid: 2,
    restaurantname: 'Sushi Central',
    date: '2024-10-02',
    price: 75,
    seat: 4,
    status: 'Pending',
  },
  {
    restaurantid: 3,
    restaurantname: 'Steak House',
    date: '2024-10-03',
    price: 100,
    seat: 6,
    status: 'Cancelled',
  },
  {
    restaurantid: 4,
    restaurantname: 'Taco Town',
    date: '2024-10-04',
    price: 30,
    seat: 2,
    status: 'Completed',
  },
];

const App = () => {
  console.log("Rendering MFE 3");
  const [filter, setFilter] = useState('ALL');
  const [history, setHistory] = useState(mockHistory); // Set mock history directly

  const filteredBookings = history.filter(
    (booking) => filter === 'ALL' || booking.status.toLowerCase() === filter.toLowerCase()
  );

  const [selectedDate] = useState(new Date());
  const [destination] = useState("");

  const navigate = useNavigate(); // This should work as long as it's wrapped by a Router in the shell app

  const homeroute = async (e) => {
      e.preventDefault();
      console.log("Successfully clicked the Login button");
      navigate("/"); // Ensure this route exists in your shell app
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
            </tr>
          </thead>
          <tbody>
            {filteredBookings.map((booking) => (
              <tr key={`${booking.restaurantid} : ${booking.date}`}>
                <td>{booking.restaurantid}</td>
                <td>{booking.restaurantname}</td>
                <td>{booking.date}</td>
                <td>{booking.price}</td>
                <td>{booking.seat}</td>
                <td className={booking.status.toLowerCase()}>{booking.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <button className="details-button" style={{ marginTop: '20px' }}>
          Load More
        </button>
      </div>
  );
};

export default App;
