import React from 'react'

type Props = {
    children: React.ReactNode
}

const CheckInvoiceState = (props: Props) => {
    return (
        <div className='w-full h-full '>{props.children}</div>
    )
}

export default CheckInvoiceState