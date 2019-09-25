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

import React, { useState } from "react";
import ReactMapGl, { Marker, Popup, NavigationControl, FullscreenControl } from 'react-map-gl';
import SvgTrekking from "./Icons/Trekking.js";

//importing ReactMapGl component from react-map-gl module, using react hooks to set local state 
const MapDisplay = props => {
    const [viewport, setViewport] = useState({
       latitude: 34.1053,
       longitude: -118.352,
       width: 900,
       height: 500,
       zoom: 10,
    });
    
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

    return (
        <div id="map-display">
            <ReactMapGl 
            {...viewport} 
            mapboxApiAccessToken={`pk.eyJ1IjoiZXJlYXN0bWFuIiwiYSI6ImNrMHUyemE4bTBqdmwzYnFnMGk0Z2VzaWgifQ.AL6aKHfOcWqKwC72i3FyBg`}
            mapStyle={`mapbox://styles/ereastman/ck0vjqz9x7y0g1cqs0vq5l9ld`}
            onViewportChange={viewport => setViewport(viewport)}
            >
            <div className="fullscreen" style={fullscreenControlStyle}>
            <FullscreenControl />
            </div>
            <div className="nav" style={navStyle}>
            <NavigationControl />
            </div>
                {/* map through trailData array in state to produce marker components, as well as popup components, on the map */}
            {props.trailData.map(trail => (
                <Marker 
                key={trail.id}
                latitude={trail.latitude}
                longitude={trail.longitude}
                >
                    <button
                    onClick={e => {
                        e.preventDefault();
                        setSelectedHike(trail);
                        setViewport({
                            latitude: trail.latitude,
                            longitude: trail.longitude,
                            width: 900,
                            height: 500,
                            zoom: 16,
                            showPopup: true,
                        });
                    }}
                    >
                        <SvgTrekking width='30px' height='30px' />
                    </button>
                </Marker>
            ))}
            {selectedHike && (
                <Popup
                latitude={selectedHike.latitude}
                longitude={selectedHike.longitude}
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