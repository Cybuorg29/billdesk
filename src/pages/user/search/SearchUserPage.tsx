import React, { useEffect, useState } from 'react'
import SearchBar from './ui/SearchBar'
import PageHeading from '../../../components/ui/Page Heading/PageHeading'
import useId from '@mui/material/utils/useId'
import { searchProfile } from '../../../api/search/searchServices'
import SearchTable from './ui/searchTable/SearchTable'
import { responceObj } from '../../../models/responce'
import { toast } from 'react-toastify'
import LoadingAnimation from './ui/searchTable/loader/LoadingAnimation'
import { abort } from 'process'

type Props = {}

const SearchUserPage = (props: Props) => {
    const [array, setArray] = useState([])
    const [searchValue, setSearchValue] = useState<string>('')
    const headingId = useId()
    const tableId = useId();
     const [isLoading,setIsLoading] = useState<boolean>(false);

    useEffect(() => {

          const timeOutID  = setTimeout(()=>{
              search(searchValue);
        },500)
          return ()=> clearTimeout(timeOutID);

    }, [searchValue])


    return (
        <div className='w-full h-full  p-4'>
            <div className='p-2 h-[10%]'>
                <PageHeading name='Search User' key={headingId} />
            </div>
            <div className=' h-[90%] bg-component ' >
                <div className='h-[25%]  grid  place-items-center  ' >
                    <div className='grid  w-[90%] ' >
                        <SearchBar value={searchValue} onchange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchValue(e.target.value)} />
                    </div>
                </div>
                <div>
                    <div className='h-[70%] w-full ' >
                         {isLoading?'Loading........':<SearchTable array={array} key={tableId}  isLoading={isLoading} />
                         } 
                    </div>
                </div>

            </div>

        </div>
    )

    async function search(value: string) {
        try {
            if (value === '') {
                setArray([])
            } else {
                 setIsLoading(true)
                const { data } = await searchProfile(value);
                const res: responceObj = data
                if (res.code === 200) setArray(res?.package);
                else toast.error('an error occured ')
                setIsLoading(false);
            }

        } catch (err: any) {
            console.log(err.message)
            if(err.message==='AboartError'){
                toast.error('req aboarded');
            }
            setIsLoading(false)
        }
    }
}

export default SearchUserPage