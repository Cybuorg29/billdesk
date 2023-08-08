import { Input } from '@mui/joy'
import React from 'react'

type Props = {name:string,value:any,onchange:any,type:any}

 const  Inputs=  ({name,onchange,value,type}:Props)=>{
  return (
    <div className='grid' >
      <label  htmlFor='input' >{name}</label>
      <Input name={name} type={type}  id='input' value={value} onChange={(e:any)=>{onchange(e)}}   />

    </div>

  )
}

export default React.memo(Inputs)