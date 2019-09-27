/**
 * ************************************
 *
 * @module  App.jsx
 * @author
 * @date
 * @description
 *
 * ************************************
 */
import React, { Component } from 'react';
import MainContainer from './containers/MainContainer.jsx';
import TrailContainer from './containers/TrailContainer.jsx';
import TrailContainerModal from './containers/TrailContainerModal.jsx';
import NavContainer from './containers/NavContainer.jsx';
import { Redirect, Link } from 'react-router-dom';

//state includes data retrieved from REI API, selects selected trail
// holds trail specific comments pulled from database

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trailData: [],
      selectedTrail: null,
      comments: [],
      diffKey: false,
      displayTrailModal: false,
      favorites: [],
      currentUsername: '',
      loggedOut: false,
      rerender: false,
      latitude: 33.9878331930883,
      longitude: -118.47057312726974,
      sortValue: ''
    };
    this.getTrail = this.getTrail.bind(this);
    this.noTrail = this.noTrail.bind(this);
    this.postComment = this.postComment.bind(this);
    this.displayTrail = this.displayTrail.bind(this);
    this.showKey = this.showKey.bind(this);
    this.updateFavorites = this.updateFavorites.bind(this);
    this.getFavorites = this.getFavorites.bind(this);
    this.getNewLatLon = this.getNewLatLon.bind(this);
    this.sortTrails = this.sortTrails.bind(this);
    this.logOut = this.logOut.bind(this);
  }

  //fetches data from REI API and sets to state when the page loads
  componentDidMount() {
    // OBTAINING CLIENT'S BROWSER LOCATION
    function getClientBrowserLocation(position) {
      const { latitude, longitude } = position.coords;
      const latlon = { latitude, longitude };
      // modify THIS ROUTE depending on backend
      fetch('/data', {
        method: 'POST',
        body: JSON.stringify(latlon),
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(res => res.json())
        .then(json => {
          this.setState({ trailData: json.trails, latitude, longitude });
        })
        .catch(e => console.error('unable to post', e));
    }

    function handleErrorGettingBrowserLocation() {
      const latlon = {
        latitude: 33.9878331930883,
        longitude: -118.47057312726974
      };
      fetch('/data', {
        method: 'POST',
        body: JSON.stringify(latlon),
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(res => res.json())
        .then(json => {
          this.setState({ trailData: json.trails });
        })
        .catch(e => console.error('unable to post', e));
    }
    navigator.geolocation.getCurrentPosition(
      getClientBrowserLocation.bind(this),
      handleErrorGettingBrowserLocation.bind(this)
    );

    fetch('/gettingUser')
      .then(res => {
        return res.json();
      })
      .then(data => {
        if (data !== 'nothing') {
          this.setState({ currentUsername: data }, () => this.getFavorites());
        } else {
          this.setState({ rerender: true });
        }
      });
  }

  updateFavorites(username, trailId) {
    let method = 'POST';
    if (this.state.favorites && this.state.favorites.includes(trailId))
      method = 'DELETE';
    fetch('/favorites', {
      method,
      body: JSON.stringify({ username: username, trailid: trailId }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(() => this.getFavorites())
      .catch(err => console.log(err));
  }

  getFavorites() {
    fetch('/getfavorites', {
      method: 'POST',
      body: JSON.stringify({ username: this.state.currentUsername }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(data => {
        this.setState({ favorites: data.map(object => object.trailid) });
      });
  }

  getNewLatLon(latitude, longitude) {
    this.setState(
      {
        latitude,
        longitude
      },
      () => {
        fetch('/data', {
          method: 'POST',
          body: JSON.stringify({ latitude, longitude }),
          headers: {
            'Content-Type': 'application/json'
          }
        })
          .then(res => res.json())
          .then(json => {
            this.setState({ trailData: json.trails });
          })
          .catch(e => console.error('unable to post', e));
      }
    );
  }

  //invoked by on-click function in TrailDisplay, sets selected trail in state
  getTrail(id) {
    let trailsArr = this.state.trailData.slice();
    for (let i = 0; i < trailsArr.length; i++) {
      if (trailsArr[i].id === +id) {
        this.setState({
          selectedTrail: trailsArr[i],
          displayTrailModal: true
        });
      }
    }
    fetch('/comments', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        id: id
      }
    })
      .then(res => {
        return res.json();
      })
      .then(res => {
        this.setState(state => {
          return {
            ...state,
            comments: res
          };
        });
      });
  }
  //closes TrailDisplay overlay
  noTrail() {
    this.setState({
      selectedTrail: null,
      displayTrailModal: false,
      comments: []
    });
  }
  //invoked when clicking on the map popups
  displayTrail(selectedHike) {
    this.setState({
      selectedTrail: selectedHike,
      displayTrailModal: true
    });
  }
  //toggle that is invoked when clicking on the "difficulty" in the list items
  showKey() {
    this.setState(state => {
      return { diffKey: state.diffKey ? false : true };
    });
  }
  //adds comment and author to database and pulls back all comments for specified trail and sets to state
  postComment(id, comment) {
    fetch('/comments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: id,
        comment: comment,
        author: this.state.currentUsername
      })
    })
      .then(res => {
        return res.json();
      })
      .then(res => {
        this.setState(state => {
          return {
            ...state,
            comments: res
          };
        });
      });
  }

  sortTrails(event) {
    const newSortValue = event.target.value;
    const trailDataCopy = [...this.state.trailData];

    switch (newSortValue) {
      case 'shortest-length':
        trailDataCopy.sort((a, b) => (a.length > b.length ? 1 : -1));
        break;
      case 'longest-length':
        trailDataCopy.sort((a, b) => (a.length < b.length ? 1 : -1));
        break;
      case 'highest-rating':
        trailDataCopy.sort((a, b) => (a.stars < b.stars ? 1 : -1));
        break;
      case 'lowest-rating':
        trailDataCopy.sort((a, b) => (a.stars > b.stars ? 1 : -1));
        break;
    }

    this.setState({ trailData: trailDataCopy, sortValue: event.target.value });
  }

  logOut() {
    fetch('/logout');
    this.setState({ loggedOut: true });
  }

  //renders MainContainer and conditionally renders TrailContainer
  render() {
    if (this.state.loggedOut || this.state.rerender) {
      return <Redirect to='/' />;
    }
    return (
      <div className='appContainer'>
        <NavContainer logOut={this.logOut} />
        <MainContainer
          noTrail={this.noTrail}
          className='mainContainer'
          getTrail={this.getTrail}
          selectedTrail={this.state.selectedTrail}
          displayTrail={this.displayTrail}
          showKey={this.showKey}
          diffKey={this.state.diffKey}
          updateFavorites={this.updateFavorites}
          displayTrailModal={this.state.displayTrailModal}
          currentUsername={this.state.currentUsername}
          favorites={this.state.favorites}
          getNewLatLon={this.getNewLatLon}
          trailData={this.state.trailData}
          latitude={this.state.latitude}
          longitude={this.state.longitude}
          sortValue={this.state.sortValue}
          sortTrails={this.sortTrails}
        />
        <TrailContainerModal
          trailData={this.state.trailData}
          displayTrailModal={this.state.displayTrailModal}
          noTrail={this.noTrail}
          selectedTrail={this.state.selectedTrail}
          postComment={this.postComment}
          comments={this.state.comments}
          getTrail={this.getTrail}
        />
      </div>
    );
  }
}

export default App;
