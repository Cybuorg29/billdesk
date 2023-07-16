import { toast } from "react-toastify"
import { getEmployees } from "../../../../api/employee/employeeServices"
import { useAppDispatch, useAppSelector } from "../../../app/hooks"
import { store } from "../../../app/store"
import { change } from "../../../features/loader/loaderSlice"
import { payloadAction } from "../../../payload/payloadModel"
import { setEmployee } from "../../../features/employee/employeeSlice"


export const EmployeeData=async()=>{
     const {auth,employees} = store.getState()
      const {employee,isEmployee} = employees;
     
     try{
        

         if(isEmployee){
            
        }else{
            store.dispatch(change());
            const {token}  = auth
            const {data} = await  getEmployees(token)
            if(data?.code!==200){
                console.log(data?.message);
                toast.error('an error occured ')
                store.dispatch(change())
            }else{
               const payload:payloadAction={
                type:'set',
                data:data?.message
               }
              store.dispatch(setEmployee(payload))
              store.dispatch(change())
            }
            
        }
    }catch(err:any){
        console.log(err.message);
        toast.error('an   error occured ')
       store.dispatch(change())
    }

}