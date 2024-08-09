import React, { useState, useEffect } from 'react';
import { Card, Button, Form } from 'react-bootstrap'; // Ensure Bootstrap is installed
import './AllOrders.css'; // Create this CSS file for styling if needed

const AllOrders = () => {
  const [parcels, setParcels] = useState([]);
  const [status, setStatus] = useState('');
  const [destination, setDestination] = useState('');
  const [selectedParcelId, setSelectedParcelId] = useState(null);

  useEffect(() => {
    // Fetch parcels from backend
    const fetchParcels = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/parcels');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setParcels(data);
      } catch (error) {
        console.error('Error fetching parcels:', error);
      }
    };

    fetchParcels();
  }, []);

  const handleStatusChange = async () => {
    if (selectedParcelId && status) {
      try {
        const response = await fetch(`http://127.0.0.1:5000/admin/parcels/${selectedParcelId}/status`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ parcel_status: status }),
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        // Update the local state to reflect the change
        setParcels(parcels.map(parcel =>
          parcel.id === selectedParcelId ? { ...parcel, parcel_status: status } : parcel
        ));
      } catch (error) {
        console.error('Error updating parcel status:', error);
      }
    }
  };

  const handleDestinationChange = async () => {
    if (selectedParcelId && destination) {
      try {
        const response = await fetch(`http://127.0.0.1:5000/parcels/${selectedParcelId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ destination_id: destination }),
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        // Update the local state to reflect the change
        setParcels(parcels.map(parcel =>
          parcel.id === selectedParcelId ? { ...parcel, destination_id: destination } : parcel
        ));
      } catch (error) {
        console.error('Error updating parcel destination:', error);
      }
    }
  };

  return (
    <div className="all-orders">
      <h1>All Orders</h1>
      <div className="card-container">
        {parcels.map(parcel => (
          <Card key={parcel.id} className="parcel-card">
            <Card.Body>
              <Card.Title>Parcel ID: {parcel.id}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">Item: {parcel.parcel_item}</Card.Subtitle>
              <Card.Text>
                Description: {parcel.parcel_description}<br />
                Weight: {parcel.parcel_weight}<br />
                Cost: {parcel.parcel_cost}<br />
                Status: {parcel.parcel_status}<br />
                Destination ID: {parcel.destination_id}
              </Card.Text>
              {/* Admin functionality for updating status and destination */}
              <Form>
                <Form.Group controlId="formStatus">
                  <Form.Label>Update Status</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter new status"
                    onChange={e => setStatus(e.target.value)}
                  />
                </Form.Group>
                <Button variant="primary" onClick={handleStatusChange}>Update Status</Button>
                <Form.Group controlId="formDestination" className="mt-3">
                  <Form.Label>Update Destination</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter new destination ID"
                    onChange={e => setDestination(e.target.value)}
                  />
                </Form.Group>
                <Button variant="primary" className="mt-2" onClick={handleDestinationChange}>Update Destination</Button>
              </Form>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AllOrders;
