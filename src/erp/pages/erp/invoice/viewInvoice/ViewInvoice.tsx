import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ViewInvoiceTopSection from '../../../../layouts/invoice/viewInvoice/ViewInvoiceTopSection'
import { Button } from '@mui/material'
import jsPDF from 'jspdf'
type Props = {}



const ViewInvoice = (props: Props) => {
    // const {id} = useParams()
    // const {invoiceid} = useParams()
    // //  console.log(invoiceid)
    //  const [invoice,setInvoice]:any = useState({})
    //   const  fetchData=()=>{
    //      let invoices:any = sessionStorage.getItem('invoices')
    //       invoices = JSON.parse(invoices) 
    //       invoices.map((index:any)=>{
    //           if(index._id===invoiceid){
    //               console.log('invoiceid',invoiceid)
    //              console.log(index)
    //             setInvoice(index)
    //           }
    //       })
    //       console.log('invoice',invoice)
    //   }
    //   useEffect(() => {
    //     fetchData()
     
    //   }, [])

     const printInvoice=()=>{
       const prevState:any = document.body.innerHTML;
       const newState:any = document.getElementById('printDiv')?.innerHTML
        document.body.innerHTML = newState;
        window.print()
        // document.body.innerHTML = prevState
        window.location.reload()

     }
     const print =()=>{
      const doc = new jsPDF({
        orientation: 'landscape',
        unit: 'in',
        format: [4, 2],
      });
       const printDiv:any = document.getElementById('printDiv')?.innerHTML

      doc.html(printDiv, {
        async callback(doc) {
           doc.save('inovice');
        },
      });

     }
      
  return (
    <div  className='w-full grid justify-items-center ' >
      <div className='w-11/12' id='printDiv' > 
      <ViewInvoiceTopSection  />

      </div>
      <div><Button onClick={()=>printInvoice()} >Print</Button></div>
    </div> 
  )
}

export default ViewInvoice