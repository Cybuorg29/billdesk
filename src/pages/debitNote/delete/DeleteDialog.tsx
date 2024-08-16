import { Dialog } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useAppSelector } from '../../../store/app/hooks'
import { IDebitNote } from '../../../store/features/debitNote/model'
import { SolidButton } from '../../../components/ui/Buttons/solid/SolidButton'
import { DeleteDebitNote } from '../../../store/actions/debitNote/action'

type Props = {
    open: boolean
    close: any
    id: string
}

const DeleteDialog = (props: Props) => {
    const { auth, DebitNote } = useAppSelector(state => state);
    const [data, setData] = useState<IDebitNote>()

    useEffect(() => {
        const find = DebitNote.notes.find((value) => value._id === props.id);
        if (find) setData(() => find);
    }, [auth, DebitNote])
    return (
        <>
            <Dialog open={props.open} fullWidth className='p-5'>
                <div className='p-5'>

                    <div className='h-[10%] border-b-2 flex place-content-between'>
                        <div>Delete Debit Note ?</div>
                        <div className='text-xl cursor-pointer' onClick={() => { props.close() }}>X</div>
                    </div>
                    <div className=''>
                        Do You Really Want To Delete Debit Note - {data?.note_No} ?
                    </div>
                    <div className='grid place-content-end grid-cols-2 p-2'>
                        <div></div>
                        <div className='flex gap-3 items-end justify-items-end'>
                            <SolidButton color='error' innerText='Delete' onClick={() => { DeleteDebitNote(props.id); close() }} />
                            <SolidButton color='black' innerText='Cancel' onClick={() => { close() }} />
                        </div>

                    </div>
                </div>

            </Dialog>
        </>
    )
}

export default DeleteDialog