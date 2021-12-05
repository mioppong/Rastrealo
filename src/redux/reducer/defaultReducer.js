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
  currencies: [
    "AFN",
    "EUR",
    "ALL",
    "DZD",
    "USD",
    "AOA",
    "XCD",
    "ARS",
    "AMD",
    "AWG",
    "AUD",
    "AZN",
    "BSD",
    "BHD",
    "BDT",
    "BBD",
    "BYN",
    "BZD",
    "XOF",
    "BMD",
    "INR",
    "BTN",
    "BOB",
    "BOV",
    "BAM",
    "BWP",
    "NOK",
    "BRL",
    "BND",
    "BGN",
    "BIF",
    "CVE",
    "KHR",
    "XAF",
    "CAD",
    "KYD",
    "CLP",
    "CLF",
    "CNY",
    "COP",
    "COU",
    "KMF",
    "CDF",
    "NZD",
    "CRC",
    "HRK",
    "CUP",
    "CUC",
    "ANG",
    "CZK",
    "DKK",
    "DJF",
    "DOP",
    "EGP",
    "SVC",
    "ERN",
    "SZL",
    "ETB",
    "FKP",
    "FJD",
    "XPF",
    "GMD",
    "GEL",
    "GHS",
    "GIP",
    "GTQ",
    "GBP",
    "GNF",
    "GYD",
    "HTG",
    "HNL",
    "HKD",
    "HUF",
    "ISK",
    "IDR",
    "XDR",
    "IRR",
    "IQD",
    "ILS",
    "JMD",
    "JPY",
    "JOD",
    "KZT",
    "KES",
    "KPW",
    "KRW",
    "KWD",
    "KGS",
    "LAK",
    "LBP",
    "LSL",
    "ZAR",
    "LRD",
    "LYD",
    "CHF",
    "MOP",
    "MKD",
    "MGA",
    "MWK",
    "MYR",
    "MVR",
    "MRU",
    "MUR",
    "XUA",
    "MXN",
    "MXV",
    "MDL",
    "MNT",
    "MAD",
    "MZN",
    "MMK",
    "NAD",
    "NPR",
    "NIO",
    "NGN",
    "OMR",
    "PKR",
    "PAB",
    "PGK",
    "PYG",
    "PEN",
    "PHP",
    "PLN",
    "QAR",
    "RON",
    "RUB",
    "RWF",
    "SHP",
    "WST",
    "STN",
    "SAR",
    "RSD",
    "SCR",
    "SLL",
    "SGD",
    "XSU",
    "SBD",
    "SOS",
    "SSP",
    "LKR",
    "SDG",
    "SRD",
    "SEK",
    "CHE",
    "CHW",
    "SYP",
    "TWD",
    "TJS",
    "TZS",
    "THB",
    "TOP",
    "TTD",
    "TND",
    "TRY",
    "TMT",
    "UGX",
    "UAH",
    "AED",
    "USN",
    "UYU",
    "UYI",
    "UYW",
    "UZS",
    "VUV",
    "VES",
    "VND",
    "YER",
    "ZMW",
    "ZWL",
    "XBA",
    "XBB",
    "XBC",
    "XBD",
    "XTS",
    "XXX",
    "XAU",
    "XPD",
    "XPT",
    "XAG",
    "AFA",
    "FIM",
    "ALK",
    "ADP",
    "ESP",
    "FRF",
    "AOK",
    "AON",
    "AOR",
    "ARA",
    "ARP",
    "ARY",
    "RUR",
    "ATS",
    "AYM",
    "AZM",
    "BYB",
    "BYR",
    "BEC",
    "BEF",
    "BEL",
    "BOP",
    "BAD",
    "BRB",
    "BRC",
    "BRE",
    "BRN",
    "BRR",
    "BGJ",
    "BGK",
    "BGL",
    "BUK",
    "HRD",
    "CYP",
    "CSJ",
    "CSK",
    "ECS",
    "ECV",
    "GQE",
    "EEK",
    "XEU",
    "GEK",
    "DDM",
    "DEM",
    "GHC",
    "GHP",
    "GRD",
    "GNE",
    "GNS",
    "GWE",
    "GWP",
    "ITL",
    "ISJ",
    "IEP",
    "ILP",
    "ILR",
    "LAJ",
    "LVL",
    "LVR",
    "LSM",
    "ZAL",
    "LTL",
    "LTT",
    "LUC",
    "LUF",
    "LUL",
    "MGF",
    "MVQ",
    "MLF",
    "MTL",
    "MTP",
    "MRO",
    "MXP",
    "MZE",
    "MZM",
    "NLG",
    "NIC",
    "PEH",
    "PEI",
    "PES",
    "PLZ",
    "PTE",
    "ROK",
    "ROL",
    "STD",
    "CSD",
    "SKK",
    "SIT",
    "RHD",
    "ESA",
    "ESB",
    "SDD",
    "SDP",
    "SRG",
    "CHC",
    "TJR",
    "TPE",
    "TRL",
    "TMM",
    "UGS",
    "UGW",
    "UAK",
    "SUR",
    "USS",
    "UYN",
    "UYP",
    "VEB",
    "VEF",
    "VNC",
    "YDD",
    "YUD",
    "YUM",
    "YUN",
    "ZRN",
    "ZRZ",
    "ZMK",
    "ZWC",
    "ZWD",
    "ZWN",
    "ZWR",
    "XFO",
    "XRE",
    "XFU",
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
    case types.LOGIN_START:
      return newState;

    case types.LOGIN_SUCCESS:
      const { token, users, transactions, accountOwnerInfo } = action.payload;
      newState.accountOwnerInfo = accountOwnerInfo;
      newState.token = token;
      newState.users = users;
      newState.transactions = transactions;

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

    case types.CREATE_USER_FAILED:
      return newState;

    case types.CREATE_TRANSACTION_START:
      newState.loading = true;
      return newState;

    case types.CREATE_TRANSACTION_SUCCESS:
      const { newTransaction } = action.payload;
      newState.transactions.push(newTransaction);
      newState.loading = false;
      return newState;

    case types.DELETE_TRANSACTION_START:
      return newState;
    case types.DELETE_TRANSACTION_SUCCESS:
      const { transaction } = action.payload;
      newState.transactions = newState.transactions.filter(
        (item) => item.id !== transaction.id
      );

      return newState;
    case types.DELETE_USER_START:
      return newState;
    case types.DELETE_USER_SUCCESS:
      const { user } = action.payload;
      newState.users = newState.users.filter(
        (item) => item.number !== user.number
      );
      return newState;
    case types.UPDATE_USER_START:
      newState.loading = true;

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
    case types.UPDATE_USER_FAILED:
      return newState;
    case types.DELETE_USER_FAILED:
      return newState;
    case types.DELETE_TRANSACTION_FAILED:
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
