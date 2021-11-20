import React from "react";
import { Provider, useSelector } from "react-redux";

import { store } from "./redux/store";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import { Welcome, Dashboard } from "./screens";

const App = (props) => {
  const user = useSelector((state) => state.user);
  console.log("user is", user);

  if (user.token) {
    return <Dashboard />;
  } else {
    return <Welcome />;
  }
};

const AppWrapper = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

export default AppWrapper;
