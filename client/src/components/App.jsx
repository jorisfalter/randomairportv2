import React from "react";
// import PicComponent from "./PictureComponent.jsx";
import NewPicComponent from "./NewPictureComponent.jsx";
import MyMapComponent from "./MapsComponent.jsx";
import AddressComponent from "./GetAddressComponent.jsx";
// import Child from "./GetChild.jsx";

function App() {
  //
  // this function to test only
  // const Parent = () => {
  //   const handleChild = (callback) => {
  //     callback();
  //   };
  //   return (
  //     <Child
  //       handleChild={handleChild}
  //       // airportPicLinkAndNameTransfer={airportPicLinkAndName}
  //     />
  //   );
  // };

  const [newAirportPicLinkAndName, setNewAirportPicLinkAndName] =
    React.useState(null);

  // I'm going to start duplicating the function here and see if I can get the data down into the NewPicturecomponent function
  function fetchApi() {
    fetch("/api")
      .then((res) => res.json())
      .then((fetchedData) => setNewAirportPicLinkAndName(fetchedData));
    // alert(newAirportPicLinkAndName.message2airportName);
  }

  React.useEffect(() => {
    fetchApi();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <div ClassName="App">
          {/* <Parent /> */}
          <AddressComponent />
          {/* <PicComponent /> */}
          <NewPicComponent
            onButtonClick={fetchApi} // wanneer ik hier haakjes achter zet stopt ie niet meer met de functie te callen !!
            newPicComponentTransfer={newAirportPicLinkAndName}
          />
          <MyMapComponent isMarkerShown />,
        </div>
      </header>
    </div>
  );
}

export default App;
