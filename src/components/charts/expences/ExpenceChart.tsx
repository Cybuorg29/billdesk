import React from 'react'
import { Chart, LineSeries, Category } from '@syncfusion/ej2-charts';
import { useAppSelector } from '../../../store/app/hooks';
import { Area, Bar, BarChart, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
type Props = {}

const ExpenceChart = (props: Props) => {
      const {expences} = useAppSelector(state=>state.incomeAndExpence)

//     Chart.Inject(LineSeries, Category);
//     let chartData: any[] = [
//           { month: 'Jan', sales: 35 }, { month: 'Feb', sales: 28 },
//           { month: 'Mar', sales: 34 }, { month: 'Apr', sales: 32 },
//           { month: 'May', sales: 40 }, { month: 'Jun', sales: 32 },
//           { month: 'Jul', sales: 35 }, { month: 'Aug', sales: 55 },
//           { month: 'Sep', sales: 38 }, { month: 'Oct', sales: 30 },
//           { month: 'Nov', sales: 25 }, { month: 'Dec', sales: 32 }
//     ];
//     let chart: Chart = new Chart({
//         primaryXAxis: {
//             valueType: 'DateTime'
//         },
//         series:[{
//             // dataSource for chart series
//             dataSource: chartData,
//             xName: 'Date',
//             yName: 'sales',
//             type: 'Line'
//         }]
//     }, '#element');


// chart.appendTo('#element');

  return (
  
        <ResponsiveContainer
      width={"100%"}
      height={"100%"}
      className={"grid items-center  "}
    >
      <BarChart
        data={expences}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
      >
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis dataKey="date" />
        <YAxis />
        {/* <CartesianGrid /> */}
        <Tooltip />
        {/* <Legend /> */}
        <Bar
          type="monotone"
          dataKey="amount"
          fillOpacity={1}
          fill="url(#colorUv)"
        />
      </BarChart>
    </ResponsiveContainer>

  )
}

export default ExpenceChart


