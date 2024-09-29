import { combineReducers } from "redux";
import { authReducer } from "./auth.js";

// 2. combine multiple reducers
const rootReducer = combineReducers({
  auth: authReducer,
});

export default rootReducer;
