import { Iinvoice } from "../../../../models/invoice/invoice.model";

export   function searchInvoiceValue(invoices: Iinvoice[], searchTerm: string): number[] {
    const matchingIndexes: number[] = [];
  
    for (let i = 0; i < invoices.length; i++) {
      const invoice = invoices[i];
      if (
        invoice.billed_To.name.includes(searchTerm) ||
        invoice.billed_To.name.toLowerCase().includes(searchTerm) ||
        invoice.invoice_Date.includes(searchTerm) ||
        invoice.grand_Total.toString().includes(searchTerm)
      ) {
        matchingIndexes.push(i);
      }
    }
  
    return matchingIndexes;
  }