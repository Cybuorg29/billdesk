import React, { useState } from 'react'
import DataFields from '../../components/clients/pop/DataFields'
import { Button } from '@mui/material'
import { toast } from 'react-toastify'
import { addClient } from '../../../api/user/user'
import { addUserModelInterface} from '../../Model/UserModel'
import { termAndConditionModel } from '../../Model/TermAndConditionsModel'
import { useNavigate } from 'react-router-dom'

type Props = {scale:string,close:()=>void}




const AddClientsPop = ({close,scale}: Props) => {
     const navigate = useNavigate()
   const [client,setClient]:any = useState<addUserModelInterface>({
    name:'',
    gstin:'',
    phone:'',
    email:'',
    building:'',
    landmark:'',
    district:'',
    pincode:'',
    state:'',
    activities:'',
    transport:'',
    adress:'',
    term:[],


   })

  //  const [term,setTerm] = useState([])

    const handleDataFieldsChange=(type:string,value:any)=>{
      switch(type){
        case 'name':
          setClient((prev:addUserModelInterface)=>{return {...prev,name:value}})
          break;
          case 'gstin':
             setClient((prev:addUserModelInterface)=>{return {...prev,gstin:value}})
             break;
             case 'phone':
                 setClient((prev:addUserModelInterface)=>{return {...prev,phone:value}})
                   break;
                   case 'pincode':
                 setClient((prev:addUserModelInterface)=>{return {...prev,pincode:value}})
                    break;
                    case 'adress':
                      setClient((prev:addUserModelInterface)=>{return {...prev,adress:value}})
                         break;
                         case 'district':
                          setClient((prev:addUserModelInterface)=>{return {...prev,district:value}})
                             break;
                         case 'state':
                          setClient((prev:addUserModelInterface)=>{return {...prev,state:value}})
                             break;
                                 case 'email':

                                  setClient((prev:addUserModelInterface)=>{return {...prev,email:value}})
                                     break;                          
                                     case 'transport':
                                       setClient((prev:addUserModelInterface)=>{return {...prev,transport:value}})
                                           break; 
                                            case 'activities':
                                           setClient((prev:addUserModelInterface)=>{return {...prev,activities:value}})
                                               break;
                                               case 'building':
                                                setClient((prev:addUserModelInterface)=>{return {...prev,building:value}})
                                                    break;  
                                                    case 'landmark':
                                            setClient((prev:addUserModelInterface)=>{return {...prev,landmark:value}})
                                                break;  
                                                                          
      }
    
    }

    const submit=async()=>{
       try{
          let token:any = sessionStorage.getItem('token')
          token = JSON.parse(token)
         setClient((prev:addUserModelInterface)=>{return{...prev,token:token}})
        const push = await addClient(client)
          if(push?.data.code===200){
            toast.success(push?.data?.message)
             close()
          }else if(push?.data?.code===100){
            toast.info('user Already exists on the platform')
            navigate(`/erp/${push.data.user}/view/profile`)
            
          }
          
          else{
            toast.error(push?.data?.message)
            
          }

        console.log(client)
       }catch(err:any){
         toast.error(err.message);
       }


    }


    const handleTermIo=(action:boolean,value:any)=>{
      if(action===true){
          console.log(value)
        let oldArray  =  client.term
           console.log('oldArray',oldArray)
           let newArray:any = [...oldArray,value]
            
           console.log('new array ',newArray)
        setClient((prev:addUserModelInterface)=>{return{...prev,term:newArray}})
        // setTerm(newArray)
      }

    }

    const handleTermDelete=(_term:string)=>{
       console.log('_term',_term)
      // setClient((prev:addUserModelInterface)=>{return prev.term.filter((index:'')=>index != _term)})
       const updateArray = client.term.filter((items:any)=>items!==_term)
        console.log(updateArray)
        setClient((prev:addUserModelInterface)=>{return{...prev,term:updateArray}})
        // setTerm(updateArray);

    }
 
  return (
    <div className={` p-5 w-full h-full absolute shadow-xl border rounded-xl bg-white z-50 min-h-[75vh] ${scale}  duration-200 overflow-auto`} >
      <Close_Button/>
      <div className='grid gap-4' >
        <div className='flex gap-5 items-center '>
       <div className='text-4xl text-gray-600' >Add Clients</div>
         <div>Or </div>
         <Button  >Search for user already on platform</Button>
        </div>
       <DataFields data={client} term={client.term}  handleChange={(type:string,value:any)=>handleDataFieldsChange(type,value)} handleTermChange={(action:boolean,value:any)=>{handleTermIo(action,value)}}  deleteTerm={(term:string)=>handleTermDelete(term)} />
      </div>
      <div className=" grid justify-items-center w-full p-5  ">
        <Button variant="outlined" className="w-6/12"  onClick={()=>submit()} >
          Add Client
        </Button>
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