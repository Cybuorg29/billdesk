import { toast } from "react-toastify"
import { store } from "../../app/store";
import { CreateRequest } from "../../../api/connections/ConnectionServices";
import { responceObj } from "../../../models/responce";
import { responceFailure } from "../../../utils/Responce/Failure";
import { change } from "../../features/loader/loaderSlice";

export  async  function sendRequest (id:string,type:Number){
    try{
         store.dispatch(change());
         const {_id} =  store.getState().userData;
          const {data} = await  CreateRequest(_id,id,type);
          const res:responceObj = data;
          (res.code===200)?sucess(res):responceFailure(res.message);
          store.dispatch(change());  
    }catch(err:any){
        console.log(err.message)
        toast.error('an error has occured please try again');
    }
}

function sucess(res:responceObj){
              toast.success('request send Sucessfully') 
}