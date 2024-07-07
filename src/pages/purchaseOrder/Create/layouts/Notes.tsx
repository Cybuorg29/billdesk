import React, { useState } from 'react'
import AddNotesDialog from '../components/AddNotesDialog'

type Props = {
    array: any[]
    push: any
    close: any
}

const Notes = ({ array, push, close }: Props) => {
    const [openDialog, setOpenDialog] = useState<boolean>(false);
    return (
        <>
            <AddNotesDialog isOpen={openDialog} close={() => { setOpenDialog(false) }} push={(value: string) => { push(value) }} />
            <div className='flex gap-1'>
                <span>Notes</span>
                <div className='text-blue-400 text-xs flex place-content-center items-center cursor-pointer' onClick={() => { setOpenDialog(true) }}><span>Add</span></div>

            </div>

            <div className='text-xs'>
                {
                    array.map((index: any, i: number) => {
                        return <div className='grid grid-cols-8 border-b gap-2'>
                            <div className='col-span-7'>{index}</div>
                            <div className='col-span-1 cursor-pointer' onClick={() => { close(i) }}>X</div>
                        </div>
                    })
                }

            </div>



        </>

    )
}

export default Notes