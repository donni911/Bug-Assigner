import { createSlice } from "@reduxjs/toolkit";
let lastId = 0;

const slice = createSlice({
  name: "users",
  initialState: [],
  reducers: {
    usersAdded: (users, action) => {
      users.push({
        id: ++lastId,
        name: action.payload.name,
      });
    },
  },
});

export const { usersAdded } = slice.actions;

export default slice.reducer;
