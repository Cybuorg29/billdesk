import React, { useEffect, useState } from 'react'
// import { userModel } from '../../../Model/UserModel'

// type Props = {id:string}


const TopNameDiv = () => {
    const [details,setDetails] = useState()
    // const [details,setDetails] = useState<userModel>()
    const [loading,setLoading] = useState(`scale-0`)
    
    useEffect(() => {
        initialiseUserDetails()
  
    }, [])
    

    const initialiseUserDetails=()=>{
          setLoading('scale-100')
           console.log('init')
        let data:any = sessionStorage.getItem('data')
         if(!data||data==='undefined'){
            // setLoading('scale-100')
                //  setInterval(()=>{
                //      console.log('asdasdasd')
                //      initialiseUserDetails()
                //      },2000)
                    // window.location.reload()
                    timeOutToogle(1)

         }else{
            setLoading('scale-0')
             timeOutToogle(0)
             data = JSON.parse(data)
             setDetails(data)

         }
         
        }

        let timer:any;

        const  timeOutToogle=(num:number)=>{
            if(num){
                console.log('timer')
                
                timer = setInterval(()=>{
                    initialiseUserDetails()
                },2000)
            }else{
                console.log('no')
                clearInterval(timer);

            }

        }


  return (
    <div className='relative' >
        {/* <div className={`absolute bg-white/70 w-full h-full grid justify-items-center items-center duration-100 ${loading} `} > 
        <div className='text-xl' >Getting Data........</div>
        </div>
        <div className='border-2 border-black ' >

            <div  className='lg:text-2xl text-center border-b border-black ' >Tax Invoice</div>
            <div className='p-5 pb-1 text-center  text-xl font-bold uppercase ' >{details?.name}</div>
            <div className='text-center uppercase ' >{details?.adress}</div>
            <div className='text-center uppercase ' >{details?.state}{' - '}{details?.pincode}{', '}{`Contact - `}{details?.phone}</div>
            <div className='text-center uppercase ' >{'GSTIN - '}{details?.gstin}</div>
        </div> */}
    </div>
  )
}

export default TopNameDiv