import React, { useState } from 'react'
import { Button, Grid, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'
import RemoveRedEyeRoundedIcon from '@mui/icons-material/RemoveRedEyeRounded';
import Tables from './components/Table';
import { useNavigate } from 'react-router-dom';
import Pop from '../pop/Pop';

type Props = {}

const ClientMain = (props: Props) => {
    const [popScale,setPopScale] = useState('scale-0')
    const navigate = useNavigate()
  return (
      <>
      <div  className='relative min-h-full' >
      <Pop scale={popScale} close={()=>setPopScale('scale-0')} />
      <div className='p-5 grid gap-5'>
      <div  className='p-5 shadow-sm border grid grid-cols-2 items-center' >
        <div className='text-xl' > Clients</div>
        <div className='grid justify-items-end' >
            <Button variant='outlined' onClick={()=>setPopScale('scale-100')} >Add Clients</Button>
        </div>
      </div>
      <Tables/>
      </div>
      </div>
      </>
  )
}

export default ClientMain