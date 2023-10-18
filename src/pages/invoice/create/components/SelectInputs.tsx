import { MenuItem, Select } from '@mui/material'
import React from 'react'
import { IcreateInvoice } from '../../../../models/invoice'

type Props = {value:any,setValue:any,options:any[],name:string}

const SelectInputs = ({setValue,value,options,name}: Props) => {
  return (
    <select title='tap to select'   value={value} className='w-full h-full' onChange={(e:React.ChangeEvent<HTMLSelectElement>)=>{setValue((prev:IcreateInvoice)=>{return{...prev,[name]:e.target.value}})}} >
      {
        options.map((index:{value:string})=>{
          return <>
          <option value={index.value} >{index.value}</option>
          </>
        })
      }

    </select>
  )
}

export default SelectInputs