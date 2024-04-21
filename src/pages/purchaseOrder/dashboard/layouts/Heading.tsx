import React, { useId } from 'react'
import PageHeading from '../../../../components/ui/Page Heading/PageHeading'
import { SolidButton } from '../../../../components/ui/Buttons/solid/SolidButton'
import { useNavigate } from 'react-router-dom'

type Props = {}

const Heading = (props: Props) => {
    const keys = {
        heading: useId(),
        button: useId(),
        button2: useId()
    }
    const navigate = useNavigate()
    return (
        <>
            <PageHeading name='Purchase Orders' key={keys.heading} />
            <div className='flex gap-5 items-center'>
                <SolidButton color='black' innerText='Create New +' onClick={() => { navigate('/create/purchase order') }} key={keys.button} />
                {/* <SolidButton color='black' innerText='Record ' onClick={()=>{}} key={keys.button2}/> */}
            </div>
        </>

    )
}

export default Heading