

export interface ICreateIncome{
    type:'invoice'|'others'
    amount:number
    title:string
    transactionId:string
    invoiceId:string
    token:string
    receivedAs:'online'|'cash'
}

export interface IIncome{
    type:'invoice'|'others'
    amount:number
    title:string
    transactionId:string
    invoiceId:string
    token:string
    receivedAs:'online'|'cash',
    createdAt: string,
      updatedAt: string,
      __v: number
}
