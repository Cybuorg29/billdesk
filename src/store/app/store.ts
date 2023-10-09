import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../features/counter/counterSlice'
import userSlice from '../features/user/userSlice'
import authSlice from '../features/auth/authSlice'
import loaderSlice from '../features/loader/loaderSlice'
import bankSlice from '../features/bank/bankSlice'
import trackerSlice from '../features/tracker/trackerSlice'
import incomeSlice from '../features/IncomeAndExpences/IncomeAndExpences'
import employeeSlice from '../features/employee/employeeSlice'
import  productSlice  from '../features/inventory/inventorySlice'
import  ConnectionSlice  from '../features/Connections/ConnectionsSlide'
import notificationsSlice from '../features/notifications/notificationsSlice'




export const store = configureStore({
  reducer: {
    counter: counterReducer, userData: userSlice, auth: authSlice, loader: loaderSlice, bank: bankSlice, tracker: trackerSlice, incomeAndExpence: incomeSlice,
     employees:employeeSlice,product:productSlice,connections:ConnectionSlice,Notification:notificationsSlice
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch