import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import MyOrdersCard from "./MyOrderCard";

function MyOrders() {
  const [myorders, setMyOrders] = useState([]);
  const [search, setSearch] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);

  function filterOrders(e) {
    const input = e.target.value;

    const filtered = myorders.filter(
      (myorder) =>
        myorder.item.toLowerCase().includes(input.toLowercase()) ||
        myorder.description.toLowerCase().includes(input.toLowerCase()) ||
        myorder.weight.toLowerCase().includes(input.toLowerCase()) ||
        myorder.cost.toLowerCase().includes(input.toLowerCase()) ||
        myorder.status.toLowerCase().includes(input.toLowerCase())
    );
    setFilteredOrders(filtered);
  }

  useEffect(() => {
    fetch("http://127.0.0.1:5555/mycourses")
      .then((response) => response.json())
      .then((order) => setMyOrders(order))
      .catch((err) => console.log("fetch my order error"));
  }, []);

  function removeOrder(id) {
    fetch(`http://127.0.0.1:5555/mycourses/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network respose erro");
        }
        handleDelete(id);
      })
      .catch((err) => console.log(err, "error deleting order"));
  }

  function handleDelete(id) {
    const updatedOrders = myorders.filter((order) => order.id !== id);
    setMyOrders(updatedOrders);
  }

  return (
    <div className="myorders">
      <h1>My Orders</h1>
      {/* review link for new order...go to previous page to make a new order */}
      <Link to="/new-order">
        <button>New Order</button>
      </Link>
      <input
        type="text"
        className="search"
        value={search}
        onChange={filterOrders}
        placeholder="Search item"
      />
      {myorders &&
        myorders.map((order) => (
          <MyOrdersCard
            key={order.id}
            item={order.item}
            description={order.description}
            weight={order.weight}
            destination={order.destination}
            status={order.status}
            removeCourse={() => removeOrder(order.id)}
          />
        ))}
    </div>
  );
}

export default MyOrders;
