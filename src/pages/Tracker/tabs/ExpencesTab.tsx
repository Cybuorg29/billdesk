import React, { useEffect } from 'react'
import '../css/Expence.css'
import CurrencyRupeeRoundedIcon from '@mui/icons-material/CurrencyRupeeRounded';
import { useAppSelector } from '../../../store/app/hooks';
import { converToInrFormat } from '../../../utils/ConvertInrFormat';
type Props = {}

const ExpencesTab = ({ }: Props) => {
    const { totalExpences } = useAppSelector(state => state.tracker)
    const total = converToInrFormat(totalExpences)

    // useEffect(()=>{
    //      const div:any =document.getElementById('result1').innerHTML

    //        div.number.
    // },[])
    return (
        <div>

            <div className="card  cursor-pointer hover:scale-105 duration-200">
                <div className="title">
                    <span>
                        <CurrencyRupeeRoundedIcon />
                    </span>
                    <p className="title-text">
                        Expence <label className='text-gray-500 text-sm' >(last 5)</label>
                    </p>

                </div>
                <div className="data">
                    <p id='result1' >
                        {/* {amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} */}
                        {total}
                    </p>

                    <div className="range">
                        <div className="filll">
                        </div>
                    </div>
                </div>
            </div>

        </div>)
}

export default ExpencesTab