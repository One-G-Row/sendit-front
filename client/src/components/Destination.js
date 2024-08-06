import React from "react";
import React, { useState, useEffect } from 'react';

const Destination = () => {
    const [destinations, setDestinations] = useState([]);
    const [location, setLocation] = useState('');
    const [arrivalDay, setArrivalDay] = useState('');
    const [editMode, setEditMode] = useState(false);
    const [editId, setEditId] = useState(null);

    useEffect(() => {
        fetchDestinations();
    }, []);

    const fetchDestinations = async () => {
        try {
            const response = await fetch('/destinations/');
            const data = await response.json();
            setDestinations(data);
        } catch (error) {
            console.error('Error fetching destinations', error);
        }
    };

    const handleCreateOrUpdate = async () => {
        if (!location || !arrivalDay) {
            alert('Please fill in all fields');
            return;
        }

        const newDestination = { location, arrival_day: arrivalDay };

        try {
            const response = editMode
                ? await fetch(`/destinations/${editId}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(newDestination),
                })
                : await fetch('/destinations', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(newDestination),
                });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            fetchDestinations();
            setLocation('');
            setArrivalDay('');
            setEditMode(false);
            setEditId(null);
        } catch (error) {
            console.error('Error creating/updating destination', error);
        }
    };

    const handleEdit = (destination) => {
        setEditMode(true);
        setEditId(destination.id);
        setLocation(destination.location);
        setArrivalDay(destination.arrival_day);
    };

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`/destinations/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            fetchDestinations();
        } catch (error) {
            console.error('Error deleting destination', error);
        }
    };

    return (
        <div>
            <h1>Destinations</h1>
            <div>
                <input
                    type="text"
                    placeholder="Location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Arrival Day (YYYY-MM-DD HH:MM:SS)"
                    value={arrivalDay}
                    onChange={(e) => setArrivalDay(e.target.value)}
                />
                <button onClick={handleCreateOrUpdate}>
                    {editMode ? 'Update' : 'Create'}
                </button>
            </div>
            <ul>
                {destinations.map((destination) => (
                    <li key={destination.id}>
                        {destination.location} - {destination.arrival_day}
                        <button onClick={() => handleEdit(destination)}>Edit</button>
                        <button onClick={() => handleDelete(destination.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Destination;
