import React from "react";
import Navbar from "./Navbar";
import "./Homepage.css"; 
function Homepage() {
  return (
    <div className="homepage">
      <Navbar />
      <div className="homepage-content">
        <h1 className="welcome-message">Welcome to SendIT</h1>
        <p className="sub-message">Your trusted Courier service for seamless parcel deliveries.</p>
        <button className="send-parcel-button">Send a Parcel</button>
      </div>
    </div>
  );
}

export default Homepage;
