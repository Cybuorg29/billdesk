import { useAppSelector } from '../../../../store/app/hooks'
import { ISalesOrder } from '../../Model/model'
import convertIsoDate from '../../../../utils/convertIsoDates'
import DocumentInformation from '../components/DocumentInformation'
import ProductTable from '../components/ProductTable'
import TotalSection from '../components/TotalSection'
type Props = {
    data: ISalesOrder | undefined
    printRef: any
}

const Document = ({ data, printRef }: Props) => {
    const userData = useAppSelector(state => state.userData);





    return (
        <>

            {/* <div className='w-full  min-h-full    p-5  font-bold  bg-component  ' ref={printRef}  > */}
            <div className='w-full min-h-full   p-4  font-bold text-sm ' id='print' >

                <div className='h-[8%] border-2  border-black grid place-content-center text-2xl uppercase font-bold'>
                    Sales Order
                </div>
                <div className='min-h-[20%] border-2  border-t-0 border-black grid grid-cols-2 pl-5 pr-5 text-sm'>
                    <DocumentInformation data={data} userData={userData} />
                </div>
                {/* billed and shipping section */}
                <section className='min-h-[20%] border-2 border-t-0 border-black grid grid-cols-2 '>
                    <div className='border-r-2 border-black flex flex-col  pl-3 pt-1'>
                        <div className='text-sm'>Billed To : </div>
                        <div className='text-xl'>{data?.to.name}</div>
                        <div className='text-sm'>{data?.to.adress}</div>
                        <div className='text-sm'>{data?.to.phone}</div>
                        {/* <div className='text-sm'>{}</div> */}
                    </div>
                    <div className=' flex flex-col  pl-3 pt-1'>
                        <div className='text-sm'>Shipped To : </div>
                        <div className='text-xl'>{data?.ship_To.name}</div>
                        <div className='text-sm'>{data?.ship_To.adress}</div>
                        <div className='text-sm'>{data?.ship_To.phone}</div>
                        {/* <div className='text-sm'>{}</div> */}
                    </div>
                </section>
                <div className='h-[5%] p-1 border-t-0 border-2 border-black text-xs flex items-center pl-5'>
                    This Sales Order is Valid from {(data?.date === '') ? convertIsoDate(data.createdAt).split('at')[0] : data?.date} to {(data?.due_Date === '') ? "Till Supplies" : data?.due_Date}
                </div>
                {/* table */}
                <ProductTable data={data} key={'table'} />

                {/* total information */}
                <div className='flex flex-col border-t-0 border-2 border-black   gap-2 text-sm justify-items-end'>
                    <TotalSection data={data} key={'total'} />

                </div>


                {/* signature  */}

                <div className='h-[6rem] border-2 border-t-0 p-5      border-black'>
                    Authority Signature

                </div>




            </div>


        </>
    )
}

export default Document