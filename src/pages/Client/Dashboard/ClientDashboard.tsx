import React from 'react'
import { useState, useEffect } from 'react';
import { getConnection } from '../../../store/actions/connections/set';
import { useAppSelector } from '../../../store/app/hooks';
import { connectionSchema } from '../../../models/Client/Connection/ConnectionsModel';

type Props = {}

const ClientDashboard = (props: Props) => {

    const {connections,isConnection} = useAppSelector(state=>state.connections)
   const [connectionData,setConnectionData] = useState();

 
   async  function getData(){
       const  {data} = {data:'dasdasd'}
     }

   useEffect(() => {
      getConnection();
   }, [])


   
  return (
    <div>{
       connections.map((index:any)=>{
         return <>
            <div>{index.id}</div>
         </>
       })
      }</div>
  )
}

export default ClientDashboard