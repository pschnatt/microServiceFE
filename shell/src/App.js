import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import LoginForm from '../../monolith/src/Pages/Login/LoginForm.jsx';
import SignUpForm from '../../monolith/src/Pages/Register/SignUpForm.jsx';
import BookingDetail from '../../monolith/src/Pages/bookingdetail/bookingde.jsx'; // Booking details page
import CompleteBooking from '../../monolith/src/Pages/completeBooking/completeBooking.jsx'; // Complete booking page
import RestaurantDe from '../../monolith/src/Pages/RestaurantDe/Restaurant.jsx'; // Restaurant detail page
import User from '../../monolith/src/Pages/user/User.jsx'; // User page
import Navbar from '../components/navbar/Navbar.jsx'

// Lazy load the micro frontends
const Mfe1 = lazy(() => import('mfe1/App'));
const Mfe2 = lazy(() => import('mfe2/App'));
const Mfe3 = lazy(() => import('mfe3/App'));

const App = () => {
    return (
        <Router>
            <div>
                <Navbar />
                <nav>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/mfe1">Micro Frontend 1</Link></li>
                        <li><Link to="/mfe2">Micro Frontend 2</Link></li>
                        <li><Link to="/bookinghistory">Booking History</Link></li>
                        <li><Link to="/bookingdetail">Booking Detail</Link></li> {/* New link */}
                        <li><Link to="/completeBooking">Complete Booking</Link></li> {/* New link */}
                        <li><Link to="/restaurant">Restaurant Detail</Link></li> {/* New link */}
                        <li><Link to="/user">User</Link></li> {/* New link */}
                        <li><Link to="/login">Login</Link></li>
                        <li><Link to="/register">Register</Link></li>
                    </ul>
                </nav>

                {/* Suspense for lazy loading */}
                <Suspense fallback={<div>Loading...</div>}>
                    <Routes>
                        <Route path="/" element={<h1>Welcome to the Shell Application</h1>} />
                        <Route path="/mfe1" element={<Mfe1 />} />
                        <Route path="/mfe2" element={<Mfe2 key="mfe2" />} />
                        <Route path="/bookinghistory" element={<Mfe3 key="mfe3" />} />
                        <Route path="/bookingdetail" element={<BookingDetail />} /> {/* Route for booking detail */}
                        <Route path="/completeBooking" element={<CompleteBooking />} /> {/* Route for complete booking */}
                        <Route path="/restaurant" element={<RestaurantDe />} /> {/* Route for restaurant detail */}
                        <Route path="/user" element={<User />} /> {/* Route for user */}
                        <Route path="/login" element={<LoginForm />} />
                        <Route path="/register" element={<SignUpForm />} />
                    </Routes>
                </Suspense>
            </div>
        </Router>
    );
};

export default App;
