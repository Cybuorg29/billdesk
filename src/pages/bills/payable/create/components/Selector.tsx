import { MenuItem, Select } from '@mui/material'
import React, { useEffect } from 'react'
import { creatBilledFromObj } from '../functions/createBilledFrom'
import { useAppSelector } from '../../../../../store/app/hooks'
import { initlisePurchaseOrder } from '../../../../../store/actions/purchaseOrder/action'
import { toast } from 'react-toastify'
import { Input } from '@mui/joy'
import { IbillsPaylable, IcreateBillsPayable } from '../../../../../store/features/bills/receivable/model'
import { userDetailSchema } from '../../../../../models/userModel'

type Props = {
    connectionsArray: any[],
    data: IcreateBillsPayable,
    setData: any
}

const Selector = ({ connectionsArray, data, setData }: Props) => {

    const { purchase_Order, isLoaded } = useAppSelector(state => state.po);



    useEffect(() => {
        if (!isLoaded) {
            initlisePurchaseOrder();
        }
    }, [isLoaded, purchase_Order]);

    useEffect(() => {
        const po = purchase_Order.find((value) => value._id === data.po.id);
        if (!po) null
        else {
            const usr = connectionsArray.find((value: userDetailSchema) => value.name === po?.to.name);
            if (!usr) null
            else setData((prev: IcreateBillsPayable) => { return { ...prev, billed_From: creatBilledFromObj(usr) } });
        }

    }, [data.po])


    return (
        <>

            <div className='text-end  w-[20%] h-full pr-3 flex items-center'>
                Billed From
            </div>
            <div className='w-[80%] h-full overflow-hidden'>
                <Select className='w-full h-full' value={data.billed_From.name}  >
                    {
                        connectionsArray.map((index: any) => {
                            return <MenuItem value={index?.name} onClick={() => { setData(((prev: any) => { return { ...prev, billed_From: creatBilledFromObj(index) } })) }}>{index.name}</MenuItem>
                        })
                    }
                </Select>

            </div>

            <div className='text-end  w-[20%] h-full pr-3 flex items-center'>
                P.O No
            </div>
            <div className='w-[80%] h-full overflow-hidden'>
                <Select className='w-full h-full' value={data.po.number} >
                    {
                        purchase_Order.map((index) => {
                            return <MenuItem value={index.po_NO} onClick={() => { setData((prev: any) => { return { ...prev, po: { number: index.po_NO, id: index._id } } }) }}   >{index.po_NO}</MenuItem>
                        })

                    }
                </Select>

            </div>
            <div>Invoice No:</div>
            <Input type='text' value={data.no} onChange={(e: any) => { console.log(e.target.value); setData((prev: any) => { return { ...prev, no: e.target.value } }) }} />
        </>
    )
}

export default Selector