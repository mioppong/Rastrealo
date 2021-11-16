import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, useRoutes } from "react-router-dom";
import { store } from "./redux/store";

import { Welcome, Dashboard } from "./screens";

const App = () => {
  let routes = useRoutes([
    { path: "/", element: <Welcome /> },
    { path: "dashboard", element: <Dashboard /> },
  ]);
  return routes;
};

const AppWrapper = () => {
  return (
    <Router>
      <App />
    </Router>
  );
};

const AppWithRedux = () => {
  return (
    <Provider store={store}>
      <AppWrapper />
    </Provider>
  );
};
export default AppWithRedux;
