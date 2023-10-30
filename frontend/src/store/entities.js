import { combineReducers } from "redux";

import bugsReducer from "./bugs.js";
import projectsReducer from "./projects.js";
import usersReducer from "./users.js";

export default combineReducers({
  bugs: bugsReducer,
  projects: projectsReducer,
  users: usersReducer,
});
