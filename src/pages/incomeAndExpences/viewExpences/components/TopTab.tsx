import { Button } from '@mui/material'
import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'

type Props = {}

const TopTab = (props: Props) => {
    const { sort } = useParams()
    const navigate = useNavigate()
    return (
        <div>
            <div className='flex  border p-4 rounded-xl  justify-between items-center  '>

                <div className='text-xl font-semibold'>Expences</div>
                <div className='flex items-center gap-4 '> <div>View</div>

                    <select value={sort} onChange={(e) => { navigate(`/view/${e.target.value}/expences`) }}  >
                        <option value='400'>Salaries Paid </option>
                        <option value='500'>others</option>
                        <option value='300'>Purchase </option>
                        <option value='200'>Purchase of Goods</option>
                        <option value='100'>Provision Paid</option>
                        <option value='all'>All</option>
                    </select>
                </div>
                <div><Button color='error' variant='outlined' onClick={() => navigate(`/create/expence`)} >Add Expence</Button></div>
            </div>
        </div>
    )
}

export default TopTab