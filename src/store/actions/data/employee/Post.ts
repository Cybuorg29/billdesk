import { toast } from "react-toastify"
import { store } from "../../../app/store"
import { postEmployee } from "../../../../api/employee/employeeServices"
import { actionPayload } from "../../../reducers/employeeReducer"
import { change } from "../../../features/loader/loaderSlice"
import { setEmployee } from "../../../features/employee/employeeSlice"


interface employeeobj {
    name: string;
    adress: string;
    salary: number;
    balance: number;
    id: string;
    image: any;
    type: number;
    phone: string;
}

export const ADDEmployee=async(employee:employeeobj)=>{
    try{
            console.log('iamge',employee?.image)
          if(employee?.image=== undefined||employee?.image=== null){
            toast.error('please add Image')
          }else{    

              store.dispatch(change())
              const {auth} = store.getState()
              const {token} = auth ;
        const {data} =  await  postEmployee(employee,token);
        if(data?.code===500){
            console.log(data?.description);
            toast.error('an error occured ')
            store.dispatch(change())
            
        }else if(data?.code!==200){
            toast.error(data?.message);
            store.dispatch(change())
         }else{
                 const payload:actionPayload={
                    data:data?.data,
                    type:'add'
                 }
                 store.dispatch(setEmployee(payload))
                 store.dispatch(change())
                 toast.success('employee added sucessfully')
                }
        }
    }catch(err:any){
        console.log(err.message)
        console.log(err)
        toast.error('an error occured please try again ')
        store.dispatch(change())
    }

}