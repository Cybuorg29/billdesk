import React from 'react'
import { SolidButton } from '../../../../components/ui/Buttons/solid/SolidButton'

type Props = { printOne: any }

const RightSection = ({ printOne }: Props) => {
  return (
    <>
      <div className='h-[90%] w-full overflow-auto'></div>
      <div className='h-[10%] w-full  border-t flex flex-col  items-center  place-content-center'>
        <SolidButton color='black' innerText='Download Original' onClick={() => { ; printOne() }} key={'btn1'} />
      </div>
    </>
  )
}

export default RightSection