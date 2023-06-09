import React, { useEffect, useState } from 'react'
import ClientFrontTopLayout from '../../../layouts/clients/ClientFrontTopLayout'
import ClientFrontTableLayout from '../../../layouts/clients/ClientFrontTableLayout'
import ClientFronPageTab from '../../../layouts/clients/ClientFronPageTab'
import AddClientsPop from '../../../layouts/clients/AddClientsPop'
import { toast } from 'react-toastify'
import { getClients } from '../../../../api/user/user'

type Props = {}

const ClientDashboard = (props: Props) => {
     const [addClientPopScale,setAddClientPopScale] = useState('scale-0')
      const [client,setClients] = useState([])
      useEffect(() => {
        getData()
      }, [])

      const getData=async()=>{
        try{
          console.log('data')
         const data = await getClients()
          console.log('data',data)
        }catch(err:any){
          toast.error(err.message)
        }
        
      }
      
  return (
    <div  className='grid  lg:gap-5  gap-3 relative ' >
         <AddClientsPop close={()=>setAddClientPopScale('scale-0')} scale={addClientPopScale} />
        {/* <ClientFrontTopLayout/> */}
         <ClientFronPageTab  open={()=>setAddClientPopScale('scale-100')} /> 
        <ClientFrontTableLayout/>
    </div>
  )
}

export default ClientDashboard