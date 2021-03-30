import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider, CSSReset } from "@chakra-ui/core";
import { DataLayer } from './components/DataLayer';
import reducer, { initialState } from './components/reducer';

import App from "./components/app";

ReactDOM.render(
  <React.StrictMode>
    <DataLayer initialState={initialState} reducer={reducer}>
    <Router>
      <ThemeProvider>
        <CSSReset />
        <App />
      </ThemeProvider>
    </Router>
    </DataLayer>
  </React.StrictMode>,
  document.getElementById("root")
);
