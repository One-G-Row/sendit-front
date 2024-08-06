import React, { useEffect, useRef } from 'react';
import 'ol/ol.css';
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import { fromLonLat } from 'ol/proj';
import OSM from 'ol/source/OSM';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { Point } from 'ol/geom';
import Feature from 'ol/Feature';
import { Icon, Style } from 'ol/style';

const MapComponent = () => {
    const mapElement = useRef(null);

    useEffect(() => {
        // Initialize the map
        const map = new Map({
            target: mapElement.current,
            layers: [
                new TileLayer({
                    source: new OSM()
                })
            ],
            view: new View({
                center: fromLonLat([0, 0]), // Default center of the map
                zoom: 2
            })
        });

        // Fetch locations from the backend
        fetch('/locations')
            .then(response => response.json())
            .then(data => {
                const features = data.map(location => {
                    const feature = new Feature({
                        geometry: new Point(fromLonLat([location.lng, location.lat]))
                    });
                    feature.setStyle(new Style({
                        image: new Icon({
                            src: 'https://openlayers.org/en/latest/examples/data/icon.png',
                            scale: 0.1
                        })
                    }));
                    return feature;
                });

                const vectorSource = new VectorSource({
                    features: features
                });

                const vectorLayer = new VectorLayer({
                    source: vectorSource
                });

                map.addLayer(vectorLayer);
            });
    }, []);

    return (
        <div ref={mapElement} style={{ width: '100%', height: '500px' }}></div>
    );
};

export default MapComponent;
