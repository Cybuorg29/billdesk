import React from 'react'
import VisibilityIcon from '@mui/icons-material/Visibility';

type props  = {onclick:any,color:'black'|'blue'}

const ViewIcon = ({color,onclick}: props) => {
    let  obj:any ;
     if(color==='black'){
          obj =  <div className='rounded-full hover:bg-gray-400/20  p-1' onClick={()=>onclick()} >
           <VisibilityIcon className='cursor-pointer' />
          </div>
     }else if(color ==='blue') {
         obj =<div className='rounded-full hover:bg-gray-400/20  p-1' >
           <VisibilityIcon  color='primary' className='cursor-pointer' onClick={()=>{onclick()}} /> 
         </div>
     }
     return obj;
}

export default ViewIcon