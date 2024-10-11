import React from 'react';
import './App.css';
import Featured from "./components/featured/Featured.jsx";
import FeaturedProperties from "./components/featuredProperties/FeaturedProperties.jsx";
import MailList from "./components/mailList/MailList.jsx";
import PropertyList from "./components/propertyList/PropertyList.jsx";
import { BrowserRouter as Router } from 'react-router-dom';  // Add Router for navigation support

const App = () => {
  return (
    <Router> {/* Wrapping the whole App in Router for navigation */}
      <div>
        <div className="homeContainer">
          <Featured/>
          <h1 className="homeTitle">Browse by Restaurant Type</h1> {/* Corrected spelling */}
          <PropertyList/>
          <h1 className="homeTitle">Recommendation</h1> {/* Corrected spelling */}
          <FeaturedProperties/>
          <MailList/>
        </div>
      </div>
    </Router>
  );
}

export default App;
