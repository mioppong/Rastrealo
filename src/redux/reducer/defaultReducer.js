import types from "../actionTypes";
import { saveToken } from "../../api/localStorage";
export const initialState = {
  accountOwnerInfo: {
    id: "",
    firstName: "",
    lastName: "",
    email: "",
  },
  token: "",
  users: [],
  transactions: [],
  currencies: [
   
  ],
  exportingArray: [
    [
      "id",
      "Sender",
      "Receiver + Phone number",
      "Sending Amount + Currency",
      "Receiving Amount + Currency",
      "Date",
    ],
  ],
  exportingTodayArray: [
    [
      "id",
      "Sender",
      "Receiver + Phone number",
      "Sending Amount + Currency",
      "Receiving Amount + Currency",
      "Date",
    ],
  ],

  loading: false,
};

const defaultReducer = (state = initialState, action) => {
  let newState = { ...state };

  switch (action.type) {
    case types.MAKE_REQUEST_START:
      newState.loading = true;
      return newState;

    case types.LOGIN_SUCCESS:
      const { users, transactions, token, accountOwnerInfo,currencies } = action.payload;
      console.log('action.payload is', action.payload)
      newState.accountOwnerInfo = accountOwnerInfo;
      newState.token = token;
      newState.users = users;
      newState.currencies = currencies
      newState.transactions = transactions;
      newState.loading = false;
      saveToken(token);
      return newState;

    case types.LOGIN_FAILED:
      return newState;

    case types.CREATE_USER_SUCCESS:
      const { newUser } = action.payload;
      newState.users.push(newUser);
      newState.loading = false;

      return newState;

    case types.CREATE_USER_FAILED:
      return newState;

    case types.CREATE_TRANSACTION_SUCCESS:
      const { newTransaction } = action.payload;
      newState.transactions.push(newTransaction);
      newState.loading = false;
      return newState;

    case types.DELETE_TRANSACTION_SUCCESS:
      const { transaction } = action.payload;
      newState.transactions = newState.transactions.filter(
        (item) => item.id !== transaction.id
      );
      newState.loading = false;

      return newState;

    case types.DELETE_USER_SUCCESS:
      const { user } = action.payload;
      newState.users = newState.users.filter(
        (item) => item.number !== user.number
      );
      newState.loading = false;

      return newState;
    case types.UPDATE_USER_SUCCESS:
      const { updatedUser } = action.payload;

      newState.users.forEach((eachUser) => {
        if (eachUser.id === updatedUser.id) {
          eachUser.name = updatedUser.name;
          eachUser.number = updatedUser.number;
          eachUser.otherInfo = updatedUser.otherInfo;
        }
      });
      newState.loading = false;

      return newState;
    case types.GET_DATA_SUCCESS:
      console.log('data is', action.payload)
      // newState.accountOwnerInfo = action.payload.accountOwnerInfo;
      // newState.users = action.payload.users;
      // newState.transactions = action.payload.transactions;
      newState.loading = false;

      return newState;
    case types.UPDATE_USER_FAILED:
      return newState;
    case types.DELETE_USER_FAILED:
      return newState;
    case types.DELETE_TRANSACTION_FAILED:
      return newState;
    case types.CREATE_TRANSACTION_FAILED:
      return newState;

    case types.LOGOUT:
      localStorage.removeItem("token");

      return {};

    default:
      return newState;
  }
};

const exportObj = { initialState, reducer: defaultReducer };

export default exportObj;
