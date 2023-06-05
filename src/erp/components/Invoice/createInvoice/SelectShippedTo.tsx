import { Input } from '@mui/joy'
import { TextField } from '@mui/material'
import React from 'react'

type Props = {}

const SelectShippedTo = (props: Props) => {
  return (
    <div className='grid grid-rows-2' >
    <label className='' >Shipped To</label>
    <Input ></Input>
  </div>
  )
}

export default SelectShippedTo