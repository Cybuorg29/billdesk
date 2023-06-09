import React from 'react'



type Props = {name:string,detail:any}

const DetailInfo = ({name,detail}: Props) => {
  return (
    <div className=' p-3' >
      <label className='text-lg text-gray-500'>{name}</label>
      <div className='text-xl '>{detail}</div>
    </div>
  )
}

export default DetailInfo