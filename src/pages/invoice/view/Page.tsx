import { useEffect, useState } from 'react'
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
// import html2pdf from 'ht'
type Props = {}

const ViewInvoice = (props: Props) => {

  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { isLoaded, invoices } = useAppSelector(state => state.invoice);
  const { istoken, token } = useAppSelector(state => state.auth);
  const [IsLoaded, setIsLoaded] = useState<boolean>(false)
  const [doc, setDoc] = useState<'Original' | 'Dublicate' | 'Triplicate'>('Original')
  const { auth, salesOrders, connections } = useAppSelector(state => state)
  const navigate = useNavigate();
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





  async function printOne() {
    dispatch(change());
    try {
      console.log(targetRef.current)
      htmlToImage.toPng(targetRef.current, { quality: 0.50 })
        .then(function (dataUrl) {
          var link = document.createElement('a');
          link.download = 'my-image-name.jpeg';
          const pdf = new jsPDF('portrait', 'pt', 'a4');
          const imgProps = pdf.getImageProperties(dataUrl);
          const pdfWidth = pdf.internal.pageSize.getWidth();
          const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
          pdf.addImage(dataUrl, 'PNG', 0, 0, pdfWidth, pdfHeight);
          pdf.save(`${"invoice" + invoice.invoice_No}.pdf`);
        });

      // const htmlString = ReactDOMServer.renderToStaticMarkup(<LeftSection doc={doc} invoice={invoice} targetRef={targetRef} />)



    } catch (err: any) {
      console.log(err);
      toast.error('an error occured');
      // dispatch(change());

    }
    dispatch(change());
  }






  useEffect(() => {
    if (!IsLoaded) {
      if (invoice.SO_NO) getSalesOrderNO()
    }

  }, [invoice?.SO_NO])



  async function getSalesOrderNO() {
    dispatch(change());
    try {
      const { data } = await getSalesOrderNoApi(auth.token, invoice.SO_NO);
      const res: responceObj = data;
      if (res.code === 200) {
        setInvoice(prev => { return { ...prev, SO_NO: res.package } });
        setIsLoaded(true)
      } else {
        navigate('/dashboard/invoice')
      }

    } catch (err: any) {
      toast.error("an error occured ")
      toast.error("Error Type : " + err.message)
    }
    dispatch(change());
  }




  const handleGeneratePdf = () => {
    const doc = new jsPDF({
      format: 'a4',
      unit: 'pt',
    });


    // Adding the fonts.
    doc.setFont('Inter-Regular', 'normal');

    doc.html(targetRef.current, {
      async callback(doc) {
        await doc.save('document');

      },
    });
  };



  const { targetRef, toPDF } = usePDF();






  return (
    <>
      <div className='w-full h-full  overflow-hidden flex gap-2 lg:scale-100 scale-0'>
        <div className='w-[85%] h-full bg-component '   >
          <div className='h-full w-full overflow-auto'   >
            <LeftSection doc={doc} invoice={invoice} targetRef={targetRef} />
          </div>
          {/* <iframe title='Invocie' className='h-full w-full'  src={invoiceUrl}>
                
        </iframe> */}
          <div className='h-fit  w-full overflow-auto  ' id='toPrint'>
            <LeftSection doc={doc} invoice={invoice} targetRef={targetRef} />
          </div>
        </div>
        <div className='w-[15%] h-full  bg-component ' id='print' >
          <RightSection setDoc={(value: any) => { setDoc(value) }} printOne={() => printOne()} />
        </div>

      </div>
    </>

  )
}

export default ViewInvoice 