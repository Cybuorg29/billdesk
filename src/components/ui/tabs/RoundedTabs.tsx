import React from 'react'
import { colorArray } from '../Buttons/ColorArray';

type Props = { name: string; value: string ,color:string};

export const RoundedTabs = ({ name, value,color }: Props) => {
     const colors = colorArray
     return(

         <div className={`w-52 h-52 rounded-full hover:scale-105 duration-150 cursor-pointer   bg-white shadow-lg   border-[10px] ${color} grid place-items-center `}>
    <div>
      <div className='text-center text-lg'>{name}</div>
      <div className="text-center  font-bold text-xl ">{value}</div>
    </div>
  </div>

     )}

export default RoundedTabs