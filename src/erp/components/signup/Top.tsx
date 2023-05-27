import React from 'react'
import { useNavigate } from 'react-router-dom'

const Top = (args:{h:String}) => {
   const navigate = useNavigate()
    const {h} = args
  return (
    <div>
        <div className='grid lg:grid-cols-2 items-center' >
            <div className={`p-5 text-4xl text-center lg:text-start cursor-pointer text-${h}`}
            onClick={()=>{navigate(`/`)}}
            >
                Workware
            </div>
            <div className=' grid lg:justify-items-end  lg:pr-10  justify-items-center  items-center w-full'>
                    <ul className='grid grid-flow-col gap-5  justify-items-center '>
                        <li className={`text-gray-400 hover:text-${h} cursor-pointer`} onClick={()=>{navigate('/')}} >Home</li>
                        <li className={`text-gray-400 hover:text-${h} cursor-pointer`} >About</li>
                        <li className={`text-gray-400 hover:text-${h} cursor-not-allowed `} >Services</li>
                        <li className={`text-gray-400 hover:text-${h} cursor-pointer`} onClick={()=>{navigate('/register')}} >Register</li>
                        <li className={`text-gray-400 hover:text-${h} cursor-pointer`} onClick={()=>{navigate(`/login`)}} >Login</li>
                    </ul>
            </div>

        </div>
    </div>
  )
}

export default Top