import React, { Suspense, useState } from "react";
import "./App.css";
// const CartApp = React.lazy(() => import('app2/App'));

const App = () => {
    const [data, setData] = useState({
        email: "",
        password: "",
    });

    // const navigate = useNavigate();

    const handleLogin = async (e) => {
        // e.preventDefault();
        // const { email, password } = data;
        // try {
        //     const { data } = await axios.post(
        //         "/login",
        //         {
        //             email,
        //             password,
        //         },
        //         {
        //             withCredentials: true,
        //         }
        //     );
        //     if (data.error) {
        //         toast.error(data.error);
        //     } else {
        //         setData({});
        //         toast.success("Login Successful!");
        //         navigate('/');
        //     }
        // } catch (error) {
        //     console.log(error);
        // }
        console.log("Successfully Click the Login button");
    };
    return (
        <div className="container">
            <div className="forms-container">
                <div className="form-control signin-form">
                    <form>
                        <h2>Signin</h2>
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
                            type="password"
                            placeholder="Password"
                            value={data.password}
                            onChange={(e) =>
                                setData({ ...data, password: e.target.value })
                            }
                            required
                        />
                        <button type="button" onClick={handleLogin}>
                            Signin
                        </button>
                    </form>
                    <span>or signin with</span>
                    <div className="socials">
                        <i className="fab fa-facebook-f"></i>
                        <i className="fab fa-google-plus-g"></i>
                        <i className="fab fa-linkedin-in"></i>
                    </div>
                </div>
            </div>

            <div className="intros-container">
                <div className="intro-control signin-intro">
                    <div className="intro-control__inner">
                        <h2>Welcome back!</h2>
                        <p>
                            Welcome back! We are so happy to have you here. It's great to see you again. We hope you had a safe and enjoyable time away.
                        </p>
                        <button id="signup-btn">No account yet? Signup.</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default App;
