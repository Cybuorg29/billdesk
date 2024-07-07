import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../../store/app/hooks';
import { setInvoiceAction } from '../../../store/actions/invoice/set';
import { Iinvoice } from '../../../models/invoice/invoice.model';
import LeftSection from './layout/LeftSection';
import RightSection from './layout/RightSection';
import html2canvas from 'html2canvas'
import { toast } from 'react-toastify';
import jsPDF from 'jspdf';
import generatePDF, { Margin, Options, Resolution, usePDF } from 'react-to-pdf';
import html2PDF from 'jspdf-html2canvas';
import reactToPdf from 'react-to-pdf';
import * as htmlToImage from 'html-to-image';

import './hideSidebarr.css'
import { change } from '../../../store/features/loader/loaderSlice';

type Props = {}

const ViewInvoice = (props: Props) => {

  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { isLoaded, invoices } = useAppSelector(state => state.invoice);
  const { istoken, token } = useAppSelector(state => state.auth);
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
    updatedAt: ''
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
    try {
      console.log(targetRef.current)
      dispatch(change());
      htmlToImage.toPng(targetRef.current, { quality: 0.50 })
        .then(function (dataUrl) {
          var link = document.createElement('a');
          link.download = 'my-image-name.jpeg';
          const pdf = new jsPDF();
          const imgProps = pdf.getImageProperties(dataUrl);
          const pdfWidth = pdf.internal.pageSize.getWidth();
          const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
          pdf.addImage(dataUrl, 'PNG', 0, 0, pdfWidth, pdfHeight);
          pdf.save(`${"invoice" + invoice.invoice_No}.pdf`);
        });

      dispatch(change());


    } catch (err: any) {
      console.log(err);
      toast.error('an error occured');
      dispatch(change());

    }
  }



  const { targetRef, toPDF } = usePDF();


  return (
    <>
      <div className='w-full h-full  overflow-hidden flex gap-2 lg:scale-100 scale-0'>
        <div className='w-[85%] h-full bg-component '   >
          <div className='h-full w-full overflow-auto'   >
            <LeftSection invoice={invoice} targetRef={targetRef} />
          </div>
          {/* <iframe title='Invocie' className='h-full w-full'  src={invoiceUrl}>
                
        </iframe> */}
          <div className='h-fit  w-full overflow-auto  ' id='toPrint'>
            <LeftSection invoice={invoice} targetRef={targetRef} />
          </div>
        </div>
        <div className='w-[15%] h-full  bg-component ' id='print' >
          <RightSection printOne={printOne} />
        </div>

      </div>
    </>

  )
}

export default ViewInvoice 