import React, { useEffect } from 'react'
import ExpencesTab from './tabs/ExpencesTab'
import IncomeTab from './tabs/IncomeTab'
import { useAppSelector } from '../../store/app/hooks'
import ExpencesTable from '../../components/table/tracker/ExpencesTable'
import IncomeTable from '../../components/table/tracker/IncomeTable'
import AddExpences from '../../components/cards/expences/AddExpences'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import TrackerChart from '../../components/charts/tracker/TrackerChart'
import { Link } from 'react-router-dom'
import { converToInrFormat } from '../../utils/ConvertInrFormat'

type Props = {}

const TrackerDashboard = (props: Props) => {
  const tracker = useAppSelector(state => state.tracker)


  return (
    <div className='grid grid-cols-2 h-full gap-2 ' >
      <div className=' h-full ' >
        <div className='grid lg:grid-cols-2   h-[20%] p-4' >
          <IncomeTab />
          <ExpencesTab />

        </div>
        <div className='h-[80%] ' >
          <div className='grid grid-cols-2  h-[20%] gap-3  p-5' >
            <div className='border p-3 text-xl grid place-items-center rounded-xl shadow-xl' >
              <div className='font-semibold text-black/90' >Balance <span className='text-gray-500 text-sm' >(Last 5)</span></div>
              <div>{converToInrFormat(tracker.totalIncome - tracker.totalExpences)}</div>
            </div>
            <div className='grid h-full grid-cols-2 gap-2' >
              <div className='grid h-full'>
                {/* <AddExpences /> */}
                <Link to={`/create/income`} className='h-full p-2  rounded-lg bg-green-500 border   cursor-pointer hover:scale-105 duration-200  grid justify-items-center items-center  grid-flow-col text-white' >
                  <div>Add Income  </div>
                  <div>{<ArrowForwardIosIcon />}</div>
                </Link>
                <Link to={`/create/expence`} className='h-full p-2  rounded-lg bg-red-500 border   cursor-pointer hover:scale-105 duration-200  grid justify-items-center items-center  grid-flow-col text-white' >
                  <div>Add Expences  </div>
                  <div>{<ArrowForwardIosIcon />}</div>
                </Link>
              </div>
              <div className='p-2 place-items-center grid bg-blue-500 text-white rounded-lg cursor-pointer hover:scale-105 duration-150' >
                <div className='text-center' > View all Transactions</div>

              </div>

            </div>
          </div>
          <div className='p-5 border shadow-xl rounded-xl grid items-centers  h-[80%]' >
            <TrackerChart />
          </div>
        </div>
      </div>
      <div className='grid grid-rows-2 h-full gap-5  ' >
        <IncomeTable />
        <ExpencesTable />
      </div>

    </div>
  )
}

export default TrackerDashboard