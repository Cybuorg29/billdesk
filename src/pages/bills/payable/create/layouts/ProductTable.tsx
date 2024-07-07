import { useEffect, useId, useState } from "react"
import { useAppSelector } from "../../../../../store/app/hooks"
import SelectProducts from "../components/SelectProducts"
import { IcreateInvoice } from "../../../../../models/invoice/invoice.model"
import { IbillsPaylable, IcreateBillsPayable } from "../../../../../store/features/bills/receivable/model"
import { toast } from "react-toastify"
import TableInputs from "../../../../invoice/create/components/TableInputs"
import { converToInrFormat } from "../../../../../utils/ConvertInrFormat"
import { IInvoiceProduct } from "../../../../../models/inventory/productModel"


type Props = { invoice: IcreateBillsPayable, setInvoice: any, po: string }
interface TableProps {
  value: any
  onChange: (e: any) => void
  type: any
}

const ProductTable = ({ invoice, setInvoice, po }: Props) => {
  const [selectProductOpen, setSelectProductOpen] = useState<boolean>(false);
  const { products } = useAppSelector(state => state.product);
  const [minStock, setMinStock] = useState<number[]>([]);

  //keys 
  const addProductDialogKey = useId();


  //local components 




  //functions
  function calculateTaxAmount(rate: number, amount: number): number {
    return (rate / 100) * amount;
  }


  const handleQtyRateAndDiscountChange = (value: number, type: 'qty' | 'rate' | 'discount', i: number) => {
    let newArray = invoice.products;

    let index = newArray[i];

    if (type === 'qty') {
      // add stock validator -- pending 
      if (index.delivered && value > index.delivered) toast.error("Quantity Excedded");
      else index.qty = value;
    }
    if (type === 'rate') index.rate = value;
    if (type === 'discount') index.discount = value;
    index.amount = (index.rate * index.qty);
    index.amount = parseFloat(index.amount.toFixed(2));
    index.taxable_Value = index.amount - index.discount;
    let taxAmount: number = 0;
    index.tax.map((item: any) => {
      taxAmount = taxAmount + calculateTaxAmount(item.amount, index.amount)
      taxAmount = parseFloat(taxAmount.toFixed(2));
    })
    index.total = taxAmount + index.taxable_Value;
    newArray[i] = index;
    const total = calculateGrandTotal()

    setInvoice(() => { return { ...invoice, products: newArray, total: total } })
  }

  function removeProduct(num: number) {
    let newArray: any[] = [];
    let total = 0;
    invoice.products.map((index: any, i: number) => {
      if (num === i) {

      }
      else {
        newArray.push(index); total = total + index.total;
      }
    })


    setInvoice((prev: any) => { return { ...prev, products: newArray, total: total } });
  }

  function calculateGrandTotal() {
    let total = 0;
    invoice.products.map((index: any) => {
      total = total + index.total;
    })
    return total;
  }

  useEffect(() => {

  }, [invoice.products])




  return (
    <>
      <SelectProducts po={po} scale={selectProductOpen} setScale={setSelectProductOpen} setInvoice={setInvoice} setMinStock={setMinStock} key={addProductDialogKey} />
      <div className='h-full w-full  relative'>

        <div className='border-t    w-full h-[90%] overflow-auto text-sm relative' >
          <div className="flex flex-col" >
            <div className="">
              <div className="inline-block min-w-full ">
                <div className="overflow-hidden">
                  <table className="min-w-full text-left  ">
                    <thead className="border-b  text-table border-neutral-500 uppercase sticky top-0">
                      <tr className="border-b border-neutral-500">
                        <th scope="col" className='px-1 py-2  sticky text-grayFont  ' ></th>
                        <th scope="col" className='px-1 py-2  sticky text-grayFont  ' >#</th>
                        <th scope="col" className='px-1 py-2  sticky text-grayFont  ' >Description</th>
                        <th scope="col" className='px-1 py-2  sticky text-grayFont  ' >HSN code</th>
                        <th scope="col" className='px-1 py-2  sticky text-grayFont  ' >Qty</th>
                        <th scope="col" className='px-1 py-2  sticky text-grayFont  ' >Unit</th>
                        <th scope="col" className='px-1 py-2  sticky text-grayFont  ' >Rate</th>
                        <th scope="col" className='px-1 py-2  sticky text-grayFont  ' >Amount</th>
                        <th scope="col" className='px-1 py-2  sticky text-grayFont  ' >Discount</th>
                        <th scope="col" className='px-1 py-2  sticky text-grayFont  ' >Tax. Value</th>
                        <th scope="col" className='px-1 py-2  sticky text-grayFont  ' >tax</th>
                        <th scope="col" className='px-1 py-2  sticky text-grayFont  ' >Total</th>
                      </tr>
                    </thead>
                    <tbody>

                      {
                        invoice.products.map((index: IInvoiceProduct, i: number) => {
                          let k = i;
                          return <tr className="border-b border-gray-400 text-table font-source2" key={`index.name${i}`}>

                            <th scope="col" className=' sticky text-gray-700  text-center cursor-pointer' onClick={() => removeProduct(i)} >X</th>
                            <th scope="col" className=' sticky text-gray-700 border border-gray-400  text-center' >{++k}</th>
                            <th scope="col" className=' sticky text-gray-700  text-sm ' >
                              <div className='flex flex-col text-table'>
                                <div className='text-sm'>{index.name}</div>
                                <div className='text-gray-400'>{index.description}</div>
                              </div>
                            </th>
                            <th scope="col" className=' sticky text-gray-700 border border-gray-400 ' >{index.code}</th>
                            <TableInputs value={index.qty} onChange={(e: any) => { handleQtyRateAndDiscountChange(e.target.value, 'qty', i) }} type={'number'} key={`qty${i}`} />
                            <th scope="col" className=' sticky text-gray-700 border border-gray-400 ' >{index.unit}</th>
                            <TableInputs value={index.rate} onChange={(e: any) => { handleQtyRateAndDiscountChange(e.target.value, 'rate', i) }} type={'number'} key={`rate${i}`} />
                            <th scope="col" className=' sticky text-gray-700 border border-gray-400 text-center' >{converToInrFormat(index.amount)}</th>
                            <TableInputs onChange={(e: any) => { handleQtyRateAndDiscountChange(e.target.value, 'discount', i) }} type={'number'} value={index.discount} key={`discount${i}`} />
                            <th scope="col" className=' sticky text-gray-700 border border-gray-400 text-center' >{index.taxable_Value}</th>
                            <th scope="col" className=' sticky text-gray-700 border border-gray-400 text-center' >
                              {/* tax  */}
                              <div className='flex flex-col'>

                                <div className='flex'>
                                  {
                                    index.tax.map((item: any) => {
                                      return <>
                                        <div className='text-table border-r grow flex'>{item.type}</div>
                                      </>
                                    })
                                  }

                                </div>
                                <div className='grid grid-cols-2 border-t text-table ' >
                                  <div className='border-r'>rate</div>
                                  <div className=''>amount</div>

                                </div>
                                <div className='grid'>
                                  {
                                    index.tax.map((item: any) => {
                                      return <>
                                        <div className='grid grid-cols-2 text-table '>
                                          <div className='text-sm border flex grow text-table'>{item.amount + '%'}</div>
                                          <div className='text-sm border flex grow overflow-auto text-table '>{parseFloat(calculateTaxAmount(item.amount, index.taxable_Value).toFixed(2))}</div>

                                        </div>
                                      </>
                                    })
                                  }

                                </div>

                              </div>

                            </th>
                            <th scope="col" className=' sticky  border border-gray-400 text-center text-blue-800' >{converToInrFormat(index.total)}</th>

                          </tr>
                        })
                      }
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='w-full h-[10%] bg-blue-100 border  border-blue-500 text-center cursor-pointer absolute bottom-0 rounded-b-lg grid items-center place-content-center' onClick={() => setSelectProductOpen(true)} >
          <div className='h-fit' >
            Add Product
          </div>
        </div>
      </div>

    </>


  )
}

export default ProductTable