import { Button } from '@mui/material'
import React from 'react'
import { toast } from 'react-toastify'

type Props = {name:any,updateUser:()=>void}

const Update = ({name,updateUser}: Props) => {
   if(name=''){
    return (
        <>
         <div  className='p-5' ><Button variant='outlined' onClick={()=>updateUser()} color='info' >Update</Button></div>
        </>
    )
}else{
    return(
        <>
        <div  className='p-5' ><Button variant='outlined' onClick={()=>{
            toast.success('your request has been send ')
            toast.info('Soon our team will contact you ')

            }} color='info' >Request Update</Button></div>

        </>
    )
   }
}

export default Update