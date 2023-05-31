import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'

type Props = {}

const Dashboard = (props: Props) => {

    const {id} = useParams()
    useEffect(() => {
        console.log(id)
    
    }, [])
    
  return (
    <div className='w-full p-5  grid items-center  justify-items-center ' >
        <div  className='text-xl' >Working on It.......</div>
    </div>
  )
}

export default Dashboard