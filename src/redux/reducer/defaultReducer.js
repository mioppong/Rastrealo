import types from "../actionTypes";

export const initialState = {
  userInfo: {
    id: "",
    firstName: "",
    lastName: "",
    email: "",
  },
  token: "",
  loading: false,
  data: {},
};

const defaultReducer = (state = initialState, action) => {
  let newState = { ...state };

  switch (action.type) {
    case types.LOGIN_START:
      return newState;

    case types.LOGIN_SUCCESS:
      const { email, token, id } = action.payload;
      newState.userInfo.id = id;
      newState.token = token;
      newState.userInfo.email = email;
      return newState;

    case types.LOGIN_FAILED:
      return newState;

    case types.LOGOUT:
      newState = {};
      return newState;

    default:
      return newState;
  }
};

const exportObj = { initialState, reducer: defaultReducer };

export default exportObj;
