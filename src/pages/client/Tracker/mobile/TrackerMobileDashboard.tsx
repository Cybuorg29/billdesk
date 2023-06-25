import React from 'react'
import { Pie, PieChart, ResponsiveContainer } from 'recharts'
import TrackerChart from '../../../../components/charts/tracker/TrackerChart'
import { useAppSelector } from '../../../../store/app/hooks'
import ExpencesTab from '../tabs/ExpencesTab'

type Props = {}

const TrackerMobileDashboard = (props: Props) => {
  const { totalExpences, totalIncome } = useAppSelector(state => state.tracker)
  const balance = totalExpences - totalIncome
  const BalanceDiv = () => {
    if (balance >= 0) {
      return (
        <><div className=' text-center ' >
          <div className='font-bold' >Balance</div>
          <div className='font-black'>{balance}</div>
        </div></>
      )
    } else {
      return (<>
        <div>
          <div>Balance:</div>
          <div>{balance}</div>
        </div>
      </>)
    }
  }
  return (
    <div className='h-full p-2 ' >
      <div className='grid grid-cols-2 h-[20%] gap-2' >
        <div className='grid items-center justify-items-center bg-white shadow-xl rounded-2xl' >
          <BalanceDiv />
        </div>
        <div className='grid grid-rows-2 gap-2' >
          {IncomeTab()}
          {ExpencesTab()}
        </div>
      </div>

    </div>
  )

  function ExpencesTab() {
    return <div className='h-full bg-white p-2 shadow-xl rounded-xl'>
      <div className='flex items-center gap-2'>
        <div className='rounded-full w-2 h-2 bg-red-900'></div>
        <div className='font-bold'>Expences</div>
      </div>
      <div className='text-center font-black'>{totalExpences}</div>
    </div>
  }

  function IncomeTab() {
    return <div className='h-full bg-white p-2 shadow-xl rounded-xl'>
      <div className='flex items-center gap-2'>
        <div className='rounded-full w-2 h-2 bg-green-900'></div>
        <div className='font-bold'>Income</div>
      </div>
      <div className='text-center font-black'>{totalIncome}</div>
    </div>
  }
}

export default TrackerMobileDashboard