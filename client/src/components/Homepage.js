import React from "react";
import "./Homepage.css";
import deliveryIcon from "../assets/Delivery_icon.jpg";

function Homepage() {
  return (
    <div className="homepage">
      <div className="content">
        <h1>Welcome to SendIT</h1>
        <p>Your trusted Courier service for seamless parcel deliveries.</p>
        <button>Send a Parcel</button>
      </div>
      <div className="image-container">
        <img src={deliveryIcon} alt="Delivery Icon" />
      </div>
    </div>
  );
}

export default Homepage;
