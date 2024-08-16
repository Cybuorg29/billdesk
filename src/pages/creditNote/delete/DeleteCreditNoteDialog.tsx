import { Dialog } from '@mui/material'
import React from 'react'
import { SolidButton } from '../../../components/ui/Buttons/solid/SolidButton'
import { DeleteCreditNoteAction } from '../../../store/actions/creditNote/action'

type Props = {
    open: boolean
    close: () => void
    id: string
    no: string
}

const DeleteCreditNoteDialog = (props: Props) => {

    return (
        <Dialog open={props.open} fullWidth className='p-5'>
            <div className='w-full h-full p-5'>
                <div className='flex place-content-between '>
                    <div>Delete Credit Note</div>
                    <div className='cursor-pointer' onClick={() => { props.close() }}>X</div>
                </div>
                <div className=''>
                    Do You Want To Delete This Credit Note  No : {props.no} ?
                </div>
                <div className='flex place-content-end'>
                    <SolidButton color='error' innerText='Delete' onClick={() => { DeleteCreditNoteAction(props.id); props.close() }} />
                    <SolidButton color='black' innerText='Cancel' onClick={() => { props.close() }} />

                </div>

            </div>

        </Dialog>
    )
}

export default DeleteCreditNoteDialog