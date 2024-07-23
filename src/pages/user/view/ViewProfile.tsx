import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { profileData } from '../../../api/userServices';
import { toast } from 'react-toastify';
import { userDetailSchema } from '../../../models/userModel';
import TopSections from './components/TopSections';

import { Button } from '@mui/material';
import { SolidButton } from '../../../components/ui/Buttons/solid/SolidButton';
import ContactSection from './components/ContactSection';
import useId from '@mui/material/utils/useId';
import ProductCard from '../../../components/ui/Product/ProductCard';
import { ProductObj } from '../../../models/inventory/productModel';
import { getProducts, getProductsByToken } from '../../../api/inventory';
import { responceObj } from '../../../models/responce';
import { useAppDispatch, useAppSelector } from '../../../store/app/hooks';
import axios from 'axios';
import { v2Url } from '../../../api/Url/ProdUrl';
import { change } from '../../../store/features/loader/loaderSlice';
import AddConnectionDialog from '../AddConnectionDialog';
type Props = {}

const ViewProfile = (props: Props) => {

    //urlParameters
    const { id, isConnections } = useParams();
    const uid: any = id
    const { _id } = useAppSelector(state => state.userData);

    //keys 
    const contactKey = useId();
    const topKey = useId();
    //useStates
    const [data, setData]: any = useState<userDetailSchema>()
    const [product, setProduct] = useState<ProductObj[]>([]);
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false)
    const navigate = useNavigate();
    const dispatch = useAppDispatch()


    useEffect(() => {
        fetchData();
    }, [])

    useEffect(() => {
        if (isConnections) {
            setIsDialogOpen(true);
        }
    }, [])


    return (
        <div className='w-full h-full ' >
            <AddConnectionDialog isOpen={isDialogOpen} data={data} close={() => { setIsDialogOpen(false) }} />
            <div className='w-full h-full   rounded-lg  p-5' >

                <div className='h-[30%]  pb-3 '  >
                    <TopSections data={data} key={topKey} />
                </div>
                <div className='grid grid-cols-9 h-[70%]  gap-3' >
                    <div className='col-span-6   h-[100%] border shadow-lg rounded-lg bg-component  overflow-auto ' >
                        <div className='text-xl text-grayFont font-bold h-[10%] p-2 '>Products</div>
                        <div className='h-[90%]'>

                            {
                                (product.length === 0) ? <div className='h-full w-full place-content-center grid' ><span>No Products to Show</span></div> : <div className='grid grid-cols-3 gap-3 w-full h-[90%]  p-3  '>
                                    {
                                        product.map((index: ProductObj) => {
                                            return <>
                                                <ProductCard product={index} />
                                            </>
                                        })
                                    }
                                </div>
                            }
                        </div>
                    </div>

                    <div className='col-span-3  border h-full bg-component overflow-hidden rounded-lg shadow-xl' >
                        <ContactSection data={data} key={contactKey} />
                    </div>


                </div>

            </div>

        </div>
    )



    async function fetchData() {
        try {
            dispatch(change());
            if (uid === _id) {
                navigate('/settings')
                toast.info('You are trying to view your own profile')
            } else {

                const { data } = await profileData(uid)
                console.log(data);
                const res: responceObj = data
                if (res.code === 200) {
                    setData(data.package)
                    // fetchProduct(data?.package.id)


                } else {
                    toast.info(res.message)
                }
            }
            dispatch(change());

        } catch (err: any) {
            console.log(err.message)
            toast.error('an error occured ')
            dispatch(change());
        }
    }



    async function fetchProduct(_id: string) {
        try {
            console.log(_id)
            const { data } = await await toast.promise(axios.get(`${v2Url}/api/products/get/${_id}`), { pending: 'getting products' })
            console.log(data)
            const res: responceObj = data;
            if (res.code === 200) {
                setProduct(res.package);
            } else {
                throw new Error(res.error);
            }

        } catch (err: any) {
            console.log(err.message);
            toast.error('an error occured while loading the products please refresh');
        }


    }
}



export default ViewProfile