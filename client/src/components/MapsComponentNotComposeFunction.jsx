import React, { useEffect } from "react";
import { Map, Marker, GoogleApiWrapper } from "google-maps-react";

const mapsKey = process.env.REACT_APP_MAPS_API_KEY;

function NewMapComponent(props) {
  const [airportCoords, setAirportCoords] = React.useState({
    xcor: 0,
    ycor: 0,
  });
  const [oldAirportName, setOldAirportName] = React.useState({
    name: "",
  });

  useEffect(() => {
    async function getCoords(xcor) {
      const mapsKey = process.env.REACT_APP_MAPS_API_KEY;
      const address = props.airportName.substring(0, 4) + " airport";
      const URL =
        "https://maps.googleapis.com/maps/api/geocode/json?address=" +
        address +
        "&key=" +
        mapsKey;

      async function fetchData() {
        try {
          const response = await fetch(URL);
          const json = await response.json();
          // alert(json.results[0].geometry.location.lat);
          setAirportCoords({
            xcor: json.results[0].geometry.location.lat,
            ycor: json.results[0].geometry.location.lng,
          });
          // alert("data fetched " + airportCoords.xcor);

          // setLocation(json.results[0].address_components[0].long_name); for debugging only
        } catch (error) {
          console.log("error", error);
        }
      }

      if (oldAirportName.name !== props.airportName) {
        fetchData();

        setOldAirportName({
          name: props.airportName,
        });
      }
    }
    getCoords();
  });

  const style = {
    width: "250px",
    height: "250px",
  };
  return (
    <div>
      <Map
        google={props.google}
        zoom={10}
        center={{
          lat: airportCoords.xcor,
          lng: airportCoords.ycor,
        }}
        initialCenter={{
          lat: airportCoords.ycor,
          lng: airportCoords.xcor,
        }}
        style={style}
      >
        <Marker
          position={{ lat: airportCoords.xcor, lng: airportCoords.ycor }}
        />
      </Map>
    </div>
  );
}

export default GoogleApiWrapper({
  apiKey: mapsKey,
})(NewMapComponent);
