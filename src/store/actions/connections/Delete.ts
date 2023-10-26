import { toast } from "react-toastify";
import { deleteConnectionApi } from "../../../api/connections/ConnectionServices";
import { responceObj } from "../../../models/responce";
import { store } from "../../app/store";
import { change } from "../../features/loader/loaderSlice";
import { userDetailSchema } from "../../../models/userModel";
import { actionPayload } from "../../payload/payloadModel";
import { ConnectionsActionObj } from "../../reducers/connections/connectionReducers";
import { setConnections } from "../../features/Connections/ConnectionsSlide";
import { getConnection } from "./set";

export async function deleteConnection(user:any,role:number) {
    try{
        const {_id} = store.getState().userData
        store.dispatch(change());
        const {token} = store.getState().auth
        const  {data} = await deleteConnectionApi(_id,user._id,role);
        const res:responceObj = data;
        console.log(res)
        if(res.code===200) {
            sucess(res,user.id,role)
        }else failure(res)

    }catch(err:any){
       console.log(err.message);
       toast.error('an error occured please try again ')
    }
    
    store.dispatch(change())
}

function sucess(res:responceObj,id:string,role:number){
    toast.success(res.message);
      getConnection();


}

function failure(res:responceObj){
    toast.error(res.message)
     if(res.code===500){
         console.log(res.error)
     }

}