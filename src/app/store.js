import { configureStore } from '@reduxjs/toolkit'
import RootReducers from './rootReducer'

export const store = configureStore({
  reducer: RootReducers,
})
export default store;