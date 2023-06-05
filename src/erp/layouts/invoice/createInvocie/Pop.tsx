import { Scale } from '@mui/icons-material'
import React from 'react'

type Props = {scale:string,close:()=>void}

const Pop = ({scale}: Props) => {
  return (
    <div className={`'w-full h-full absolute z-50 shadow-lg rounded-lg bg-white border ${Scale} '`} >

    </div>
  )
}

export default Pop