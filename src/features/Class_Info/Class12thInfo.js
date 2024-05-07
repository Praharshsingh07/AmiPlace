import { createSlice } from '@reduxjs/toolkit'

const class12_Input = {
    ExaminationBoard:"",
    Percentage:"",
    PassingYear:"",
    }
export const Class12th_Info = createSlice({

    name:'class12',
    initialState: {class12_Input},
    reducers:{
        
       
        HandleInputForm3: (state,action)=>{
            state.class12_Input = action.payload
        }
        
    }
    
})
export const class12thAction = Class12th_Info.actions
export default Class12th_Info.reducer;


