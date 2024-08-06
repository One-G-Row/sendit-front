import React, { useEffect } from 'react';
import { Map, View, Overlay } from 'ol';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import OSM from 'ol/source/OSM';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import LineString from 'ol/geom/LineString';
import { fromLonLat, toLonLat } from 'ol/proj';
import Icon from 'ol/style/Icon';
import Style from 'ol/style/Style';
import Stroke from 'ol/style/Stroke';
import 'ol/ol.css';

const MapComponent = () => {
  useEffect(() => {
    // Define coordinates for Nairobi and Eldoret
    const nairobiCoords = fromLonLat([36.8219, -1.2921]); // Nairobi
    const eldoretCoords = fromLonLat([35.2698, 0.5143]); // Eldoret

    // Function to calculate distance between two points in kilometers
    const calculateDistance = (coords1, coords2) => {
      const [lon1, lat1] = toLonLat(coords1);
      const [lon2, lat2] = toLonLat(coords2);
      const R = 6371; // Radius of the Earth in kilometers
      const dLat = (lat2 - lat1) * (Math.PI / 180);
      const dLon = (lon2 - lon1) * (Math.PI / 180);
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * (Math.PI / 180)) *
          Math.cos(lat2 * (Math.PI / 180)) *
          Math.sin(dLon / 2) * Math.sin(dLon / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      return R * c; // Distance in kilometers
    };

    const distance = calculateDistance(nairobiCoords, eldoretCoords).toFixed(2);

    // Create map
    const map = new Map({
      target: 'map',
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      view: new View({
        center: nairobiCoords, // Center map on Nairobi initially
        zoom: 7, // Initial zoom level
      }),
    });

    // Create markers
    const nairobiMarker = new Feature({
      geometry: new Point(nairobiCoords),
      name: 'Nairobi',
      coordinates: [36.8219, -1.2921],
    });

    const eldoretMarker = new Feature({
      geometry: new Point(eldoretCoords),
      name: 'Eldoret',
      coordinates: [35.2698, 0.5143],
    });

    // Style markers
    const iconStyle = new Style({
      image: new Icon({
        src: 'https://openlayers.org/en/latest/examples/data/icon.png', // Replace with the path to your marker icon
        scale: 0.5, // Adjust scale to make the marker larger
      }),
    });

    nairobiMarker.setStyle(iconStyle);
    eldoretMarker.setStyle(iconStyle);

    // Create line
    const line = new Feature({
      geometry: new LineString([nairobiCoords, eldoretCoords]),
    });

    // Style line
    const lineStyle = new Style({
      stroke: new Stroke({
        color: 'yellow',
        width: 2,
      }),
    });

    line.setStyle(lineStyle);

    // Add markers and line to vector source
    const vectorSource = new VectorSource({
      features: [nairobiMarker, eldoretMarker, line],
    });

    // Add vector source to vector layer
    const vectorLayer = new VectorLayer({
      source: vectorSource,
    });

    // Add vector layer to map
    map.addLayer(vectorLayer);

    // Create overlays for popups
    const container = document.getElementById('popup');
    const content = document.getElementById('popup-content');
    const closer = document.getElementById('popup-closer');

    const overlay = new Overlay({
      element: container,
      autoPan: true,
      autoPanAnimation: {
        duration: 250,
      },
    });
    map.addOverlay(overlay);

    closer.onclick = function () {
      overlay.setPosition(undefined);
      closer.blur();
      return false;
    };

    // Display popup on marker click
    map.on('singleclick', function (event) {
      const feature = map.forEachFeatureAtPixel(event.pixel, function (feat) {
        return feat;
      });

      if (feature && feature.get('name')) {
        const coordinates = feature.getGeometry().getCoordinates();
        const [lon, lat] = toLonLat(coordinates);
        content.innerHTML = `<p>${feature.get('name')}</p>
                             <p>Coordinates: [${lon.toFixed(4)}, ${lat.toFixed(4)}]</p>
                             <p>Distance to Eldoret: ${distance} km</p>`;
        overlay.setPosition(coordinates);
      }
    });
  }, []);

  return (
    <div style={{ position: 'relative' }}>
      <div
        id="map"
        style={{ width: '100%', height: '100vh' }} // Style the map container
      ></div>
      <div
        id="popup"
        style={{
          position: 'absolute',
          backgroundColor: 'white',
          boxShadow: '0 1px 4px rgba(0, 0, 0, 0.2)',
          padding: '15px',
          borderRadius: '10px',
          border: '1px solid #cccccc',
          bottom: '12px',
          left: '-50px',
          minWidth: '180px',
        }}
      >
        <button
          id="popup-closer"
          style={{
            position: 'absolute',
            top: '2px',
            right: '8px',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontSize: '16px',
          }}
        >
          ✖
        </button>
        <div id="popup-content"></div>
      </div>
    </div>
  );
};

export default MapComponent;
