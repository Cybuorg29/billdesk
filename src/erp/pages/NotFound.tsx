import React from 'react'
import { Button } from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'

type Props = {}

const NotFound = (props: Props) => {
     const navigate = useNavigate()
     const {id} = useParams()
  return (
    <div className='w-full min-h-[100%] pt-10  grid gap-5 justify-items-center items-center ' >
    <div  className='text-gray-900 text-3xl ' >Page Not Found</div>
    <div className='text-gray-500' >The page you are looking for does not exists please redirect to Homepage </div>
    <Button variant='outlined' onClick={()=>{navigate(`/erp/${id}/dashboard`)}} >
     HomePage
    </Button>
 </div>
  )
}

export default NotFound


