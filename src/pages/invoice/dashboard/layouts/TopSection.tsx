import React, { useId } from 'react'
import { SolidButton } from '../../../../components/ui/Buttons/solid/SolidButton'
import PageHeading from '../../../../components/ui/Page Heading/PageHeading'
import { useNavigate } from 'react-router-dom'

type Props = {}

const TopSection = (props: Props) => {
    const headingKey = useId()
  const createInvoiceKey = useId();
  const naviagte = useNavigate();
  return (
    <div className='flex h-full w-full place-content-between'>
        <PageHeading name='Invoices' key={headingKey} />
        <div>
          <SolidButton color='black' innerText='Create  New Invoice' onClick={() => { naviagte('/create/invoice') }} key={createInvoiceKey} />
        </div>
      </div>
  )
}

export default TopSection