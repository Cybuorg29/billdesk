import React from 'react'
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
type props  = {onclick:any,color:'black'|'blue'}

const MinusIcon = ({color,onclick}: props) => {
    let  obj:any ; 
    if(color==='black'){
         obj =  <div className='rounded-full hover:bg-gray-400/20  p-1' onClick={()=>onclick()} >
          <RemoveCircleOutlineIcon className='cursor-pointer' />
         </div>
    }else if(color ==='blue') {
        obj =<div className='rounded-full hover:bg-gray-400/20  p-1' >
          <RemoveCircleOutlineIcon color='primary' className='cursor-pointer' onClick={()=>{onclick()}} /> 
        </div>
    }
    return obj;
  
}

export default MinusIcon