import { Dialog } from '@mui/material'
import React from 'react'
import { SolidButton } from '../../components/ui/Buttons/solid/SolidButton'
import { sendRequest } from '../../store/actions/connections/Request'

type Props = {
    data: any,
    isOpen: boolean
    close: () => void
}

const AddConnectionDialog = (props: Props) => {
    return (
        <Dialog open={props.isOpen} fullWidth>
            <div className='w-full p-5 '>
                <div className='flex place-content-between m-3'>
                    <div>Add as ?</div>
                    {/* <div className='cursor-pointer'>X</div> */}
                </div>

                <div className='grid grid-cols-2 gap-5  justify-items-center' >
                    {/* <Button variant='outlined' >Add as Client</Button> */}
                    <SolidButton color='black' innerText='Add as Client' onClick={() => { sendRequest(props.data._id, 1); props.close() }} key={'addAsClient'} />
                    <SolidButton color='black' innerText='Add as Supplier' onClick={() => {
                        sendRequest(props.data._id, 0); props.close()
                    }} key={'supplierKey'} />
                </div>

            </div>

        </Dialog>
    )
}

export default AddConnectionDialog