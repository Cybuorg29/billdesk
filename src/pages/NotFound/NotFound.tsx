import { Button } from '@mui/material'
import React from 'react'

type Props = {}

const NotFound = (props: Props) => {
  return (
      <div  className='w-full h-full grid justify-items-center items-center' >
        <div className='grid justify-items-center items-center gap-3 lg:p-0 p-10  ' >    
        <div  className='text-4xl ' >Page Not Found</div>
        <div  className=' text-gray-500' >The page you are looking for does not exists or you entered some wrong data </div>
        <div><Button variant='outlined' >Go to dashboard</Button></div>
        </div>
    </div>
  )
}

export default NotFound