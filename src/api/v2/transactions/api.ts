import axios from "axios"
import { v2Url } from "../../Url/ProdUrl"
import { toast } from "react-toastify";

export const getMonthlyIncome=(token:string,month:number)=>{
    return   toast.promise(axios.get(`${v2Url}/api/user/get/income/${month}/${token}`),{pending:'getting incomes'});
}
export const getMonthlyExpences=(token:string,month:number)=>{
    return  toast.promise( axios.get(`${v2Url}/api/user/get/expence/${month}/${token}`),{pending:'getting expences'});
}


