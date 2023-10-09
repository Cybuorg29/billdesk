import React, { useId } from 'react'
import PageHeading from '../../../components/ui/Page Heading/PageHeading'
import { SolidButton } from '../../../components/ui/Buttons/solid/SolidButton'
import { useNavigate } from 'react-router-dom'

type Props = {}

const InvoiceDashboard = (props: Props) => {
     const headingKey = useId()
      const createInvoiceKey = useId();
      const naviagte = useNavigate();
  return (
    <div className='w-full h-full p-5' >
        <div className='flex place-content-between'>
            <PageHeading name='Invoices' key={headingKey} /> 
            <div>
                <SolidButton color='black' innerText='Create  New Invoice' onClick={()=>{naviagte('/create/invoice')}}  key={createInvoiceKey}/>
            </div>
            </div>

    </div>
  )
}

export default InvoiceDashboard