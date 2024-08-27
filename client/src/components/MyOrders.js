import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import MyOrdersCard from "./MyOrderCard";

function MyOrders() {
  const [myorders, setMyOrders] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [parcels, setParcels] = useState([]);

  const API = process.env.REACT_APP_SERVER_API;
  console.log(API);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(`${API}/myorders`, {
          method: "GET",
          credentials: "include",
        });
        const orders = await response.json();
        setMyOrders(orders);
        setFilteredOrders(orders);
      } catch (err) {
        console.log("Fetch my orders error:", err);
      }
    };

    const fetchParcels = async () => {
      try {
        const response = await fetch(`${API}/parcels`, {
          method: "GET",
          credentials: "include",
        });
        const data = await response.json();
        setParcels(data);
      } catch (err) {
        console.log("Fetch parcel error:", err);
      }
    };

    fetchOrders();
    fetchParcels();
  }, []);

  // Update filtered orders when the search input changes
  useEffect(() => {
    const filtered = myorders.filter(
      (myorder) =>
        myorder.item.toLowerCase().includes(search.toLowerCase()) ||
        myorder.description.toLowerCase().includes(search.toLowerCase()) ||
        myorder.destination.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredOrders(filtered);
  }, [search, myorders]);

  function updateDestinations(id, newDestination) {
    fetch(`${API}/myorders/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ destination: newDestination }),
      credentials: "include",
    })
      .then((response) => response.json())
      .then((updatedOrder) => {
        const updatedOrders = myorders.map((order) =>
          order.id === id
            ? { ...order, destination: newDestination, cost: updatedOrder.cost }
            : order
        );
        setMyOrders(updatedOrders);
        setFilteredOrders(updatedOrders);
      })
      .catch((err) => console.log("Error updating destination:", err));
  }

  function removeOrder(id) {
    fetch(`${API}/myorders/${id}`, {
      method: "DELETE",
      credentials: "include",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response error");
        }
        handleDelete(id);
      })
      .catch((err) => console.log("Error deleting order:", err));
  }

  function handleDelete(id) {
    const updatedOrders = myorders.filter((order) => order.id !== id);
    setMyOrders(updatedOrders);
    setFilteredOrders(updatedOrders);
  }

  return (
    <div className="myorders">
      <h1 className="my-orders">My Orders</h1>
      <Link to="/new-order">
        <button className="new-order">New Order</button>
      </Link>
      <input
        type="text"
        className="search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search item"
      />
      <div className="myorders-card">
        {filteredOrders.length > 0
          ? filteredOrders.map((order) => (
              <MyOrdersCard
                key={order.id}
                id={order.id}
                item={order.item}
                description={order.description}
                weight={order.weight}
                cost={order.cost}
                destination={order.destination}
                status={order?.status || "Pending"}
                removeOrder={() => removeOrder(order.id)}
                updateDestinations={updateDestinations}
              />
            ))
          : myorders.map((order) => (
              <MyOrdersCard
                key={order.id}
                id={order.id}
                item={order.item}
                description={order.description}
                weight={order.weight}
                cost={order.cost}
                destination={order.destination}
                status={order.status}
                removeOrder={() => removeOrder(order.id)}
                updateDestinations={updateDestinations}
              />
            ))}
      </div>
    </div>
  );
}

export default MyOrders;
