
import IncomeTable from './components/IncomeTable'
import TopTab from './components/TopTab'

type Props = {}

const ViewIncome = (props: Props) => {
  return (
    <div className=' gap-5 flex flex-col  w-full h-full' >
      {/* {TopTab(sortValue, setSortValue)} */}
      <TopTab />
      <div className='min-h-[80%] bg-component pt-2 rounded-xl' >
      <IncomeTable />
      </div>




    </div>
  )
}

export default ViewIncome


