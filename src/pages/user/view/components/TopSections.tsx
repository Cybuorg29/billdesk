import React from 'react'
import { userDetailSchema } from '../../../../models/userModel'
import LocationOnIcon from '@mui/icons-material/LocationOn';

type Props = {data:userDetailSchema}

const TopSections = ({data}: Props) => {
  return (
         <div className='h-[100%]  flex gap-5 bg-component rounded-xl p-2 shadow-lg' >
                        <div className=' w-[25%] h-full overflow-hidden ' >
                            <img src={data?.image} alt='Profile Image' className='w-full h-full' />\
                        </div>
                        <div className='flex flex-col gap-5' >
                            <div className='font-rubik  text-2xl' >{data?.name}</div>
                            <div className='font-ubuntu text-grayFont'> <span><LocationOnIcon /></span> {data?.building + ',' + data?.city + ',' + data?.district + ',' + data?.state}</div>
                            <div className='text-grayFont'>GSTIN : <span className='font-bold text-black' >{data?.gstin}</span> </div>
                        </div>
                    </div>
  )
}

export default TopSections