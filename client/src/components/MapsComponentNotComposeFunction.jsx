import React, { useEffect } from "react";
import { Map, Marker, GoogleApiWrapper } from "google-maps-react";

const mapsKey = process.env.REACT_APP_MAPS_API_KEY;

function NewMapComponent(props) {
  const [airportCoords, setAirportCoords] = React.useState({
    xcor: 0,
    ycor: 0,
  });

  useEffect(() => {
    async function getCoords() {
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
          alert(json.results[0].geometry.location.lat);
          setAirportCoords({
            xcor: json.results[0].geometry.location.lat,
            ycor: json.results[0].geometry.location.lng,
          });
          alert("data fetched " + airportCoords.xcor);

          // setLocation(json.results[0].address_components[0].long_name); for debugging only
        } catch (error) {
          console.log("error", error);
        }
      }
      fetchData();
      // alert(airportCoords.xcor);
    }
    getCoords();
  }, []);

  // airportName={newAirportPicLinkAndName.message2airportName}
  // airportXcoord={airportCoords.xcor}
  // airportYcoord={airportCoords.ycor}

  // getCoords();

  const style = {
    width: "300px",
    height: "300px",
  };
  return (
    <div>
      xcoor {airportCoords.xcor}
      ycoor {airportCoords.ycor}
      <Map
        google={props.google}
        zoom={10}
        defaultCenter={{
          lat: airportCoords.xcor,
          lng: airportCoords.ycor,
        }}
        // initialCenter={{
        //   lat: airportCoords.xcor,
        //   lng: airportCoords.ycor,
        // }}
        style={style}
      >
        <Marker
          position={{ lat: airportCoords.xcor, lng: airportCoords.xcor }}
        />
      </Map>
    </div>
  );
}

export default GoogleApiWrapper({
  apiKey: mapsKey,
})(NewMapComponent);
