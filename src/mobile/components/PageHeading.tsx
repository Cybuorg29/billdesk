import React from 'react'

type Props = {
    name: string
}

const PageHeading = (props: Props) => {
    return (
        <div className='text-xl font-ubuntu p-3'>{props.name}</div>
    )
}

export default PageHeading