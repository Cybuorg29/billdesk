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

 

  return (
    <div className='w-full h-full p-5 flex gap-3 flex-col' >
      <div className='w-full h-[5%]'>
        <TopSection />
      </div>
      <div className='h-[15%] flex gap-5' >
         <TopTabs/>
      </div>
       <div className='h-[80%] bg-component rounded-lg '> 
         <Table/>
       </div>

    </div>
  )
}

export default InvoiceDashboard