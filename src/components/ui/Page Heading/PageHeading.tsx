import React from 'react'

type Props = {name:string}

const PageHeading = ({name}: Props) => {
  return (
    <div className='text-2xl text-grayFont font-semibold' >{name}</div>
  )
}

export default PageHeading