/**
 * ************************************
 *
 * @module  MapDisplay
 * @author
 * @date
 * @description presentation component that display the map
 *
 * ************************************
 */

import React, { useState, useRef } from "react";
import ReactMapGl, { Marker, Popup, NavigationControl, FullscreenControl } from 'react-map-gl';
import CityPin from "./Icons/Trekking.jsx";
import Geocoder from 'react-map-gl-geocoder';

function getAccessToken() {
    var accessToken = null;
   
    if (typeof window !== 'undefined' && window.location) {
      var match = window.location.search.match(/access_token=([^&\/]*)/);
      accessToken = match && match[1];
    }
   
    if (!accessToken && typeof process !== 'undefined') {
      // Note: This depends on bundler plugins (e.g. webpack) inmporting environment correctly
      accessToken = accessToken || process.env.MapboxAccessToken; // eslint-disable-line
    }
   
    return accessToken || null;
}

const MAPBOX_TOKEN = getAccessToken();

//importing ReactMapGl component from react-map-gl module, using react hooks to set local state 
const MapDisplay = props => {
    const [viewport, setViewport] = useState({
       latitude: props.latitude,
       longitude: props.longitude,
       width: 1100,
       height: 700,
       zoom: 10,
    });

    const mapRef = useRef(null);
    
    const [selectedHike, setSelectedHike] = useState(null);

    //fullscreen button styling
    const fullscreenControlStyle = {
        position: 'absolute',
        top: 0,
        left: 0,
        padding: '10px'
      };
    //zoom in/out buttons styling
    const navStyle = {
        position: 'absolute',
        top: 36,
        left: 0,
        padding: '10px'
    };
    console.log('this is maptoken', MAPBOX_TOKEN, process.env.MapboxAccessToken);
    return (
        <div id="map-display">
            <ReactMapGl 
            {...viewport} 
            className= "movingMap"
            mapboxApiAccessToken={`pk.eyJ1Ijoia2lya3NoaW4iLCJhIjoiY2sweWg2ZTE5MDc4NjNqb3cyYmpjOTdnNSJ9.dgxUMfBEZ2Ii8UdsJa6ngg`}
            mapStyle={`mapbox://styles/mapbox/outdoors-v11`}
            ref={mapRef}
            onViewportChange={viewport => setViewport(viewport)}
            >
            <div className="navigationIcons">
                <div className="fullscreen" style={fullscreenControlStyle}>
                <FullscreenControl />
                </div>
                <div className="nav" style={navStyle}>
                <NavigationControl />
                </div>
            </div>
            <Geocoder
                onViewportChange={viewport => {
                    props.getNewLatLon(viewport.latitude, viewport.longitude);
                    setViewport({...viewport});
                }}
                mapboxApiAccessToken={`pk.eyJ1Ijoia2lya3NoaW4iLCJhIjoiY2sweWg2ZTE5MDc4NjNqb3cyYmpjOTdnNSJ9.dgxUMfBEZ2Ii8UdsJa6ngg`}
                mapRef={mapRef}
            />   
                {/* map through trailData array in state to produce marker components, as well as popup components, on the map */}
            {props.trailData.map(trail => (
                <Marker 
                key={trail.id}
                latitude={trail.latitude}
                longitude={trail.longitude}
                >
                        <CityPin onClick={e => {
                        e.preventDefault();
                        setSelectedHike(trail);
                        setViewport({
                            latitude: trail.latitude,
                            longitude: trail.longitude,
                            width: 1100,
                            height: 700,
                            zoom: 16,
                            showPopup: true,
                        });
                    }}/>
                </Marker>
            ))}
            {selectedHike && (
                <Popup
                anchor='top'
                latitude={selectedHike.latitude}
                longitude={selectedHike.longitude}
                closeOnClick={false}
                onClose={() => 
                    setSelectedHike(null)
                }
                className='popup'
                closeButton={true}
                closeOnClick={false}
                onClose={() => setSelectedHike(null)
                }
                >
                    <div onClick={() => props.displayTrail(selectedHike)}>
                        <h4 className='popup-name'>{selectedHike.name}</h4>
                        <p className='popup-summary'>{selectedHike.location}</p>
                        <p className='popup-difficulty'>difficulty: {selectedHike.difficulty}</p>
                    </div>
                </Popup>
            )}
            </ReactMapGl>
        </div>
    );
};

export default MapDisplay;