import React from 'react'
import { SolidButton } from '../../../../components/ui/Buttons/solid/SolidButton'

type Props = { printOne: any, setDoc: any, printAll: () => void }

const RightSection = ({ printOne, setDoc, printAll }: Props) => {
  return (
    <>
      <div className='h-[70%] w-full overflow-auto'></div>
      <div className='h-[25%] w-full  border-t flex flex-col  items-center  place-content-center'>
        <SolidButton color='black' innerText='Download Original' onClick={() => { setDoc('Original'); printOne() }} key={'btn1'} />
        <SolidButton color='black' innerText='Download Dublicate' onClick={() => { setDoc('Dublicate'); printOne() }} key={'btn2'} />
        <SolidButton color='black' innerText='Download Triplicate' onClick={() => { setDoc('Triplicate'); printOne() }} key={'btn3'} />
        {/* <SolidButton color='black' innerText='Download All' onClick={() => { printAll() }} key={'btn4'} /> */}
      </div>
    </>
  )
}

export default RightSection