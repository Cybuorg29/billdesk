import React, { useState } from 'react'
import AddTermAndConditionDialog from './AddTermAndConditionDialog';

type Props = {array:any[],setArray:any,set:any}

const TermAndConditionSection = ({array,setArray,set}: Props) => {
     const [scale,setScale] = useState<boolean>(false);
  return (
    <div className='w-full h-full overflow-auto  bg-component rounded-lg pl-2' >
           <AddTermAndConditionDialog open={scale} setOpen={setScale}  set={set} />
        <div className=' text-grayFont h-[25%]  '  >
            <span className='text-md text-grayFont font-inclusive'>Term And Condition</span>
            <span className='text-blue-500 text-sm pl-2 cursor-pointer font-source2 text-small' onClick={()=>{setScale(true)}}>Add</span>
        </div>
        <div className='h-[65%] overflow-auto grid  gap-2 '>
            {
               array.map((index:string,i:number)=>{
                return <>
                <div className='text-table text-gray-500 flex gap-1'>
                  <div>{++i + '.'}</div>
                  <div>{index}</div>
                </div>
                </>
               }) 
            }
            </div>


    </div>
  )
}

export default TermAndConditionSection