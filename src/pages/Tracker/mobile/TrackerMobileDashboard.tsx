import React from 'react'
import { Pie, PieChart, ResponsiveContainer } from 'recharts'
import TrackerChart from '../../../components/charts/tracker/TrackerChart'
import ExpencesTable from '../../../components/table/tracker/ExpencesTable'
import IncomeTable from '../../../components/table/tracker/IncomeTable'
import { useAppSelector } from '../../../store/app/hooks'
import ExpencesTab from '../tabs/ExpencesTab'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';


type Props = {}

const TrackerMobileDashboard = (props: Props) => {
  const { totalExpences, totalIncome } = useAppSelector(state => state.tracker)
  const balance = totalExpences - totalIncome
  const BalanceDiv = () => {
    if (balance >= 0) {
      return (
        <><div className=' text-center  ' >
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
    <div className='h-full p-2 bg-slate-50   ' >
      <div className='grid grid-cols-2 h-[25%] gap-2 ' >
        <div className='grid items-center justify-items-center bg-white border border-gray-300  rounded-2xl' >
          <BalanceDiv />
        </div>
        <div className='grid grid-rows-2 gap-2 p-1' >
          {IncomeTab()}
          {ExpencesTab()}
        </div>
      </div>
      <div  className='m-2 h-[10%] grid grid-cols-2 gap-2 ' >
      <div className='h-full  rounded-xl bg-green-700/90 border   cursor-pointer hover:scale-105 duration-200  grid justify-items-center items-center  grid-flow-col text-white' >
            <div>Add Income  </div>
            <div>{<ArrowForwardIosIcon/>}</div>
          </div>
          <div className='h-full  rounded-xl bg-red-700/90 border   cursor-pointer hover:scale-105 duration-200  grid justify-items-center items-center  grid-flow-col text-white' >
            <div>Add Expences  </div>
            <div>{<ArrowForwardIosIcon/>}</div>
          </div>
        
      </div>

      <div  className='  mt-2  ' >
        <div  className='grid gap-2' >
          <ExpencesTable/>
          <IncomeTable/>
        </div>

      </div>
    </div>
  )

  function ExpencesTab() {
    return <div className='h-full bg-white border p-1   border-gray-300 rounded-xl'>
      <div className='flex items-center gap-2'>
        <div className='rounded-full w-2 h-2 bg-red-900'></div>
        <div className='font-bold'>Expences</div>
      </div>
      <div className='text-center font-black'>{totalExpences}</div>
    </div>
  }

  function IncomeTab() {
    return <div className='h-full bg-white  p-1 border border-gray-300 rounded-xl'>
      <div className='flex items-center gap-2'>
        <div className='rounded-full w-2 h-2 bg-green-900'></div>
        <div className='font-bold'>Income</div>
      </div>
      <div className='text-center font-black'>{totalIncome}</div>
    </div>
  }
}

export default TrackerMobileDashboard