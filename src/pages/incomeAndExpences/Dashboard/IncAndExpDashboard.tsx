import React from 'react'
import ExpencesTab from './tabs/ExpencesTab'
import IncomeTab from './tabs/IncomeTab'
import ExpencesTable from '../../../components/table/tracker/ExpencesTable'
import IncomeTable from '../../../components/table/tracker/IncomeTable'
import TrackerChart from '../../../components/charts/tracker/TrackerChart'
import { Link } from 'react-router-dom'
import BalanceTab from './tabs/BalanceTab'
type Props = {}

const IncAndExpDashboard = (props: Props) => {


  return (
    <div className='grid grid-cols-2 h-full gap-2 ' >
      <div className=' h-[100%] ' >
        <div className=' h-[30%]  flex  p-2 gap-5  ' >
          <IncomeTab />
          <ExpencesTab />
          <BalanceTab />
        </div>
        <div className='h-[8%]  mb-2  rounded-xl  p-2  grid grid-cols-2 place-items-center gap-3' >

          <Link to={`/create/income`} className={'w-full border bg-green-600 rounded-xl text-white shadow-xl hover:scale-105 duration-150  uppercase text-center p-2'} >  Add Income

          </Link>
          <Link to={`/create/expence`} className={'w-full border  bg-[#FF6384] shadow-xl hover:scale-105 duration-150  text-white rounded-xl uppercase text-center p-2'} >  Add Expence

          </Link>
        </div>
        <div className='mt-4 h-[62%]  ' >
          <div className='p-5 border shadow-xl rounded-xl grid items-centers  ' >
            <TrackerChart />
          </div>
        </div>
      </div>
      <div className='grid grid-rows-2  h-[100%] overflow-hidden gap-5  ' >
        <IncomeTable />
        <ExpencesTable />
      </div>

    </div>
  )
}

export default IncAndExpDashboard