import { createSelector, createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "../api";
import moment from "moment";

import { Bug } from '../../types/Bug.ts'

import { AppDispatch, RootState } from "../store.ts";

type InitialState = {
  list: Array<Bug>,
  loading: boolean,
  lastFetch?: undefined | null | number,
}

const initialState: InitialState = {
  list: [],
  loading: false,
  lastFetch: null,
}

const slice = createSlice({
  name: "bugs",
  initialState,

  reducers: {
    bugsRequested: (bugs, action) => {
      bugs.loading = true;
    },

    bugsRequestFailed: (bugs, action) => {
      bugs.loading = false;
    },

    bugsReceived: (bugs, action) => {
      bugs.list = action.payload;
      bugs.loading = false;
      bugs.lastFetch = Date.now();
    },

    bugAdded: (bugs, action) => {
      bugs.list.push(action.payload);
    },

    bugResolved: (bugs, action) => {
      const index = bugs.list.findIndex((bug: Bug) => bug._id === action.payload.id);
      bugs.list[index].resolved = true;
    },

    bugAssignedToUser: (bugs, action) => {
      const { id: bugId, userId } = action.payload;
      const index = bugs.list.findIndex((bug: Bug) => bug._id === bugId);
      bugs.list[index].userId = userId;
    },
  },
});

export const {
  bugAdded,
  bugResolved,
  bugAssignedToUser,
  bugsReceived,
  bugsRequested,
  bugsRequestFailed,
} = slice.actions;

export default slice.reducer;

// Action Creators
const url = "/bugs";

export const loadBugs = () => (dispatch: AppDispatch, getState: () => RootState) => {
  const lastFetch = getState().entities.bugs.lastFetch;

  const diffInMinutes = moment().diff(moment(lastFetch), "minutes");

  if (diffInMinutes < 10) {
    return;
  }

  return dispatch(
    apiCallBegan({
      url,
      onStart: bugsRequested.type,
      onSuccess: bugsReceived.type,
      onError: bugsRequestFailed.type,
      // Specific
      // onError: actions.apiCallFailed.type,
    })
  );
};

// make an api call;
// promise resolved => dispatch(success) / dispatch(fail)
export const addBug = (bug: Bug) =>
  apiCallBegan({
    url,
    method: "post",
    data: bug,
    onSuccess: bugAdded.type,
  });

export const resolveBug = (id: string) =>
  apiCallBegan({
    url: url + `/${id}`,
    method: "patch",
    data: { resolved: true },
    onSuccess: bugResolved.type,
  });

export const assignBugToUser = (bugId: string, userId: string) =>
  apiCallBegan({
    url: url + `/${bugId}`,
    method: "patch",
    data: { userId },
    onSuccess: bugAssignedToUser.type,
  });

// Selector functions
// export const getUnresolvedBugs = (state) => {
//   return state.entities.bugs.filter((bug) => !bug.resolved);
// };

// Memoization
export const getUnresolvedBugs = createSelector(
  (state: RootState) => state.entities.bugs,
  (bugs) => bugs.list.filter((bug) => !bug.resolved)
);

// Memoization
export const getBugByUser = (userId: string) =>
  createSelector(
    (state: RootState) => state.entities.bugs.list,
    (bugs) => bugs.filter((bug) => bug.userId === userId)
  );
