import React, { Component } from "react";
import { Map, Marker, GoogleApiWrapper } from "google-maps-react";

const mapsKey = process.env.REACT_APP_MAPS_API_KEY;

class NewMapComponent extends Component {
  render() {
    const style = {
      width: "300px",
      height: "300px",
    };
    return (
      <div>
        Hello World
        <Map
          google={this.props.google}
          zoom={10}
          initialCenter={{
            lat: 35.5496939,
            lng: -120.7060049,
          }}
          style={style}
        >
          <Marker />
        </Map>
      </div>
    );
  }
}
export default GoogleApiWrapper({
  apiKey: mapsKey,
})(NewMapComponent);
