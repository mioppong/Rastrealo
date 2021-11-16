import axios from "axios";
import types from "./actionTypes";

export const login = (payload) => async (dispatch) => {
  const { email, password } = payload;
  console.log("payload is", payload);
  const url = "https://618de9ebfe09aa001744092d.mockapi.io/login";

  dispatch({ type: types.LOGIN_START });

  const response = await axios.post(url, { token: "token1" }).catch((err) => {
    return dispatch({ type: types.LOGIN_FAILED });
  });

  console.log("response is", response);
  dispatch({ type: types.LOGIN_SUCCESS, action: response.data });
};

export const logout = () => async (dispatch) => {
  // payload contains username and password
  dispatch({ type: types.LOGOUT });
};
