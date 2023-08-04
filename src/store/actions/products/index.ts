import { toast } from "react-toastify";
import { store } from "../../app/store";
import { change } from "../../features/loader/loaderSlice";



export const getProducts=()=>{
    try{

        store.dispatch(change())

    }catch(err:any){
        console.log(err.message);
         toast.error('an error occured please try again ')
    }
}