import React from 'react'
import '../css/Income.css'
import CurrencyRupeeRoundedIcon from '@mui/icons-material/CurrencyRupeeRounded';
import { useAppSelector } from '../../../store/app/hooks';
type Props = {}

const IncomeTab = ({}: Props) => {
     const {totalIncome}  = useAppSelector(state=>state.tracker)
  return (
    <div>

<div className="card  cursor-pointer hover:scale-105 duration-200">
    <div className="title">
        <span>
            <CurrencyRupeeRoundedIcon/>
        </span>
        <p className="title-text">
            Income <label className='text-gray-500 text-sm' >(last 5)</label>
        </p>
      
    </div>
    <div className="data">
        <p>
        {totalIncome.toLocaleString('en-IN', {
            maximumFractionDigits: 2,
            style: 'currency',
            currency: 'INR'
        })}        </p>
        
        <div className="range">
            <div className="fill ">
            </div>
        </div>
    </div>
</div>

    </div>
  )
}

export default IncomeTab