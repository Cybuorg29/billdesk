import { toast } from "react-toastify";
import { getUpdates } from "../../api/v2/notifications/notification.api";
import { responceObj } from "../../models/responce";
import { store } from "../app/store";
import { actionPayload } from "../payload/payloadModel";
import { setNotifications } from "../features/notifications/notificationsSlice";
import { notificationsTypes } from "../reducers/notifications/const.type";

    
     async function  getUpdate(){
     try{
       const {istoken} = store.getState().auth
          if(!istoken){
            

          }else{
             
            const {data} = await getUpdates(store.getState().userData._id);
            const res:responceObj=data;
            if(res.code===200) sucess(res) 
            else new  Error('server error');
          }
          }catch(err:any){
            console.log(err.message);
            toast.error('an error occured please try again');

     }

   } 
   function sucess(res:responceObj){
     if(res.code===200){
            const {notification} = store.getState().Notification
            if(notification.length>res.package.length){
              toast.info(res.package[0]?.title)
            }
         const payload:actionPayload={
             type:notificationsTypes.set,
             data:res.package
            }
            store.dispatch(setNotifications(payload));
        }

   }


export  default getUpdate