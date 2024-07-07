import { Dialog, DialogTitle } from '@mui/material'
import React, { useEffect, useId, useState } from 'react'
import Inputs from '../create/components/Inputs'
import { SolidButton } from '../../../components/ui/Buttons/solid/SolidButton'

type Props = { scale: boolean, close: any, _id: string, }

const AddQtyAmount = ({ _id, close, scale }: Props) => {
    const QtyInputKey = useId();
    const rateInputKey = useId();
    const addStockButtonKey = useId();
    const [update, setUpdate] = useState({
        _id: _id,
        qty: 0,
        rate: 0
    });

    useEffect(() => {

    }, [_id, close, scale]);
    return (
        <Dialog open={scale} fullWidth>
            <DialogTitle>Add Stock</DialogTitle>
            <div className='grid gap-5 p-5' >
                <Inputs name='Quantity to add' onchange={(e: any) => { setUpdate((prev) => { return { ...prev, qty: e.target.value } }) }} type={'number'} value={update.qty} key={QtyInputKey} />
                <Inputs name='New Rate (new rate will be set for all the previous stock)' onchange={(e: any) => { setUpdate((prev) => { return { ...prev, rate: e.target.value } }) }} type={'number'} value={update.rate} key={rateInputKey} />
                <div className='flex gap-5'>

                    <SolidButton color='black' innerText='ADD STOCK' onClick={() => { console.log(update) }} key={addStockButtonKey} />
                    <SolidButton color='error' innerText='CANCEL' onClick={() => {
                        setUpdate({
                            _id: '',
                            qty: 0,
                            rate: 0
                        }); close(false)
                    }} key={addStockButtonKey} />
                </div>
            </div>

        </Dialog>
    )
}

export default AddQtyAmount