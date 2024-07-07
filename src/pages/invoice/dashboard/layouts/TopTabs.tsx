import React, { useEffect, useState } from 'react'
import { setInvoiceAction } from '../../../../store/actions/invoice/set'
import { Iinvoice } from '../../../../models/invoice/invoice.model'
import Tabs, { tabProps } from '../../../../components/ui/tabs/Tabs'
import { useAppSelector } from '../../../../store/app/hooks'
import { converToInrFormat } from '../../../../utils/ConvertInrFormat'

type Props = {type:string,set:any}

const TopTabs = ({set,type}: Props) => {
    const { istoken, token } = useAppSelector(state => state.auth)
    const { invoices, isLoaded } = useAppSelector(state => state.invoice)
    const [tabArray,settabArray] =  useState<tabProps[]>([
      {
        name: 'Total Invoice',
        amount: 0,
        image: '',
        link: ''
      },
      {
        name: 'Total Due',
        amount: 0,
        image: '',
        link: ''
      },
      {
        name: 'Payment Received',
        amount: 0,
        image: '',
        link: ''
      },
    ])

    const emptyArray =[
        {
          name: 'Total Invoice',
          amount: 0,
          image: '',
          link: ''
        },
        {
          name: 'Total Due',
          amount: 0,
          image: '',
          link: ''
        },
        {
          name: 'Payment Received',
          amount: 0,
          image: '',
          link: ''
        },
      ]
    
  
  
    function update() {
          
       let array = emptyArray;
      invoices.map((index: Iinvoice) => {
            array[0].amount = array[0].amount + 1; 
        if (!index.isPaid) array[1].amount = array[1].amount + 1;
        else array[2].amount = array[2].amount + index.grand_Total;
       })
       settabArray(array);
    }
  
    useEffect(() => {
       if(!isLoaded){
           setInvoiceAction();
       }
      update();
    }, [isLoaded, istoken, token]);
    useEffect(() => {
      
    }, [invoices])
  return (
    <div className='w-full h-full flex gap-3'>
         {
          tabArray.map((index: tabProps,i:number) => {
             let amount = index.amount;
             let name =index.name;
             if(i===2)
             {
               amount = converToInrFormat(index.amount)
              name = `payment Received from ${(tabArray[0].amount - tabArray[1].amount)} invoices `
             } 
            return <div className='w-full' onClick={(e)=>{set(index.name)}}>
              <Tabs amount={amount} image={index?.image} link={index?.link} name={name} key={index.name} />
            </div>
          })
        }
    </div>
  )
}

export default TopTabs