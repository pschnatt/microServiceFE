import React from 'react';
import './App.css';
import ProfileCard from "./components/profileCard/ProfileCard.jsx";

const App = () => {
  return (
    <div>
      <div className="userContainer">
        <ProfileCard />
      </div>
    </div>
  );
}

export default App;
