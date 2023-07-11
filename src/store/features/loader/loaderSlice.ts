import { createSlice } from "@reduxjs/toolkit"
import { loaderSwitch } from "../../reducers/loaderReducer"
import { RootState } from "../../app/store"

export interface loaderscale {
    scale: boolean
}

const initialState: loaderscale = {
    scale: false
}

const loaderSlice = createSlice({
    name: 'loader',
    initialState,
    reducers: {
        change: loaderSwitch,
    }
})

// export const { switch } = loaderSlice.actions
export const { change } = loaderSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.counter.value

export default loaderSlice.reducer