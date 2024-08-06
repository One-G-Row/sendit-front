import React from "react";
import "./MyOrders.css";

function MyOrdersCard() {
  return (
    <div className="myorderscard">
      <span>Item:</span>
      <span>Description:</span>
      <span>Weight:</span>
      <span>
        Cost:
        <button>Cancel order</button>
      </span>
      <span>
        Status:
        <button>Change Destination</button>
      </span>
    </div>
  );
}

export default MyOrdersCard;
