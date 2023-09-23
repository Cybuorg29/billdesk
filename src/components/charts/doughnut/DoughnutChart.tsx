import React from 'react'
import CurrencyRupeeRoundedIcon from '@mui/icons-material/CurrencyRupeeRounded';

import { Doughnut } from 'react-chartjs-2';
import { useAppSelector } from '../../../store/app/hooks';
import { converToInrFormat } from '../../../utils/ConvertInrFormat';
type Props = { datas: any[], color: any[], labels: any[], amount: any }

const DoughnutChart = ({ amount, color, datas, labels }: Props) => {
    const { totalIncome } = useAppSelector(state => state.incomeAndExpence)
    const total = converToInrFormat(totalIncome)

    const data: any = {
        labels: [labels],
        datasets: [{
            label: 'My First Dataset',
            data: [datas],
            backgroundColor: [color],
            hoverOffset: 4
        }]
    };
    return (
        <div className='rounded-xl bg-white border shadow-xl grid place-items-center hover:scale-105 cursor-pointer duration-150' >
            <div >
                <div className='' >
                    <Doughnut className='' data={data} options={{maintainAspectRatio:false}} />
                </div>
                <div className='mt-2'>
                    <div className='text-center ' >Income</div>
                    <div className='text-center font-bold text-xl ' >{total}</div>
                </div>
            </div>

        </div>
    )
}

export default DoughnutChart