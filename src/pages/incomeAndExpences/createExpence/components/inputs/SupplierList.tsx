import { MenuItem, Select } from '@mui/material'
import React from 'react'
import { useAppSelector } from '../../../../../store/app/hooks'
import { useNavigate } from 'react-router-dom'

interface Props { value: string, onchange: any }

const SupplierList = ({ onchange, value }: Props) => {
    const { connections, isConnection } = useAppSelector(state => state.connections)
    const navigate = useNavigate()
    return (
        <div className='grid gap-3'>
            <label>Select Product</label>
            <Select className='' value={value} onChange={(e: any) => { onchange(e.target.value) }} >
                {
                    connections.supplier.map((index: any) => {
                        return (
                            <MenuItem value={`${index?._id}`} >{index?.name}</MenuItem>
                        )
                    })

                }
                <MenuItem onClick={() => { navigate(`/create/connection`) }} className='bg-slate-100'   ><div className='text-blue-600 text-center w-full border' >Add Product</div></MenuItem>
            </Select>
        </div>
    )
}

export default SupplierList