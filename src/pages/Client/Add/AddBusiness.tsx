import React, { useState } from 'react'
import PageHeading from '../../../components/ui/Page Heading/PageHeading'
import { SolidButton } from '../../../components/ui/Buttons/solid/SolidButton'
import { createClientObj } from '../../../models/Client/ClientModel';
import Inputs from '../../inventory/create/components/Inputs';
import { MenuItem, Select } from '@mui/material';
import { bankDetails, createUserModel, userDetailSchema } from '../../../models/userModel';
import { createConnection } from '../../../store/actions/connections/Create';
import GeneralInputs from './Components/GeneralInputs';
import BankInputs from './Components/BankInputs';
import { useNavigate } from 'react-router-dom';

type Props = {}

const AddBusiness = (props: Props) => {
  const navigate = useNavigate()
  const [client, setClient]: any = useState<createUserModel>({
    name: '',
    email: '',
    gstin: '',
    phone: '',
    pincode: '',
    state: '',
    activities: '',
    image: '',
    adress: ''
  })
  const [bankDetails, setBankDetails]: any = useState<bankDetails>({
    name: '',
    bank: '',
    branch: '',
    isfc: '',
    no: ''
  })

  function validateData() {

  }


  const keys = Object.keys(client);
  const bankKeys = Object.keys(bankDetails);
  return (
    <div className='h-full w-full p-5' >
      <div className='flex place-content-between' >
        {

          (client.type) ? <PageHeading name={`Add Supplier`} key={'pageHeading'} /> : <PageHeading name={`Add Client`} key={'pageHeading'} />


        }
        <div>
          <SolidButton color='black' innerText='Search Online' onClick={() => { navigate(`/search/user`) }} key={'SwitcSearch'} />
        </div>
      </div>
      <div className='bg-component shadow-md rounded-xl mt-4 p-5  grid gap-5 '>
        <GeneralInputs client={client} type={client?.type} handleClientInput={(e: any) => { handleClientInput(e) }} keys={keys} key={'asd'} />
        <BankInputs bankDetails={bankDetails} Keys={bankKeys} handleBankInput={(e: any) => { handleBankInput(e) }} />
        <div className='mt-3' >
          <SolidButton color='black' innerText={`Add `} onClick={() => { createConnection(client, bankDetails, navigate) }} key={'AddBusinessButton'} />
        </div>
      </div>


    </div>
  )
  function handleClientInput(e: React.ChangeEvent<HTMLInputElement>) {
    setClient((prev: any) => { return { ...prev, [e.target.name]: e.target.value } })
  }

  function handleBankInput(e: React.ChangeEvent<HTMLInputElement>) {
    const name = e.target.name.toLocaleLowerCase();
    (e.target.name === 'A/C Number') ? setBankDetails((prev: any) => { return { ...prev, no: e.target.value } }) :
      setBankDetails((prev: any) => { return { ...prev, [name]: e.target.value } })
  }





}






export default AddBusiness