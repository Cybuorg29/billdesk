import React from 'react'
import { Doughnut } from 'react-chartjs-2'
import { useAppSelector } from '../../store/app/hooks'
import { ArcElement, Chart } from 'chart.js'
import { ResponsiveContainer } from 'recharts'
Chart.register(ArcElement)
type Props = {}

const Dashboard = (props: Props) => {
    const { totalExpences, totalIncome } = useAppSelector(state => state.incomeAndExpence)

    const data = {
        labels: [
            'Expence',
            'Income',

        ],
        datasets: [{
            label: 'My First Dataset',
            data: [totalExpences, totalIncome],
            backgroundColor: [
                'rgb(255, 99, 132)',
                'Green',
            ],
            hoverOffset: 4
        }]
    };
    return (
        <div className='grid grid-cols-2' >
            <div>
                <div className=''   >

                    <Doughnut className='' data={data} />
                </div>
            </div>
            <div></div>

        </div>
    )
}

export default Dashboard