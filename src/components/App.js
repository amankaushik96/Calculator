import React from "react";
import "./App.css";
import Cal from "./Calc";

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Cal />
      </div>
    );
  }
}

export default App;
