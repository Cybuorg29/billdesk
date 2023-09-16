import React from 'react'
import VisibilityIcon from '@mui/icons-material/Visibility';

type props  = {onclick:any,color:'black'|'blue',tooltip:string}

const ViewIcon = ({color,onclick,tooltip}: props) => {
    let  obj:any ;
     if(color==='black'){
          obj =  <div className='rounded-full hover:bg-gray-400/20  p-1'   onClick={()=>onclick()}  title={tooltip} >
           <VisibilityIcon className='cursor-pointer' />
          </div>
     }else if(color ==='blue') {
         obj =<div className='rounded-full hover:bg-gray-400/20  p-1' title={tooltip}  onClick={()=>{onclick()}} >
           <VisibilityIcon  color='primary' className='cursor-pointer'   /> 
         </div>
     }
     return obj;
}

export default ViewIcon