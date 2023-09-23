
import IncomeTable from './components/IncomeTable'
import TopTab from './components/TopTab'

type Props = {}

const ViewIncome = (props: Props) => {
  return (
    <div className='grid gap-5' >
      {/* {TopTab(sortValue, setSortValue)} */}
      <TopTab />
      <IncomeTable />




    </div>
  )
}

export default ViewIncome


