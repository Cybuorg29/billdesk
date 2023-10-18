import React from 'react'
import replaceUnderscoresWithSpaces from '../../../../utils/removeUnderScore'
import { IcreateInvoice } from '../../../../models/invoice'

type Props = {name:string,value:any,setValue:any,type:string}

const InputLabel = ({name,setValue,value,type}: Props) => {
  return (
    <div key={name} className='border-b border-r pl-2 grid grid-cols-2 w-full h-full'>{replaceUnderscoresWithSpaces(name)}:
    <input  type={type} className=' border h-full text-center text-gray-500' title={name} value={value}  onChange={(e:React.ChangeEvent<HTMLInputElement>)=>setValue((prev:IcreateInvoice)=>{return{...prev,[name]:e.target.value}})}  />
    </div>
  )
}

export default InputLabel