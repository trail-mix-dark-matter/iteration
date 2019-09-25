/**
 * ************************************
 *
 * @module  MainContainer
 * @author  
 * @date
 * @description stateful component that renders MapDisplay and ListContainer
 *
 * ************************************
 */

import React, { Component } from "react";
import MapDisplay from "../components/MapDisplay.jsx";
import ListContainer from "./ListContainer.jsx";

//container that combines MapDisplay and ListContainer and passes down all necessary props
class MainContainer extends Component {
    render() {
        return (
            <div id="main-container" onClick={e => {
                // console.log('in main container', this.props.displayTrailModal);
                if(this.props.displayTrailModal) {
                    this.props.noTrail();
                }
            }}>
            
                <img src="../../assets/trail-mix-logo-small.jpg" className='logo'/><br />
                <div className="map-and-list">
                <div className="map-display-width">
                <MapDisplay 
                trailData={this.props.trailData}
                getTrail={this.props.getTrail}
                displayTrail={this.props.displayTrail} 
                />
                </div>
                <div className="list-display">
                <ListContainer 
                trailData={this.props.trailData} 
                getTrail={this.props.getTrail}
                showKey={this.props.showKey}
                diffKey={this.props.diffKey} 
                />

                </div>
                {/* conditional renders difficulty key overlay */}
                {this.props.diffKey && (
                    <div>
                        <img id='diff-key' src='../../assets/diff-key.jpg' />
                    </div>
                )}
                </div>
            </div>
        );
    };
};

export default MainContainer;