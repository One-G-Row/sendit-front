import React, { useState } from "react";
import "./MyOrders.css";

function MyOrdersCard({
  id,
  item,
  description,
  weight,
  destination,
  status,
  removeOrder,
  updateDestinations,
}) {
  const [edit, setEdit] = useState(true);
  const [newDestination, setNewDestination] = useState(destination);

  function handleEdit() {
    setEdit(false);
  }

  function handleDelete() {
    removeOrder(id);
  }

  function handleInputChange(e) {
    setNewDestination(e.target.value);
  }

  function handleSave() {
    updateDestinations(id, newDestination);
    setEdit(false);
  }

  return (
    <div className="myorderscard">
      <p>Item: {item}</p>
      <p>Description: {description}</p>
      <p>Weight: {weight}</p>
      <p>Destination: {destination}</p>
      <p>Status: {status}</p>
      {status === "pending" ? (
        edit ? (
          <div>
            <input
              type="text"
              value={newDestination}
              onChange={handleInputChange}
              placeholder="Enter new destination"
            />
            <button onClick={handleSave}>Save</button>
          </div>
        ) : (
          <button onClick={handleEdit}>Change Destination</button>
        )
      ) : (
        <button className="change-destination" disabled>
          Change Destination
        </button>
      )}
      <button className="cancel-order" onClick={handleDelete}>
        Cancel order
      </button>
    </div>
  );
}

export default MyOrdersCard;
