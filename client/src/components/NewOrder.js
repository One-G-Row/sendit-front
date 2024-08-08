import React, { useState, useEffect } from 'react';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { fromLonLat, toLonLat } from 'ol/proj';
import { Vector as VectorLayer } from 'ol/layer';
import { Vector as VectorSource } from 'ol/source';
import { Feature } from 'ol';
import { Point, LineString } from 'ol/geom';
import { Style, Icon, Stroke } from 'ol/style';
import 'ol/ol.css';
import axios from 'axios';
import { haversineDistance } from './utils'; // Ensure the correct import path

const NewOrder = () => {
  const [formData, setFormData] = useState({
    parcelItem: '',
    description: '',
    weight: '',
    destination: '',
    recipientName: '',
    recipientContact: ''
  });

  const [map, setMap] = useState(null);
  const [price, setPrice] = useState(null);
  const [destinationCoordinates, setDestinationCoordinates] = useState(null);

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

    const vectorSource = new VectorSource();
    const vectorLayer = new VectorLayer({
      source: vectorSource
    });
    initialMap.addLayer(vectorLayer);

    setMap(initialMap);

    // Clean up function to avoid multiple map instances
    return () => {
      initialMap.setTarget(null);
    };
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

          const vectorSource = map.getLayers().getArray()[1].getSource(); // Get vector source
          vectorSource.clear(); // Clear existing features

          const origin = [36.8219, -1.2921]; // Nairobi coordinates
          const originFeature = new Feature({
            geometry: new Point(fromLonLat(origin))
          });
          originFeature.setStyle(new Style({
            image: new Icon({
              src: 'https://openlayers.org/en/latest/examples/data/icon.png', // Add a URL for the icon you want
              scale: 0.5 // Larger marker size
            })
          }));

          const destinationFeature = new Feature({
            geometry: new Point(fromLonLat(coordinates))
          });
          destinationFeature.setStyle(new Style({
            image: new Icon({
              src: 'https://openlayers.org/en/latest/examples/data/icon.png', // Add a URL for the icon you want
              scale: 0.5 // Larger marker size
            })
          }));

          const lineFeature = new Feature({
            geometry: new LineString([fromLonLat(origin), fromLonLat(coordinates)])
          });
          lineFeature.setStyle(new Style({
            stroke: new Stroke({
              color: '#E0B2FF', // Light purple color
              width: 3
            })
          }));

          vectorSource.addFeature(originFeature);
          vectorSource.addFeature(destinationFeature);
          vectorSource.addFeature(lineFeature);

          setDestinationCoordinates(coordinates);

          const distance = haversineDistance(origin, coordinates);
          console.log("Calculated distance:", distance);

          const weight = parseFloat(formData.weight);
          const calculatedPrice = calculatePrice(weight, distance);
          setPrice(calculatedPrice);
        }
      } else {
        console.log("No results found for the destination.");
      }
    } catch (error) {
      console.error("Error fetching coordinates:", error);
    }
  };

  const calculatePrice = (weight, distance) => {
    const basePrice = 500; // Base price in KES
    const weightCost = weight * 100; // 100 KES per kg
    const distanceCost = distance * 50; // 50 KES per km
    return basePrice + weightCost + distanceCost;
  };

  return (
    <div style={{ display: 'flex', padding: '20px' }}>
      <div style={{ flex: 1, marginRight: '20px' }}>
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
      </div>

      <div style={{ flex: 1 }}>
        <h2>Recipient Details</h2>
        <form>
          <label>
            Recipient Name:
            <input
              type="text"
              name="recipientName"
              value={formData.recipientName}
              onChange={handleChange}
              required
            />
          </label>
          <br />
          <label>
            Recipient Contact:
            <input
              type="text"
              name="recipientContact"
              value={formData.recipientContact}
              onChange={handleChange}
              required
            />
          </label>
          <br />
        </form>

        <div id="map" style={{ width: '100%', height: '200px', marginTop: '20px' }}></div>
        
        <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
          <button style={{ backgroundColor: '#4B0082', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '5px', marginRight: '10px' }}>
            Checkout
          </button>
          {price !== null && (
            <div>
              <h2>Estimated Price: KES {price.toFixed(2)}</h2>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewOrder;
