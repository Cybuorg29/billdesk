import { toast } from "react-toastify"
import { getIncomeFromToken } from "../../../api/dataServices"
import { store } from "../../app/store"
import { setIncome } from "../../features/IncomeAndExpences/IncomeAndExpences"
import { change } from "../../features/loader/loaderSlice"
import { IncomeAndExpencespayload } from "../../reducers/incAndExpReducer"


export const getIncome=async()=>{
    const {auth,incomeAndExpence}   = store.getState()
    if(!incomeAndExpence.isIncome){
        store.dispatch(change())

        if(!auth.istoken){
            toast.error('an error occured please refresh to continue ')
            store.dispatch(change())
        }else{
            const {data} = await getIncomeFromToken(auth.token)
            if(data?.code!==200){
                toast.error('an error occured please refresh to continue ')
                store.dispatch(change())
            }else{
                
                const pay:IncomeAndExpencespayload={
                    type:'income',
                    data:data.income
                }
                store.dispatch(setIncome(pay))
                store.dispatch(change())
            }
            
        }
    }
}


