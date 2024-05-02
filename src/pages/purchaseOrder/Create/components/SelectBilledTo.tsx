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
        <div className='h-full w-full grid '>
            <div className='h-[10%]'>{props.name}</div>
            <Select className='w-full h-[60%] ' value={props.value} onChange={(e: any) => { console.log('ll', e.target.title); props.onchange(e) }}  >
                {
                    props.arrayList.map((index: any, i: number) => {
                        return <MenuItem value={i} title={`${i}`} >{index.name}</MenuItem>
                    })
                }

            </Select>
        </div>
    )
}

export default SelectBilledTo