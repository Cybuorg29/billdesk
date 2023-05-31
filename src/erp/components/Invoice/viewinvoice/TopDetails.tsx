import React, { useEffect, useState } from 'react'
import { invocieCreationDetails } from '../../../Model/InvoiceModel'

type Props = {}

type details = {
    data :invocieCreationDetails
}

const TopDetails:React.FC<details> = ({data}) => {
      const [reverce,setReverce] = useState('NO')
    console.log('data top',data)
    
    useEffect(() => {
      console.log('data change')
      console.log('data top',data?.date)
      if(data?.reverceCharge===true){
         setReverce('YES')

      }
    }, [data])
    
    
  return (
    <div className='border border-black border-t-0 grid grid-cols-2   '  >
          <div className='border border-t-0  border-black' >
            <div className='p-1  border border-black ' >{`Invoice No : `}{data?.inNo}</div>
            <div className='p-1  border border-black ' >{`Invoice Date : `}{data?.date}</div>
            <div className='p-1  border border-black ' >{`Reverce Charge : `}{reverce}</div>
            <div className='p-1  border border-black ' >{`State : `}{data?.state}</div>
          </div>
          <div className='border border-black'>
            <div className='p-1  border border-black  border-l-0 border-t-0 ' >{`Transport Mode : `}{data?.transport}</div>
            <div className='p-1  border border-black  border-l-0  ' >{`Vehical No : `}{data?.vehicalNo}</div>
            <div className='p-1  border border-black  border-l-0  ' >{`Date Of Supply : `}{data?.date}</div>
            <div className='p-1  border border-black  border-l-0  ' >{`Place Of Supply : `}{data?.state}</div>

          </div>
           
          
        </div>
  )
}

export default TopDetails