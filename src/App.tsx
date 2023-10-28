import React from "react";
import { MyMenu } from "components/MyMenu";
import { BrowserRouter } from "react-router-dom";

import "./App.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <MyMenu />
      </BrowserRouter>
    </div>
  );
}

export default App;
