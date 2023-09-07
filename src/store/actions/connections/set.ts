import { toast } from "react-toastify";
import { store } from "../../app/store";
import { getConnectionsData } from "../../../api/connections/ConnectionSerives";
import { responceObj } from "../../../models/responce";
import { actionPayload } from "../../payload/payloadModel";
import { setConnections } from "../../features/Connections/ConnectionsSlide";
import { change } from "../../features/loader/loaderSlice";

export async function   getConnection(){
     try{
        store.dispatch(change())
         const {auth} = store.getState();
         const {token} = auth;
          const  {data} = await getConnectionsData(token);
           const res:responceObj = data;
          if(res.code===200){
            sucess(res.package)
          
          }
          store.dispatch(change());

     }catch(err:any){
        console.log(err?.message);
          toast.error("an error occured please try again")
          store.dispatch(change());

     }

}


async function sucess(pkg:any) {

      const payload:actionPayload={
         type:'set',
         data:pkg
      }
      
      store.dispatch(setConnections(payload));

}

function failure(message:string){
   console.log(message);
}
