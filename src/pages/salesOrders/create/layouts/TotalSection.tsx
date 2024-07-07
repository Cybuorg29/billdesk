import React from 'react'
import { converToInrFormat } from '../../../../utils/ConvertInrFormat'
import { ICREATE_PURCHASE_ORDER_PRODUCT } from '../../../purchaseOrder/model/model'
import { ICREATE_SALES_ORDER_PRODUCT } from '../../Model/model'
import { calculateTaxAmount } from '../../../../utils/calculateTaxAmount'
import { limitDecimalDigits } from '../../../../utils/limitDecimalDigits'

type Props = {
    amount: number
    products: ICREATE_SALES_ORDER_PRODUCT[]
}

const TotalSection = (props: Props) => {

    function calculateTotalBreakDown(): {
        before: number,
        tax: number,
    } {
        let before = 0;
        let tax = 0;
        let after = 0;

        props.products.map((value: ICREATE_SALES_ORDER_PRODUCT, index: number) => {
            before = value.rate * value.quantity
            value.tax.map((t: any) => {
                tax = tax + calculateTaxAmount((value.rate * value.quantity), t.amount);
            })

        })

        return {
            before, tax
        }
    }
    return (
        <div className='w-full h-full p-5'>
            <div className='flex place-content-between'>
                <div className='text-xl'>Grand Total</div>
                <div className='text-xl'>{converToInrFormat(props.amount)}</div>
            </div>
            <div>
                <div className='text-gray-500'>Total BreakDown</div>
                <div className='flex place-content-end'>

                    <div className='grid  grid-cols-2  place-content-end text-gray-500'>
                        <div className='text-end'> Total Before Tax  : </div>
                        <div className='text-end text-black' >{converToInrFormat(calculateTotalBreakDown().before)}</div>
                        <div className='text-end'> Total  Tax  : </div>
                        <div className='text-end text-black' >{converToInrFormat(limitDecimalDigits(calculateTotalBreakDown().tax))}</div>
                        <div className='text-end '> Total After Tax  : </div>
                        <div className='text-end text-black '>{converToInrFormat(props.amount)}</div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default TotalSection