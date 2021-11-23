import React from "react";
import { Provider, useSelector } from "react-redux";

import { store } from "./redux/store";
import { Welcome, Dashboard } from "./screens";

const App = (props) => {
  const homeStore = useSelector((state) => state.homeStore);

  if (homeStore.token) {
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
