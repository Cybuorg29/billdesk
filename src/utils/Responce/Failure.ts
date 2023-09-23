import { toast } from "react-toastify";

export function responceFailure(responce:any,fun?:Function){

    console.log(responce);
     if(fun){
        fun();
     }
     toast.error('an error occured please try again');

    
}