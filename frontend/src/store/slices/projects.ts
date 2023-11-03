import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "../api.ts";
import { Project } from "../../types/project";

// import moment from "moment";

type InitialState = {
  list: Array<Project>,
  loading: boolean,
  lastFetch: Number | null,
}

const initialState: InitialState = {
  list: [],
  loading: false,
  lastFetch: null,
}

const slice = createSlice({
  name: "projects",

  initialState,

  reducers: {
    projectsRequested: (projects) => {
      projects.loading = true;
    },

    projectsRequestFailed: (projects, action) => {
      projects.loading = false;
    },

    projectsReceived: (projects, action) => {
      projects.list = action.payload;
      projects.loading = false;
      projects.lastFetch = Date.now();
    },

    projectAdded: (project, action) => {
      const newProject = {
        ...action.payload,
      };
      project.list.push(newProject);
    },
  },
});

export const {
  projectAdded,
  projectsRequested,
  projectsRequestFailed,
  projectsReceived,
} = slice.actions;

const url = "/projects";

export const loadProjects = () => {
  // const { lastFetch } = getState().entities.projects;

  // const diffInMinutes = moment().diff(moment(lastFetch), "minutes");

  // if (diffInMinutes < 10) {
  //   return;
  // }

  return apiCallBegan({
    url,
    onStart: projectsRequested.type,
    onSuccess: projectsReceived.type,
    onError: projectsRequestFailed.type,
    // Specific
    // onError: actions.apiCallFailed.type,
  });
};

export const addProject = (project: Project) =>
  apiCallBegan({
    url,
    method: "post",
    data: project,
    onSuccess: projectAdded.type,
  });

export default slice.reducer;
