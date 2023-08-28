import React from 'react'
import PageHeading from '../../../components/ui/Page Heading/PageHeading'
import { SolidButton } from '../../../components/ui/Buttons/solid/SolidButton'

type Props = {}

const AddClient = (props: Props) => {
  return (
    <div  className='h-full w-full p-5' >
        <div  className='flex place-content-between' >
        <PageHeading name='Add Client' key={'pageHeading'} />
        </div>

    </div>
  )
}

export default AddClient