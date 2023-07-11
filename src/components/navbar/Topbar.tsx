import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ListIcon from '@mui/icons-material/List';
import { useAppSelector } from '../../store/app/hooks';
import { capitalizeFirstLetter } from '../../utils/CapitalFirst';

type props = {}
const Topbar = ({ }: props) => {
  const { name } = useAppSelector(state => state.userData)
  const [location, setLocation] = useState('')
  const [smallNavbarScale, setSmallNavbarScale] = useState(`w-0`)
  let changeLocation: any;
  const local = useLocation()
  useEffect(() => {

    changeLocation = window.location.pathname
    changeLocation = changeLocation.split('/').pop()
    let change = '';
    if (changeLocation === 'undefined') {
      change = 'Not Found'
    } else {
      for (let i = 0; i <= changeLocation.length - 1; i++) {
        if (changeLocation[i] === `%` || changeLocation[i] === '2' || changeLocation[i] === '0') {
          if (changeLocation[i + 1] === '2') {
            //    if(changeLocation===[i+2]==='0'){

            //   }
          } else if (changeLocation[i + 1] === '0') {
          }
          change = change + ' '

        } else {
          change = capitalizeFirstLetter(change)
          change = change + changeLocation[i]

        }
      }
    }
    setLocation(change)




  }, [local.pathname])
  const [optionBarScale, setOptionBarScale] = useState(`w-0`)



  return (
    <>
      <div className=' text-center text-black border bg-transparent shadow-md lg:w-full sm:w-full grid grid-cols-4  duration-300    bg-white    ' >


        {/* <OptionBar scale={optionBarScale} close={()=>{setOptionBarScale(`w-0`)}}  /> */}
        <div className='flex items-center col-span-1  lg:pl-4 pl-2 lg:scale-105 lg:gap-2  ' onClick={() => window.history.back()} >
          <ArrowBackIcon className='cursor-pointer' />
          <div className='lg:p-5 p-3 lg:text-lg text-xs' >{location}</div>
        </div>
        <div className=' lg:p-5  font-head  grid   gap-3 justify-items-center col-span-2   items-center lg:pl-8 '  > <div className='text-center lg:text-xl'>{name}</div> </div>
        <div className='grid justify-items-end items-center p-5  ' >
          <ListIcon className='lg:scale-150 scale-0 cursor-pointer ' onClick={() => { setOptionBarScale('w-[25vw]') }} />



        </div>




      </div>
    </>
  )


  function close() {
    setSmallNavbarScale('scale-0')
  }
  function open() {
    setSmallNavbarScale(`scale-100`)
  }



}

export default Topbar