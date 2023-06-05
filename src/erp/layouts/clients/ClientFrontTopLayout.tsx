import React from 'react'
import InfoBox from '../../components/common/InfoBox'

type Props = {}

const ClientFrontTopLayout = (props: Props) => {
  return (
    <div className='grid lg:grid-cols-4 grid-cols-2 gap-3 ' >
        <InfoBox amount={30000} name='total clients'/>
        <InfoBox amount={30000} name='total clients'/>
        <InfoBox amount={30000} name='total clients'/>
        <InfoBox amount={30000} name='total clients'/>
    </div>
  )
}

export default ClientFrontTopLayout