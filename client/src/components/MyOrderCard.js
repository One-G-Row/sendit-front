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
  const [edit, setEdit] = useState(false);
  const [newDestination, setNewDestination] = useState(destination);

  function handleEdit() {
    setEdit(true);
  }

  function handleDelete() {
    removeOrder(id);
  }

  function handleInputChange(e) {
    setNewDestination(e.target.value);
  }

  function handleSave() {
    if (newDestination.trim() !== "") {
      updateDestinations(id, newDestination);
      setEdit(false);
    }
  }

  return (
    <div className="myorderscard">
      <p>Item: {item}</p>
      <p>Description: {description}</p>
      <p>Weight: {weight}</p>
      <p>
        Destination:{" "}
        {edit ? (
          <input
            type="text"
            value={newDestination}
            onChange={handleInputChange}
            placeholder="Enter new destination"
          />
        ) : (
          destination
        )}
      </p>
      <p>Status: {status}</p>
      {status === "Pending" &&
        (edit ? (
          <div>
            <button onClick={handleSave}>Save</button>
            <button onClick={() => setEdit(false)}>Cancel</button>
          </div>
        ) : (
          <button onClick={handleEdit} className="change-destination">
            Change Destination
          </button>
        ))}
      <button className="cancel-order" onClick={handleDelete}>
        Cancel Order
      </button>
    </div>
  );
}

export default MyOrdersCard;
