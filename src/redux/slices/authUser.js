import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
};

const authUserSlice = createSlice({
  name: "auth-user",
  initialState,
  reducers: {
    setAuthUser: (state, action) => {
      const newState = {
        ...state,
        user: action.payload,
      };
      return newState;
    },
    removeAuthUser: () => {
      const newState = {
        ...initialState,
      };
      return newState;
    },
  },
});

export const { removeAuthUser, setAuthUser } = authUserSlice.actions;

export default authUserSlice.reducer;
