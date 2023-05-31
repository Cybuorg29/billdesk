import React, { useEffect, useState } from "react";
import TopNameDiv from "../../../components/Invoice/viewinvoice/TopNameDiv";
import BilledToDetails from "../../../components/Invoice/viewinvoice/BilledToDetails";
import ShippedToDetails from "../../../components/Invoice/viewinvoice/ShippedToDetails";
import {
  invocieCreationDetails,
  invoiceModel,
} from "../../../Model/InvoiceModel";
import { clientModel } from "../../../Model/ClientModel";
import { getInvoiceClientData } from "../../../../api/invocie/invoiceService";
import TopDetails from "../../../components/Invoice/viewinvoice/TopDetails";
import { useParams } from "react-router-dom";
import InvoiceTable, { productSchema } from "../../../components/Invoice/viewinvoice/InvoiceTable";

// type Props = {invoice:invoiceModel}

type invoiceObject = {
  inovice: invoiceModel;
};

export interface invoiceClientDetails {
  bname: string;
  badress: string;
  bstate: string;
  bpincode: string;
  bgstin: string;
  sname: string;
  sadress: string;
  sstate: string;
  spincode: string;
  sgstin: string;
}

type productPropArray = {

   data:productSchema[]

}

const ViewInvoiceTopSection: React.FC = () => {
  const [data, setData] = useState<invoiceModel>();
  const [billData, setBillData]: any = useState<invoiceClientDetails>();
  const [billDetail, setBillDetail]:any = useState<invocieCreationDetails>();
   const [invoiceProducts,setInvoiceProducts]:any = useState([])
  const { invoiceid } = useParams();

  const getBillClientData = async () => {
    // if(data.bid===data.sid){
    //     console.log('same')
    //      console.log(data.bid)
    //     const getClient =  await  getInvoiceClientData(data.bid)
    //      console.log(getClient)
    //       let client:any = getClient.data
    //        client = client.data
    //       console.log('client',client)
    //     //  setBillData(getClient.data.data)
    //     setBillData({...billData, bname:client?.name,badress:client?.adress,bstate:client.state,bpincode:client.pincode,bgstin:client.gstin,sname:client.name,sadress:client.adress,spincode:client.adress,sstate:client.adress,sgstin:client.gstin})
    //      console.log('billdata',billData)
    // }
    let Invoices: any = sessionStorage.getItem("invoices");

    if (!Invoices || Invoices === "null") {
      console.log("!");
      console.log("!inoivce", Invoices);
    } else {
      console.log("invoices Found ");
      Invoices = JSON.parse(Invoices);
      Invoices.map(async (index: invoiceModel) => {
        if (invoiceid === index._id) {
          console.log("invoice Found");
          console.log(index);
          setData(index);
           setInvoiceProducts(index.products)
            console.log('invoiceProducts ',invoiceProducts)
          if (index.bid === index.sid) {
            const getClient = await getInvoiceClientData(index.bid);
            console.log(getClient);
            let client: any = getClient.data;
            client = client.data;
            setBillData({
              ...billData,
              bname: client?.name,
              badress: client?.adress,
              bstate: client.state,
              bpincode: client.pincode,
              bgstin: client.gstin,
              sname: client.name,
              sadress: client.adress,
              spincode: client.adress,
              sstate: client.state,
              sgstin: client.gstin,
            });
            setBillDetail({
              ...billDetail,
              inNo: index.inNo,
              reverceCharge: index.reverseCharge,
              state: index.state,
              gstin: client.gstin,
              transport: index.transport,
              vehicalNo: index.vehicalNo,
              date:index.date
            });
            
          }
        }
      });

      console.log("data", data);
      console.log("detail", billDetail);
    }
  };

  useEffect(() => {
    getBillClientData();
  }, []);
  useEffect(() => {}, [data]);

  return (
    <div className="grid ">
      <div>
        <TopNameDiv />
        <TopDetails data={billDetail} />
      </div>
      <div className="grid grid-cols-2">
        <BilledToDetails data={billData} />
        <ShippedToDetails data={billData} />
      </div>
        <InvoiceTable    data={invoiceProducts}   />
    </div>
  );
};

export default ViewInvoiceTopSection;
