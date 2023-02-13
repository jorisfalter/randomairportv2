import React from "react";

function PicComponent(props) {
  // const [airportPicLinkAndName, setAirportPicLinkAndName] =
  //   React.useState(null);

  // function fetchApi() {
  //   fetch("/api")
  //     .then((res) => res.json())
  //     .then((fetchedData) => setAirportPicLinkAndName(fetchedData));
  // }

  // React.useEffect(() => {
  //   fetchApi();
  // }, []);

  function WhenClicked(event) {
    // alert("clicked");
    props.onButtonClick();
    // props.fetchApi();
    event.preventDefault();
  }

  // hieronder exporteren we Link naar de foto en de Naam van de airport
  // we displayen de naam in de Div
  // Dit moeten we nu op een andere manier exporteren
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
