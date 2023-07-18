import { erpAssets } from "../../../images/ImageExport"


interface ImagetabObj {
  name: string;
  amount: any;
  logo: any;
  sign: any;
}
interface ImagetabsArray{
    array:ImagetabObj[]
}

 const ImageTabs=({name,amount,logo,sign}:ImagetabObj)=>{
    return  <div className="hover:scale-105  duration-150 cursor-pointer w-full h-full rounded-xl relative"  > 
        <div  className="absolute w-full h-full " >
            <div className="h-[40%] bg-red-900" ></div>
        </div>
        <img className="h-full w-full  rounded-xl  " src={erpAssets.tabBackground2} ></img>
    </div>
    
}

export default ImageTabs