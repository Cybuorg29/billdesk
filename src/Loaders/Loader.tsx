import React, { useEffect } from 'react'
import Dots4 from './spinner/Dots4'
import { useAppSelector } from '../store/app/hooks'
import Drop from './drop/Drop'
import SpinnerCircle from './spinner-circle/SpinnerCircle'

type Props = {}

const Loader = (props: Props) => {
      const scale = useAppSelector(state=>state.loader.scale)
      useEffect(()=>{


      },[scale])
  return (
    <div className={`absolute w-screen h-screen bg-white/80 z-50  grid justify-items-center items-center ${scale} `} >
        <div>
            {/* <Dots4/> */}
            {/* <Drop/> */}
            <SpinnerCircle/>

        </div>

    </div>
  )
}

export default Loader