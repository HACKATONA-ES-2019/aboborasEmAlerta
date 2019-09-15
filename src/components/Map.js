import React from 'react';
import { Map, GoogleApiWrapper } from 'google-maps-react';
import config from '../lib/config';

class GoogleMaps extends React.Component {
  render() {
    return (
      <Map
        google={this.props.google}
        zoom={8}
        style={this.props.style}
        initialCenter={{ lat: 47.49855629475769, lng: -122.14184416996333 }}
      />
    );
  }
}

export default GoogleApiWrapper({
  apiKey: config.firebase.apiKey,
})(GoogleMaps);
