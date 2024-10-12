import React, { useState } from "react";
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

    // const navigate = useNavigate();

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
        console.log("Successfully Click the Register button");
    };
    return (
        <div className="container">
            <div className="forms-container">
                {/* Signup Form */}
                <div className="form-control signup-form">
                    <form action="#">
                        <h2>Signup</h2>
                        <input
                            type="text"
                            placeholder="Username"
                            value={data.username}
                            onChange={(e) =>
                                setData({ ...data, username: e.target.value })
                            }
                            required
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            value={data.email}
                            onChange={(e) =>
                                setData({ ...data, email: e.target.value })
                            }
                            required
                        />
                        <input
                            type="text"
                            placeholder="Phone Number"
                            value={data.phonenumber}
                            onChange={(e) =>
                                setData({ ...data, phonenumber: e.target.value })
                            }
                            required
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={data.password}
                            onChange={(e) =>
                                setData({ ...data, password: e.target.value })
                            }
                            required
                        />
                        <input
                            type="password"
                            placeholder="Confirm password"
                            value={data.cpassword}
                            onChange={(e) =>
                                setData({ ...data, cpassword: e.target.value })
                            }
                            required
                        />
                        <button type="button" onClick={onSIGNINTextClick}>
                            Signup
                        </button>
                    </form>
                    <span>or signup with</span>
                    <div className="socials">
                        <i className="fab fa-facebook-f"></i>
                        <i className="fab fa-google-plus-g"></i>
                        <i className="fab fa-linkedin-in"></i>
                    </div>
                </div>
            </div>

            <div className="intros-container">
                {/* Signup Intro */}
                <div className="intro-control signup-intro">
                    <div className="intro-control__inner">
                        <h2>Come join us!</h2>
                        <p>
                            Create an account to enjoy exclusive offers, rewards, and more! We look forward to having you on board.
                        </p>
                        <button id="signin-btn">Already have an account? Signin.</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default App;
