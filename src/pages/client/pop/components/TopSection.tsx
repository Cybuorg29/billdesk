import React from 'react'

type Props = {close:()=>void}

const TopSection = ({close}: Props) => {
  return (
    <div  className='p-5 text-2xl grid grid-cols-2' >
          <div>Add Clients</div>
          <div className='text-end'  >
            <div  className='cursor-pointer' onClick={()=>{close()}} >X</div>
          </div>
        </div>
  )
}

export default TopSection