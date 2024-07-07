import { Input } from '@mui/joy'
import { Dialog } from '@mui/material'
import React, { useState } from 'react'
import { SolidButton } from '../../../../components/ui/Buttons/solid/SolidButton'

type Props = {
    isOpen: boolean
    close: any
    push: any
}

const AddNotesDialog = ({ isOpen, close, push }: Props) => {
    const [value, setValue] = useState('');
    return (
        <Dialog open={isOpen} fullWidth>
            <div className='p-5 h-full w-full'>
                <div className='flex place-content-between'>
                    <div>Add Note</div>
                    <div className='p-2 rounded-full hover:bg-gray-200 w-[2rem]  h-[2rem] grid place-content-center cursor-pointer' onClick={() => { close() }}>X</div>
                </div>
                <div className=''>

                    <Input placeholder='Enter Note Here' value={value} onChange={(e) => { setValue(e.target.value) }} />

                </div>
                <div className='p-4 flex  place-content-end items-center'>
                    <SolidButton color='black' innerText='Add Note' onClick={() => { push(value); setValue(''); close() }} />
                    <div className='text-gray-400 cursor-pointer' onClick={() => { close() }}>Cancel</div>
                </div>


            </div>

        </Dialog>
    )
}

export default AddNotesDialog