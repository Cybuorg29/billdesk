import React from 'react'
import SelectBilledTo from '../../../components/Invoice/createInvoice/SelectBilledTo'
import SelectShippedTo from '../../../components/Invoice/createInvoice/SelectShippedTo'

type Props = {open:()=>void,close:()=>void}

const CreateInvoiceTopLayout = (props: Props) => {
  return (
    <div  className='' >
      <div className='grid grid-cols-2 gap-5' >
      <SelectBilledTo/>
      <SelectShippedTo/>

      </div>
        
    </div>
  )
}

export default CreateInvoiceTopLayout