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
import Table from './components/Table';

type Props = {}

const ClientDashboard = (props: Props) => {

  const { connections, isConnection } = (useAppSelector(state => state.connections))
  const { istoken } = useAppSelector(state => state.auth)
  const tabId = useId()
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


