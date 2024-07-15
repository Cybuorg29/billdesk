import { useId, useState } from 'react'

import TopSection from './layouts/TopSection'

import TopTabs from './layouts/TopTabs'
import Table from './layouts/Table'

type Props = {}

const InvoiceDashboard = (props: Props) => {

  const [type, setType] = useState('Total Invoice');
  const topSectionKey = useId();
  const topTabsKey = useId();
  const tableKey = useId();

  return (
    <div className='w-full h-full p-5 flex gap-5 flex-col' >
      <div className='w-full h-[5%]'>
        <TopSection key={topSectionKey} />
      </div>
      <div className='h-[15%] flex gap-5' >
        <TopTabs set={setType} type={type} key={topTabsKey} />
      </div>
      <div className='h-[80%] overflow-auto bg-component rounded-lg '>
        <Table set={setType} type={type} key={tableKey} />
      </div>

    </div>
  )
}

export default InvoiceDashboard