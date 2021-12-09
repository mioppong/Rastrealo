import React, { useEffect } from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";

import { store } from "./redux/store";
import { loadToken } from "./api/localStorage";
import { Welcome, Dashboard } from "./screens";
import { getData } from "./redux/actions";

const App = (props) => {
  const homeStore = useSelector((state) => state.homeStore);
  const tokenExist = loadToken();
  const dispatch = useDispatch();

  useEffect(() => {
    if (tokenExist && !homeStore.token) {
      dispatch(getData());
    }
  }, [tokenExist,dispatch, homeStore.token]);
  return (
    <Routes>
      <Route path="/welcome" element={<Welcome />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
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
