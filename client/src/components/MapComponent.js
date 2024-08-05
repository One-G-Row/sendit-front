import React, { useEffect } from 'react';
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import 'ol/ol.css';

const MapComponent = () => {
  useEffect(() => {
    const map = new Map({
      target: 'map', 
      layers: [
        new TileLayer({
          source: new OSM(), 
        }),
      ],
      view: new View({
        center: [0, 0], // Center of the map (longitude, latitude)
        zoom: 2, // Initial zoom level
      }),
    });

  }, []);

  return (
    <div
      id="map"
      style={{ width: '100%', height: '100vh' }} // Style the map container
    ></div>
  );
};

export default MapComponent;
