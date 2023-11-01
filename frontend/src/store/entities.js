import { combineReducers } from "redux";

import bugsReducer from "./slices/bugs.js";

export default combineReducers({
  bugs: bugsReducer,
});
