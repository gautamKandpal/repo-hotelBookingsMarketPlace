import { combineReducers } from "redux";
import { authReducer } from "./auth.js";

// 2. combine multiple reducers
const rootReducer = combineReducers({
  user: authReducer,
});

export default rootReducer;
