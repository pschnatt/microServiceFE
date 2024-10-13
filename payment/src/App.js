import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import "./App.css";
import { Header } from "antd/es/layout/layout";

const App = () => {
    const [data, setData] = useState({
        fullName: '',
        email: '',
        address: '',
        city: '',
        state: '',
        zip: '',
        cardNumber: '',
        expMonth: '',
        expYear: '',
        cvv: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form submitted", data);
        // Add your submit logic here
    };

    return (
        <div className="HeaderContainer">
            <div className="BodyContainer">
                <div className="container">
                    <div className="left">
                        <h3>BILLING ADDRESS</h3>
                        <form onSubmit={handleSubmit}>
                            <label>
                                Full name
                                <input
                                    type="text"
                                    name="fullName"
                                    placeholder="Enter name"
                                    className="billingPage-input"
                                    value={data.fullName}
                                    onChange={handleChange}
                                    required
                                />
                            </label>

                            <label>
                                Email
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Enter email"
                                    className="billingPage-input"
                                    value={data.email}
                                    onChange={handleChange}
                                    required
                                />
                            </label>

                            <label>
                                Address
                                <input
                                    type="text"
                                    name="address"
                                    placeholder="Enter address"
                                    className="billingPage-input"
                                    value={data.address}
                                    onChange={handleChange}
                                    required
                                />
                            </label>

                            <label>
                                City
                                <input
                                    type="text"
                                    name="city"
                                    placeholder="Enter City"
                                    className="billingPage-input"
                                    value={data.city}
                                    onChange={handleChange}
                                    required
                                />
                            </label>

                            <div id="zip">
                                <label>
                                    State
                                    <select
                                        name="state"
                                        className="billingPage-input"
                                        value={data.state}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="">Choose State..</option>
                                        <option value="Rajasthan">Rajasthan</option>
                                        <option value="Hariyana">Hariyana</option>
                                        <option value="Uttar Pradesh">Uttar Pradesh</option>
                                        <option value="Madhya Pradesh">Madhya Pradesh</option>
                                    </select>
                                </label>

                                <label>
                                    Zip code
                                    <input
                                        type="number"
                                        name="zip"
                                        placeholder="Zip code"
                                        className="billingPage-input"
                                        value={data.zip}
                                        onChange={handleChange}
                                        required
                                    />
                                </label>
                            </div>
                        </form>
                    </div>
                    
                    <div className="right">
                        <h3>PAYMENT</h3>
                        <form onSubmit={handleSubmit}>
                            {/* <label>
                                Accepted Card
                                <br />
                                <img src="image/card1.png" width="100" alt="Card 1" />
                                <img src="image/card2.png" width="50" alt="Card 2" />
                                <br /><br />
                            </label> */}

                        <label>
                            Credit card number
                            <input
                                type="text"
                                name="cardNumber"
                                placeholder="Enter card number"
                                className="billingPage-input"
                                value={data.cardNumber}
                                onChange={handleChange}
                                required
                            />
                        </label>

                        <label>
                            Exp month
                            <input
                                type="text"
                                name="expMonth"
                                placeholder="Enter Month"
                                className="billingPage-input"
                                value={data.expMonth}
                                onChange={handleChange}
                                required
                            />
                        </label>

                            <label>
                                Exp year
                                <input
                                    type="text"
                                    name="expYear"
                                    className="billingPage-input"
                                    placeholder="EXP YEAR"
                                    value={data.expYear}
                                    onChange={handleChange}
                                    required
                                />
                            </label>

                            <label>
                                CVV
                                <input  
                                    type="text"
                                    name="cvv"
                                    placeholder="CVV"
                                    className="billingPage-input"
                                    value={data.cvv}
                                    onChange={handleChange}
                                    required
                                />
                            </label>
                        
                            <div className="button-container">
                                <input
                                    type="submit"
                                    value="Proceed to Checkout"
                                    className="billingPage-input" // Use the same class as the other inputs
                                />
                            </div>
                            </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default App;
