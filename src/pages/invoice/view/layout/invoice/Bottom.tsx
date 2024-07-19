import React, { useEffect, useState } from 'react'
import { Iinvoice } from '../../../../../models/invoice/invoice.model'
import { converToInrFormat } from '../../../../../utils/ConvertInrFormat'
import { convertToIndianCurrencyWords } from '../../../../../utils/convertNumToWord'
import { IInvoiceProduct } from '../../../../../models/inventory/productModel'
import { toast } from 'react-toastify'
import { roundNumber } from '../../../../../utils/RoundOff'
import { limitDecimalDigits } from '../../../../../utils/limitDecimalDigits'
import { Itax } from '../../../../../models/tax/Model'

type Props = { invoice: Iinvoice }

const Bottom = ({ invoice }: Props) => {

  const [tax, setTax] = useState({
    onValue: 0,
    total_tax: 0
  })
  const [roundOffNum, setRoundOffNum] = useState(0);
  const [TaxArray, setTaxArray] = useState<{
    tax: Itax,
    rate: number
  }[]>(initliseTaxArray());


  function calculateTaxAmount(rate: number, amount: number): number {
    return (rate / 100) * amount;
  }

  function setTaxAmount() {
    let num = 0;
    invoice.products.map((index: IInvoiceProduct) => {
      num = num + index.taxable_Value;
    })
    setTax((prev: any) => { return { ...prev, onValue: num } });
  }

  function calculateTotalTax() {
    let amount: number = 0
    invoice.products.map((index: IInvoiceProduct) => {
      index.tax.map((item: any) => {
        amount = amount + calculateTaxAmount(index.taxable_Value, item.amount);
      })
    })
    setTax((prev: any) => { return { ...prev, total_tax: amount } });
  }

  function calculateGrandTotal() {
    let total = 0;
    invoice.products.map((index: any) => {
      total = total + index.total;
    })
    return total;
  }


  function initliseTaxArray(): {
    tax: Itax
    rate: number
  }[] {

    let newArray: {
      tax: Itax,
      rate: number
    }[] = [];
    if (newArray.length === 0 && invoice.products.length !== 0) {
      const rate: any = invoice.products[0].tax[0].amount;
      newArray.push({
        tax: {
          amount: calculateTaxAmount(parseInt(rate), invoice.products[0].taxable_Value),
          type: invoice.products[0].tax[0].type
        },
        rate: rate

      })
      // delete invoice.products[0].tax[0]
    }
    invoice.products.map((value: IInvoiceProduct, index: number) => {
      value.tax.map((tax: Itax, taxIndex: number) => {
        if (index === 0 && taxIndex === 0) return 0;
        const find = newArray.findIndex((val) => val.tax.type === tax.type);
        if (find === -1) newArray.push({
          tax: {
            amount: calculateTaxAmount(tax.amount, value.taxable_Value),
            type: tax.type
          },
          rate: tax.amount

        })
        else {
          newArray[find].tax.amount = newArray[find].tax.amount + calculateTaxAmount(tax.amount, value.taxable_Value);
        }

      })
    })

    return newArray;


  }


  useEffect(() => {
    setTaxAmount()
    calculateTotalTax()
    if ((calculateGrandTotal() !== invoice.grand_Total)) setRoundOffNum(roundNumber(invoice.grand_Total) - calculateGrandTotal());
    setTaxArray(prev => initliseTaxArray());
  }, [invoice])


  return (
    <div className='flex flex-col gap-3 h-full w-full   border-black border-b-2 text-table'>
      <div className=' flex p-2 place-content-between ' >
        <div className='font-bold text-sm'>Grand Total</div>
        <div className='font-bold text-[1rem]'>{converToInrFormat(invoice.grand_Total)}</div>
      </div>
      <div className='border-t-2  border-black h-full  grid grid-cols-2'>
        <div className='border-r-2  border-black grid '>
          <div className=' pl-2 pt-2 border-black text-sm font-bold '>Amount in Words</div>
          <div className='pl-2 text-sm font-bold '>
            {convertToIndianCurrencyWords(invoice.grand_Total)}
          </div>
        </div>
        <div className='grid  ' >
          <div className='grid grid-cols-3 border-b-2 border-black pl-2 text-sm'>
            <div className='col-span-2 border-r border-black' >Total amount before tax</div>
            <div className='col-span-1 pl-2 font-bold' >{converToInrFormat(tax.onValue)}</div>
          </div>

          <div className='flex flex-col'>
            <div>{
              TaxArray.map((value: {
                tax: Itax,
                rate: number
              }) => {
                return <div className='grid grid-cols-3 pl-2  '>
                  <div className='col-span-2 border-r  text-bold text-sm border-black'>{value.tax.type}@{value.rate}%</div>
                  <div className='pl-2 text-sm'>{limitDecimalDigits(value.tax.amount)}</div>

                </div>
              })
            }</div>

            <div className='grid grid-cols-3 border-b-2 border-black pl-2  border-t-2 text-sm'>
              <div className='col-span-2 border-r border-black' >Total Tax</div>

              <div className='col-span-1 pl-2 font-bold' >{converToInrFormat(tax.total_tax)}</div>
            </div>
          </div>
          <div className='grid grid-cols-3 border-b-2 border-black pl-2 text-sm'>
            <div className='col-span-2 border-r border-black' >Total Amount after tax</div>
            <div className='col-span-1 pl-2  font-bold' >{converToInrFormat(calculateGrandTotal())}</div>
          </div>
          <div className='grid grid-cols-3 border-b-2 border-black pl-2 text-sm'>
            <div className='col-span-2 border-r border-black' >Round Off</div>
            <div className='col-span-1 pl-2  font-bold' >{limitDecimalDigits(roundOffNum)}</div>
          </div>
          <div className='grid grid-cols-3  border-black pl-2 text-sm'>
            <div className='col-span-2 border-r border-black' >Grand Total</div>
            <div className='col-span-1 pl-2  font-bold' >{converToInrFormat(invoice.grand_Total)}</div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Bottom