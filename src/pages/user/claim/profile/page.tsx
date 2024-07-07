import { Input } from '@mui/joy'
import { Button } from '@mui/material'
import axios from 'axios'
import React, { useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { baseUrl } from '../../../../api/Url/ProdUrl'
import { responceObj } from '../../../../models/responce'
import { useAppDispatch } from '../../../../store/app/hooks'
import { change } from '../../../../store/features/loader/loaderSlice'

type Props = {}

const ClaimProfile = (props: Props) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useAppDispatch()
    const [data, setData] = useState({
        info: '',
        username: '',
        password: '',
        id: id
    })

    async function update() {
        try {
            dispatch(change());
            const responce = await axios.post(`${baseUrl}/api/user/claim/profile`, { ...data });
            const res: responceObj = responce.data;
            if (res.code !== 200) throw new Error(res.error);
            else {
                toast.success('profile claimed sucessfully');
                dispatch(change());
                navigate('/login')

            }

        } catch (err: any) {
            toast.error(err.message);
            dispatch(change());

        }

    }



    return (
        <div className='w-screen h-screen  bg-whitesmoke  flex  place-content-center items-center  '>
            <div className='flex flex-col p-10 rounded-lg gap-5 h-1/2 w-1/2   bg-white'>
                <div>
                    <label htmlFor='info' className='text-sm text-gray-500'  >Enter Registered Phone or Email</label>
                    <Input variant='outlined' title='Username' id='info' value={data.info} onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setData((prev) => { return { ...prev, info: e.target.value } }) }} className='w-full' />
                </div>
                <div>
                    <label htmlFor='info' className='text-sm text-gray-500'  >Create a new Username</label>
                    <Input variant='outlined' title='Username' id='info' value={data.username} onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setData((prev) => { return { ...prev, username: e.target.value } }) }} className='w-full' />
                </div>
                <div>
                    <label htmlFor='info' className='text-sm text-gray-500'  >Create a new Password</label>
                    <Input variant='outlined' title='Username' id='info' value={data.password} onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setData((prev) => { return { ...prev, password: e.target.value } }) }} className='w-full' />
                </div>
                <div>
                    <button className='w-full h-full bg-[#1565C0] py-2 uppercase text-white' onClick={() => { update() }}>Claim Profile</button>
                </div>

            </div>

        </div>
    )
}

export default ClaimProfile