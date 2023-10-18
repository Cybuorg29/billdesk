import React from 'react'

type Props = {
    value: any
    onChange: (e:any)=>void 
    type: any
  }

const TableInputs = ({ onChange, value, type }: Props) => {
    return <>
      <th scope="" className='  text-black border border-black ' >
        <div className='flex place-content-center'>
          <input value={value} type={type} title='quantity' onChange={(e:any)=>onChange(e)} className='w-[60px] border rounded-md [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ' />
        </div>
      </th>
    </>
  }

export default React.memo(TableInputs);