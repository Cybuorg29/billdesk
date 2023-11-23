import React from 'react'
import { Iinvoice } from '../../../../../models/invoice/invoice.model'
import replaceUnderscoresWithSpaces from '../../../../../utils/removeUnderScore'

type Props = {invoice:Iinvoice|any}

const GeneralInfo = ({invoice}: Props) => {
     const invoiceKeys = Object.keys(invoice)
  return (
    <div className='grid  grid-flow-col w-full grid-rows-4 grid-cols-2   h-full text-table'>
{    invoiceKeys.map((index,i:number) => {
        if (index === 'total_Tax' || index === 'products' || index === 'gst_On_Reverce_Charge' || index === 'billed_To' || index === 'billed_From' || index === 'shipped_To' || index === 'discount' || index === 'grand_Total' || index === 'state_Code'||index ==='terms_And_Conditions'||index==='bank'||index==='id'||index==='isPaid'||index==='_id'||index==='__v') return
        if(index==='state')return<>
           <div className='flex gap-5   w-full pl-2 border-b border-l border-black text-table'>
           <div className='grid grid-cols-2 w-1/2'>
             <div className=''>{replaceUnderscoresWithSpaces(index)}</div>
            <div className='text-center'>{invoice[index]}</div>
             </div>
             <div className='grid grid-cols-2 '>
             <div className=''>{replaceUnderscoresWithSpaces(`code :`)}</div>
            <div className='text-center'>{invoice.billed_From.state_Code}</div>
             </div>
          </div>
        </>
        return<>
          <div className='grid   grid-cols-2 pl-2 border-b border-l border-black text-table'>
            <div className=''>{replaceUnderscoresWithSpaces(index)}:</div>
            <div className=''>{invoice[index]}</div>
          </div>
        </>
      })}
    </div>

  )
}

export default GeneralInfo