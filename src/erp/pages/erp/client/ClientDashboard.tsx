import React, { useState } from 'react'
import ClientFrontTopLayout from '../../../layouts/clients/ClientFrontTopLayout'
import ClientFrontTableLayout from '../../../layouts/clients/ClientFrontTableLayout'
import ClientFronPageTab from '../../../layouts/clients/ClientFronPageTab'
import AddClientsPop from '../../../layouts/clients/AddClientsPop'

type Props = {}

const ClientDashboard = (props: Props) => {
     const [addClientPopScale,setAddClientPopScale] = useState('scale-0')
  return (
    <div  className='grid  lg:gap-5  gap-3 relative ' >
         <AddClientsPop close={()=>setAddClientPopScale('scale-0')} scale={addClientPopScale} />
        <ClientFrontTopLayout/>
         <ClientFronPageTab  open={()=>setAddClientPopScale('scale-100')} /> 
        <ClientFrontTableLayout/>
    </div>
  )
}

export default ClientDashboard