import React, { useState } from 'react'
import CreateInvoiceTopLayout from '../../../../layouts/invoice/createInvocie/CreateInvoiceTopLayout'
import Pop from '../../../../layouts/invoice/createInvocie/Pop'

type Props = {}

const CreateInvoicePage = (props: Props) => {
    const [billedToScale,setBilledToScale] = useState('scale-0')
  return (
    <div  className='w-full grid justify-items-center' >
        <div className='w-11/12 border  relative ' >
             <Pop  scale={billedToScale} close={()=>setBilledToScale('scale-0')}  />
              <div className='p-5' >

            <CreateInvoiceTopLayout  open={()=>{setBilledToScale('scale-100')}}  close={()=>setBilledToScale('scale-0')}  />

              </div>

        </div>



    </div>
  )
}

export default CreateInvoicePage