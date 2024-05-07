import { createSlice,nanoid} from "@reduxjs/toolkit";

const InitialKeySkillsValue = {skills: []}


export const KeySkillsInfo = createSlice({
    name:"KeySkills",
    initialState:InitialKeySkillsValue,
    reducers:{
      Add:(state,action)=>{
        const skill={
          id:nanoid(),
          text:action.payload
        }
        state.skills.push(skill)
        // state.skills = [...state.skills , skill]
      },

      Remove:(state,action)=>{
         state.skills= state.skills.filter((skill)=>skill.id !== action.payload)
         
      }
    }
})

export const KeySkillInfoAction = KeySkillsInfo.actions
export default  KeySkillsInfo.reducer;