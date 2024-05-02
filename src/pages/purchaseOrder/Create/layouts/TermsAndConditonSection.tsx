import React, { useState } from 'react'
import AddTermsDialog from '../components/AddTermsDialog';


type Props = {
    pushTerm: any
    array: any[]
    remove: (i: number) => void
}

const TermsAndConditonSection = (props: Props) => {
    const [openDialog, setOpenDialog] = useState<boolean>(false);
    return (
        <div className='w-full h-full text-sm '>
            <AddTermsDialog isOpen={openDialog} close={() => setOpenDialog(false)} setValues={(value: { name: string, description: string }) => { props.pushTerm(value) }} />
            <div className='border-b'>Terms And Conditions <span className='text-blue-400 text-xs cursor-pointer' onClick={() => { setOpenDialog(true) }}>Add</span></div>
            {
                props.array.map((index: any, i: number) => {
                    return <><div className='grid grid-cols-8 gap-3 w-full border-b'>
                        <div className='col-span-2'>{index.name}</div>
                        <div className='col-span-5'>{index.description}</div>
                        <div className='col-span-1 cursor-pointer' onClick={() => { props.remove(i) }}>X</div>

                    </div></>
                })
            }
        </div>
    )
}

export default TermsAndConditonSection