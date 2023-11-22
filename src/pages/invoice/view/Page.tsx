import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAppSelector } from '../../../store/app/hooks';
import { setInvoiceAction } from '../../../store/actions/invoice/set';
import { Iinvoice } from '../../../models/invoice/invoice.model';
import { SolidButton } from '../../../components/ui/Buttons/solid/SolidButton';
import LeftSection from './layout/LeftSection';
import RightSection from './layout/RightSection';
import   html2canvas from 'html2canvas'
import   jspdf from 'jspdf'
import { toast } from 'react-toastify';


type Props = {}

const ViewInvoice = (props: Props) => {

  const { id } = useParams();
  const { isLoaded, invoices } = useAppSelector(state => state.invoice);
  const { istoken,token } = useAppSelector(state => state.auth);
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
    bank:{
        bank:'',
        branch:'',
        isfc:'',
        name:'',
        no:''
    },
    id:'',
     isPaid:false,
     _id:'',
     _v:0
})

  useEffect(() => {
    if (!isLoaded) {
      setInvoiceAction();
    }else{
      invoices.map((index: Iinvoice) => {
        if (index._id === id) {
          console.log(index)
          setInvoice(index);
        }
      })
    }
  }, [invoices, isLoaded,istoken])



  


  function  printOne(){
    try{

      let pritnDiv:any = document.getElementById('invoice')?.innerHTML;
       document.body.innerHTML = pritnDiv;
       window.print();
       window.location.reload();
      // const quality = 1
      //  Higher the better but larger file
        // html2canvas(pritnDiv,
        //   { scale: 1 }
        //   ).then(canvas => {
        //     const pdf = new jspdf('p', 'mm', 'a4');
        //     pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, 211, 298);
        //     pdf.save('invoice.pdf');
        //   });
      }catch(err:any){
        console.log(err.message);
        toast.error('an error occured');
      }
  }

     
  return (
    <div className='w-full h-full  overflow-hidden flex gap-2'>
      <div  id='toPrint' className='w-[85%] h-full bg-component ' >
        <LeftSection invoice={invoice} />
      </div>
      <div   className='w-[15%] h-full  bg-component ' >
        <RightSection  printOne={printOne} />
      </div>

    </div>
  )
}

export default ViewInvoice