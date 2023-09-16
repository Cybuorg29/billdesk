import { toast } from "react-toastify";
import { store } from "../../app/store";
import { getConnectionsData } from "../../../api/connections/ConnectionServices";
import { responceObj } from "../../../models/responce";
import { actionPayload } from "../../payload/payloadModel";
import { setConnections } from "../../features/Connections/ConnectionsSlide";
import { change } from "../../features/loader/loaderSlice";
import { userDetailSchema } from "../../../models/userModel";

export async function   getConnection(){
     try{
        
        const {auth,connections} = store.getState();
        const {isConnection} = connections
        const {istoken,token} = auth
         if(isConnection||!istoken){
                 
         }else{

            store.dispatch(change())
            const  {data} = await getConnectionsData(token);
            console.log(data)
            const res:responceObj = data;
            if(res.code===200){
               sucess(res.package)
               
            }else{
               failure(res.message)
            }
            store.dispatch(change());
         }

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
   toast.error('an error occured please try again')
   console.log(message);
}
