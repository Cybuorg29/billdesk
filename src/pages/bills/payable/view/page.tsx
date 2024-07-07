import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useAppSelector } from '../../../../store/app/hooks'
import { IbillsPaylable } from '../../../../store/features/bills/receivable/model'
import { getStateCode } from '../../../../utils/getStateCode'
import DashboardTable, { DashboardTableProps } from '../../../../components/ui/table/dashboardTable'
import { IInvoiceProduct } from '../../../../models/inventory/productModel'
import { converToInrFormat } from '../../../../utils/ConvertInrFormat'
import Table from './table'
import { convertToIndianCurrencyWords } from '../../../../utils/convertNumToWord'
import { roundNumber } from '../../../../utils/RoundOff'

type Props = {}

const ViewBillsPayable = (props: Props) => {
    const { invoice, isLoaded } = useAppSelector(state => state.payables)

    const { id } = useParams()

    const [billInfo, setBillInfo] = useState({
        amount_Before_Tax: 0,
        roundOdd: 0,
        tax: 0
    })

    const [data, setData] = useState<IbillsPaylable>({
        _id: '',
        billed_From: {
            adress: '',
            gstin: '',
            id: '',
            name: '',
            state: ''
        },
        createdAt: '',
        id: '',
        isPaid: false,
        po: '',
        products: [],
        total: 0,
        updatedAt: ''
    });

    const [tableArray, setTabArray] = useState<DashboardTableProps>({
        dataArray: [],
        headers: ['#', 'Description', 'Code', 'Rate', 'Qty', 'Discount', 'Total'],
        onclick: () => { },
        Buttons: []
    })

    function calculateTaxAmount(rate: number, amount: number): number {
        return (rate / 100) * amount;
    }

    const BillingInfo = ({ name, amount }: { name: string, amount: any }) => {
        return <div className='border-black border-b  grid grid-cols-3  text-xs items-center '>
            <div className='pl-2 col-span-2'>{name}</div>
            <div className='text-end pr-2 col-span-1'>{converToInrFormat(amount)}</div>
        </div>
    }

    useLayoutEffect(() => {
        invoice.map((index: IbillsPaylable) => {
            if (index._id === id) {
                setData((prev) => index);
                let newObj = {
                    amount_Before_Tax: 0,
                    roundOdd: 0,
                    tax: 0
                }
                index.products.map((product: IInvoiceProduct) => {

                    newObj.amount_Before_Tax = newObj.amount_Before_Tax + product.taxable_Value;
                    product.tax.map((tax: any) => {
                        return newObj.tax = newObj.tax + ((product.taxable_Value / 100) * tax.amount);
                    })
                    return

                })
                setBillInfo((prev) => { return { ...prev, amount_Before_Tax: newObj.amount_Before_Tax, tax: newObj.tax } })
            }
        })


    }, [id])

    return (
        <div className='w-full h-full p-4 bg-component rounded-xl'>
            <div className='w-full h-full grid justify-items-center   overflow-auto'>
                <div className='w-10/12 h-full '>
                    <div className='text-center text-black text-xl  p-3 border-2 border-black'>
                        Tax Invoice
                    </div>
                    <div className='border-2 border-t-0 border-black h-fit pl-2'>
                        <div className='text-left text-xl text-black'>Billed From :</div>
                        <div className='grid '>
                            <div className='text-lg '>{data?.billed_From.name}</div>
                            <div className='text-sm'>{data?.billed_From.adress}</div>
                            <div className='text-sm flex gap-4'>{data?.billed_From.state}</div>
                        </div>
                    </div>
                    <div className='h-fit'>
                        <Table data={data} />
                    </div>

                    <div className='h-[20%] border-2 border-black  border-t-0'>
                        <div className='grid grid-cols-3 h-full'>
                            <div className='  border-r-2 col-span-2 h-[100%] border-black '>
                                <div className='h-[25%] border-b border-black  text-sm grid items-center text-center'>{convertToIndianCurrencyWords(data.total)} </div>

                            </div>
                            <div className='grid grid-rows-5 h-full'>
                                <BillingInfo amount={billInfo.amount_Before_Tax} name='Amount Before Tax' />
                                <BillingInfo amount={billInfo.tax} name='Total Tax' />
                                <BillingInfo amount={billInfo.amount_Before_Tax + billInfo.tax} name='Amount After Tax' />
                                <BillingInfo amount={roundNumber((billInfo.amount_Before_Tax + billInfo.tax)) - (billInfo.amount_Before_Tax + billInfo.tax)} name='Round Off' />
                                <BillingInfo amount={data.total} name='Grand Total' />

                            </div>

                        </div>

                    </div>



                </div>
            </div>

        </div>
    )
}

export default ViewBillsPayable