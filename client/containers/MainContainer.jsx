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

import React, { Component } from 'react';
import MapDisplay from '../components/MapDisplay.jsx';
import ListContainer from './ListContainer.jsx';

//container that combines MapDisplay and ListContainer and passes down all necessary props
class MainContainer extends Component {
  render() {
    return (
      <div
        id='main-container'
        onClick={e => {
          if (this.props.displayTrailModal) {
            this.props.noTrail();
          }
        }}
      >
        <img src='../../assets/trail-mix-logo.jpg' className='logo' />
        <br />
        <div className='map-and-list'>
          <div className='map-display-width'>
            <MapDisplay
              trailData={this.props.trailData}
              getTrail={this.props.getTrail}
              displayTrail={this.props.displayTrail}
              latitude={this.props.latitude}
              longitude={this.props.longitude}
              getNewLatLon={this.props.getNewLatLon}
            />
          </div>
          <div className='list-display'>
            <div className="sort-feature">
            <label htmlFor='sort'>Sort By:</label>
            <select
              id='sort'
              value={this.props.sortValue}
              onChange={this.props.sortTrails}
            >
              <option value=''>None</option>
              <option value='shortest-length'>Shortest Length</option>
              <option value='longest-length'>Longest Length</option>
              <option value='highest-rating'>Highest Rating</option>
              <option value='lowest-rating'>Lowest Rating</option>
            </select>
            </div>
            <ListContainer
              currentUsername={this.props.currentUsername}
              trailData={this.props.trailData}
              getTrail={this.props.getTrail}
              showKey={this.props.showKey}
              diffKey={this.props.diffKey}
              updateFavorites={this.props.updateFavorites}
              favorites={this.props.favorites}
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
  }
}

export default MainContainer;
