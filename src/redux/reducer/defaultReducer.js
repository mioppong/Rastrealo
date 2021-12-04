import { formattedMoney, dateIntToString } from "../../api";
import types from "../actionTypes";

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
  currencies: [],
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
    case types.LOGIN_START:
      return newState;

    case types.LOGIN_SUCCESS:
      const { token, users, transactions, accountOwnerInfo, currencies } =
        action.payload;
      newState.accountOwnerInfo = accountOwnerInfo;
      newState.token = token;
      newState.users = users;
      newState.transactions = transactions;
      newState.currencies = currencies;

      return newState;

    case types.LOGIN_FAILED:
      return newState;

    case types.CREATE_USER_START:
      newState.loading = true;
      return newState;

    case types.CREATE_USER_SUCCESS:
      const { newUser } = action.payload;
      newState.users.push(newUser);
      newState.loading = false;

      return newState;

    case types.CREATE_EXPORT_DATA:
      Array.from(action.payload).forEach((transaction, index) => {
        const newItemInArray = [
          `${index}`,
          `${transaction.from.name} ${transaction.from.number}`,
          `${transaction.to.name} ${transaction.to.number}`,
          `${formattedMoney(transaction.amount)} ${transaction.currency}`,
          `${formattedMoney(transaction.receivingAmount)} ${
            transaction.receivingCurrency
          }`,
          `${dateIntToString(transaction.date)}`,
        ];
        const itemsDate = new Date(transaction.date);
        const currentDate = new Date();
        if (
          itemsDate.getFullYear() === currentDate.getFullYear() &&
          itemsDate.getMonth() === currentDate.getMonth() &&
          itemsDate.getDate() === currentDate.getDate()
        ) {
          newState.exportingTodayArray.push(newItemInArray);
        }

        newState.exportingArray.push(newItemInArray);
      });
      return newState;

    case types.CREATE_USER_FAILED:
      return newState;

    case types.CREATE_TRANSACTION_START:
      newState.loading = true;
      return newState;

    case types.CREATE_TRANSACTION_SUCCESS:
      const { newTransaction } = action.payload;
      const newItemInArray = [
        `${newTransaction.id}`,
        `${newTransaction.from.name} ${newTransaction.from.number}`,
        `${newTransaction.to.name} ${newTransaction.to.number}`,
        `${formattedMoney(newTransaction.amount)} ${newTransaction.currency}`,
        `${formattedMoney(newTransaction.receivingAmount)} ${
          newTransaction.receivingCurrency
        }`,
        `${dateIntToString(newTransaction.date)}`,
      ];

      const itemsDate = new Date(newTransaction.date);
      const currentDate = new Date();

      if (
        itemsDate.getFullYear() === currentDate.getFullYear() &&
        itemsDate.getMonth() === currentDate.getMonth() &&
        itemsDate.getDate() === currentDate.getDate()
      ) {
        newState.exportingTodayArray.push(newItemInArray);
      }

      newState.transactions.push(newTransaction);
      newState.exportingArray.push(newItemInArray);

      newState.loading = false;
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
