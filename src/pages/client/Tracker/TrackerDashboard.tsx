import React, { useEffect } from 'react'
import ExpencesTab from './tabs/ExpencesTab'
import IncomeTab from './tabs/IncomeTab'
import { useAppSelector } from '../../../store/app/hooks'
import ExpencesTable from '../../../components/table/tracker/ExpencesTable'
import IncomeTable from '../../../components/table/tracker/IncomeTable'
import AddExpences from '../../../components/cards/expences/AddExpences'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import TrackerChart from '../../../components/charts/tracker/TrackerChart'

type Props = {}

const TrackerDashboard = (props: Props) => {
   const tracker = useAppSelector(state=>state.tracker)
 
  return (
    <div className='grid grid-cols-2 h-full gap-2 ' >
      <div  className=' h-full ' >
      <div  className='grid lg:grid-cols-2   h-[20%] p-4' >
      <IncomeTab   />
      <ExpencesTab />
      
      </div>
      <div  className='h-[80%] ' >
        <div className='grid grid-cols-2  h-[15%] gap-3  p-5' >
          {/* <AddExpences/> */}
          <div className='h-full  rounded-xl bg-gradient-to-r from-green-500 to-green-700 border shadow-xl  cursor-pointer hover:scale-105 duration-200  grid justify-items-center items-center  grid-flow-col text-white' >
            <div>Add Income  </div>
            <div>{<ArrowForwardIosIcon/>}</div>
          </div>
          <div className='h-full  rounded-xl bg-gradient-to-r from-red-500 to-red-700 border shadow-xl  cursor-pointer hover:scale-105 duration-200  grid justify-items-center items-center  grid-flow-col text-white' >
            <div>Add Expences  </div>
            <div>{<ArrowForwardIosIcon/>}</div>
          </div>
        </div>
        <div className='p-5 border shadow-xl rounded-xl grid items-centers  h-[85%]' >
          <TrackerChart/>
        </div>
      </div>
      </div>
      <div  className='grid grid-rows-2 h-full gap-5  ' >
       <IncomeTable/>
      <ExpencesTable/>
      </div>
  
    </div>
  )
}

export default TrackerDashboard