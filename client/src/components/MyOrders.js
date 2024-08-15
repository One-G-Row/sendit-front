import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import MyOrdersCard from "./MyOrderCard"; 

function MyOrders() {
  const [myorders, setMyOrders] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [parcels, setParcels] = useState([]);

  useEffect(() => {

  })

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

  useEffect(() => {
    const filtered = myorders.filter(
      (order) =>
        order.item.toLowerCase().includes(search.toLowerCase()) ||
        order.description.toLowerCase().includes(search.toLowerCase()) ||
        order.destination.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredOrders(filtered);
  }, [search, myorders]); // Re-run filter when search term or orders change

  function filterOrders(e) {
    setSearch(e.target.value); // Update search term
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

  function updateDestinations(id, newDestination) {
    fetch(`http://127.0.0.1:5000/myorders/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ destination: newDestination }),
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
                status={order.status}
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
 

/* import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import MyOrdersCard from "./MyOrderCard"; // Corrected import statement

function MyOrders() {
  const [myorders, setMyOrders] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [parcels, setParcels] = useState([]);

  // Consolidated useEffect for fetching orders and parcels
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/myorders");
        const orders = await response.json();
        setMyOrders(orders);
        setFilteredOrders(orders); // Set initial filtered orders
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

    fetchOrders();
    fetchParcels();
  }, []); // Empty dependency array to run only once on mount

  // Filter orders based on search input
  useEffect(() => {
    const filtered = myorders.filter(
      (order) =>
        order.item.toLowerCase().includes(search.toLowerCase()) ||
        order.description.toLowerCase().includes(search.toLowerCase()) ||
        order.destination.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredOrders(filtered);
  }, [search, myorders]); // Re-run filter when search term or orders change

  function filterOrders(e) {
    setSearch(e.target.value); // Update search term
  }

  function updateDestinations(id, newDestination) {
    fetch(`http://127.0.0.1:5000/myorders/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ destination: newDestination }),
    })
      .then((response) => response.json())
      .then((updatedOrder) => {
        const updatedOrders = myorders.map((order) =>
          order.id === id
            ? { ...order, destination: newDestination, cost: updatedOrder.cost }
            : order
        );
        setMyOrders(updatedOrders);
        // Filter orders based on the updated state
        setFilteredOrders((prevFilteredOrders) =>
          prevFilteredOrders.map((order) =>
            order.id === id ? { ...order, destination: newDestination, cost: updatedOrder.cost } : order
          )
        );
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
                status={order.status}
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

export default MyOrders; */