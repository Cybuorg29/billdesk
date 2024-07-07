import React, { useEffect, useState } from 'react'
import { converToInrFormat } from '../../../../utils/ConvertInrFormat'
import { Itax } from '../../../../models/tax/Model';
import { ISALES_ORDER_PRODUCT, ISalesOrder } from '../../Model/model';
import { calculateTaxAmount } from '../../../../utils/calculateTaxAmount';
import { limitDecimalDigits } from '../../../../utils/limitDecimalDigits'

type Props = {
    data: ISalesOrder | undefined
}

const TotalSection = ({ data }: Props) => {
    const [Tax, setTax] = useState(0);
    const [TaxBreakDown, setTaxBreakDown] = useState<Itax[]>([])


    useEffect(() => {
        let total = 0;
        let breakDown: Itax[] = []
        data?.product.map((value: ISALES_ORDER_PRODUCT) => {
            const val = value.rate * value.quantity;


            value.tax.map((tax: Itax, index: number) => {
                // total = total + calculateTaxAmount(val, tax.amount);
                const taxAmount = calculateTaxAmount(val, tax.amount)
                const ind = breakDown.findIndex(obj => obj.type === tax.type) //check for the tax type and return index -1 = not found


                if (ind === -1) {
                    breakDown.push({
                        type: tax.type,
                        amount: taxAmount
                    });
                } else {
                    breakDown[ind].amount = breakDown[ind].amount + taxAmount

                }
                total = total + taxAmount


            })

        })
        console.log('breakDown', breakDown)
        setTax(total);
        setTaxBreakDown(breakDown);

    }, [data?.product])
    return (
        <>
            <div className='pl-5 pt-1'>Total BreakDown : </div>
            <div className=' grid grid-cols-3 place-content-end pr-5'>
                <div></div>
                <div></div>
                <div className='grid grid-cols-2  text-end'>Total Before Tax : <span className=''>{(data?.Total) ? converToInrFormat(limitDecimalDigits(data?.Total - Tax)) : null}</span></div>
            </div>


            <div className=' grid  grid-cols-3 pr-5'>
                <div></div>
                <div></div>
                <div className='grid grid-cols-2'>
                    <div className='grid place-content-end' >
                        {
                            TaxBreakDown.map((breaks: Itax) => {
                                return <div className='flex  gap-1'>
                                    <div>{breaks.type} :</div>
                                    <div className=''>{converToInrFormat(breaks.amount)}</div>
                                </div>
                            })
                        }
                    </div>
                </div>
            </div>

            <div className=' grid grid-cols-3 place-content-end pr-5'>
                <div></div>
                <div></div>
                <div className='grid grid-cols-2 text-end'>Total  Tax : <span className=''>{converToInrFormat(limitDecimalDigits(Tax))}</span></div>
            </div>




            <div className=' grid grid-cols-3 place-content-end pr-5  '>
                <div></div>
                <div></div>
                <div className='grid grid-cols-2 text-end'>Grand Total : <span className=''>{converToInrFormat(limitDecimalDigits(data?.Total))}</span></div>
            </div>
        </>
    )
}

export default TotalSection