// import React, { Suspense, useState } from "react";
// import "./LoginPage.css";
// // const CartApp = React.lazy(() => import('app2/App'));

// const App = () => {
//     const [data, setData] = useState({
//         email: "",
//         password: "",
//     });

//     // const navigate = useNavigate();

//     const handleLogin = async (e) => {
//         // e.preventDefault();
//         // const { email, password } = data;
//         // try {
//         //     const { data } = await axios.post(
//         //         "/login",
//         //         {
//         //             email,
//         //             password,
//         //         },
//         //         {
//         //             withCredentials: true,
//         //         }
//         //     );
//         //     if (data.error) {
//         //         toast.error(data.error);
//         //     } else {
//         //         setData({});
//         //         toast.success("Login Successful!");
//         //         navigate('/');
//         //     }
//         // } catch (error) {
//         //     console.log(error);
//         // }
//         console.log("Successfully Click the Login button");
//     };
//     return (
//         <div className="main">
//             <h1>Sign</h1>
//             <h3>Enter your login credentials</h3>
//             <form onSubmit={handleLogin}>
//                 <label htmlFor="first">
//                     Username:
//                 </label>
//                 <input
//                     type="text"
//                     id="first"
//                     name="first"
//                     placeholder="Enter your Username"
//                     value={data.email}
//                     onChange={(e) => setData({ ...data, email: e.target.value })}
//                     required
//                 />

//                 <label htmlFor="password">
//                     Password:
//                 </label>
//                 <input
//                     type="password"
//                     id="password"
//                     name="password"
//                     placeholder="Enter your Password"
//                     value={data.password}
//                     onChange={(e) => setData({ ...data, password: e.target.value })}
//                     required
//                 />

//                 <div className="wrap">
//                     <button type="submit">
//                         Submit
//                     </button>
//                 </div>
//             </form>

//             <p>Not registered? 
//                 <a href="#" style={{ textDecoration: "none" }}>
//                     Create an account
//                 </a>
//             </p>
//         </div>
//     );
// };

// export default App;

import React, { useState } from "react";
import "./LoginPage.css";

const App = () => {
    const [data, setData] = useState({
        email: "",
        password: "",
    });

    const handleLogin = async (e) => {
        e.preventDefault();
        console.log("Successfully clicked the Login button");
    };

    return (
        <div className="loginPage-container">
            <h1 className="loginPage-title">Sign In</h1>
            <h3>Enter your login credentials</h3>
            <form onSubmit={handleLogin}>
                <label htmlFor="first" className="loginPage-label">
                    Username:
                </label>
                <input
                    type="text"
                    id="first"
                    name="first"
                    placeholder="Enter your Username"
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
                    name="password"
                    placeholder="Enter your Password"
                    className="loginPage-input"
                    value={data.password}
                    onChange={(e) => setData({ ...data, password: e.target.value })}
                    required
                />

                <div className="loginPage-wrap">
                    <button type="submit" className="loginPage-button">
                        Submit
                    </button>
                </div>
            </form>

            <p>
                Not registered? 
                <a href="#" style={{ textDecoration: "none" }}>
                    Create an account
                </a>
            </p>
        </div>
    );
};

export default App;
