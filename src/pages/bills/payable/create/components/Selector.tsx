import { MenuItem, Select } from '@mui/material'
import React, { useEffect } from 'react'
import { creatBilledFromObj } from '../functions/createBilledFrom'
import { useAppSelector } from '../../../../../store/app/hooks'
import { initlisePurchaseOrder } from '../../../../../store/actions/purchaseOrder/action'
import { toast } from 'react-toastify'

type Props = {
    connectionsArray: any[],
    data: any,
    setData: any
}

const Selector = ({ connectionsArray, data, setData }: Props) => {

    const { purchase_Order, isLoaded } = useAppSelector(state => state.po);



    useEffect(() => {
        if (!isLoaded) {
            initlisePurchaseOrder();
        }
    }, [isLoaded, purchase_Order])


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
        </>
    )
}

export default Selector