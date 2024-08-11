import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import MyOrdersCard from "./MyOrderCard";

function MyOrders() {
  const [myorders, setMyOrders] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [parcels, setParcels] = useState([]);
  const [destinations, setDestinations] = useState([]);

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
          console.log("failed to fetch myorders");
        }
      })
      .catch((err) => console.log("fetch my order error"));
  }, []);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/parcels")
      .then((response) => response.json())
      .then((data) => setParcels(data))
      .catch((err) => console.log("fetch parcel error"));
  }, []);

  /* function orderStatus(){
    if(parcels.parcel_status === "Pending"){
      
  } */

  function updateDestinations() {
    fetch("http://127.0.0.1:5000/destinations", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ destinations }),
    })
      .then((response) => response.json())
      .then((data) => setDestinations(data))
      .catch((err) => console.log("fetch parcel error"));
  }

  console.log(destinations);

  function removeOrder(id) {
    fetch(`http://127.0.0.1:5000/myorders/${id}`, {
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
                item={order.item}
                description={order.description}
                weight={order.weight}
                destination={order.destination}
                status={parcels.orderStatus}
                removeOrder={() => removeOrder(order.id)}
                updateDestinations={updateDestinations}
              />
            ))
          : myorders.map((order) => (
              <MyOrdersCard
                key={order.id}
                item={order.item}
                description={order.description}
                weight={order.weight}
                destination={order.destination}
                status={
                  parcels.find((parcel) => order.id === parcel.id)
                    ?.parcel_status
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
