import React, { useState } from 'react'
import Tabs, { tabProps } from './Tabs'

 export   type Props = {
    array:tabProps[]
}

const InfoTabs = ({array}: Props) => {
     // takes the array of the given array and use in grid 
      const [len,setLen] = useState(array.length)


  return (
    <div className={`grid grid-cols-${len} gap-5  w-full h-full ` }>
         {
            array.map((index:tabProps)=>{
                return<>
                 <Tabs amount={index.amount} image={index.image} link={index.link} name={index.name} key={index.name} />
                </>
            })
         }
    </div>
  )
}

export default InfoTabs