import React from 'react'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
type Props = {onclick:any,tooltip:string}

const ArrowIconForward = ({onclick,tooltip}: Props) => {
  return (
    <div className='rounded-full hover:bg-gray-400/20  p-1 cursor-pointer'   onClick={()=>onclick()}  title={tooltip} >
        <ArrowForwardIosIcon    />
   </div>
  )
}

export default ArrowIconForward