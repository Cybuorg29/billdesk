import { MenuItem, Select } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useAppSelector } from '../../../../../store/app/hooks'
import { EmployeeData } from '../../../../../store/actions/data/employee/get'
import { useNavigate } from 'react-router-dom'
import { getProducts } from '../../../../../store/actions/products'
import { setPayablesAction } from '../../../../../store/actions/bills/payable'
import { IbillsPaylable } from '../../../../../store/features/bills/receivable/model'
import { createDate } from '../../../../../utils/CreateDate'
import convertIsoDate from '../../../../../utils/convertIsoDates'
import { converToInrFormat } from '../../../../../utils/ConvertInrFormat'

type Props = { value: string, handleChange: any }

const BillsPayableList = ({ handleChange, value }: Props) => {
    const { invoice, isLoaded } = useAppSelector(state => state.payables);
    const naviagate = useNavigate()



    useEffect(() => {
        if (!isLoaded) {
            setPayablesAction()
        }
    }, [isLoaded, invoice])





    return (
        <div className='grid gap-3'>
            <label>Select Payable</label>
            <Select className='' value={value} onChange={(e: any) => { handleChange(e.target.value) }} >
                {
                    invoice.map((index: IbillsPaylable) => {
                        if (!index.isPaid) return (
                            <MenuItem value={`${index?._id}`} >
                                <div className='flex gap-3 place-content-between'>
                                    <div>{index.billed_From.name}</div> -
                                    <div>{convertIsoDate(index.createdAt)}</div> -
                                    <div>{converToInrFormat(index.total)}</div>

                                </div>
                            </MenuItem>
                        )
                    })

                }
                <MenuItem onClick={() => { naviagate(`/create/product`) }} className='bg-slate-100'   ><div className='text-blue-600 text-center w-full border' >Add Product</div></MenuItem>
            </Select>
        </div>
    )
}

export default BillsPayableList