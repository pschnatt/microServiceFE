import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import "./LoginPage.css"; // Make sure your CSS is imported correctly
import axios from 'axios';

const LoginPage = () => {
    const [data, setData] = useState({
        email: "",
        password: "",
    });
    const [error, setError] = useState(null);  // Add error state
    const [message, setMessage] = useState(""); // Optionally, track success messages

    const navigate = useNavigate(); // This should work as long as it's wrapped by a Router in the shell app

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const { email, password } = data; // Get email and password from data state

            const response = await axios.post('http://127.0.0.1:8080/api/user/login', {
                email,
                password,
            },{ withCredentials: true } );

            if (response.status === 200) {
                setMessage(response.data.message); // Optionally, display a message
                console.log("User logged in:", response.data.user);
                localStorage.setItem('jwt_token', response.data.token);
                navigate("/");
            } else {
                setError("Login failed. Please check your credentials.");
            }
        } catch (err) {
            setError("Login failed. Please check your credentials."); // Set error message in case of failure
        }
    };

    return (
        <div className="loginPage-container">
            <h1 className="loginPage-title">Sign In</h1>
            <h3>Enter your login credentials</h3>
            <form onSubmit={handleLogin}>
                <label htmlFor="email" className="loginPage-label">
                    Email:
                </label>
                <input
                    type="email"
                    id="email"
                    placeholder="Enter your Email"
                    className="loginPage-input"
                    value={data.email}
                    onChange={(e) => setData({ ...data, email: e.target.value })}
                    required
                />

                <label htmlFor="password" className="loginPage-label">
                    Password:
                </label>
                <input
                    type="password"
                    id="password"
                    placeholder="Enter your Password"
                    className="loginPage-input"
                    value={data.password}
                    onChange={(e) => setData({ ...data, password: e.target.value })}
                    required
                />

                <div className="loginPage-wrap">
                    <button className="loginPage-button" type="submit">
                        Submit
                    </button>
                </div>
            </form>

            <p>
                Not registered? 
                <Link to="/register" style={{ textDecoration: "none" }}>
                Create an account
                </Link>
            </p>
        </div>
    );
};

export default LoginPage;

