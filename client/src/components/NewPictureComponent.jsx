import React, { useState } from "react";
import NewMapComponent from "./MapsComponentNotComposeFunction.jsx";

function PicComponent(props) {
  const screenWidth = window.innerWidth; // to stop rendering >> see chatgpt on phone only
  const [mapIsVisible, setMapIsVisible] = useState(true);

  function WhenClicked(event) {
    props.onButtonClick();
    event.preventDefault();
  }

  function hideMap() {
    setMapIsVisible(!mapIsVisible);
  }

  return (
    <div>
      {/* <p>
        {!props.newPicComponentTransfer
          ? "loading..."
          : props.newPicComponentTransfer.message2airportName}
      </p> */}

      <div className="button-and-image">
        <div className="mapComponent">
          {mapIsVisible && (
            <NewMapComponent
              airportName={props.newPicComponentTransfer.message2airportName}
              latitude_ns={props.newPicComponentTransfer.message3latitude_ns}
              longitude_ew={props.newPicComponentTransfer.message4longitude_ew}
              size="300px"
            />
          )}
        </div>

        <button className="button" onClick={WhenClicked}>
          Next
        </button>

        <div className="close-map-bar" onClick={hideMap}>
          {mapIsVisible && <div className="close-map-bar-text">Hide Map</div>}
          {!mapIsVisible && <div className="close-map-bar-text">Show Map</div>}
        </div>

        <img
          className="airportPicture"
          // width="500px"
          alt="airport"
          src={
            !props.newPicComponentTransfer
              ? "loading..."
              : props.newPicComponentTransfer.message
          }
        />
        <div className="close-map-bar2" onClick={hideMap}>
          {mapIsVisible && <div className="close-map-bar-text">Hide Map</div>}
          {!mapIsVisible && <div className="close-map-bar-text">Show Map</div>}
        </div>
        <div className="mapComponent2">
          {mapIsVisible && (
            <NewMapComponent
              airportName={props.newPicComponentTransfer.message2airportName}
              latitude_ns={props.newPicComponentTransfer.message3latitude_ns}
              longitude_ew={props.newPicComponentTransfer.message4longitude_ew}
              size="800px"
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default PicComponent;
