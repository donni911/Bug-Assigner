import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "../api.ts";
import { Project } from "../../types/Project";

import moment from "moment";
import { AppDispatch, RootState } from "../store.ts";

type InitialState = {
  list: Array<Project>,
  loading: boolean,
  errors: {},
  lastFetch?: undefined | null | number,
}

const initialState: InitialState = {
  list: [],
  loading: false,
  errors: {},
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
      console.log('fail');
      projects.loading = false;
      projects.errors = action.payload.errors;
    },

    projectsReceived: (projects, action) => {
      projects.list = action.payload.projects;
      projects.loading = false;
      projects.lastFetch = Date.now();
    },

    projectAdded: (projects, action) => {
      console.log('added');
      projects.loading = false;
      projects.errors = {};
      projects.list.push(action.payload.project);
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

export const loadProjects = (dispatch: AppDispatch, getState: () => RootState) => {
  const lastFetch = getState().entities.projects.lastFetch;
  const diffInMinutes = moment().diff(moment(lastFetch), "minutes");

  if (diffInMinutes < 1) {
    return;
  }

  return dispatch(apiCallBegan({
    url,
    onStart: projectsRequested.type,
    onSuccess: projectsReceived.type,
    onError: projectsRequestFailed.type,
    // Specific
    // onError: actions.apiCallFailed.type,
  }))
};

export const addProject = (project: Project) =>
  apiCallBegan({
    url,
    method: "post",
    data: project,
    onStart: projectsRequested.type,
    onSuccess: projectAdded.type,
    onError: projectsRequestFailed.type
  });

export default slice.reducer;
