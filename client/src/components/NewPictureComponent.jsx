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
      <p>
        {!props.newPicComponentTransfer
          ? "loading..."
          : props.newPicComponentTransfer.message2airportName}
      </p>
      <button className="button" onClick={WhenClicked}>
        Next
      </button>
      <img
        width="300px"
        alt="airport"
        src={
          !props.newPicComponentTransfer
            ? "loading..."
            : props.newPicComponentTransfer.message
        }
      />
      <NewMapComponent
        airportName={props.newPicComponentTransfer.message2airportName}
      />
    </div>
  );
}

export default PicComponent;
