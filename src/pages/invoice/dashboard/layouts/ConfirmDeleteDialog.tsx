import { Dialog } from '@mui/material'
import React from 'react'
import { SolidButton } from '../../../../components/ui/Buttons/solid/SolidButton'
import { deleteInvoiceAction } from '../../../../store/actions/invoice/delete'

type Props = {
    invoiceNo: string
    isOPen: boolean
    close: () => void
    toDelete: string

}

const ConfirmDeleteDialog = (props: Props) => {
    return (
        <>
            <Dialog open={props.isOPen} fullWidth   >
                <div className='p-5'>
                    <div className='flex place-content-end'>
                        <div className='cursor-pointer ' onClick={() => { props.close() }}>X</div>
                    </div>
                    <div className='p-4 pt-1'>Do You Really Want To Delete  Invoice No : <b>{props.invoiceNo}</b>  ? </div>
                    <div className='flex place-content-end'>
                        <SolidButton color='black' innerText='Delete' onClick={() => { deleteInvoiceAction(props.toDelete); props.close() }} />
                        <SolidButton color='primary' innerText='Cancel' onClick={() => { props.close() }} />
                    </div>
                </div>
            </Dialog>
        </>
    )
}

export default ConfirmDeleteDialog