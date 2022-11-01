import React from "react";

// function App() {
//   return (
//     <div>
//       <img
//         alt="airport"
//         src="https://cdn.jetphotos.com/full/5/68554_1472499655.jpg"
//       />
//     </div>
//   );
// }

function App() {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        {/* <p>{!data ? "Loading..." : data}</p> */}
        <img alt="airport" src={!data ? "Loading..." : data} />
      </header>
    </div>
  );
}

export default App;
