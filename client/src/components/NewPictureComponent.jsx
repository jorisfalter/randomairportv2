import React from "react";
import NewMapComponent from "./MapsComponentNotComposeFunction.jsx";

function PicComponent(props) {
  function WhenClicked(event) {
    props.onButtonClick();
    event.preventDefault();
  }

  return (
    <div>
      {/* <p>
        {!props.newPicComponentTransfer
          ? "loading..."
          : props.newPicComponentTransfer.message2airportName}
      </p> */}

      <div className="button-and-image">
        <button className="button" onClick={WhenClicked}>
          Next
        </button>
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
        <NewMapComponent
          className="mapComponent"
          airportName={props.newPicComponentTransfer.message2airportName}
        />
      </div>
    </div>
  );
}

export default PicComponent;
