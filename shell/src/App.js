import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useLocation, useParams } from 'react-router-dom';
import Navbar from '../components/navbar/Navbar.jsx'
import Header from '../components/header/Header.jsx';
import Mfe4 from 'mfe4/App';
import axios from 'axios';


// Lazy load the micro frontends
const Mfe1 = lazy(() => import('mfe1/App'));
const Mfe2 = lazy(() => import('mfe2/App'));
const Mfe3 = lazy(() => import('mfe3/App'));
// const Mfe4 = lazy(() => import('mfe4/App'));
const Home = lazy(() => import('mfe5/App'));
const Bookingde = lazy(() => import('mfe6/App'));
const Restaurantdetail = lazy(() => import('mfe7/App'));
const Confirmbooking = lazy(() => import('mfe8/App'));
const Payment = lazy(() => import('mfe9/App'));
const Paymentform = lazy(() => import('mfe10/App'));
const PaymentDetail= lazy(() => import('mfe11/App'));

const NavbarWrapper = () => {
    const location = useLocation();
    
    // Routes where the Navbar should NOT be displayed
    const noNavbarRoutes = [ '/register', '/login'];

    const shouldShowNavbar = !noNavbarRoutes.includes(location.pathname);

    return shouldShowNavbar ? <Navbar /> : null;
};

// Component to conditionally render the Header
const HeaderWrapper = () => {
    const location = useLocation();
    const { restaurantId } = useParams();
    
    const noHeaderRoutes = ['/login', '/register', '/completeBooking', '/restaurant', '/bookingdetail', '/bookinghistory', '/restaurantde/:restaurantId', '/payment', , '/paymentform'];

    const isRestaurantDetail = location.pathname.startsWith('/restaurantde/');

    const isBookingDetail = location.pathname.startsWith('/bookingdetail/');

    const isPaymentDetail = location.pathname.startsWith('/payment/');

    const shouldShowHeader = !noHeaderRoutes.includes(location.pathname) && !isRestaurantDetail && !isBookingDetail && !isPaymentDetail;
  
    return shouldShowHeader ? <Header /> : null;
  };

  axios.defaults.baseURL = "http://localhost:3000"
  axios.defaults.withCredential = true  

const App = () => {
    return (
        <Router>
            <div>
                <NavbarWrapper />
                <HeaderWrapper />
                {/* Suspense for lazy loading */}
                <Suspense fallback={<div>Loading...</div>}>
                    <Routes>
                        <Route path="/" element={<Home />}/>
                        <Route path="/login" element={<Mfe1 />} />
                        <Route path="/register" element={<Mfe2 key="mfe2" />} />
                        <Route path="/bookinghistory" element={<Mfe3 key="mfe3" />} />
                        <Route path="/bookingdetail/:restaurantId" element={<Bookingde />} /> {/* Route for booking detail */}
                        <Route path="/completeBooking" element={<Confirmbooking />} /> {/* Route for complete booking */}
                        <Route path="/restaurantde/:restaurantId" element={<Restaurantdetail />} /> {/* Route for restaurant detail */}
                        <Route path="/restaurant" element={<Mfe4 />} />
                        <Route path="/payment/:bookingId" element={<Payment />} /> 
                        <Route path="/paymentform" element={<Paymentform />} /> 
                        <Route path="/paymentdetail" element={<PaymentDetail />} />
                    </Routes>
                </Suspense>
            </div>
        </Router>
    );
};
export default App;
