import { MenuItem, Select } from '@mui/material'
import React from 'react'

type Props = {
    array: any[],
    set: any
    value: string
    name: string
}

const SelectINput = ({ array, set, value, name }: Props) => {

    class obj {
        adress = ''
        name = ''
        phone = ''
        pincode = ''
        constructor(name: string,
            adress: string,
            pincode: string,
            phone: string) {
            this.name = name
            this.adress = adress
            this.phone = phone
            this.pincode = pincode
        }

    }

    return (
        <div className='w-full h-full flex flex-col '>
            <label className='uppercase row-span-1'>{name}</label>
            <Select className='w-full h-full ' value={value} >
                {
                    array.map((index: any) => {
                        return <MenuItem value={index.name} onClick={() => { set(new obj(index.name, index.adress, index.pincode, index.phone)) }}  >{index.name}</MenuItem>
                    })
                }
            </Select>
        </div>
    )
}

export default SelectINput