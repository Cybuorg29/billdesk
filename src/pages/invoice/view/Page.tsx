import { MutableRefObject, useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../../store/app/hooks';
import { setInvoiceAction } from '../../../store/actions/invoice/set';
import { Iinvoice } from '../../../models/invoice/invoice.model';
import LeftSection from './layout/LeftSection';
import RightSection from './layout/RightSection';
import { toast } from 'react-toastify';
import jsPDF from 'jspdf';
import { usePDF } from 'react-to-pdf';
// import {} from 'reac'
import './hideSidebarr.css'
import { change } from '../../../store/features/loader/loaderSlice';
import { getSalesOrderNoApi } from '../../../api/v2/salesOrder/api';
import { responceObj } from '../../../models/responce';
import * as htmlToImage from 'html-to-image'
import DeliveryChalanPage from '../../delivery_challan/Page';
import { Dialog } from '@mui/material';
import { SolidButton } from '../../../components/ui/Buttons/solid/SolidButton';
// import html2pdf from 'ht'

type Props = {}

const ViewInvoice = (props: Props) => {

  const { id } = useParams();
  const dispatch = useAppDispatch()
  const { isLoaded, invoices } = useAppSelector(state => state.invoice);
  const { istoken, token } = useAppSelector(state => state.auth);
  const { targetRef, toPDF } = usePDF();
  const [isDownloadDialogOpen, setDownloadDialog] = useState<boolean>(false)
  const [DownloadOptions, setDownloadOptions] = useState<1 | 2 | 3>()
  const [invoice, setInvoice] = useState<Iinvoice>({
    billed_From: {
      name: '',
      gstin: '',
      adress: ``,
      mobile: '',
      state: '',
      state_Code: 0,
    },
    billed_To: {
      name: "",
      gstin: "",
      adress: '',
      state: '',
      state_Code: 0,
    },
    shipped_To: {
      name: "",
      gstin: "",
      adress: '',
      state: '',
      state_Code: 0,
    },
    invoice_Date: '',
    invoice_No: '',
    transport_Mode: '',
    vehical_No: '',
    reverce_Charge: false,
    date_of_supply: '',
    state: '',
    place_of_supply: '',
    discount: 0,
    grand_Total: 0,
    gst_On_Reverce_Charge: 0,
    products: [],
    total_Tax: 0,
    state_Code: 0,
    terms_And_Conditions: [],
    bank: {
      bank: '',
      branch: '',
      isfc: '',
      name: '',
      no: ''
    },
    id: '',
    isPaid: false,
    _id: '',
    _v: 0,
    createdAt: '',
    updatedAt: '',
    Eway_No: '',
    SO_NO: ''
  })

  useEffect(() => {
    if (!isLoaded) {
      setInvoiceAction();
    } else {
      invoices.map((index: Iinvoice) => {
        if (index._id === id) {
          console.log(index)
          setInvoice(index);
        }
      })
    }
  }, [invoices, isLoaded, istoken])



  async function convertToImage(element: any, pdf: any): Promise<any[3]> {
    let pdfHeight = 0
    let pdfWidth = 0
    let dataUri = ''
    await htmlToImage.toPng(element, { quality: 0.50, backgroundColor: '#ffffff' })
      .then(async function (dataUrl: any) {
        var link = document.createElement('a');
        link.download = 'my-image-name.png';
        const imgProps = pdf.getImageProperties(dataUrl);
        pdfWidth = pdf.internal.pageSize.getWidth();
        pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        console.log(dataUrl)
        dataUri = dataUrl
      }
      )
    return [dataUri, pdfWidth, pdfHeight]
  }




  async function printOne() {
    dispatch(change());
    try {
      console.log(targetRef.current)
      const pdf = new jsPDF('portrait', 'pt', 'a4', true);
      if (DownloadOptions === 1 || DownloadOptions === 3) {
        const [data1, data1Width, data1Height]: any = await convertToImage(targetRef.current, pdf);
        pdf.addImage(data1, 'PNG', 0, 0, data1Width, data1Height);
      }
      if (DownloadOptions === 2 || DownloadOptions === 3) {
        const element = document.getElementById("chalan")
        const [data2, data2Width, data2Height]: any = await convertToImage(element, pdf);
        pdf.addPage('a4', 'portrait')
        pdf.addImage(data2, 'PNG', 0, 0, data2Width, data2Height);
      }
      pdf.save(`${"invoice -" + '-' + invoice.invoice_No}.pdf`);
    } catch (err: any) {
      console.log(err);
      toast.error('an error occured');
    }
    dispatch(change());
  }



  // async function print() {
  //   dispatch(change());
  //   try {
  //     await htmlToImage.toPng(targetRef.current, { quality: 0.50, backgroundColor: '#fffff' })
  //       .then(function (dataUrl) {
  //         var link = document.createElement('a');
  //         link.download = 'my-image-name.jpeg';
  //         const pdf = new jsPDF('portrait', 'pt', 'a4');
  //         const imgProps = pdf.getImageProperties(dataUrl);
  //         const pdfWidth = pdf.internal.pageSize.getWidth();
  //         const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
  //         // pdf.addImage(dataUrl, 'PNG', 0, 0, pdfWidth, pdfHeight);
  //         pdf.addPage();
  //         // pdf.addImage(dataUrl, 'PNG', 0, 0, pdfWidth, pdfHeight);
  //         pdf.save(`${"invoice -" + '-' + invoice.invoice_No}.pdf`);
  //       });

  //     // const htmlString = ReactDOMServer.renderToStaticMarkup(<LeftSection doc={doc} invoice={invoice} targetRef={targetRef} />)



  //   } catch (err: any) {
  //     console.log(err.message);
  //     toast.error('an error occured');
  //     toast.error('error type' + err.message);
  //     // dispatch(change());

  //   }
  //   dispatch(change());
  // }







  const DownloadDialog = () => {
    return <Dialog open={isDownloadDialogOpen} fullWidth >
      <div className='p-5'>
        <div className='flex place-content-between'>
          <div className='text-lg'>Select Download Option</div>
          <div className='text-lg cursor-pointer' onClick={() => { setDownloadDialog(false) }}>X</div>
        </div>
        <div className='p-3 grid gap-3 '>
          <div className='p-2 bg-blue-200 hover:bg-blue-600 cursor-pointer hover:text-white border-blue-300 border-2 flex place-content-center' onClick={() => { setDownloadOptions(1); printOne() }} >Download Only Invoice </div>
          {/* {
            (invoice.challan_no) ?
              <> */}
          <div className='p-2 bg-blue-200 hover:bg-blue-600 cursor-pointer hover:text-white border-blue-300 border-2 flex place-content-center' onClick={() => { setDownloadOptions(2); printOne() }} >Download Only Chalan </div>
          <div className='p-2 bg-blue-200 hover:bg-blue-600 cursor-pointer hover:text-white border-blue-300 border-2 flex place-content-center' onClick={() => { setDownloadOptions(3); printOne() }} >Download Both </div>
          {/* </> : null

          } */}

        </div>

      </div>




    </Dialog>
  }







  return (
    <>
      <DownloadDialog />
      <div className='w-full h-full   flex gap-2 lg:scale-100 scale-0'>
        <div className='w-[85%] h-full   overflow-auto '>
          <div className='h-fit bg-component   w-full overflow-auto'  >
            <LeftSection invoice={invoice} targetRef={targetRef} />
          </div>
          <div className='h-fit w-full mt-5 bg-component ' >
            {
              (invoice.challan_no?.length === 0) ? null :
                <DeliveryChalanPage id={invoice._id} key={'delChalan'} />
            }
          </div>
        </div>
        <div className='w-[15%] h-full  bg-component ' id='print' >
          <RightSection printOne={() => setDownloadDialog(true)} key={'rhtSec'} />
        </div>

      </div>
    </>

  )
}

export default ViewInvoice 