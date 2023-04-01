import React, { useEffect } from "react";
import { Map, Marker, GoogleApiWrapper } from "google-maps-react";

const mapsKey = process.env.REACT_APP_MAPS_API_KEY;

function NewMapComponent(props) {
  // const [airportCoords, setAirportCoords] = React.useState({
  //   xcor: 0,
  //   ycor: 0,
  // });
  // const [oldAirportName, setOldAirportName] = React.useState({
  //   name: "",
  // });

  // useEffect(() => {
  //   async function getCoords(xcor) {
  //     const mapsKey = process.env.REACT_APP_MAPS_API_KEY;
  //     const address = props.airportName.substring(0, 4) + " airport";
  //     const URL =
  //       "https://maps.googleapis.com/maps/api/geocode/json?address=" +
  //       address +
  //       "&key=" +
  //       mapsKey;

  //     async function fetchData() {
  //       try {
  //         const response = await fetch(URL);
  //         const json = await response.json();
  //         setAirportCoords({
  //           xcor: json.results[0].geometry.location.lat,
  //           ycor: json.results[0].geometry.location.lng,
  //         });

  //         // setLocation(json.results[0].address_components[0].long_name); for debugging only
  //       } catch (error) {
  //         console.log("error", error);
  //       }
  //     }

  //     if (oldAirportName.name !== props.airportName) {
  //       fetchData();

  //       setOldAirportName({
  //         name: props.airportName,
  //       });
  //     }
  //   }
  //   getCoords();
  // });

  const style = {
    width: props.size,
    height: props.size,
    borderColor: "black",
    borderStyle: "solid",
  };
  console.log(props.latitude_ns);
  console.log("an api call with size " + props.size);
  return (
    <div className="map-div">
      <Map
        className="map-div-inner"
        google={props.google}
        zoom={10}
        center={{
          // lat: airportCoords.xcor,
          // lng: airportCoords.ycor,
          lat: props.latitude_ns,
          lng: props.longitude_ew,
        }}
        initialCenter={{
          // lat: airportCoords.ycor,
          // lng: airportCoords.xcor,
          lat: props.latitude_ns,
          lng: props.longitude_ew,
        }}
        style={style}
      >
        <Marker
          position={{
            // lat: airportCoords.xcor,
            // lng: airportCoords.ycor,
            lat: props.latitude_ns,
            lng: props.longitude_ew,
          }}
        />
      </Map>
    </div>
  );
}

export default GoogleApiWrapper({
  apiKey: mapsKey,
})(NewMapComponent);
