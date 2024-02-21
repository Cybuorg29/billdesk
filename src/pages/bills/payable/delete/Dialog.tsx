import { Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material'
import React from 'react'
import { SolidButton } from '../../../../components/ui/Buttons/solid/SolidButton'
import { DeleteBillsPayableAction } from '../../../../store/actions/bills/payable/delete'

type Props = {
    name: string
    date: string
    onclick: any
    close: any
    isOpen: boolean
    invoiceNo: string
}

const DeleteBillsPayableDialog = ({ close, date, isOpen, name, onclick, invoiceNo }: Props) => {
    return (
        <Dialog open={isOpen} fullWidth>
            <DialogTitle>Delete Bills Payable </DialogTitle>
            <DialogContent>Do You Really Want To Delete The Invoice From {name} Created On {date} </DialogContent>
            <DialogActions>
                <div className=' h-full grid  place-content-center'>
                    <SolidButton color='black' innerText='Delete' onClick={() => { DeleteBillsPayableAction(invoiceNo); close() }} key={'DeleteButton'} />
                </div>
                <div className='text-gray-700 h-full grid place-content-center cursor-pointer' onClick={() => close()}>Cancel</div>
            </DialogActions>
        </Dialog>
    )
}

export default DeleteBillsPayableDialog