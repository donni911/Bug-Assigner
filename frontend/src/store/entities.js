import { combineReducers } from "redux";

import bugsReducer from "./slices/bugs.js";
import projectsReducer from "./slices/projects.ts";

export default combineReducers({
  bugs: bugsReducer,
  projects: projectsReducer,
});
