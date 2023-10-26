import React from 'react'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
type Props = {onclick:any,color:'black'|'blue'}

const AddIcon = ({color,onclick}: Props) => {
    let  obj:any ;
     if(color==='black'){
          obj =  <div className='rounded-full hover:bg-gray-400/20  p-1' onClick={()=>onclick()} >
           <AddCircleOutlineIcon className='cursor-pointer' />
          </div>
     }else if(color ==='blue') {
         obj =<div className='rounded-full hover:bg-gray-400/20  p-1' >
           <AddCircleOutlineIcon  color='primary' className='cursor-pointer' onClick={()=>{onclick()}} /> 
         </div>
     }
     return obj;
}

export default AddIcon