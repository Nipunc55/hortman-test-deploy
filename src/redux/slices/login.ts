import { createSlice } from "@reduxjs/toolkit";

export const loginSlice = createSlice({
  name: "login",
  initialState: {
    phoneNumber: ""
  },
  reducers: {
    updatePhoneNumber: (state, action) => {
      state.phoneNumber = action.payload;
    }
  }
});

export const { updatePhoneNumber } = loginSlice.actions;

export const selectPhoneNumber = (state: any) => state.login.phoneNumber;
export default loginSlice.reducer;
