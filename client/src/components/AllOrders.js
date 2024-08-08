import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import OrderCard from "./OrderCard";
import "./AllOrders.css";

function AllOrders() {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredOrders, setFilteredOrders] = useState([]);

  function filterOrders(e) {
    const input = e.target.value;
    setSearch(input);

    const filtered = orders.filter(
      (order) =>
        order.item.toLowerCase().includes(input.toLowerCase()) ||
        order.description.toLowerCase().includes(input.toLowerCase()) ||
        order.weight.toLowerCase().includes(input.toLowerCase()) ||
        order.cost.toLowerCase().includes(input.toLowerCase()) ||
        order.status.toLowerCase().includes(input.toLowerCase()) ||
        order.destination.toLowerCase().includes(input.toLowerCase())
    );
    setFilteredOrders(filtered);
  }

  useEffect(() => {
    fetch("http://127.0.0.1:5555/myorders")
      .then((response) => response.json())
      .then((data) => {
        setOrders(data);
        setFilteredOrders(data);
      })
      .catch((err) => console.log("fetch orders error", err));
  }, []);

  function removeOrder(id) {
    fetch(`http://127.0.0.1:5555/myorders/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response error");
        }
        handleDelete(id);
      })
      .catch((err) => console.log(err, "error deleting order"));
  }

  function handleDelete(id) {
    const updatedOrders = orders.filter((order) => order.id !== id);
    setOrders(updatedOrders);
    setFilteredOrders(updatedOrders);
  }

  return (
    <div className="allorders">
      <header>
        <h1>
          Send<strong>it.</strong>
        </h1>
        <button className="logout-button">Log out</button>
      </header>
      <div className="container">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search item"
            value={search}
            onChange={filterOrders}
          />
        </div>
        <div className="order-list">
          {filteredOrders.map((order) => (
            <OrderCard
              key={order.id}
              item={order.item}
              description={order.description}
              weight={order.weight}
              cost={order.cost}
              status={order.status}
              destination={order.destination}
              removeOrder={() => removeOrder(order.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default AllOrders;