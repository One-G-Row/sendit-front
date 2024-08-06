import React, { useState, useEffect } from 'react';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { fromLonLat } from 'ol/proj';
import 'ol/ol.css';

const NewOrder = () => {
  const [formData, setFormData] = useState({
    parcelItem: '',
    description: '',
    weight: '',
    destination: ''
  });

  const [map, setMap] = useState(null);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission, e.g., send data to the server
    console.log(formData);
  };

  const handleSearch = () => {
    // Update map center based on destination input
    if (formData.destination.toLowerCase() === 'nairobi') {
      map.getView().setCenter(fromLonLat([36.8219, -1.2921]));
    } else if (formData.destination.toLowerCase() === 'eldoret') {
      map.getView().setCenter(fromLonLat([35.2698, 0.5143]));
    }
    // Add more conditions for other destinations as needed
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
      <div
        id="map"
        style={{ width: '400px', height: '300px', position: 'absolute', bottom: '20px', right: '20px' }}
      ></div>
    </div>
  );
};

export default NewOrder;
