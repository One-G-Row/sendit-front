import React from "react";
import { Link } from "react-router-dom";

function MyOrders() {
  return (
    <div className="myorders">
      <h1>My Orders</h1>
      {/* review link for new order...go to previous page to make a new order */}
      <Link to="/neworder">
        <button>New Order</button>
      </Link>
      <input type="text" placeholder="Search item" />
    </div>
  );
}

export default MyOrders;
