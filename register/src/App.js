import React, { useState } from "react";
import { useNavigate, Link } from 'react-router-dom';
import "./App.css";
import axios from 'axios';

const App = () => {
    console.log("Rendering MFE 2");

    const [data, setData] = useState({
        email: "",
        phonenumber: "",
        password: "",
        cpassword: "",
    });

    const navigate = useNavigate();

    const onSIGNINTextClick = async (e) => {
        e.preventDefault();
        try {
            console.log("Registering user:");
            const userData = {
                email: data.email,
                phoneNumber: data.phonenumber,
                password: data.password,
                confirmedPassword: data.cpassword,

            };
            console.log(userData);
            const response = await axios.post('http://127.0.0.1:8080/api/user/register', userData);
            if (response.status === 200) {
                navigate("/login");
                console.log("Successfully Registered:", response.data);
            } else {
                throw new Error('Failed to register the user');
            }
         } catch (error) {
            console.error("Error registering user:", error.message);
         }
    };
    return (
        <div className="loginPage-container"> {/* Consider renaming class to registerPage-container */}
            <h1 className="loginPage-title">Sign Up</h1>
            <h3>Enter your registration details</h3>
            <form onSubmit={onSIGNINTextClick}>
                <label htmlFor="email" className="loginPage-label">
                    Email:
                </label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Enter your Email"
                    className="loginPage-input"
                    value={data.email}
                    onChange={(e) => setData({ ...data, email: e.target.value })}
                    required
                />

                <label htmlFor="phoneNumber" className="loginPage-label">
                    Phone Number:
                </label>
                <input
                    type="tel"
                    id="phoneNumber"
                    name="phoneNumber"
                    placeholder="Enter your Phone Number"
                    className="loginPage-input"
                    value={data.phonenumber}
                    onChange={(e) => setData({ ...data, phonenumber: e.target.value })}
                    required
                />

                <label htmlFor="password" className="loginPage-label">
                    Password:
                </label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Enter your Password"
                    className="loginPage-input"
                    value={data.password}
                    onChange={(e) => setData({ ...data, password: e.target.value })}
                    required
                />

                <label htmlFor="confirmPassword" className="loginPage-label">
                    Confirm Password:
                </label>
                <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    placeholder="Confirm your Password"
                    className="loginPage-input"
                    value={data.cpassword}
                    onChange={(e) => setData({ ...data, cpassword: e.target.value })}
                    required
                />

                <div className="loginPage-wrap">
                    <button type="submit" className="loginPage-button">
                        Register
                    </button>
                </div>
            </form>

            <p>
                Already registered? 
                <Link to="/login" style={{ textDecoration: "none" }}>
                    Sign in here
                </Link>
            </p>
        </div>
    );
};

export default App;
