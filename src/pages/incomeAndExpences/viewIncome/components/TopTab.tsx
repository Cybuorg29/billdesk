import { Button, MenuItem, Select } from '@mui/material'
import React, { useId } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import IncomeAndExpenceSelect from '../../../../components/Select/IncomeAndExpenceSelect'
import { SolidButton } from '../../../../components/ui/Buttons/solid/SolidButton'

type Props = {}

const TopTab = ({}: Props) => {
   const {sort} = useParams()
   const navigate = useNavigate()
    const SolidButtonKey = useId();
  return (
    <div className='flex   p-4 rounded-xl  justify-between items-center  '>
        
         <div className='flex gap-5 place-items-center'>
      <div className='text-xl font-semibold'>Incomes</div>
      <IncomeAndExpenceSelect/>
         </div>
      <div className='flex items-center gap-4 '> <div>View</div>
        {/* <Select value={sortValue} className='' onChange={(e) => setSortValue(e.target.value)}>
          <MenuItem value='invoice'>invoices</MenuItem>
          <MenuItem value='other'>others</MenuItem>
          <MenuItem value='All'>All</MenuItem>
        </Select> */}
        <select name='' title='Income Type' value={sort} onChange={(e)=>{navigate(`/view/${e.target.value}/income`)}}  >
        <option value='invoice'>invoices</option>
          <option  value='others'>others</option>
          <option  value='all'>All</option>
        </select>
      </div>
      <div>
        <SolidButton color='black' innerText='Add Income' onClick={()=>{navigate('/create/income')}} key={SolidButtonKey}  />
      </div>
    </div>
  )
}

export default TopTab