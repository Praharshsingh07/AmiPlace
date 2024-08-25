import { createSlice } from "@reduxjs/toolkit";

const class10_Input = {
  ExaminationBoard10th: "",
  Percentage10th: "",
  PassingYear10th: "",
};
export const Class10th_Info = createSlice({
  name: "class10",
  initialState: { class10_Input },
  reducers: {
    HandleInputForm3: (state, action) => {
      state.class10_Input = action.payload;
    },
  },
});
export const class10thAction = Class10th_Info.actions;
export default Class10th_Info.reducer;
