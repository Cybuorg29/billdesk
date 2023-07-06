import { toast } from "react-toastify"
import { addExpences, getExpencesbyToken,getIncomeByToken } from "../../../api/dataServices"
import { store } from "../../app/store"
import {  setIncomeAndExpence } from "../../features/IncomeAndExpences/IncomeAndExpences"
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
            const {data} = await getIncomeByToken(auth.token)
            if(data?.code!==200){
                toast.error('an error occured please refresh to continue ')
                store.dispatch(change())
            }else{
                
                const payload:IncomeAndExpencespayload={
                    type:'income',
                    data:data.income
                }
                store.dispatch(setIncomeAndExpence(payload))
                store.dispatch(change())
            }
            
        }
    }
}

export const getExpences=async()=>{
    const {auth,incomeAndExpence} = store.getState()
     if(!incomeAndExpence.isExpences){
        store.dispatch(change())
        if(!auth.istoken){
            toast.error('an error occured please refresh to continue')
             store.dispatch(change())
        }else{
            const {data} = await getExpencesbyToken(auth.token)
            if(data?.code!==200){
                toast.error('an error occured please refresh the page ')
                 console.log(data.message)
                store.dispatch(change())
                 
            }else{
                 const payload:IncomeAndExpencespayload={
                     type:'expences',
                    data:data?.expences
                 }
                store.dispatch(setIncomeAndExpence(payload))
                store.dispatch(change())

            }
        }
     }

}

export const addExpence=async(Expence:any)=>{
      console.log('asdassda')
        try {

              store.dispatch(change())
              const { data } = await addExpences(Expence)
              toast.info(data.code)
              if (data?.code !== 200) {
                  
                  toast.error(data?.message)
                  store.dispatch(change())
                } else {
                    toast.success('expence added sucessfully')
                     const {incomeAndExpence} =store.getState()
                      let {expences} = incomeAndExpence
                       let newExpence = [...expences,Expence]
                       const payload:IncomeAndExpencespayload={
                        type:'income',
                        data:newExpence
                       }
                        store.dispatch(setIncomeAndExpence(payload))
                    store.dispatch(change())
            }
        } catch (err: any) {
            console.log(err)
            toast.error(err.message)
        }
}





