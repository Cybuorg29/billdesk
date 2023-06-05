import React from 'react'

type Props = {}

const SelectBilledTo = (props: Props) => {
  return (
    <div className='grid grid-rows-2' >
       {/* <div className='w-full h-full bg-white absolute' ></div> */}
      <label className='' >Billed To</label>
      <div className='bg-white grid justify-items-center items-center p-2 border ' ><div>Billed To Name</div></div>
    </div>
  )
}

export default SelectBilledTo