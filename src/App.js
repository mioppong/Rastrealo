import React from "react";
import { Provider } from "react-redux";

import { store } from "./redux/store";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import { Welcome, Dashboard } from "./screens";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
};

const AppWrapper = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

export default AppWrapper;
