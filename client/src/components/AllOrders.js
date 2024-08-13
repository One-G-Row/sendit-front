import React, { useState, useEffect } from "react";
import { Card, Button, Form } from "react-bootstrap";
import "./AllOrders.css";

const AllOrders = () => {
  const [parcels, setParcels] = useState([]);
  const [selectedParcel, setSelectedParcel] = useState(null);
  const [status, setStatus] = useState('');
  const [destination, setDestination] = useState('');
  const [error, setError] = useState('');
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

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
  }, [selectedParcel]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/myorders");
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
    const filtered = orders.filter(order =>
      order.item.toLowerCase().includes(term) ||
      order.description.toLowerCase().includes(term) ||
      order.destination.toLowerCase().includes(term)
    );
    setFilteredOrders(filtered);
  };

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

        setParcels(
          parcels.map((parcel) =>
            parcel.id === updatedData.id ? updatedData : parcel
          )
        );

        setSelectedParcel(null);
        setSuccessMessage('Parcel updated successfully!');

        setTimeout(() => {
          setSuccessMessage('');
        }, 3000);

      } catch (error) {
        console.error("Error updating parcel:", error);
        setError("Failed to update parcel");
      }
    }
  };

  const handleCancel = () => {
    setSelectedParcel(null);
    setStatus('');
    setDestination('');
  };

  return (
    <div className="all-orders">
      <h1 className="all-orders__title">All Orders</h1>
      {error && <div className="all-orders__error-message">{error}</div>}
      {successMessage && <div className="all-orders__success-message">{successMessage}</div>}
      
      {/* Update Parcel Section moved to the top */}
      {selectedParcel && (
        <div className="all-orders__update-section">
          <h2 className="all-orders__update-title">Update Parcel {selectedParcel.id}</h2>
          <Form>
            <Form.Group className="all-orders__form-group">
              <Form.Label>Status</Form.Label>
              <Form.Control
                type="text"
                placeholder="Update Status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="all-orders__form-control"
              />
            </Form.Group>
            <Form.Group className="all-orders__form-group">
              <Form.Label>Destination ID</Form.Label>
              <Form.Control
                type="text"
                placeholder="Update Destination ID"
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
                Update Parcel
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

      <Form.Group className="all-orders__search" controlId="search">
        <Form.Control
          type="text"
          placeholder="Search orders..."
          value={searchTerm}
          onChange={handleSearch}
        />
      </Form.Group>

      <div className="all-orders__card-container">
        {filteredOrders &&
          filteredOrders.map((order) => (
            <Card key={order.id} className="all-orders__parcel-card">
              <Card.Body>
                <Card.Title className="all-orders__card-title">Parcel ID: {order.id}</Card.Title>
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
                  Status: {parcels.find((parcel) => parcel.id === order.id)?.parcel_status || "N/A"}
                  <br />
                  Destination: {order.destination}
                </Card.Text>
                <Button
                  variant="primary"
                  onClick={() => handleParcelSelect(order)}
                  className="all-orders__select-button"
                >
                  Select Parcel
                </Button>
              </Card.Body>
            </Card>
          ))}
      </div>
    </div>
  );
};

export default AllOrders;
