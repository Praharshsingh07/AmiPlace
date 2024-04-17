import { createSlice } from "@reduxjs/toolkit";

const universalClickSlice = createSlice({
  name: "universalOnClick",
  initialState: {
    click: 0,
  },
  reducers: {
    toggle: (state) => {
      state.click = Math.floor(Math.random() * (10000 - 0 + 1)) + 0;
      // console.log("value toggle", state.click);
    },
  },
});
export const universalClickAction = universalClickSlice.actions;
export default universalClickSlice;
