import { Dialog } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { IPURCHASE_ORDER_PRODUCT } from '../../../purchaseOrder/model/model'
import { useAppSelector } from '../../../../store/app/hooks'
import { Iinvoice } from '../../../../models/invoice/invoice.model'
import { IInvoiceProduct } from '../../../../models/inventory/productModel'

type Props = {
    id: string
    close: any
    open: boolean
    add: any
    setMinStock: any
}

const AddProductDialog = (props: Props) => {
    const [data, setData] = useState<IInvoiceProduct[]>([]);
    const { auth, payables } = useAppSelector(state => state);



    useEffect(() => {
        setData(initliseTableData(props.id))
    }, [payables, auth, props.id])




    function initliseTableData(id: string): IInvoiceProduct[] {
        if (id === '') return [];
        const find = payables.invoice.find((value) => value._id === id);
        if (!find) return [];
        return find.products;
    }
    return (
        <Dialog open={props.open} fullWidth >
            <div className='w-full h-full p-5'>
                <div className='flex place-content-end'>
                    <div className='cursor-pointer ' onClick={() => { props.close() }} >X</div>
                </div>

                <div className='flex gap-5 border-b-2' >
                    <div>#</div>
                    <div>Name</div>
                </div>
                <div className='h-[80%]'>
                    {
                        data.map((value: IInvoiceProduct, index: number) => {
                            return <div className='flex gap-5 p-3 cursor-pointer hover:bg-black/20 border-b-2' onClick={() => {
                                props.add({ ...value, qty: 0, total: 0 }); props.setMinStock({
                                    min: value.qty
                                }); props.close()
                            }} >
                                <div>{++index}</div>
                                <div>{value.name}</div>
                            </div>
                        })
                    }

                </div>
            </div>

        </Dialog>
    )
}

export default AddProductDialog