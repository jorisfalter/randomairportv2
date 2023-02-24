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
      // alert(newAirportPicLinkAndName.message2airportName);
      // let abc = AddressCoords;
      // alert(abc);
      const mapsKey = process.env.REACT_APP_MAPS_API_KEY;
      // const address = "EHAM airport";
      const address = props.airportName.substring(0, 4) + " airport";
      // alert(address);
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

      // alert(airportCoords.xcor);
    }
    getCoords();
  });

  // airportName={newAirportPicLinkAndName.message2airportName}
  // airportXcoord={airportCoords.xcor}
  // airportYcoord={airportCoords.ycor}

  // getCoords();

  // we zien San Francisco op dekaart momenteel en ik weet niet waarom

  const style = {
    width: "300px",
    height: "300px",
  };
  return (
    <div>
      xcoor {airportCoords.xcor}
      <br></br>
      ycoor {airportCoords.ycor}
      <br></br>
      airport name {props.airportName}
      <br></br>
      old airport name {oldAirportName.name}
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
