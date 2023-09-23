import axios from "axios"
import { baseUrl } from "../Url/ProdUrl"
import { toast } from "react-toastify";

export const searchProfile =(token:string)=>{
     const cancelToken = axios.CancelToken.source()
      const config = {cancelToken:cancelToken.token};
    return axios.get(`${baseUrl}/api/search/user/${token}`,config);

}