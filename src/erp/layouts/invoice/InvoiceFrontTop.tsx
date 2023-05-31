import React from 'react'
import InfoBox from '../../components/common/InfoBox'

type Props = {}

const InvoiceFrontTop = (props: Props) => {
  return (
    <div className='grid lg:grid-cols-4  grid-cols-2 gap-3 ' >
          <InfoBox name={`Invoice`}  amount={`30000`}  />
        <InfoBox name={`Bills To  Pay`}  amount={`150000`}  />
        <InfoBox name={`Bills To Receive`}  amount={`250000`}  />
        <InfoBox name={`Invoice`} amount={`30000`}  />
    </div>
  )
}

export default InvoiceFrontTop