import React from 'react'
import { SolidButton } from '../../../../components/ui/Buttons/solid/SolidButton'

type Props = { printOne: any, setDoc: any }

const RightSection = ({ printOne, setDoc }: Props) => {
  return (
    <>
      <div className='h-[80%] w-full overflow-auto'></div>
      <div className='h-[20%] w-full  border-t flex flex-col  items-center  place-content-center'>
        <SolidButton color='black' innerText='Download Original' onClick={() => { setDoc('Original'); printOne() }} key={'btn1'} />
        <SolidButton color='black' innerText='Download Dublicate' onClick={() => { setDoc('Dublicate'); printOne() }} key={'btn2'} />
        <SolidButton color='black' innerText='Download Triplicate' onClick={() => { setDoc('Triplicate'); printOne() }} key={'btn3'} />
      </div>
    </>
  )
}

export default RightSection