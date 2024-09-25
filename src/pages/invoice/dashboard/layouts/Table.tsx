import React, { useEffect, useId, useState } from 'react'
import { useAppSelector } from '../../../../store/app/hooks'
import { Iinvoice } from '../../../../models/invoice/invoice.model';
import Search from '../components/Search';
import { searchInvoiceValue } from '../functions/TableSearch';
import ViewIcon from '../../../../components/ui/icons/ViewIcon';
import { DeleteIcon } from '../../../../components/ui/icons/DeleteIcon';
import { converToInrFormat } from '../../../../utils/ConvertInrFormat';
import { useNavigate } from 'react-router-dom';
import { deleteInvoiceAction } from '../../../../store/actions/invoice/delete';
import ConfirmDeleteDialog from './ConfirmDeleteDialog';

type Props = { type: string, set: any }

const Table = ({ type, set }: Props) => {
  const { invoices } = useAppSelector(state => state.invoice);
  const [searchValue, setSearchValue] = useState<string>("")
  const viewIconId = useId();
  const deleteInvoiceIconKey = useId()
  const [toDeleteId, setToDeleteId] = useState<string>('');
  const [IsDialogOPen, setIsDialogOPen] = useState(false)
  const [InvoiceNo, setInvoiceNo] = useState('')

  const navigate = useNavigate();

  useEffect(() => {

  }, [invoices])

  return (
    <div className='w-full h-full   '>
      <ConfirmDeleteDialog toDelete={toDeleteId} invoiceNo={InvoiceNo} close={() => setIsDialogOPen(false)} isOPen={IsDialogOPen} />
      <div className='border-t    w-full h-[98%] overflow-auto text-sm relative' >
        <div className='p-3 grid grid-cols-2 border-b ' >
          <Search type={type} set={set} value={searchValue} onchange={(e: React.ChangeEvent<HTMLInputElement>) => { setSearchValue(e.target.value) }} />
        </div>
        <div className="flex flex-col" >
          <div className="">
            <div className="inline-block min-w-full ">
              <div className="overflow-hidden">
                <table className="min-w-full text-left  ">
                  <thead className="border-b   border-neutral-500 uppercase sticky top-0">
                    <tr className="border-b border-neutral-500">
                      <th scope="col" className='px-6 py-4 lg:text-xs text-table  sticky text-grayFont  ' >#</th>
                      <th scope="col" className='px-6 py-4 lg:text-xs text-table  sticky text-grayFont  ' >Invoice No.</th>
                      <th scope="col" className='px-6 py-4 lg:text-xs text-table  sticky text-grayFont  ' >Billed To</th>
                      <th scope="col" className='px-6 py-4 lg:text-xs text-table  sticky text-grayFont  ' >Date</th>
                      <th scope="col" className='px-6 py-4 lg:text-xs text-table  sticky text-grayFont  ' >Amount</th>
                      <th scope="col" className='px-6 py-4 lg:text-xs text-table  sticky text-grayFont  ' >Status</th>
                      <th scope="col" className='px-6 py-4 lg:text-xs text-table  sticky text-grayFont  ' >Delete/View</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      invoices.filter(index => ((type === 'Total Invoice') || (type === 'Total Due' && !index.isPaid) || (type === 'Payment Received' && index.isPaid))).reverse().map((index: Iinvoice, i: number) => {
                        let k = i
                        if (searchInvoiceValue(invoices, searchValue).some((element) => element === i) || searchValue === '') {
                          return <tr className="border-b border-gray-400  font-source2 cursor-default hover:bg-gray-100 " key={`index.name${i}`}>
                            <th scope="col" className=' px-6 py-3 lg:text-xs text-table  sticky '  >{++k}</th>
                            <th scope="col" className=' px-6 py-3 lg:text-xs text-table  sticky '  >{index.invoice_No}</th>
                            <th scope="col" className=' px-6 py-3 lg:text-xs text-table  sticky '  >{index.billed_To.name}</th>
                            <th scope="col" className=' px-6 py-3 lg:text-xs text-table  sticky '  >{index.invoice_Date}</th>
                            <th scope="col" className=' px-6 py-3 lg:text-xs text-table  sticky '  >{converToInrFormat(index.grand_Total)}</th>
                            <th scope="col" className=' px-6 py-3 lg:text-xs text-table  sticky '  >{(!index.isPaid) ? 'Not Paid' : 'Paid'}</th>
                            <th scope="col" className=' px-6 py-3 lg:text-xs text-table  sticky '  >
                              <div className='flex place-content-start' >
                                <div><DeleteIcon color='black' onclick={() => { setToDeleteId(prev => index._id); setInvoiceNo(prev => index.invoice_No); setIsDialogOPen(true) }} tooltip='Delete Invoice' key={deleteInvoiceIconKey} /></div>
                                <div><ViewIcon color='blue' onclick={() => { navigate(`/view/${index._id}/invoice`) }} tooltip='View' key={viewIconId} /></div>
                              </div>
                            </th>
                          </tr>
                        }
                      })
                    }
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Table