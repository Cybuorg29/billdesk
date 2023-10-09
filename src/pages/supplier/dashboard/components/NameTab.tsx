import React from 'react'
import PageHeading from '../../../../components/ui/Page Heading/PageHeading'
import { SolidButton } from '../../../../components/ui/Buttons/solid/SolidButton'
import useId from '@mui/material/utils/useId'
import { useNavigate } from 'react-router-dom'

type Props = {}

const NameTab = (props: Props) => {
    const headingId = useId()
    const button1Id = useId()
    const navigate = useNavigate()
  return (
    <div>
          <div className='flex  place-content-between  h-full  ' >
                <PageHeading name='Suppliers' key={headingId} />
                <div className='flex gap-3' >
                  <SolidButton  color='black' innerText='Add Clients' onClick={()=>{navigate('/create/connection')}} key={button1Id} />
                </div>
            </div>
    </div>
  )
}

export default NameTab