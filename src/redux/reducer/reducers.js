import { combineReducers } from "redux";
import defaultReducer from "./defaultReducer";

// import all reducers, then combine them here
// if we create a new reducer, add it to the line below, and import it above

const reducers = combineReducers({
  homeStore: defaultReducer.reducer,
});

export default reducers;
