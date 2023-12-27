import React, { useEffect, useState } from 'react'
import { bankDetails, userDetailSchema } from '../../models/userModel'
import { Button } from '@mui/material'
import DataFields from './components/DataFields'
import BankDetails from './components/BankDetails'
import { useAppSelector } from '../../store/app/hooks'
import { setUpProfile } from '../../api/userServices'
import { toast } from 'react-toastify'
import Update from './components/button/Update'
import { SolidButton } from '../../components/ui/Buttons/solid/SolidButton'

type Props = {}

const Settings = (props: Props) => {

  const initData = useAppSelector(state => state.userData)
  const bankdata = useAppSelector(state => state.bank)
  const { token } = useAppSelector(state => state.auth)

  const [client, setClient]: any = useState<userDetailSchema>(initData)
  useEffect(() => {

  }, [initData])


  const [bank, setBank] = useState<bankDetails>(bankdata)
  const handleInputChange = (type: string, value: any) => {
    switch (type) {
      case 'name':
        setClient({ ...client, name: value });
        break;
      case 'gstin':
        setClient({ ...client, gstin: value });
        break;
      case 'phone':
        setClient({ ...client, phone: value });
        break;
      case 'email':
        setClient({ ...client, email: value });
        break;
      case 'adress':
        setClient({ ...client, adress: value });
        break;
      case 'state':
        setClient({ ...client, state: value });
        break;
      case 'pincode':
        setClient({ ...client, pincode: value });
        break;
      case 'activities':
        setClient({ ...client, activities: value });
        break;
      case 'bank':
        setBank({ ...bank, bank: value })
        break;
      case 'benName':
        setBank({ ...bank, name: value })
        break; case 'no':
        setBank({ ...bank, no: value })
        break;
      case 'ifsc':
        setBank({ ...bank, isfc: value })
        break;
      case 'branch':
        setBank({ ...bank, branch: value })
        break;
      case 'image':
        setClient({ ...client, image: value })
        break;


    }


  }

  const updateUser = async () => {
    try {
      console.log(client, bank, token)
      const res = await setUpProfile(client, bank, token)
      if (res.data.code === 200) {
        toast.success('profile Setup Complete')
      } else {
        toast.error(res.data.message)

      }
    } catch (err: any) {
      toast.error(err.message)
    }
    // 
  }


  useEffect(() => {

  }, [initData])

  return (
    <div className={`  w-full h-full  bg-white/50   duration-200 `} >
      {/* <TopSection close={()=>close()} /> */}
      <div className='p-5 text-xl text-gray-600' >User Details</div>
      <DataFields client={client} handleInputChange={(type: string, value: any) => handleInputChange(type, value)} />
      <BankDetails bank={bank} handleChange={(type: string, value: string) => handleInputChange(type, value)} />
      {/* <Update name={client.name} updateUser={() => updateUser()} /> */}


      {(initData?.name === '') ?
        <div className='p-5' >

          <SolidButton color='black' innerText='Insert Data' onClick={() => updateUser()} key={'button1'} />
        </div> :
        <>
          <div className='p-5' >
            <SolidButton color='black' innerText='REQUEST UPDATE' onClick={() => { toast.success('you request has been received . ') }} key={'button1'} />
          </div>

        </>

      }


    </div>

  )


}

export default Settings