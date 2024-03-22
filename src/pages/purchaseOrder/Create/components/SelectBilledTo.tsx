import { MenuItem, Select } from '@mui/material'
import React from 'react'

type Props = {
    value: any
    onchange: any
    arrayList: any[]
    name: string
}

const SelectBilledTo = (props: Props) => {

    return (
        <>
            <div>{props.name}</div>
            <Select className='w-full' value={props.arrayList[props.value]?.name} onChange={(e: any) => { console.log('ll', e.target.title); props.onchange(e) }}  >
                {
                    props.arrayList.map((index: any, i: number) => {
                        return <MenuItem value={i} title={`${i}`} >{index.name}</MenuItem>
                    })
                }

            </Select>
        </>
    )
}

export default SelectBilledTo