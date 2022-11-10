import { Wrapper, Status } from "@googlemaps/react-wrapper";
import React from "react";

const render = (status: Status) => {
  return <h1>{status}</h1>;
};

<Wrapper apiKey={"YOUR_API_KEY"} render={render}>
  <MapsComponent />
</Wrapper>;

const ref = React.useRef(null);
const [map, setMap] = React.useState();

React.useEffect(() => {
  if (ref.current && !map) {
    setMap(new window.google.maps.Map(ref.current, {}));
  }
}, [ref, map]);
