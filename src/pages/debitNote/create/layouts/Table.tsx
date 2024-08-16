import React, { useEffect, useState } from 'react'
import AddProductDialog from '../components/AddProductDialog'
import { IInvoiceProduct } from '../../../../models/inventory/productModel'
import TableInputs from '../../../invoice/create/components/TableInputs'
import { limitDecimalDigits } from '../../../../utils/limitDecimalDigits'
import { toast } from 'react-toastify'
import removeIndex from '../../../../utils/removeIndex'

type Props = {
    invoice_Id: string
    add: any
    products: IInvoiceProduct[]
    handleQtyChange: any
    remover: (index: number) => void

}

const Table = ({ invoice_Id, add, products, handleQtyChange, remover }: Props) => {
    const [isAddDialogOpen, setisAddDialogOpen] = useState<boolean>(false)
    const [minStockArray, setMinStockArray] = useState<{
        min: number
    }[]>([])



    function validateQtyChange(index: number, qty: any): boolean {
        if (qty <= minStockArray[index].min) {
            return true
        }
        return false

    }


    useEffect(() => {
        console.log(minStockArray)
    }, [minStockArray])
    return (
        <div className='border-2 h-full w-full'>
            <AddProductDialog setMinStock={(value: {
                min: number
            }) => { setMinStockArray((prev) => [...prev, value]) }} add={(value: IInvoiceProduct) => { add(value) }} id={invoice_Id} close={() => { setisAddDialogOpen(false) }} open={isAddDialogOpen} />

            <div className='h-full w-full  relative'>

                <div className='border-t    w-full h-[90%] overflow-auto text-xs relative' >
                    <div className="flex flex-col" >
                        <div className="">
                            <div className="inline-block min-w-full ">
                                <div className="overflow-hidden">
                                    <table className="min-w-full text-left  ">
                                        <thead className="border-b  text-table border-neutral-500 uppercase sticky top-0">
                                            <tr className="border-b border-neutral-500">
                                                <th scope="col" className='px-1 py-2  sticky text-grayFont  ' ></th>
                                                <th scope="col" className='px-1 py-2  sticky text-grayFont  ' >#</th>
                                                <th scope="col" className='px-1 py-2  sticky text-grayFont  ' >Description</th>
                                                <th scope="col" className='px-1 py-2  sticky text-grayFont  ' >Qty</th>
                                                <th scope="col" className='px-1 py-2  sticky text-grayFont  ' >Unit</th>
                                                <th scope="col" className='px-1 py-2  sticky text-grayFont  ' >Rate</th>
                                                <th scope="col" className='px-1 py-2  sticky text-grayFont  ' >Amount</th>
                                                <th scope="col" className='px-1 py-2  sticky text-grayFont  ' >Total</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                products.map((value, i: number) => {
                                                    let k = i;
                                                    return <tr className="border-b border-gray-400   font-source2 p-3" key={`index.name${i}`}>
                                                        <th scope="col" className=' sticky text-gray-700 p-3 pl-1 text-start cursor-pointer' onClick={() => { remover(i); setMinStockArray(() => removeIndex(minStockArray, i)) }} >X</th>
                                                        <th scope="col" className=' sticky text-gray-700 p-3 pl-0 text-start' onClick={() => { }} >{++k}</th>
                                                        <th scope="col" className=' sticky text-gray-700 p-3 pl-0 text-start' onClick={() => { }} >{value.name}</th>
                                                        {/* <th scope="col" className=' sticky text-gray-700 p-3 pl-0 text-start' onClick={() => { }} >{value.qty}</th> */}
                                                        <th scope="col" className=' sticky text-gray-700 p-3 pl-0 text-start' onClick={() => { }} >{<TableInputs onChange={(e: React.ChangeEvent<HTMLInputElement>) => { (validateQtyChange(i, e.target.value)) ? handleQtyChange(e.target.value, i) : toast.error("Cannot add quantity more than invoice") }} type={'text'} value={value.qty} />}</th>
                                                        <th scope="col" className=' sticky text-gray-700 p-3 pl-0 text-start' onClick={() => { }} >{value.unit}</th>
                                                        <th scope="col" className=' sticky text-gray-700 p-3 pl-0 text-start' onClick={() => { }} >{limitDecimalDigits(value.rate)}</th>
                                                        <th scope="col" className=' sticky text-gray-700 p-3 pl-0 text-start' onClick={() => { }} >{limitDecimalDigits(value.total)}</th>
                                                        <th scope="col" className=' sticky text-gray-700 p-3 pl-0 text-start' onClick={() => { }} >{limitDecimalDigits(value.total)}</th>
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
                <div className='w-full h-[10%] flex items-center place-content-center rounded-lg cursor-pointer bg-blue-300 border-2 border-blue-600' onClick={() => { setisAddDialogOpen(true) }}>Add + </div>
            </div>
        </div>
    )
}

export default Table