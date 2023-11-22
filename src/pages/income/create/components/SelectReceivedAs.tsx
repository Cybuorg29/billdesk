import { MenuItem, Select, SelectChangeEvent } from '@mui/material'
import React from 'react'
import { IIncome } from '../../../../models/incomeAndExp/incomeInterface'

type Props = {value:'cash'|'online',set:any}

const SelectReceivedAs = ({value,set}: Props) => {
  return (
    <div className='w-full h-full'>
        <div>Payment Type</div>
        <Select  value={value} onChange={(e:SelectChangeEvent)=>{set((prev:IIncome)=>{return{...prev,receivedAs:e.target.value,trasnactionId:''}})}} className='w-full'>
            <MenuItem value={'online'} >online</MenuItem>
            <MenuItem value='cash' >cash</MenuItem>
        </Select>

    </div>
  )
}

export default SelectReceivedAs