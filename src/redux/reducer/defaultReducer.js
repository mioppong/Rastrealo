import types from "../actionTypes";

export const initialState = {
  accountOwnerInfo: {
    id: "",
    firstName: "",
    lastName: "",
    email: "",
  },
  token: "",
  loading: false,
  users: [],
  transactions: [],
  currencies: ['GHS', 'CAD', 'USD']
};

const defaultReducer = (state = initialState, action) => {
  let newState = { ...state };

  switch (action.type) {
    case types.LOGIN_START:
      return newState;

    case types.LOGIN_SUCCESS:
      const { email, token, id, users, transactions } = action.payload;
      newState.accountOwnerInfo.id = id;
      newState.token = token;
      newState.accountOwnerInfo.email = email;
      newState.users = users;
      newState.transactions = transactions;
      return newState;

    case types.LOGIN_FAILED:
      return newState;

    case types.CREATE_USER_START:
      newState.loading = true
      return newState;

    case types.CREATE_USER_SUCCESS:
      const { newUser } = action.payload;
      newState.users.push(newUser);
      newState.loading = false

      return newState;

    case types.CREATE_USER_FAILED:

      return newState;

    case types.CREATE_TRANSACTION_START:
      newState.loading = true
      return newState;

    case types.CREATE_TRANSACTION_SUCCESS:
      const { newTransaction } = action.payload;
      newState.transactions.push(newTransaction);
      newState.loading = false
      return newState;

    case types.CREATE_TRANSACTION_FAILED:
      return newState;

    case types.LOGOUT:
      return {};

    default:
      return newState;
  }
};

const exportObj = { initialState, reducer: defaultReducer };

export default exportObj;
