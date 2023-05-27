
import axios from "axios";

export class userService{
    private static URL:string = 'http://localhost:5000'
    private static registerCall:string = '/register'
 
     public static register=()=>{
        return axios.get(`${this.URL}`)
     }

    //  public static 

}