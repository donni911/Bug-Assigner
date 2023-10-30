import { combineReducers } from "redux";

import bugsReducer from "./bugs.js";

export default combineReducers({
  bugs: bugsReducer,
});
