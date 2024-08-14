import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import MyOrdersCard from "./MyOrderCard"; // Corrected import statement

function MyOrders() {
  const [myorders, setMyOrders] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [parcels, setParcels] = useState([]);

  const fetchOrders = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/myorders");
      const orders = await response.json();
      setMyOrders(orders);
      setFilteredOrders(orders);
    } catch (err) {
      console.log("Fetch my orders error:", err);
    }
  };

  const fetchParcels = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/parcels");
      const data = await response.json();
      setParcels(data);
    } catch (err) {
      console.log("Fetch parcel error:", err);
    }
  };

  useEffect(() => {
    fetchOrders();
    fetchParcels();
  }, []);

  useEffect(() => {
    fetchOrders();
  }, [filteredOrders]);

  function filterOrders(e) {
    const input = e.target.value;
    setSearch(input);

    const filtered = myorders.filter(
      (myorder) =>
        myorder.item.toLowerCase().includes(input.toLowerCase()) ||
        myorder.description.toLowerCase().includes(input.toLowerCase()) ||
        myorder.destination.toLowerCase().includes(input.toLowerCase())
    );
    setFilteredOrders(filtered);
  }

  useEffect(() => {
    fetch("http://127.0.0.1:5000/myorders")
      .then((response) => response.json())
      .then((orders) => {
        if (orders) {
          setMyOrders(orders);
        } else {
          console.log("Failed to fetch my orders");
        }
      })
      .catch((err) => console.log("Fetch my orders error:", err));
  }, []);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/parcels")
      .then((response) => response.json())
      .then((data) => setParcels(data))
      .catch((err) => console.log("Fetch parcel error:", err));
  }, []);

  useEffect(() => {
    fetchOrders();
    fetchParcels();
  }, []);

  function updateDestinations(id, newDestination, newCost) {
    fetch(`http://127.0.0.1:5000/myorders/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ destination: newDestination, cost: newCost }),
    })
      .then((response) => response.json())
      .then((updatedOrder) => {
        const updatedOrders = myorders.map((order) =>
          order.id === id
            ? { ...order, destination: newDestination, cost: newCost }
            : order
        );
        setMyOrders(updatedOrders);
        setFilteredOrders(updatedOrders);
      })
      .catch((err) => console.log("Error updating destination:", err));
  }

  function removeOrder(id) {
    fetch(`http://127.0.0.1:5000/myorders/${id}`, {
      method: "DELETE",
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
        onChange={filterOrders}
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
                status={
                  parcels.find((parcel) => order.id === parcel.id)
                    ?.parcel_status || "Pending"
                }
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
                status={
                  parcels.find((parcel) => order.id === parcel.id)
                    ?.parcel_status || "Pending"
                }
                removeOrder={() => removeOrder(order.id)}
                updateDestinations={updateDestinations}
              />
            ))}
      </div>
    </div>
  );
}

export default MyOrders;
