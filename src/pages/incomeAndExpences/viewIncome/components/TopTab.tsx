import { Button, MenuItem, Select } from '@mui/material'
import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'

type Props = {}

const TopTab = ({}: Props) => {
   const {sort} = useParams()
   const navigate = useNavigate()
  return (
    <div className='flex  border p-4 rounded-xl  justify-between items-center  '>
  
      <div className='text-xl font-semibold'>Incomes</div>
      <div className='flex items-center gap-4 '> <div>View</div>
        {/* <Select value={sortValue} className='' onChange={(e) => setSortValue(e.target.value)}>
          <MenuItem value='invoice'>invoices</MenuItem>
          <MenuItem value='other'>others</MenuItem>
          <MenuItem value='All'>All</MenuItem>
        </Select> */}
        <select  value={sort} onChange={(e)=>{navigate(`/view/${e.target.value}/income`)}}  >
        <option value='invoice'>invoices</option>
          <option  value='others'>others</option>
          <option  value='all'>All</option>
        </select>
      </div>
      <div><Button color='success' variant='outlined'>Add Income</Button></div>
    </div>
  )
}

export default TopTab