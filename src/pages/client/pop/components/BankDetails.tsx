import React from 'react'
import { bankDetails } from '../../../../models/userModel'
import { TextField } from '@mui/material'

type Props = {bank:bankDetails,handleChange:(type:string,value:string)=>void}

const BankDetails = ({bank,handleChange}: Props) => {
  return (
    <div className='p-5' >
    <div className='text-xl text-gray-600 pb-5' >Bank Details</div>
    <div  className='grid grid-cols-2 gap-2 ' >
        <TextField  value={bank.name} label='Benifeciary Name' id='benName' onChange={(e)=>handleChange(e.target.id,e.target.value)} ></TextField>
        <TextField  value={bank.no} label='Account Number' id='no' onChange={(e)=>handleChange(e.target.id,e.target.value)} ></TextField>
        <TextField  value={bank.isfc} label='ISFC Code' id='isfc' onChange={(e)=>handleChange(e.target.id,e.target.value)} ></TextField>
        <TextField  value={bank.bank} label='Bank' id='bank' onChange={(e)=>handleChange(e.target.id,e.target.value)} ></TextField>
        <TextField  value={bank.branch} label='Branch' id='branch' onChange={(e)=>handleChange(e.target.id,e.target.value)} ></TextField>

    </div>
  </div>
  )
}

export default BankDetails