import React, { Component } from 'react';

class SearchBox extends Component {

  constructor(props) {
    super(props);

    this.searchInput = React.createRef();
  }

  componentDidMount() {
    const {
      mapsapi: { places },
    } = this.props;

    this.searchBox = new places.SearchBox(this.searchInput.current);
    this.searchBox.addListener('places_changed', this.onPlacesChanged);
  }

  componentWillUnmount() {
    const {
      mapsapi: { event },
    } = this.props;

    event.clearInstanceListeners(this.searchBox);
  }

  onPlacesChanged = () => {
    const { onPlacesChanged } = this.props;

    if (onPlacesChanged) {
      onPlacesChanged(this.searchBox.getPlaces());
    }
  };

  render() {
    const { placeholder } = this.props;

    return (
      <input
        ref={this.searchInput}
        placeholder={'Localidade do Desastre'}
        type="text"
        style={{
          width: '392px',
          height: '48px',
          fontSize: '20px',
          padding: '12px 104px 11px 64px',
          border: '2px solid yellow'
        }}
      />
    );
  }
}

export default SearchBox;