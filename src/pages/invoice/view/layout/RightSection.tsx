import React from 'react'
import { SolidButton } from '../../../../components/ui/Buttons/solid/SolidButton'

type Props = {printOne:any}

const RightSection = ({printOne}: Props) => {
  return (
    <>
    <div className='h-[80%]  overflow-auto'></div>
        <div className='h-[20%] w-full border-t flex flex-col  items-center  place-content-center'>
          <SolidButton color='black' innerText='Print 1 copy' onClick={()=>{printOne()}} key={'ssss'}/>
          <SolidButton color='black' innerText='Print 2 copy' onClick={()=>{}} key={'ssss'}/>
          <SolidButton color='black' innerText='Print 3 copy' onClick={()=>{}} key={'ssss'}/>
        </div>
    </>
  )
}

export default RightSection