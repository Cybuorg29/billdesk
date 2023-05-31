import React from 'react'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

type Props = {name:string,amount:any}

const InfoBox = ({name,amount}: Props) => {
  return (
    <>
        <div className='  min-h-20  w-full   bg-blue-300/20 shadow-xl p-3 text-xs lg:text-lg grid    rounded-2xl  border  border-blue-300 hover:scale-105  duration-300 cursor-pointer ' >
          <div className='w-full' >{name}</div>
          <div>{amount}</div>

        <div className='grid items-center justify-items-end text-gray-600 col-span-1 '>
          <ArrowForwardIosIcon  />
          
        </div>

      </div>

    </>

  )
}

export default InfoBox