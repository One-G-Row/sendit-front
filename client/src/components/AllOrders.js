import React from "react";
import { Link } from "react-router-dom";
import OrderCard from "./OrderCard";

const orders = [
  { id: 1, item: '', description: '', weight: '', cost: '', status: '', destination: '' },
  { id: 2, item: '', description: '', weight: '', cost: '', status: '', destination: '' },
  { id: 3, item: '', description: '', weight: '', cost: '', status: '', destination: '' },
  { id: 4, item: '', description: '', weight: '', cost: '', status: '', destination: '' },
  { id: 5, item: '', description: '', weight: '', cost: '', status: '', destination: '' },
  { id: 6, item: '', description: '', weight: '', cost: '', status: '', destination: '' },
];

function AllOrders() {
  return (
    <div className="allorders">
      <header>
        <h1>Send<strong>it.</strong></h1>
        <button className="logout-button">Log out</button>
      </header>
      <div className="container">
        <div className="search-bar">
          <input type="text" placeholder="Search item" />
        </div>
        <div className="order-list">
          {orders.map(order => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default AllOrders;