import "babel-core/polyfill";
import React from "react";
import FluxComponent from "flummox/component";
import App from "./App";
import AppFlux from "./AppFlux";

const flux = new AppFlux();

React.render(
  <FluxComponent flux={flux}>
    <App />
  </FluxComponent>,
  document.getElementById("root"));
