import React from 'react'

type Props = {scale:string,close:()=>void}

const SideBar = ({scale,close}: Props) => {
  return (
    <div  className={`h-screen fixed w-[75vw]  bg-black right-0 z-50  ${scale}`} >

    </div>
  )
}

export default SideBar