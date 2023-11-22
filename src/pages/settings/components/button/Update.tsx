import { Button } from '@mui/material'
import React from 'react'
import { toast } from 'react-toastify'
import { SolidButton } from '../../../../components/ui/Buttons/solid/SolidButton'

type Props = {name:any,updateUser:()=>void}

const Update = ({name,updateUser}: Props) => {
   if(name=''){
    return (
        <>

         <SolidButton  color='black' innerText='Insert Data' onClick={()=>updateUser()} key={'button1'}/>
        </>
    )
}else{
    return(
        <>
        <div  className='p-5' >
             <SolidButton  color='black' innerText='REQUEST UPDATE' onClick={()=>{toast.success('you request has been received . ')}} key={'button1'}/>
            </div>

        </>
    )
   }
}

export default Update