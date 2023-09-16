import React from 'react'
import { SolidButton } from '../../../../components/ui/Buttons/solid/SolidButton'
import { Button } from '@mui/material'
import MailIcon from '@mui/icons-material/Mail';
import CallIcon from '@mui/icons-material/Call';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { userDetailSchema } from '../../../../models/userModel';

type Props = {data:userDetailSchema}

const ContactSection = ({data}: Props) => {
  return (
    <div className=' p-4 flex flex-col gap-3  ' >
    <div className='text-xl font-bold text-grayFont' >Contact</div>
    <div className='font-s1 text-black'> <span className='text-gray-500'><LocationOnIcon /></span> {data?.building + ' , ' + data?.city + ' , ' + data?.district + ' , ' + data?.state + ' - ' + data?.pincode}</div>
    <div className='font-s1 text-black'> <span className='text-red-700'><MailIcon /></span> {data?.email}</div>
    <div className='font-s1 text-black'> <span className='text-green-700'><CallIcon /></span> {data?.phone}</div>
    <div className='grid grid-cols-2 gap-5  justify-items-center' >
        {/* <Button variant='outlined' >Add as Client</Button> */}
        <SolidButton color='black' innerText='Add as Client' onClick={() => { }} key={'Supplier Button'} />
        <SolidButton color='black' innerText='Add as Supplier' onClick={() => { }} key={'Supplier Button'} />
    </div>
    <div className='text-center font-bold' >Or</div>
    <div className='grid justify-items-center '>
        <Button variant='outlined' color='success' >Ask Quotation</Button>
    </div>
</div>

  )
}

export default ContactSection