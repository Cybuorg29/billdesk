import React, { useEffect } from 'react'
import '../css/Expence.css'
import CurrencyRupeeRoundedIcon from '@mui/icons-material/CurrencyRupeeRounded';
import { useAppSelector } from '../../../store/app/hooks';
type Props = {}

const ExpencesTab = ({}: Props) => {
     const {totalExpences} = useAppSelector(state=>state.tracker)
 
    // useEffect(()=>{
    //      const div:any =document.getElementById('result1').innerHTML
         
    //        div.number.
    // },[])
  return (
    <div>
        
<div className="card  cursor-pointer hover:scale-105 duration-200">
    <div className="title">
        <span>
            <CurrencyRupeeRoundedIcon/>
        </span>
        <p className="title-text">
            Expence
        </p>
      
    </div>
    <div className="data">
        <p id='result1' >
            {/* {amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} */}
            {totalExpences.toLocaleString('en-IN', {
            maximumFractionDigits: 2,
            style: 'currency',
            currency: 'INR'
        })}
        </p>
        
        <div className="range">
            <div className="filll">
            </div>
        </div>
    </div>
</div>

    </div>  )
}

export default ExpencesTab