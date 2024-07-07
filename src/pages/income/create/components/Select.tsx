import { MenuItem, Select, SelectChangeEvent } from '@mui/material'
import React from 'react'

type Props = {value:string,set:any}

const SelectTab = ({value,set}: Props) => {
  return (
    <div>
    <div>Income Type</div>
    <Select value={value} className='w-full'  onChange={(e:SelectChangeEvent)=>{set(e.target.value)}}>
           <MenuItem value='invoice' >Invoice</MenuItem>
           <MenuItem value='others' >Others</MenuItem>
    </Select>
    </div>


  )
}

export default SelectTab