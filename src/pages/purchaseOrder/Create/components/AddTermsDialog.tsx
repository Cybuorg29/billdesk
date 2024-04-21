import { Input } from '@mui/joy'
import { Dialog } from '@mui/material'
import React, { useState } from 'react'
import { SolidButton } from '../../../../components/ui/Buttons/solid/SolidButton'

type Props = {
    isOpen: boolean
    close: any
    setValues: (value: { name: string, description: string }) => void
}

const AddTermsDialog = ({ isOpen, close, setValues }: Props) => {


    const [values, setValue] = useState<{
        name: string
        description: string
    }>({
        name: '',
        description: ''
    })


    return (
        <Dialog open={isOpen} fullWidth>
            <div className='p-5'>
                <div className='flex place-content-between'>
                    <div>Add Terms And Condition</div>
                    <div className='p-2 rounded-full hover:bg-gray-200 w-[2rem]  h-[2rem] grid place-content-center cursor-pointer' onClick={() => { close() }}>X</div>
                </div>
                <div className='grid  gap-5 p-2 '>
                    {/* <div>Name</div> */}
                    <Input type='text' placeholder='Name' value={values.name} onChange={(e) => { setValue(prev => { return { ...prev, name: e.target.value } }) }} />
                    <Input type='text' className='h-full' placeholder='Description' value={values.description} onChange={(e) => { setValue(prev => { return { ...prev, description: e.target.value } }) }} />
                </div>

                <div className='p-4 flex  place-content-end items-center'>
                    <SolidButton color='black' innerText='Add' onClick={() => { setValues(values); setValue({ description: '', name: '' }); close() }} />
                    <div className='text-gray-400 cursor-pointer' onClick={() => { close() }}>Cancel</div>
                </div>


            </div>

        </Dialog>
    )
}

export default AddTermsDialog