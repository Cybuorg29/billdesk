import axios from "axios";
import { toast } from "react-toastify";

export function createProductApi(){
    return toast.promise(axios.post(``),{pending:''})
}