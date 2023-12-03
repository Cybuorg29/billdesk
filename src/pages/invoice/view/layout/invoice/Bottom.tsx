import React, { useEffect, useState } from 'react'
import { Iinvoice } from '../../../../../models/invoice/invoice.model'
import { converToInrFormat } from '../../../../../utils/ConvertInrFormat'
import { convertToIndianCurrencyWords} from '../../../../../utils/convertNumToWord'
import { IInvoiceProduct } from '../../../../../models/inventory/productModel'
import { toast } from 'react-toastify'
import { roundNumber } from '../../../../../utils/RoundOff'
import { limitDecimalDigits } from '../../../../../utils/limitDecimalDigits'

type Props = {invoice:Iinvoice}

const Bottom = ({invoice}: Props) => {

   const [tax,setTax] = useState({
    onValue:0,
    total_tax:0
   })
  const [roundOffNum, setRoundOffNum] = useState(0);


  function calculateTaxAmount(rate: number, amount: number): number {
    return (rate / 100) * amount;
  }

  function setTaxAmount(){
     let num = 0;
    invoice.products.map((index:IInvoiceProduct)=>{
        num = num + index.taxable_Value;
    })
       setTax((prev:any)=>{return{...prev,onValue:num}});
      }
      
      function calculateTotalTax(){
        let amount:number = 0
        invoice.products.map((index:IInvoiceProduct)=>{
          index.tax.map((item:any)=>{
            amount = amount + calculateTaxAmount(index.taxable_Value,item.amount);
          })
        })
        setTax((prev:any)=>{return{...prev,total_tax:amount}});
  }

  function calculateGrandTotal() {
   let total = 0;
   invoice.products.map((index: any) => {
     total = total + index.total;
   })
   return total;
 }


  useEffect(() => {
   setRoundOffNum(calculateGrandTotal() - roundNumber(invoice.grand_Total));
  }, [])

  useEffect(() => {
       setTaxAmount()
       calculateTotalTax()
  }, [invoice])


  return (
    <div className='flex flex-col gap-3 h-full w-full  border-t border-black border-b text-table'>
        <div className='h-[3%] flex p-2 place-content-between' >
            <div>Grand Total</div>
            <div className='font-bold'>{converToInrFormat(invoice.grand_Total)}</div>
        </div>
        <div className='border-t  border-black h-full  grid grid-cols-2'>
            <div className='border-r  border-black grid '>
                 <div className=' pl-2 border-black'>Amount in Words</div>
                  <div className='pl-2 '>
                  {convertToIndianCurrencyWords(invoice.grand_Total)}
                  </div>
              </div>    
              <div className='grid grid-rows-5 ' >
                   <div className='grid grid-cols-3 border-b border-black pl-2'>
                    <div className='col-span-2 border-r border-black' >Total amount before tax</div>
                    <div className='col-span-1 pl-2 font-bold' >{converToInrFormat(tax.onValue)}</div>
                    </div>  

                    <div className='grid grid-cols-3 border-b border-black pl-2'>
                    <div className='col-span-2 border-r border-black' >Total Tax</div>
                    <div className='col-span-1 pl-2 font-bold' >{converToInrFormat(tax.total_tax)}</div>
                    </div> 
                    <div className='grid grid-cols-3 border-b border-black pl-2'>
                    <div className='col-span-2 border-r border-black' >Total Amount after tax</div>
                    <div className='col-span-1 pl-2  font-bold' >{converToInrFormat(calculateGrandTotal())}</div>
                    </div>   
                    <div className='grid grid-cols-3 border-b border-black pl-2'>
                    <div className='col-span-2 border-r border-black' >Round Off</div>
                    <div className='col-span-1 pl-2  font-bold' >{limitDecimalDigits(roundOffNum)}</div>
                    </div>   
                    <div className='grid grid-cols-3  border-black pl-2'>
                    <div className='col-span-2 border-r border-black' >Grand Total</div>
                    <div className='col-span-1 pl-2  font-bold' >{converToInrFormat(invoice.grand_Total)}</div>
                    </div>                
                </div>    
        </div>

    </div>
  )
}

export default Bottom