import React, { useState, useEffect } from 'react';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { fromLonLat } from 'ol/proj';
import 'ol/ol.css';
import axios from 'axios';
import { haversineDistance } from './utils'; // Ensure the correct import path

const NewOrder = () => {
  const [formData, setFormData] = useState({
    parcelItem: '',
    description: '',
    weight: '',
    destination: ''
  });

  const [map, setMap] = useState(null);
  const [price, setPrice] = useState(null);

  useEffect(() => {
    const initialMap = new Map({
      target: 'map',
      layers: [
        new TileLayer({
          source: new OSM()
        })
      ],
      view: new View({
        center: fromLonLat([36.8219, -1.2921]), // Default center to Nairobi
        zoom: 7
      })
    });
    setMap(initialMap);
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    // Assuming you have an endpoint to handle order creation
    // const response = await fetch('/api/orders', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify(formData)
    // });

    // if (response.ok) {
    //   console.log('Order created successfully');
    // } else {
    //   console.error('Failed to create order');
    // }
  };

  const handleSearch = async () => {
    const destination = formData.destination;
    console.log("Searching for destination:", destination);

    try {
      const response = await axios.get(`https://nominatim.openstreetmap.org/search?format=json&q=${destination}`);
      if (response.data.length > 0) {
        const place = response.data[0];
        const coordinates = [parseFloat(place.lon), parseFloat(place.lat)];
        console.log("Setting map view to coordinates:", coordinates);

        if (map) {
          map.getView().setCenter(fromLonLat(coordinates));
          map.getView().setZoom(10); // Adjust zoom level as needed
        }

        const origin = [36.8219, -1.2921]; // Nairobi coordinates (could be dynamic)
        const distance = haversineDistance(origin, coordinates);
        console.log("Calculated distance:", distance);

        const weight = parseFloat(formData.weight);
        const calculatedPrice = calculatePrice(weight, distance);
        setPrice(calculatedPrice);
      } else {
        console.log("No results found for the destination.");
      }
    } catch (error) {
      console.error("Error fetching coordinates:", error);
    }
  };

  const calculatePrice = (weight, distance) => {
    const basePrice = 5;
    const weightCost = weight * 1; // $1 per kg
    const distanceCost = distance * 0.5; // $0.50 per km
    return basePrice + weightCost + distanceCost;
  };

  return (
    <div>
      <h1>New Order</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Parcel Item:
          <input
            type="text"
            name="parcelItem"
            value={formData.parcelItem}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Description:
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Weight (kg):
          <input
            type="number"
            name="weight"
            value={formData.weight}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Destination:
          <input
            type="text"
            name="destination"
            value={formData.destination}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <button type="submit">Submit</button>
        <button type="button" onClick={handleSearch} style={{ marginLeft: '10px' }}>
          Search Destination
        </button>
      </form>
      {price !== null && (
        <div>
          <h2>Estimated Price: ${price.toFixed(2)}</h2>
        </div>
      )}
      <div
        id="map"
        style={{ width: '400px', height: '300px', position: 'absolute', bottom: '20px', right: '20px' }}
      ></div>
    </div>
  );
};

export default NewOrder;
