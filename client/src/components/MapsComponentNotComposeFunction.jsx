import { GoogleApiWrapper, Map, Marker } from "google-maps-react";
import React, { useEffect } from "react";

const mapsKey = process.env.REACT_APP_MAPS_API_KEY;
// const mapsKey = process.env.REACT_APP_MAPS_API_KEY_TEST; // to see the map when testing locally

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
    // width: props.size,
    // height: props.size,
    borderTop: "0px",
    borderColor: "black",
    borderStyle: "solid",
  };

  const style2 = {
    width: props.size,
    height: props.size,
  };

  return (
    <div className="wrapper-div">
      <div
        className="map-div"
        // style={style2}
      >
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
    </div>
  );
}

export default GoogleApiWrapper({
  apiKey: mapsKey,
})(NewMapComponent);
