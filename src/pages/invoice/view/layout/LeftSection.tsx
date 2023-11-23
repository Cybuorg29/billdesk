import React, { useId } from 'react'
import { Iinvoice } from '../../../../models/invoice/invoice.model'
import SelfInfo from './invoice/SelfInfo'
import GeneralInfo from './invoice/GeneralInfo'
import Table from './invoice/Table'
import Bottom from './invoice/Bottom'
import BillingDetails from './invoice/BillingDetails'
import Fotter from './invoice/Fotter'

type Props = {invoice:Iinvoice}

const LeftSection = ({invoice}: Props) => {
     const selfInfoKeys = useId();
  return (
    <div className='p-4 h-full w-full overflow-auto' id='invoice' >
        <div>GSTIN:{invoice.billed_From.gstin}</div>
          <div className='h-full border border-black flex flex-col' >
            <div className='text-2xl border-b border-black text-center'>Tax Invoice</div>
            <div className='max-h-[17%]'>
              <SelfInfo invoice={invoice} key={selfInfoKeys} />
            </div>
            <div className='max-h-[12%] ' >
              <GeneralInfo invoice={invoice}  />
            </div>
            <div className='h-[2%] border-b border-black' ></div>
            <div className='w-full h-[4%] grid grid-cols-2'>
              <div className='pl-2 text-sm border-l border-black'>Billed To</div>
              <div className='pl-2 text-sm border-l border-black'>Shipped  To</div>
            </div>
            <div className='h-[12%] w-full grid grid-cols-2  text-sm border-t border-black ' >
              <BillingDetails array={invoice.billed_To} />
              <BillingDetails  array={invoice.shipped_To}/>
            </div>
            <div className='h-[2%] border-b border-black' ></div>
             <Table invoice={invoice} />  
          <div className=''>
              <Bottom  invoice={invoice} />
              <Fotter  invoice={invoice} />
          </div>
          </div>

         
    </div>
  )
}

export default LeftSection