import React from "react";
import { useNavigate } from "react-router-dom";
import "./Homepage.css";
import deliveryMan from "../assets/delivery_man.png";

function Homepage() {
  const navigate = useNavigate(); // Hook for navigation

  const handleButtonClick = () => {
    navigate("/new-order"); // Navigate to the new-order page
  };

  return (
    <div className="homepage">
      <div className="content">
        <h1 className="header">Welcome to</h1>
        <h1 className="sendit-text">SendIT</h1>
        <p>
          Your trusted partner in seamless parcel deliveries. We offer reliable
          and efficient courier services tailored to meet your needs, ensuring
          your packages are delivered on time, every time.
        </p>
        <button className="primary-button" onClick={handleButtonClick}>
          Send a Parcel
        </button>
      </div>
      <div className="image-container">
        <img src={deliveryMan} alt="Delivery Man" />
      </div>
    </div>
  );
}

export default Homepage;
