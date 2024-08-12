import React, { useState, useEffect } from "react";
import { Card, Button, Form } from "react-bootstrap";
import "./AllOrders.css";

const AllOrders = () => {
  const [parcels, setParcels] = useState([]);
  const [selectedParcel, setSelectedParcel] = useState(null);
  const [status, setStatus] = useState("");
  const [destination, setDestination] = useState("");
  const [error, setError] = useState("");
  const [orders, setOrders] = useState("");

  useEffect(() => {
    const fetchParcels = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/parcels");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setParcels(data);
      } catch (error) {
        console.error("Error fetching parcels:", error);
        setError("Failed to fetch parcels");
      }
    };

    fetchParcels();
  }, []);

  fetch("http://127.0.0.1:5000/myorders")
    .then((response) => response.json())
    .then((data) => setOrders(data))
    .catch((error) => console.error("Error:", error));

  const handleParcelSelect = (parcel) => {
    setSelectedParcel(parcel);
    setStatus(parcel.parcel_status || "");
    setDestination(parcel.destination_id || "");
  };

  const handleUpdate = async () => {
    if (selectedParcel) {
      const updatedParcel = {
        parcel_status: status,
        destination_id: destination,
      };
      try {
        const response = await fetch(
          `http://127.0.0.1:5000/parcels/${selectedParcel.id}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedParcel),
          }
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const updatedData = await response.json();

        // Update the parcel list with the updated data
        setParcels(
          parcels.map((parcel) =>
            parcel.id === updatedData.id ? updatedData : parcel
          )
        );

        // Update the selected parcel to reflect the new status and destination
        setSelectedParcel(updatedData);
      } catch (error) {
        console.error("Error updating parcel:", error);
        setError("Failed to update parcel");
      }
    }
  };

  return (
    <div className="all-orders">
      <h1>All Orders</h1>
      {error && <div className="error-message">{error}</div>}
      <div className="card-container">
        {orders &&
          orders.map((order) => (
            <Card key={order.id} className="parcel-card">
              <Card.Body>
                <Card.Title>Parcel ID: {order.id}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  Item: {order.item}
                </Card.Subtitle>
                <Card.Text>
                  Description: {order.description}
                  <br />
                  Weight: {order.weight}
                  <br />
                  Cost: {order.cost}
                  <br />
                  Status: {parcels.find((parcel) => parcel.id === order.id) 
                  ?.parcel_status || null
                  }
                  <br />
                  Destination ID: {order.destination}
                </Card.Text>
                <Button
                  variant="primary"
                  onClick={() => handleParcelSelect(order)}
                >
                  Select Parcel
                </Button>
              </Card.Body>
            </Card>
          ))}
      </div>

      {selectedParcel && (
        <div className="update-section">
          <h2>Update Parcel {selectedParcel.id}</h2>
          <Form>
            <Form.Group>
              <Form.Label>Status</Form.Label>
              <Form.Control
                type="text"
                placeholder="Update Status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Destination ID</Form.Label>
              <Form.Control
                type="text"
                placeholder="Update Destination ID"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" onClick={handleUpdate}>
              Update Parcel
            </Button>
          </Form>
        </div>
      )}
    </div>
  );
};

export default AllOrders;
