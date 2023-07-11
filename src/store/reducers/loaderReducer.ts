import { loaderscale } from "../features/loader/loaderSlice";


export const loaderSwitch = (state: loaderscale) => {
    if (state.scale === true) {
        state.scale = false
    } else {
        state.scale = true
    }

}