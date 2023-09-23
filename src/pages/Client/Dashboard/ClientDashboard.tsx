import React from 'react'
import { useState, useEffect } from 'react';
import { getConnection } from '../../../store/actions/connections/set';
import { useAppSelector } from '../../../store/app/hooks';
import { connectionSchema } from '../../../models/Client/Connection/ConnectionsModel';
import PageHeading from '../../../components/ui/Page Heading/PageHeading';
import useId from '@mui/material/utils/useId';
import { SolidButton } from '../../../components/ui/Buttons/solid/SolidButton';
import NameTab from './components/NameTab';
import { toast } from 'react-toastify';
import Tabs, { tabProps } from '../../../components/ui/tabs/Tabs';
import InfoTabs from '../../../components/ui/tabs/InfoTabs';
import { DeleteIcon } from '../../../components/ui/icons/DeleteIcon';
import ViewIcon from '../../../components/ui/icons/ViewIcon';
import { EditIcons } from '../../../components/ui/icons/EditIcon';
import ArrowIconForward from '../../../components/ui/icons/ArrowIconForward';
import { useNavigate } from 'react-router-dom';
import { deleteConnection } from '../../../store/actions/connections/Delete';

type Props = {}

const ClientDashboard = (props: Props) => {

  const { connections, isConnection } = (useAppSelector(state => state.connections))
  const { istoken } = useAppSelector(state => state.auth)
  const tabId = useId()
   const deleteIconKey:any = useId()
    const viewIconKey:any = useId()
    const arrowIconKey:any = useId();
    const navigate = useNavigate();
  const [tabarray, setTabArray] = useState<tabProps[]>([
    {
      image: '',
      link: '',
      name: 'Total Clients',
      amount: 0,
    },
    {
      amount: 0,
      link: '',
      image: '',
      name: 'Online Clients'
    },
    {
      amount: 0,
      link: '',
      name: 'Offline Clients',
      image: '',
    },
  ])
  useEffect(() => {
    if (!isConnection) {
      getConnection()
    }
  }, [istoken]);

  useEffect(() => {
        setTabArray(handleTabsData());  
  }, [isConnection,connections])
  

  



  return (
    <div className='p-5 h-full w-full overflow-auto'>
      {/* top page name and buttons tab  */}
      <div className='h-[10%]' ><NameTab /></div>
      <div className='h-[18%] mb-4'>
        <InfoTabs array={tabarray} key={tabId} />
      </div>
      <div className='h-[68%] bg-component  rounded-xl' >
      {
                   (connections.client.length===0)?<div className='h-full  grid place-content-center' >
                   <div>
                     No Clients Added.please add some clients to see 
                   </div>
                 </div>:
                 <Table />
                }
      </div>

    </div>

  )

  function Table() {
    return <div className='border-t mt-2  w-full h-full overflow-auto' >
      <div className="flex flex-col" >
        <div className="">
          <div className="inline-block min-w-full ">
            <div className="overflow-hidden">
              <table className="min-w-full text-left text-sm font-light">
                <thead className="border-b font-medium border-neutral-500 uppercase sticky top-0">
                  <tr className="border-b border-neutral-500">
                    <th scope="col" className='px-6 py-4  sticky text-grayFont  ' >#</th>
                    <th scope="col" className='px-6 py-4  sticky text-grayFont  ' >Name</th>
                    <th scope="col" className='px-6 py-4  sticky text-grayFont  ' >GSTIN</th>
                    <th scope="col" className='px-6 py-4  sticky text-grayFont  ' >Phone</th>
                    <th scope="col" className='px-6 py-4  sticky text-grayFont  ' >Email</th>
                    <th scope="col" className='px-6 py-4  sticky text-grayFont  ' >Activity</th>
                    <th scope="col" className='px-6 py-4  sticky text-grayFont  ' >type</th>
                    <th scope="col" className='px-6 py-4  sticky text-grayFont  ' >Action</th>
                  </tr>
                </thead>
            
                <tbody>
                  {
                   connections.client.map((index, i: number) => {
                     console.log(index.type)
                      return <tr  className = "border-b border-neutral-300 font-light">
                      <th scope="col" className='whitespace-nowrap font-medium px-6 py-4  sticky ' >{++i}</th>
                      <th scope="col" className='whitespace-nowrap font-medium px-6 py-4  sticky ' >{index ?.name}</th>
                      <th scope="col" className='whitespace-nowrap font-medium px-6 py-4  sticky ' >{index ?.gstin}</th>
                      <th scope="col" className='whitespace-nowrap font-medium px-6 py-4  sticky ' >{index ?.phone}</th>
                      <th scope="col" className='whitespace-nowrap font-medium px-6 py-4  sticky ' >{index ?.email}</th>
                      <th scope="col" className='whitespace-nowrap font-medium px-6 py-4  sticky ' > {index?.activities}</th>
                      <th scope="col" className='whitespace-nowrap font-medium px-6 py-4  sticky ' > {convertType(index.type)}</th>
                      <th scope="col" className = 'whitespace-nowrap font-medium   sticky ' >
                    <div className='flex ' >
                       <DeleteIcon color='black' onclick={()=>{deleteConnection(index,0)}} key={`${deleteIconKey + 1}`} tooltip={`Delete Client`}/>
                       <ViewIcon tooltip='View Client' color='blue' onclick={()=>{navigate(`/view/${index._id}/profile`)}} key={`${viewIconKey +1}`} />
                        <ArrowIconForward  onclick={()=>{}} tooltip='View Transactions' key={`${arrowIconKey + 1}`} />
                    </div>
 
                      </th>
                      </tr>


                    })
                  }
          </tbody>
        </table>

      </div>
    </div>
        </div ></div ></div >
  }

  function handleTabsData(){
    
    const array:tabProps[] = [
      {
        image: '',
        link: '',
        name: 'Total Clients',
        amount: 0,
      },
      {
        amount: 0,
        link: '',
        image: '',
        name: 'Online Clients'
      },
      {
        amount: 0,
        link: '',
        name: 'Offline Clients',
        image: '',
      },
    ]

    connections.client.map((index)=>{
           array[0].amount = array[0].amount + 1;
           if(index.type){
             array[1].amount = array[1].amount + 1;
          }else{
          array[2].amount = array[2].amount + 1;
       }
    
    })
    return array

  }

}

export default ClientDashboard


function convertType(type:boolean){
  if(type){
    return 'online'
  }else{
    return 'Offline'
  }
}