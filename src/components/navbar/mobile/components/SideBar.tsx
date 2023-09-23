import React from 'react'

type Props = {scale:string,close:()=>void}

const SideBar = ({scale,close}: Props) => {
  return (
    <div  className={`h-screen fixed   bg-white shadow-xl  right-0 z-50  duration-200 ${scale}`} >
      <div  className='grid justify-items-end p-5' ><div   onClick={()=>{close()}} >X</div></div>

    </div>
  )
}

export default SideBar