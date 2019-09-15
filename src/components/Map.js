import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import config from '../lib/config';
import SearchBox from './SearchBox';
import { Icon } from 'antd';

class Map extends Component {
  constructor(props) {
    super(props);
    this.searchbox = React.createRef();
    this.state = {
      mapsApiLoaded: false,
      mapInstance: null,
      mapsapi: null,
      location: {
        lat: -28.3885,
        lng: -53.9205,
      },
    };

    this.apiLoaded = this.apiLoaded.bind(this);
    this.updateLocation = this.updateLocation.bind(this);
  }

  apiLoaded = (map, maps) => {
    console.log(map, maps);
    map.controls[maps.ControlPosition.TOP_LEFT].push(this.searchbox.current);

    this.setState({
      mapsApiLoaded: true,
      mapInstance: map,
      mapsapi: maps,
    });
  };

  updateLocation = place => {
    this.props.updateLocalization({
      latitude: place[0].geometry.location.lat(),
      longitude: place[0].geometry.location.lng(),
    });
    this.setState({
      ...this.state,
      location: {
        lat: place[0].geometry.location.lat(),
        lng: place[0].geometry.location.lng(),
      },
    });
  };

  render() {
    const { localizationRadius } = this.props;
    return (
      <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{
            key: config.firebase.apiKey,
            libraries: ['places', 'drawing'],
          }}
          defaultCenter={{
            lat: -28.3885,
            lng: -53.9205,
          }}
          center={this.state.location}
          defaultZoom={15}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map, maps }) => {
            this.apiLoaded(map, maps);
          }}
        >
          <div
            lat={this.state.location.lat}
            lng={this.state.location.lng}
            text="Marcador"
          >
            <Icon
              type="heat-map"
              style={{
                color: 'red',
                textAlign: 'center',
                background: 'yellow',
                opacity: '0.7',
                border: '2px solid yellow',
                padding: '10px',
                borderRadius: '100%',
                transform: `scale(${localizationRadius})`,
                transition: 'all 1s ease',
              }}
            />
          </div>
        </GoogleMapReact>
        <div ref={this.searchbox}>
          {this.state.mapsApiLoaded && (
            <SearchBox
              mapsapi={this.state.mapsapi}
              onPlacesChanged={this.updateLocation}
            />
          )}
        </div>
      </div>
    );
  }
}

export default Map;
