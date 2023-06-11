import { loaderscale } from "../features/loader/loaderSlice";


export const loaderSwitch=(state:loaderscale)=>{
    if(state.scale==='scale-100'){
        state.scale = 'scale-0'
    }else{
        state.scale = 'scale-100'
    }

}