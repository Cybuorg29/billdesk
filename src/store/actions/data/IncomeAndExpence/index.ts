import { toast } from "react-toastify";
import { store } from "../../../app/store";
import { change } from "../../../features/loader/loaderSlice";
import { getIncAndExpByMonth } from "../../../../api/incomeAndExpences";
import { actionPayload } from "../../../payload/payloadModel";
import { setIncomeAndExpence } from "../../../features/IncomeAndExpences/IncomeAndExpences";


export const  changeIncomeAndExpenceByMonth=async(month:number)=>{
    try{
        store.dispatch(change());
        const {auth} = store.getState()
        const {token} = auth
        const {data} =  await getIncAndExpByMonth(token,month);
        if(data?.code!== 200){
            toast.error(data?.message);
            store.dispatch(change());
          }else{
             console.log('data',data)

               
            
               const  payload:actionPayload = {
                type:'initlise',
                data:{
                    income:data?.income,
                    expences:data?.expence,
                    month:month
                }
              }
               store.dispatch(setIncomeAndExpence(payload))

              store.dispatch(change())
          }


    }catch(err:any){
        console.log(err);
        toast.error("an error occured ")
        store.dispatch(change())
    }
}