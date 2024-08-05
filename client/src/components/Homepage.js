import React from "react";
import Navbar from "./Navbar";
import "./Homepage.css"; // Ensure this is imported

function Homepage() {
  return (
    <div className="homepage">
      <Navbar />
      <div className="content">
        <h1 className="title">Welcome to SendIT</h1>
        <p className="subtitle">Your trusted Courier service for seamless parcel deliveries.</p>
        <button className="button">Send a Parcel</button>
      </div>
    </div>
  );
}

export default Homepage;
