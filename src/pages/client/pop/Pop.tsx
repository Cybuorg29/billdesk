import React, { useState } from 'react'
import TopSection from './components/TopSection'
import { Button, TextField } from '@mui/material'
import { FormControl } from '@mui/joy'
import { bankDetails, userDetailSchema } from '../../../models/userModel'
import DataFields from './components/DataFields'
import BankDetails from './components/BankDetails'

type Props = { scale: string, close: any }
const Pop = ({ scale, close }: Props) => {
  const [client, setClient]: any = useState<userDetailSchema>({
    name: '',
    gstin: '',
    phone: '',
    email: '',
    building: '',
    city: '',
    district: '',
    state: '',
    activities: '',
    pincode: '',
    image: ''

  })

  const [bank, setBank] = useState<bankDetails>({
    name: '',
    branch: '',
    bank: '',
    isfc: '',
    no: ''

  })
  const handleInputChange = (type: string, value: any) => {
    switch (type) {
      case 'name':
        setClient({ ...client, name: value });
        break;
      case 'gstin':
        setClient({ ...client, gstin: value });
        break;
      case 'phone':
        setClient({ ...client, phone: value });
        break;
      case 'email':
        setClient({ ...client, email: value });
        break;
      case 'building':
        setClient({ ...client, building: value });
        break;
      case 'city':
        setClient({ ...client, city: value });
        break;
      case 'district':
        setClient({ ...client, district: value });
        break;
      case 'state':
        setClient({ ...client, state: value });
        break;
      case 'activities':
        setClient({ ...client, acticities: value });
        break;
      case 'benName':
        setBank({ ...bank, name: value })
        break;
      case 'branch':
        setBank({ ...bank, branch: value })
        break;
      case 'isfc':
        setBank({ ...bank, isfc: value })
        break;
      case 'no':
        setBank({ ...bank, no: value })
        break;
      case 'bank':
        setBank({ ...bank, bank: value })
        break;


    }


  }
  return (
    <div className={`${scale} absolute  w-full h-full z-50 bg-white/50 grid justify-items-center items-center  duration-200`} >
      <div className='w-11/12 h- overflow-auto bg-white shadow-xl border p-5 ' >
        <TopSection close={() => close()} />
        <div className='p-5 text-xl text-gray-600' > Client Details</div>
        <DataFields client={client} handleInputChange={(type: string, value: any) => handleInputChange(type, value)} />
        <BankDetails bank={bank} handleChange={(type: string, value: string) => handleInputChange(type, value)} />

        <div className='p-5' ><Button variant='outlined' onClick={() => console.log('asdas')} >Add Client</Button></div>
      </div>

    </div>
  )
}

export default Pop