import React, { useState } from 'react'
import DataFields, {  clientSchema } from '../../components/clients/pop/DataFields'

type Props = {scale:string,close:()=>void}

interface termSchema{
  index:string
}

const AddClientsPop = ({close,scale}: Props) => {

   const [client,setClient]:any = useState<clientSchema>({
    name:'',
    gstin:'',
    phone:'',
    state:'',
    dist:'',
    pincode:'',
    adress:'',
    balance:0,
    transport:'',
     term:[]
   })

    const handleDataFieldsChange=(type:string,value:any)=>{
      switch(type){
        case 'name':
          setClient((prev:clientSchema)=>{return {...prev,name:value}})
          break;
          case 'gstin':
             setClient((prev:clientSchema)=>{return {...prev,gstin:value}})
             break;
             case 'phone':
                 setClient((prev:clientSchema)=>{return {...prev,phone:value}})
                   break;
                   case 'pincode':
                 setClient((prev:clientSchema)=>{return {...prev,pincode:value}})
                    break;
                    case 'adress':
                      setClient((prev:clientSchema)=>{return {...prev,adress:value}})
                         break;
                         case 'state':
                          setClient((prev:clientSchema)=>{return {...prev,state:value}})
                             break;
                                 case 'balance':

                                  setClient((prev:clientSchema)=>{return {...prev,balance:value}})
                                     break;                          
                                     case 'transport':
                                       setClient((prev:clientSchema)=>{return {...prev,transport:value}})
                                           break;                            
      }
    
    }


    const handleTermIo=(action:boolean,value:any)=>{
      if(action===true){
          console.log(value)
        let oldArray  =  client.term
           console.log('oldArray',oldArray)
           let newArray = [...oldArray,value]
            
           console.log('new array ',newArray)
        setClient((prev:clientSchema)=>{return{...prev,term:newArray}})
      }

    }

    const handleTermDelete=(_term:string)=>{
       console.log('_term',_term)
      // setClient((prev:clientSchema)=>{return prev.term.filter((index:string)=>index != _term)})
       const updateArray = client.term.filter((items:any)=>items!==_term)
        console.log(updateArray)
        setClient((prev:clientSchema)=>{return{...prev,term:updateArray}})
    }
 
  return (
    <div className={` p-5 w-full h-full absolute shadow-xl border rounded-xl bg-white z-50 min-h-[75vh] ${scale}  duration-200`} >
      <Close_Button/>
      <div className='grid gap-4' >
       <div className='text-4xl text-gray-600' >Add Clients</div>
       <DataFields data={client}  handleChange={(type:string,value:any)=>handleDataFieldsChange(type,value)} handleTermChange={(action:boolean,value:any)=>{handleTermIo(action,value)}}  deleteTerm={(term:string)=>handleTermDelete(term)} />
      </div>

    </div>
  )

  function Close_Button() {
    return <div className='text-gray-500 text-end p-5  '>
      <div className='cursor-pointer' onClick={() => close()}>X</div>
    </div>
  }
}

export default AddClientsPop