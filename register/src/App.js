import React, { useState } from "react";
import { useNavigate, Link } from 'react-router-dom';
import "./App.css";

const App = () => {
    console.log("Rendering MFE 2");

    const [data, setData] = useState({
        username: "",
        email: "",
        phonenumber: "",
        password: "",
        cpassword: "",
    });

    const navigate = useNavigate();

    const onSIGNINTextClick = async (e) => {
        // e.preventDefault();
        // const { username, email, phonenumber, password, cpassword } = data;
        // try {
        //     const { data } = await axios.post("/register", {
        //         username,
        //         email,
        //         phonenumber,
        //         password,
        //         cpassword,
        //     });
        //     if (data.error) {
        //         toast.error(data.error);
        //     } else { 
        //         setData({});
        //         toast.success("Sign Up Successful!");
        //         navigate("/login");
        //     }
        // } catch (error) {
        //     console.log(error);
        // }
        e.preventDefault();
        console.log("Successfully Click the Register button");
        navigate("/login"); // Ensure this route exists in your shell app
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
                    value={data.phoneNumber}
                    onChange={(e) => setData({ ...data, phoneNumber: e.target.value })}
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
                    value={data.confirmPassword}
                    onChange={(e) => setData({ ...data, confirmPassword: e.target.value })}
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
