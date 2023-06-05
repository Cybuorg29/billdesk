import { Button } from '@mui/material'
import React from 'react'

type Props = {open:any}

const ClientFronPageTab = ({open}: Props) => {
  return (
    <div className='p-5 shadow-lg border grid  lg:grid-cols-2  items-center' >
        <div className='text-xl ' >All Clients</div>
        <div className=' gap-5  flex justify-end  justify-items-end  items-center ' >
        <div><Button  variant='outlined'  onClick={()=>open()} >Add Client</Button></div>
        <div><Button  variant='outlined'  color='error' >Delete Client</Button></div>
        </div>
    </div>
  )
}

export default ClientFronPageTab