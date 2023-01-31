import React from "react";
import PicComponent from "./PictureComponent.jsx";
import MyMapComponent from "./MapsComponent.jsx";
import AddressComponent from "./GetAddressComponent.jsx";
import { useEffect } from "react";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div ClassName="App">
          <AddressComponent />
          <PicComponent />
          <MyMapComponent isMarkerShown />,
        </div>
      </header>
    </div>
  );
}

export default App;
