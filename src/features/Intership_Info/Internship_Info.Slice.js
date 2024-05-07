import { createSlice } from '@reduxjs/toolkit'

const UserInputIntership = {
    CompanyName : "",
    Internshipduration : "",
    }
export const Intership_InfoSlice = createSlice({

    name:'AboutInternship',
    initialState:{UserInputIntership},
    reducers:{
        
        HandleInputForm: (state,action)=>{
            state.UserInputIntership = action.payload
           
        }
        
    }
    
})
export const IntershipInfo = Intership_InfoSlice.actions
export default Intership_InfoSlice.reducer;


