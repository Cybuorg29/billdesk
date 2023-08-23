import React from 'react'
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import { JsxAttribute, JsxElement } from 'typescript';

type Props = { onclick: any; color: 'black' | 'blue' };
export  const DeleteIcon =({onclick,color}:Props)=>{
          let obj:any;
         if(color==='black'){
            obj =  <div className='rounded-full hover:bg-gray-400/20  p-1' >
            <DeleteRoundedIcon className='cursor-pointer ' onClick={()=>{onclick()}} />
            </div>
         }else if(color==='blue'){
          obj = <div className='rounded-full hover:bg-gray-400/20  p-1' >
           <DeleteRoundedIcon className='cursor-pointer '  color='primary' onClick={()=>{onclick()}} />
          </div>
         }
         return obj;
}

const icon =  <div className='rounded-full'>
 
</div>

