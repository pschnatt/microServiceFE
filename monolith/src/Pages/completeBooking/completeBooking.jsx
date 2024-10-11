// import Navbar from "../../components/navbar/Navbar.jsx";
import React from "react";
import ProfileCard from "../../components/profileCard/ProfileCard.jsx";
import "./completeBooking.css";

const completeBook = () => {
  return (
    <div>
      {/* <Navbar /> */}
      <div className="userContainer">
        <ProfileCard />
      </div>
    </div>
  );
};

export default completeBook