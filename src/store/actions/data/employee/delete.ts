import { toast } from "react-toastify";
import { deleteEmployeeById } from "../../../../api/employee/employeeServices";
import { store } from "../../../app/store"
import { change } from "../../../features/loader/loaderSlice";
import { actionPayload } from "../../../payload/payloadModel";
import { setEmployee } from "../../../features/employee/employeeSlice";


export const deleteEmployee=async(_id:string)=>{
     try{
         store.dispatch(change())
        const {auth} = store.getState()
         const {token} = auth;
         const  {data} = await deleteEmployeeById(_id,token);
          if(data.code===500){
             toast.error(data?.message)
              console.log(data?.error)
              store.dispatch(change())
          }else if(data?.code!==200 ){
             toast.error(data?.message)
              store.dispatch(change())
          }else if(data?.code===200){

             const payload:actionPayload={
               data:_id,
               type:'delete'
             }
             store.dispatch(setEmployee(payload))
              store.dispatch(change())
              toast.success('employee deleted sucessfully ');
            }
            
            
        }catch(err:any){
            store.dispatch(change())
            toast.error('an error occured ')
            console.log(err.message)
            
     }
}