import { Input } from '@mui/joy'
import { Button, MenuItem, Select } from '@mui/material'
import React, { useState } from 'react'
import { addExpence } from '../../../store/actions/data/IncomeAndExpence/ExpenceActions'

import { useAppSelector } from '../../../store/app/hooks'

import { createDate } from '../../../utils/CreateDate'
import { removeZero } from '../../../utils/removeZeros'
import { validateNumberInput } from '../../../utils/validateNumberInput'

type Props = {}

const CreateExpence = (props: Props) => {
    const { token } = useAppSelector(state => state.auth)
    const [Expence, setExpence] = useState({
        title: ``,
        category: '500',
        amount: 0,
        date: createDate(),
        Emp_id: '',
        token: token


    })


    const handleAmountInput = (e: any) => {
        let amt = validateNumberInput(e.target.value)
        // let amt = parseFloat(e.target.value);
        amt = removeZero(amt);
        setExpence({ ...Expence, amount: amt })

    }

    return (
        <div className='grid gap-5' >
            <div className='font-semibold text-xl' >Create Expence</div>
            <div className='p-5 border rounded-xl ' >
                <div className='grid gap-3 w-1/2'>
                    <label>Expence Type</label>
                    <Select value={Expence.category} onChange={(e) => { setExpence((prev) => { return { ...prev, category: e.target.value } }) }} >
                        <MenuItem value='400'>Salaries Paid </MenuItem>
                        <MenuItem value='300'>Purchase </MenuItem>
                        <MenuItem value='200'>Purchase of Goods</MenuItem>
                        <MenuItem value='100'>Provision Paid</MenuItem>
                        <MenuItem value='600'>Tax Filled (other)</MenuItem>
                        <MenuItem value='700'>GST Filled</MenuItem>
                        <MenuItem value='500'>others</MenuItem>

                    </Select>
                </div>
                <div className='flex flex-wrap my-5 gap-4  mt-4' >
                    <div className='grid gap-3 w-1/2 ' >
                        <label>Title (Note)</label>
                        <Input value={Expence.title} onChange={(e) => { setExpence({ ...Expence, title: e.target.value }) }} />
                    </div>
                    <div className='grid gap-3 ' >
                        <label>Amount</label>
                        <Input type='number' value={Expence.amount} onChange={(e) => { handleAmountInput(e) }} />
                    </div>

                </div>
                <div>
                    <Button color='info' variant='outlined' onClick={() => { ; addExpence(Expence) }} >Add Expence</Button>
                </div>
            </div>




        </div>
    )
}

export default CreateExpence