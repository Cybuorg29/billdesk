import React from 'react'

type Props = {
    onClick: () => any,
    name: string
}

const Button = (props: Props) => {
    return (
        <div className='h-fit w-fit p-2'>
            <button className='px-4 py-2 bg-black text-white rounded-md' onClick={() => { props.onClick() }}>{props.name}</button>
        </div>
    )
}

export default Button