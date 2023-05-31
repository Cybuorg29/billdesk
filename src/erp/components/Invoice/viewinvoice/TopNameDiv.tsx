import React, { useEffect, useState } from 'react'
import { userModel } from '../../../Model/UserModel'

type Props = {}


const TopNameDiv = (props: Props) => {
    const [details,setDetails] = useState<userModel>()
    
    useEffect(() => {
        initialiseUserDetails()
  
    }, [])
    

    const initialiseUserDetails=()=>{
        let data:any = sessionStorage.getItem('data')
         data = JSON.parse(data)
         setDetails(data)
         
        }
    

  return (
    <div>
        <div className='border-2 border-black' >
            <div  className='lg:text-2xl text-center border-b border-black ' >Tax Invoice</div>
            <div className='p-5 pb-1 text-center  text-xl font-bold uppercase ' >{details?.name}</div>
            <div className='text-center uppercase ' >{details?.adress}</div>
            <div className='text-center uppercase ' >{details?.state}{' - '}{details?.pincode}{', '}{`Contact - `}{details?.phone}</div>
            <div className='text-center uppercase ' >{'GSTIN - '}{details?.gstin}</div>
            
             
        </div>
    </div>
  )
}

export default TopNameDiv