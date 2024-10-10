import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import LoginForm from '../../monolith/src/Pages/Login/LoginForm.jsx';
import SignUpForm from '../../monolith/src/Pages/Register/SignUpForm.jsx';

// Lazy load the micro frontends
const Mfe1 = lazy(() => import('mfe1/App'));
const Mfe2 = lazy(() => import('mfe2/App'));
const Mfe3 = lazy(() => import('mfe3/App'));

const App = () => {
    return (
        <Router>
            <div>
                {/* Navigation for the application */}
                <nav>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/mfe1">Micro Frontend 1</Link></li>
                        <li><Link to="/mfe2">Micro Frontend 2</Link></li>
                        <li><Link to="/bookinghistory">Bookinghistory</Link></li>
                        <li><Link to="/login">Login</Link></li> {/* New link */}
                        <li><Link to="/register">Register</Link></li> {/* New link */}
                    </ul>
                </nav>

                {/* Suspense for lazy loading */}
                <Suspense fallback={<div>Loading...</div>}>
                    <Routes>
                        <Route path="/" element={<h1>Welcome to the Shell Application</h1>} />
                        <Route path="/mfe1" element={<Mfe1 />} />
                        <Route path="/mfe2" element={<Mfe2 key="mfe2" />} />
                        <Route path="/bookinghistory" element={<Mfe3 key="mfe3" />} />
                        <Route path="/login" element={<LoginForm />} /> {/* New route for login */}
                        <Route path="/register" element={<SignUpForm />} /> {/* New route for register */}
                    </Routes>
                </Suspense>
            </div>
        </Router>
    );
};

export default App;
