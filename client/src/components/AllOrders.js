import React, { useState, useEffect } from "react";
import { Card, Button, Form } from "react-bootstrap";
import "./AllOrders.css";

const AllOrders = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [status, setStatus] = useState("");
  const [destination, setDestination] = useState("");
  const [error, setError] = useState("");
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/myorders");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setOrders(data);
        setFilteredOrders(data);
      } catch (error) {
        console.error("Error fetching orders:", error);
        setError("Failed to fetch orders");
      }
    };

    fetchOrders();
  }, []);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = orders.filter(
      (order) =>
        order.item.toLowerCase().includes(term) ||
        order.description.toLowerCase().includes(term) ||
        order.destination.toLowerCase().includes(term)
    );
    setFilteredOrders(filtered);
  };

  const handleOrderSelect = (order) => {
    setSelectedOrder(order);
    setStatus(order.status || "");
    setDestination(order.destination || "");
  };

  const handleUpdate = async () => {
    if (selectedOrder) {
      const updatedOrder = {
        ...selectedOrder,
        status,
        destination,
      };

      try {
        const response = await fetch(`http://127.0.0.1:5000/myorders/${selectedOrder.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedOrder),
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setOrders(
          orders.map((order) =>
            order.id === selectedOrder.id ? data : order
          )
        );
        setFilteredOrders(
          filteredOrders.map((order) =>
            order.id === selectedOrder.id ? data : order
          )
        );
        setSuccessMessage("Order updated successfully!");
      } catch (error) {
        console.error("Error updating order:", error);
        setError("Failed to update order");
      }

      setSelectedOrder(null);
      setStatus("");
      setDestination("");
      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
    }
  };

  const handleCancel = () => {
    setSelectedOrder(null);
    setStatus("");
    setDestination("");
  };

  return (
    <div className="all-orders">
      <h1>All Orders</h1>
      {error && <div className="error-message">{error}</div>}
      {successMessage && (
        <div className="success-message">{successMessage}</div>
      )}

      <Form.Group className="all-orders__search" controlId="search">
        <Form.Control
          type="text"
          placeholder="Search orders..."
          value={searchTerm}
          onChange={handleSearch}
        />
      </Form.Group>

      <div className="all-orders__card-container">
        {filteredOrders.map((order) => (
          <Card key={order.id} className="all-orders__order-card">
            <Card.Body>
              <Card.Title className="all-orders__card-title">
                Order ID: {order.id}
              </Card.Title>
              <Card.Subtitle className="all-orders__card-subtitle mb-2 text-muted">
                Item: {order.item}
              </Card.Subtitle>
              <Card.Text className="all-orders__card-text">
                Description: {order.description}
                <br />
                Weight: {order.weight}
                <br />
                Cost: {order.cost}
                <br />
                Status: {order.status || "Pending"}
                <br />
                Destination: {order.destination}
              </Card.Text>
              <Button
                variant="primary"
                onClick={() => handleOrderSelect(order)}
                className="all-orders__select-button"
              >
                Select Order
              </Button>
            </Card.Body>
          </Card>
        ))}
      </div>

      {selectedOrder && (
        <div className="all-orders__update-section">
          <h2 className="all-orders__update-title">
            Update Order {selectedOrder.id}
          </h2>
          <Form>
            <Form.Group className="all-orders__form-group">
              <Form.Label>Status</Form.Label>
              <Form.Select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="all-orders__form-control"
              >
                <option value="Pending">Pending</option>
                <option value="Shipped">Shipped</option>
                <option value="On Route">On Route</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="all-orders__form-group">
              <Form.Label>Destination</Form.Label>
              <Form.Control
                type="text"
                placeholder="Update Destination"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="all-orders__form-control"
              />
            </Form.Group>
            <div className="all-orders__button-group">
              <Button
                variant="primary"
                onClick={handleUpdate}
                className="all-orders__update-button"
              >
                Update Order
              </Button>
              <Button
                variant="secondary"
                onClick={handleCancel}
                className="all-orders__cancel-button"
              >
                Cancel
              </Button>
            </div>
          </Form>
        </div>
      )}
    </div>
  );
};

export default AllOrders;
