import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ListIcon from '@mui/icons-material/List';
import OptionBar from './OptionBar';
// import OptionBar from './OptionBar'
type Props = {}

const TopBar = ({}: Props) => {

    const [location,setLocation]= useState('')
    const [smallNavbarScale,setSmallNavbarScale] = useState(`w-0`)
  const [optionBarScale,setOptionBarScale] = useState(`w-0`)

   let changeLocation:any = ''
   const local = useLocation()

    let name:any = sessionStorage.getItem('data')
    if(!name||name==='undefined'){
            name = 'loading'
    }else{
      name =  JSON.parse(name)
      name = name.name
    }

    

  useEffect(() => {
    console.log('change')
    changeLocation = window.location.pathname
     changeLocation = changeLocation.split('/').pop()
     let change = '';
     if(changeLocation==='undefined'){
      change = 'Not Found'
     }else{
       for(let i=0;i<=changeLocation.length -1;i++){
         if(changeLocation[i]===`%`||changeLocation[i]==='2'||changeLocation[i]==='0'){
           if(changeLocation[i+1]==='2'){
             if(changeLocation[i+2]==='0'){
               
            }
          }else if(changeLocation[i+1]==='0'){
          }
          
        }else{
          change = change + changeLocation[i]
          
        }
      }
    }
     setLocation(change)

    
     
  
  }, [local.pathname])



return (
  <>
  <div className=' text-center text-black border bg-white shadow-md lg:w-full sm:w-screen h-16 grid grid-cols-4  duration-300   ' >
     
      
          <OptionBar scale={optionBarScale} close={()=>{setOptionBarScale(`w-0`)}}  />
         <div className='flex items-center col-span-1  lg:pl-4 pl-2 lg:scale-105 lg:gap-2  ' onClick={()=>window.history.back()} >
            <ArrowBackIcon className='cursor-pointer' />
          <div className='lg:p-5 p-3 lg:text-2xl text-xs' >{location}</div>
         </div>
          <div className=' lg:p-5  font-head  grid   gap-3 justify-items-center col-span-2   items-center pl-8 '  > <div className='text-center lg:text-2xl'>{name}</div> </div>
          <div className='grid justify-items-end items-center p-5  ' >
            <ListIcon className='lg:scale-150 scale-0 cursor-pointer ' onClick={()=>{setOptionBarScale('w-[25vw]')}}   />
            
                         

          </div>




      </div>
  </>
)



 


}


export default TopBar