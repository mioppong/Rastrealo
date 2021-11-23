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
  users: [
    { id: "435345", name: "daniel", number: "456", otherInfo: "" },
    { id: "234325342", name: "mike", number: "123", otherInfo: "" },
    { id: "4353453453", name: "mike", number: "123", otherInfo: "" },
  ],
  transactions: [
    {
      id: "9478567",
      from: { name: "mike", number: "123", otherInfo: "" },
      to: { name: "daniel", number: "456", otherInfo: " " },
      amount: "2000",
      currency: "CAD",
      date: "",
    },
    {
      id: "324234",
      from: { name: "mike", number: "123", otherInfo: "" },
      to: { name: "daniel", number: "456", otherInfo: " " },
      amount: "2000",
      currency: "CAD",
      date: "",
    },
    {
      id: "3453453453",
      from: { name: "mike", number: "123", otherInfo: "" },
      to: { name: "daniel", number: "456", otherInfo: " " },
      amount: "2000",
      currency: "CAD",
      date: "",
    },
  ],
};

const defaultReducer = (state = initialState, action) => {
  let newState = { ...state };

  switch (action.type) {
    case types.LOGIN_START:
      return newState;

    case types.LOGIN_SUCCESS:
      const { email, token, id } = action.payload;
      newState.accountOwnerInfo.id = id;
      newState.token = token;
      newState.accountOwnerInfo.email = email;
      return newState;

    case types.LOGIN_FAILED:
      return newState;

    case types.CREATE_USER_START:
      return newState;

    case types.CREATE_USER_SUCCESS:
      const { newUser } = action.payload;
      newState.users.push(newUser);
      return newState;

    case types.CREATE_USER_FAILED:
      return newState;

    case types.CREATE_TRANSACTION_START:
      return newState;

    case types.CREATE_TRANSACTION_SUCCESS:
      const { newTransaction } = action.payload;
      newState.transactions.push(newTransaction);
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
