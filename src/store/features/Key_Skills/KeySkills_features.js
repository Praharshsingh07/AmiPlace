import { createSlice, nanoid } from "@reduxjs/toolkit";

export const KeySkillsInfo = createSlice({
  name: "KeySkillsData",
  initialState: {
    skills: [],
  },
  reducers: {
    Add: (state, action) => {
      const skill = {
        id: nanoid(),
        text: action.payload,
      };
      state.skills.push(skill);
    },

    Remove: (state, action) => {
      state.skills = state.skills.filter(
        (skill) => skill.id !== action.payload
      );
    },
  },
});

export const KeySkillInfoAction = KeySkillsInfo.actions;
export default KeySkillsInfo.reducer;
