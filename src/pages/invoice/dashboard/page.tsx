import React, { useEffect, useId, useState } from 'react'
import PageHeading from '../../../components/ui/Page Heading/PageHeading'
import { SolidButton } from '../../../components/ui/Buttons/solid/SolidButton'
import { useNavigate } from 'react-router-dom'
import TopSection from './layouts/TopSection'
import Tabs, { tabProps } from '../../../components/ui/tabs/Tabs'
import { useAppSelector } from '../../../store/app/hooks'
import { setInvoiceAction } from '../../../store/actions/invoice/set'
import { IcreateInvoice, Iinvoice } from '../../../models/invoice/invoice.model'
import TopTabs from './layouts/TopTabs'
import Table from './layouts/Table'

type Props = {}

const InvoiceDashboard = (props: Props) => {

   const [type,setType] = useState('Total Invoice');
   const topSectionKey = useId();
   const topTabsKey = useId();
   const tableKey = useId();

  return (
    <div className='w-full h-full p-5 flex gap-5 flex-col' >
      <div className='w-full h-[5%]'>
        <TopSection key={topSectionKey} />
      </div>
      <div className='h-[15%] flex gap-5' >
         <TopTabs set={setType}  type={type} key={topTabsKey} />
      </div>
       <div className='h-[80%] bg-component rounded-lg '> 
         <Table set={setType} type={type} key={tableKey}/>
       </div>

    </div>
  )
}

export default InvoiceDashboard