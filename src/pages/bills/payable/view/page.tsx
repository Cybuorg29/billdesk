import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useAppSelector } from '../../../../store/app/hooks'
import { IbillsPaylable } from '../../../../store/features/bills/receivable/model'
import { getStateCode } from '../../../../utils/getStateCode'
import DashboardTable, { DashboardTableProps } from '../../../../components/ui/table/dashboardTable'
import { IInvoiceProduct } from '../../../../models/inventory/productModel'
import { converToInrFormat } from '../../../../utils/ConvertInrFormat'

type Props = {}

const ViewBillsPayable = (props: Props) => {
    const { invoice, isLoaded } = useAppSelector(state => state.payables)

    const { id } = useParams()
    const [data, setData] = useState<IbillsPaylable>();
    const [tableArray, setTabArray] = useState<DashboardTableProps>({
        dataArray: [],
        headers: ['#', 'Description', 'Code', 'Rate', 'Qty', 'Discount', 'Total'],
        onclick: () => { },
        Buttons: []
    })

    function calculateTaxAmount(rate: number, amount: number): number {
        return (rate / 100) * amount;
    }

    useEffect(() => {
        invoice.map((index: IbillsPaylable) => {
            if (index._id === id) setData(index);
        })
    }, [id])

    return (
        <div className='w-full h-full p-4 bg-component rounded-xl'>
            <div className='w-full h-full grid justify-items-center   overflow-auto'>
                <div className='w-2/3 h-full '>
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

                    <div className=' border-t-0 border-black  border-2 '>
                        <div className='  w-full h-fit overflow-auto text-sm relative  border-black ' >
                            <div className="flex flex-col" >
                                <div className="">
                                    <div className="inline-block min-w-full ">
                                        <div className="overflow-hidden  border-black ">
                                            <table className="min-w-full text-left ">
                                                <thead className="border-b  text-sm border-black   uppercase sticky top-0">
                                                    <tr className="border-b border-black text-center" >
                                                        <th scope="col" className='px-0.5 py-1 border-r-2 text-us  sticky text-black  border-black ' >#</th>
                                                        <th scope="col" className='px-0.5 py-1 border-r-2 border-black text-xs   sticky text-black  ' >Description</th>
                                                        <th scope="col" className='px-0.5 py-1 border-r-2 border-black text-xs   sticky text-black  ' >HSN code</th>
                                                        <th scope="col" className='px-0.5 py-1 border-r-2 border-black text-xs   sticky text-black  ' >Qty</th>
                                                        <th scope="col" className='px-0.5 py-1 border-r-2 border-black text-xs   sticky text-black  ' >Unit</th>
                                                        <th scope="col" className='px-0.5 py-1 border-r-2 border-black text-xs   sticky text-black  ' >Rate</th>
                                                        <th scope="col" className='px-0.5 py-1 border-r-2 border-black text-xs   sticky text-black  ' >Amount</th>
                                                        <th scope="col" className='px-0.5 py-1 border-r-2 border-black text-xs   sticky text-black  ' >Discount</th>
                                                        <th scope="col" className='px-0.5 py-1 border-r-2 border-black text-xs   sticky text-black  ' >Tax. Value</th>
                                                        <th scope="col" className='px-0.5 py-1 border-r-2 border-black text-xs   sticky text-black  ' >tax</th>
                                                        <th scope="col" className='px-0.5 py-1  text-xs  sticky text-black  border-black ' >Total</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        data?.products.map((index: IInvoiceProduct, i: number) => {
                                                            let k = i;
                                                            return <tr className="border-b border-gray-400  font-source2" key={`index.name${i}`}>

                                                                <th scope="col" className=' sticky text-gray-700 border-2  border-black  text-center' >{++k}</th>
                                                                <th scope="col" className=' sticky text-gray-700 border-2  border-black  text-sm ' >
                                                                    <div className='flex flex-col  '>
                                                                        <div className='text-black font-bold'>{index.name}</div>
                                                                        <div className='text-black '>{index.description}</div>
                                                                    </div>
                                                                </th>
                                                                <th scope="col" className=' sticky font-extrabold border-2  text-xs  border-black ' >{index.code}</th>
                                                                <th scope="col" className=' sticky font-bold border-2   text-xs border-black text-center' >{index.qty}</th>
                                                                <th scope="col" className=' sticky font-bold border-2   text-xs border-black text-center' >{index.unit}</th>
                                                                <th scope="col" className=' sticky font-bold border-2   text-xs border-black text-center' >{converToInrFormat(index.rate)}</th>
                                                                <th scope="col" className=' sticky font-bold border-2   text-xs border-black text-center' >{converToInrFormat(index.amount)}</th>
                                                                <th scope="col" className=' sticky font-bold border-2   text-xs border-black text-center' >{converToInrFormat(index.discount)}</th>
                                                                <th scope="col" className=' sticky font-bold  border-2  text-xs  border-black text-center' >{index.taxable_Value}</th>
                                                                <th scope="" className=' sticky  border-2   border-black text-center' >
                                                                    <div className=' h-full'>
                                                                        <div className='grid grid-flow-col bg-black border-b-2 border-black'>
                                                                            {
                                                                                index.tax.map((item: any, i: number) => {
                                                                                    if (i === 0) return <>
                                                                                        <div className=' bg-white text-center w-full font-bold  grow flex'>{item.type}</div>

                                                                                    </>
                                                                                    return <>
                                                                                        <div className=' bg-white border-l-2 border-black grow flex'>{item.type}</div>
                                                                                    </>
                                                                                })
                                                                            }

                                                                        </div>


                                                                        <div className='grid grid-cols-2  text-xs  border-t-0 border-black ' >
                                                                            <div className=' font-bold'>rate</div>
                                                                            <div className=' border-l-2 border-black  '>amount</div>

                                                                        </div>


                                                                        <div className='grid'>
                                                                            {
                                                                                index.tax.map((item: any, i: number) => {

                                                                                    return <>
                                                                                        <div className='grid grid-cols-2 text-sm '>
                                                                                            <div className='text-sm border-t-2 border-black flex grow  '>{item.amount + '%'}</div>
                                                                                            <div className='text-sm border-l-2 border-t-2 flex grow overflow-hidden  border-black '>{converToInrFormat(calculateTaxAmount(item.amount, index.taxable_Value).toFixed(2).toString())}</div>

                                                                                        </div>
                                                                                    </>
                                                                                })
                                                                            }

                                                                        </div>


                                                                    </div>

                                                                </th>
                                                                <th scope="col" className=' sticky  border-2  border-black text-center' >{converToInrFormat(index.total)}</th>

                                                            </tr>
                                                        })
                                                    }

                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>
            </div>

        </div>
    )
}

export default ViewBillsPayable