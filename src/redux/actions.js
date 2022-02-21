import axios from "axios";
import types from "./actionTypes";


export const login = (payload) => async (dispatch) => {
  dispatch({ type: types.MAKE_REQUEST_START });
  dispatch({ type: types.LOGIN_SUCCESS, payload: payload });
};

export const logout = () => async (dispatch) => {
  dispatch({ type: types.LOGOUT });
};

export const createUser = (payload) => async (dispatch) => {
  dispatch({ type: types.CREATE_USER_START });

  const url = "https://61aecea833653500172f9fbf.mockapi.io/loginRastrealo";

  await axios.post(url, { payload }).catch((err) => {
    return dispatch({ type: types.CREATE_USER_FAILED });
  });
  dispatch({ type: types.CREATE_USER_SUCCESS, payload: { newUser: payload } });
};

export const createTransaction = (payload) => async (dispatch) => {
  dispatch({ type: types.CREATE_TRANSACTION_START });

  const url = "https://61aecea833653500172f9fbf.mockapi.io/loginRastrealo";

  await axios.post(url, { payload }).catch((err) => {
    return dispatch({ type: types.CREATE_TRANSACTION_FAILED });
  });
  dispatch({
    type: types.CREATE_TRANSACTION_SUCCESS,
    payload: { newTransaction: payload },
  });
};
export const deleteTransaction = (transaction) => async (dispatch) => {
  dispatch({ type: types.CREATE_TRANSACTION_START });

  const url = "https://61aecea833653500172f9fbf.mockapi.io/loginRastrealo";

  await axios.post(url, { transaction }).catch((err) => {
    return dispatch({ type: types.DELETE_TRANSACTION_FAILED });
  });
  dispatch({
    type: types.DELETE_TRANSACTION_SUCCESS,
    payload: { transaction },
  });
};

export const deleteUser = (user) => async (dispatch) => {
  dispatch({ type: types.MAKE_REQUEST_START });

  const url = "https://61aecea833653500172f9fbf.mockapi.io/loginRastrealo";

  await axios.post(url, { user }).catch((err) => {
    return dispatch({ type: types.DELETE_USER_FAILED });
  });
  dispatch({ type: types.DELETE_USER_SUCCESS, payload: { user } });
};

export const updateUser = (updatedUser) => async (dispatch) => {
  dispatch({ type: types.MAKE_REQUEST_START });

  const url = "https://61aecea833653500172f9fbf.mockapi.io/loginRastrealo";

  await axios.post(url, { updatedUser }).catch((err) => {
    return dispatch({ type: types.UPDATE_USER_FAILED });
  });
  dispatch({ type: types.UPDATE_USER_SUCCESS, payload: { updatedUser } });
};

export const getData = () => async (dispatch) => {
  dispatch({ type: types.MAKE_REQUEST_START });

  const url = "https://61aecea833653500172f9fbf.mockapi.io/getdata";

  const response = await axios.post(url, {  }).catch((err) => {
    return dispatch({ type: types.UPDATE_USER_FAILED });
  });
  dispatch({ type: types.GET_DATA_SUCCESS, payload: response.data  });
};
