import React, { useEffect, useState } from 'react'
import { IcreateInvoice } from '../../../../models/invoice/invoice.model'
import replaceUnderscoresWithSpaces from '../../../../utils/removeUnderScore';
import InputLabel from '../components/InputLabel';
import SelectInputs from '../components/SelectInputs';
import { useAppSelector } from '../../../../store/app/hooks';
import { initliseSalesOrdersAction } from '../../../../store/actions/salesOrders/action';
import { ISalesOrder } from '../../../salesOrders/Model/model';

type Props = { invoice: IcreateInvoice | any, setInvoice: any, SoNO: string }

const InputInfo = ({ invoice, setInvoice, SoNO }: Props) => {
  const invoiceKeys = Object.keys(invoice);
  const reverce_Charge_Options = [
    {
      value: 'no',
      name: 'no'
    },
    {
      value: 'yes',
      name: 'Yes'

    },
  ]

  const { Sales_Orders, isLoaded } = useAppSelector(state => state.salesOrders)
  const [salesOrderOptions, setSalesOrderOptions] = useState(initliseSalesOrderOptions())
  const auth = useAppSelector(state => state.auth)

  useEffect(() => {
    if (!isLoaded) initliseSalesOrdersAction();
    setSalesOrderOptions(initliseSalesOrderOptions())
  }, [Sales_Orders, isLoaded, auth])


  function initliseSalesOrderOptions(): { value: string, name: string }[] {
    let array: any[] = [{
      value: '',
      name: '-',
    }]

    Sales_Orders.map((value: ISalesOrder) => {
      array.push({ value: value._id, name: value.invoice_No });
    })

    return array;
  }



  return (
    <div className='grid grid-cols-2 grid-rows-4 border border-b-0 h-full '>
      {
        invoiceKeys.map((index) => {
          if (index === 'total_Tax' || index === 'products' || index === 'gst_On_Reverce_Charge' || index === 'billed_To' || index === 'billed_From' || index === 'shipped_To' || index === 'discount' || index === 'grand_Total' || index === 'state_Code' || index === 'terms_And_Conditions' || index === 'bank' || index === 'id' || index === 'isPaid' || index === 'SO_NO') return
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
              <SelectInputs name={index} options={reverce_Charge_Options} setValue={setInvoice} value={invoice.reverce_Charge} />
            </div>
          </div>
          if (index == 'SO_Id') return <div className='grid grid-cols-2 gap-2'>
            <div className='pl-2'>Order No.</div>
            <div className='w-full  h-full'>
              <SelectInputs name={index} options={salesOrderOptions} setValue={setInvoice} value={invoice.SO_Id} />
            </div>
          </div>
          if (index === 'date_of_supply' || index === 'invoice_Date') return <div className='grid grid-cols-2 gap-2'>
            <div className='border-b pl-2'>{index.replaceAll('_', ' ')}</div>
            <div className='w-full border h-full'>
              <input className='w-full' type='date' title='date' onChange={((e: React.ChangeEvent<HTMLInputElement>) => { setInvoice((prev: IcreateInvoice) => { return { ...prev, [index]: String(e.target.value) } }) })} />
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