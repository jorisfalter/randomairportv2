import React from "react";
// import Button from "./Button";
import PicComponent from "./PictureComponent.jsx";

function App() {
  // const [data, setData] = React.useState(null);

  // React.useEffect(() => {
  //   fetch("/api")
  //     .then((res) => res.json())
  //     .then((data) => setData(data.message));
  // }, []);

  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        {/* <p>{!data ? "Loading..." : data}</p> */}
        {/* <Button /> */}
        <div ClassName="App">
          <PicComponent />
        </div>
        {/* <img alt="airport" src={!data ? "Loading..." : data} /> */}
      </header>
    </div>
  );
}

export default App;
