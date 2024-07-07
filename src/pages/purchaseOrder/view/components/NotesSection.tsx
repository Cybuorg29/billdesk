import React from 'react'

type Props = {
    array: string[]
}

const NotesSection = ({ array }: Props) => {
    return (
        <div className=''>
            <div className='pl-2 border-b-2 border-black'>Note</div>
            <div>
                {
                    array.map((value, i: number) => {
                        return <div className='pl-2 text-xs'>{++i + ".  "}{value}</div>
                    })
                }

            </div>

        </div>
    )
}

export default NotesSection