import React, { useEffect, useState } from 'react'
import {  useParams } from 'react-router-dom'
import { useAppSelector } from '../../../store/app/hooks';
import { setInvoiceAction } from '../../../store/actions/invoice/set';
import { Iinvoice } from '../../../models/invoice/invoice.model';
import LeftSection from './layout/LeftSection';
import RightSection from './layout/RightSection';
import html2canvas from 'html2canvas'
import { toast } from 'react-toastify';
import jsPDF from 'jspdf';
import generatePDF, { Margin, Options, Resolution, usePDF } from 'react-to-pdf';
import html2PDF from 'jspdf-html2canvas';
import reactToPdf  from 'react-to-pdf';
import  * as htmlToImage  from 'html-to-image';

import './hideSidebarr.css'

type Props = {}

const ViewInvoice = (props: Props) => {

  const { id } = useParams();
  const { isLoaded, invoices } = useAppSelector(state => state.invoice);
  const { istoken, token } = useAppSelector(state => state.auth); 
   const [invoiceUrl,setInvocieUrl] = useState('')
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
    _v: 0
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





  const options:Options = {
    // default is `save`
    method: 'save',
    // default is Resolution.MEDIUM = 3, which should be enough, higher values
    // increases the image quality but also the size of the PDF, so be careful
    // using values higher than 10 when having multiple pages generated, it
    // might cause the page to crash or hang.
    resolution: Resolution.EXTREME,
    page: {
       // margin is in MM, default is Margin.NONE = 0
       margin: Resolution.MEDIUM,
       // default is 'A4'
       format: 'a4',
       // default is 'portrait'
       orientation: 'portrait',
       
    },
    canvas: {
       // default is 'image/jpeg' for better size performance
       mimeType: 'image/jpeg',
       qualityRatio: 5
    },
    // Customize any value passed to the jsPDF instance and html2canvas
    // function. You probably will not need this and things can break, 
    // so use with caution.
    overrides: {
       // see https://artskydj.github.io/jsPDF/docs/jsPDF.html for more options
       pdf: {
          compress: true
       },
       // see https://html2canvas.hertzen.com/configuration for more options
       canvas: {
          useCORS: false
       }
    },
    // scale:window.devicePixelRatio,
    filename:'invoice.pdf',


    
    
  };
  

  const defaultOptions:any = {
    jsPDF: {
      unit: 'pt',
      format: 'a4',
    },
    html2canvas: {
      logging: true,
      useCORS: false,
    },
    imageType: 'image/jpeg',
    imageQuality: 0.95,
    margin: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
    },
    watermark: undefined,
    autoResize: false,
    output: 'jspdf-generate.pdf',
    init: function() {},
    success: function(pdf:any) {
      pdf.save(this.output);
    }
  }


  async function printOne() {
    try {

       const  printDiv:any =()=>  document.getElementById('toPrint');
      //  document.body.innerHTML = pritnDiv;
      //  window.print();
      //  window.location.reload();
      //  generatePDF(printDiv,defaultOptions)
      //  await  html2PDF(printDiv,defaultOptions); 
       console.log(printDiv)
      if(printDiv === typeof null){
        throw new Error('error in downloading pdf')
      }else{

        // html2canvas(targetRef.current).then((canvas)=>{
          // const imgData = canvas.toDataURL('img/png');
          // const doc = new jsPDF('p','mm','a4');
          // const compenentWidth = doc.internal.pageSize.getWidth();
          // const componentHeight = doc.internal.pageSize.getHeight();
          // doc.addImage(imgData,'PNG',0,0,compenentWidth,componentHeight);
          // doc.save('out.pdf')


          
        //   const doc = new jsPDF('p', 'px');
        //   const canvas:any = await html2canvas(targetRef.current,{scale:0.95});
        //   const imgData = canvas.toDataURL('image/jpeg');
        //   const componentWidth = doc.internal.pageSize.getWidth();
        //   const componentHeight = doc.internal.pageSize.getHeight();
        //   doc.addImage(imgData, 'JPEG', 0, 0, componentWidth, componentHeight);          
        //   // doc.save('out.pdf');
        //   const pdfBlob = doc.output('blob');

        //   // Create a data URL for the Blob
        //   const pdfUrl = URL.createObjectURL(pdfBlob);

        //   // Open the PDF in a new window
        //   // window.open(pdfUrl, '_blank');
        //    setInvocieUrl(canvas)
        // // })



        // generates good pdf 



        // htmlToImage.toPng(targetRef.current, { quality: 0.95  })
        // .then(function (dataUrl) {
        //   const pdf = new jsPDF();          
        //   // pdf.addImage(dataUrl, 'PNG', 0, 0);
        //      const compenentWidth = pdf.internal.pageSize.getWidth();
        //   const componentHeight = pdf.internal.pageSize.getHeight();
        //   pdf.addImage(dataUrl,'JPEG',0,0,compenentWidth,componentHeight);

          
        //   // pdf.save("download.pdf"); 
        //    const pdfBlob = pdf.output('blob');

        //   // // Create a data URL for the Blob
        //   const pdfUrl = URL.createObjectURL(pdfBlob);

        //   // Open the PDF in a new window
        //   // window.open(pdfUrl, '_blank');
        //    setInvocieUrl(pdfUrl)

        // });

        

        htmlToImage.toPng(targetRef.current, { quality: 0.95 })
        .then(function (dataUrl) {
          var link = document.createElement('a');
          link.download = 'my-image-name.jpeg';
          const pdf = new jsPDF();
          const imgProps= pdf.getImageProperties(dataUrl);
          const pdfWidth = pdf.internal.pageSize.getWidth();
          const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
          pdf.addImage(dataUrl, 'PNG', 0, 0,pdfWidth, pdfHeight);
          pdf.save("download.pdf"); 
        });

      }
    }catch (err: any) {
      console.log(err);
      toast.error('an error occured');
    }
  }


  
  const {targetRef,toPDF} = usePDF(defaultOptions);


  return (
    <>
    <div className='w-full h-full  overflow-hidden flex gap-2 lg:scale-100 scale-0'>
      <div  className='w-[85%] h-full bg-component '   >
        <div className='h-full w-full overflow-auto'   >
        <LeftSection invoice={invoice}  targetRef={targetRef}  />
        </div>
        {/* <iframe title='Invocie' className='h-full w-full'  src={invoiceUrl}>
                
        </iframe> */}
        <div className='h-fit  w-full overflow-auto  '    id='toPrint'>
        <LeftSection invoice={invoice}  targetRef={targetRef}  />
        </div>
      </div>
      <div className='w-[15%] h-full  bg-component '  id='print' >
        <RightSection printOne={printOne} />
      </div>

    </div>
        </>
   
  )
}

export default ViewInvoice 