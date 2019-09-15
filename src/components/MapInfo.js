import React from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import config from '../lib/config';

class GoogleMaps extends React.Component {
  render() {
    return (
      <Map
        google={this.props.google}
        zoom={16}
        style={this.props.style}
        initialCenter={this.props.initialCenter}
        
      >
      <Marker></Marker>
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: config.firebase.apiKey,
})(GoogleMaps);