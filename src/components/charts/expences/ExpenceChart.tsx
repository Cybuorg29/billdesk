import React from 'react'
import { useAppSelector } from '../../../store/app/hooks';
import { Area, Bar, BarChart, CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
type Props = {}

const ExpenceChart = (props: Props) => {
      const {expences} = useAppSelector(state=>state.incomeAndExpence)
  return (
  
        <ResponsiveContainer
      width={"100%"}
      height={"100%"}
      className={"grid items-center p-2 "}
    >
    <LineChart width={600} height={300} data={expences} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
    <Line type="monotone" dataKey="amount" stroke="#8884d8" strokeWidth={2} />
    <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
    <XAxis dataKey="date" />
    <YAxis />
    <Tooltip/>
    {/* <Legend/> */}
  </LineChart>
    </ResponsiveContainer>

  )
}

export default ExpenceChart


