// import Navbar from "../../components/navbar/Navbar.jsx";
import ProfileCard from "../../components/profileCard/ProfileCard.jsx";
import "./user.css";
import React from "react";

const User = () => {
  return (
    <div>
      {/* <Navbar /> */}
      <div className="userContainer">
        <ProfileCard />
      </div>
    </div>
  );
};

export default User;
