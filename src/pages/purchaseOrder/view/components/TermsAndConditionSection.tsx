import React from 'react'

type Props = {
    array: any
}

const TermsAndConditionSection = ({ array }: Props) => {
    return (
        <>
            <div className=' pl-2 text-md'>Terms And Conditions</div>
            <div className='w-full h-full grid grid-flow-row'>
                {
                    array.map((value: any, i: number) => {
                        return <div className='grid grid-cols-2 border-t-2 text-xs border-black'>

                            <div className='pl-2'>{++i + ".  "} {value.name}</div>
                            <div>{value.description}</div>
                        </div>
                    })
                }



            </div>
        </>
    )
}

export default TermsAndConditionSection