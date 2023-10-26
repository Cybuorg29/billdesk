import React from 'react'
import { IcreateInvoice } from '../../../../models/invoice/invoice.model'
import replaceUnderscoresWithSpaces from '../../../../utils/removeUnderScore';
import InputLabel from '../components/InputLabel';
import SelectInputs from '../components/SelectInputs';

type Props = { invoice: IcreateInvoice | any, setInvoice: any }

const InputInfo = ({ invoice, setInvoice }: Props) => {
  const invoiceKeys = Object.keys(invoice);
  const reverce_Charge_Options=[
    {
      value:'no'
    },
    {
      value:'yes'
    },
  ]
  return (
    <div className='grid grid-cols-2 grid-rows-4 border border-b-0 h-full text-small'>
      {
        invoiceKeys.map((index) => {
          if (index === 'total_Tax' || index === 'products' || index === 'gst_On_Reverce_Charge' || index === 'billed_To' || index === 'billed_From' || index === 'shipped_To' || index === 'discount' || index === 'grand_Total' || index === 'state_Code'||index ==='terms_And_Conditions'||index==='bank'||index==='id'||index==='ispaid') return
          if (index === 'state') return <>
            <div className='grid grid-cols-2 border gap-2'>
              <InputLabel type={typeof invoice[index]} name={index} setValue={setInvoice} value={invoice[index]} key={index} />
              <div className='flex gap-3 border-l pl-2'>
                <div className=''>{`code : `}</div>
                <div className='text-gray-600'>{invoice['state_Code']}</div>
              </div>
            </div>
          </>
          if (index == 'reverce_Charge') return <div className='grid grid-cols-2 gap-2'>
              <div className='pl-2'>reverce charge</div>
              <div className='w-full  h-full'>
              <SelectInputs name={index} options={reverce_Charge_Options} setValue={setInvoice}  value={invoice.reverce_Charge}  />
              </div>
           </div>
          return <>
            <InputLabel type={typeof invoice[index]} name={index} setValue={setInvoice} value={invoice[index]} key={index} />
          </>
        })
      }
    </div>
  )
}

export default InputInfo