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
        <div className="signup-form-container">
            <form>
                <h2>Sign Up</h2>
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input
                        type="username"
                        id="username"
                        value={data.username}
                        onChange={(e) =>
                            setData({ ...data, username: e.target.value })
                        }
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={data.email}
                        onChange={(e) =>
                            setData({ ...data, email: e.target.value })
                        }
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="phoneNumber">phonenumber:</label>
                    <input
                        type="phoneNumber"
                        id="phoneNumber"
                        value={data.phonenumber}
                        onChange={(e) =>
                            setData({ ...data, phonenumber: e.target.value })
                        }
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={data.password}
                        onChange={(e) =>
                            setData({ ...data, password: e.target.value })
                        }
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="confirm-password">Confirm Password:</label>
                    <input
                        type="password"
                        id="confirm-password"
                        value={data.cPassword}
                        onChange={(e) =>
                            setData({ ...data, cpassword: e.target.value })
                        }
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="submit-button"
                    onClick={onSIGNINTextClick}
                >
                    Sign Up
                </button>
            </form>
        </div>
    );
};

export default App;
