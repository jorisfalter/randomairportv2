import React from "react";
import NewMapComponent from "./MapsComponentNotComposeFunction.jsx";

function PicComponent(props) {
  function WhenClicked(event) {
    // alert("clicked");
    props.onButtonClick();
    // props.fetchApi();
    event.preventDefault();
  }

  return (
    <div>
      {/* <p>
        {!props.newPicComponentTransfer
          ? "loading..."
          : props.newPicComponentTransfer.message2airportName}
      </p> */}
      <NewMapComponent
        className="mapComponent"
        airportName={props.newPicComponentTransfer.message2airportName}
      />
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
    </div>
  );
}

export default PicComponent;
