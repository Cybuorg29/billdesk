import React from 'react'
import '../css/Income.css'
import CurrencyRupeeRoundedIcon from '@mui/icons-material/CurrencyRupeeRounded';
type Props = {amount:number}

const IncomeTab = ({amount}: Props) => {
  return (
    <div>
        
<div className="card  cursor-pointer hover:scale-105 duration-200">
    <div className="title">
        <span>
            <CurrencyRupeeRoundedIcon/>
        </span>
        <p className="title-text">
            Income
        </p>
      
    </div>
    <div className="data">
        <p>
        {amount.toLocaleString('en-IN', {
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