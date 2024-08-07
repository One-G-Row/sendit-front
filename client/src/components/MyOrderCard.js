import React from "react";
import "./MyOrders.css";

function MyOrdersCard(
  id,
  item,
  description,
  weight,
  destination,
  status,
  removeCourse
) {
  function handleDelete() {
    removeCourse(id);
  }

  return (
    <div className="myorderscard">
      <button className="close" onClick={handleDelete}>
        X
      </button>
      <span>Item: {item}</span>
      <span>Description: {description}</span>
      <span>Weight: {weight}</span>
      <span>Destination: {destination}</span>
      <button>Cancel order</button>
      <span>Status: {status}</span>
      <button>Change Destination</button>
    </div>
  );
}

export default MyOrdersCard;
