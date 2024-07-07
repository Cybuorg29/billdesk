import axios from "axios";
import { toast } from "react-toastify";
import { v2Url } from "../../Url/ProdUrl";

export function addIncomeApi(data:any){
    return toast.promise(axios.post(`${v2Url}/api/user/create/income`,{...data}),{pending:'saving Income'});
}