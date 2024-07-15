import { Dialog } from '@mui/material'
import React from 'react'
import { SolidButton } from '../../../components/ui/Buttons/solid/SolidButton'
import { deleteSalesOrderAction } from '../../../store/actions/salesOrders/action'

type Props = {
    _id: string
    no: string
    close: () => void
    isOpen: boolean
    index: number | undefined
}

const DeleteDialog = ({ _id, close, no, isOpen, index }: Props) => {
    return (
        <Dialog open={isOpen} fullWidth>
            <div className='p-5'>
                <div className='flex place-content-end'><span className='cursor-pointer' onClick={() => { close() }}>X</span></div>
                <div>Do You Want To Delete Sales Order : <span className='font-bold'>{no}</span> ? </div>
                <div className='flex place-content-end'>
                    <SolidButton color='error' innerText='Delete' onClick={() => {
                        deleteSalesOrderAction(_id, index);
                        close()
                    }} key={'DeleteButton'} />
                    <SolidButton color='black' innerText='Cancel' onClick={() => { close() }} key={'CancelButton'} />

                </div>


            </div>

        </Dialog>
    )
}

export default DeleteDialog