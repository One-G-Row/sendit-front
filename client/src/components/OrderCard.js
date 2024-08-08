import React from "react";
import "./OrderCard.css";

function OrderCard({ item, description, weight, cost, status, destination, removeOrder }) {
  return (
    <div className="order-card">
      <p>Item: {item}</p>
      <p>Description: {description}</p>
      <p>Weight: {weight}</p>
      <p>Cost: {cost}</p>
      <p>Status: {status}</p>
      <p>Destination: {destination}</p>
      <button className="change-status-button">Change status</button>
      <button className="change-location-button">Change location</button>
    </div>
  );
}

export default OrderCard;