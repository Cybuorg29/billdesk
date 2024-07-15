
export interface ISALES_ORDER_PRODUCT extends Document {
    description: string
    quantity: number
    delivered: number
    measuring_Unit: string
    rate: number
    del_sch: string
    tax: []
    id: string
    name: string
    _id: string
    createAt: string
    updatedAt: string
    in_id: string
}

export interface ICREATE_SALES_ORDER_PRODUCT {
    description: string
    quantity: number
    measuring_Unit: string
    rate: number
    del_sch: string
    tax: []
    name: string
    in_id: any
    delivered: number
}





export interface ICreateSalesOrder {

    from: {
        name: string
        adress: string
        pincode: string
        phone: string
    }
    to: {
        name: string
        adress: string
        pincode: string
        phone: string
    }
    ship_To: {
        name: string
        adress: string
        pincode: string
        phone: string
    }
    date: string
    invoice_No: string
    shipping_Meathod: string
    delivery_Date: string
    due_Date: string
    payment_Terms: []
    notes: []
    total_Discount: number
    Total: number
    id: string
    product: ICREATE_SALES_ORDER_PRODUCT[]

}


export interface ISalesOrder {

    from: {
        name: string
        adress: string
        pincode: string
        phone: string
    }
    to: {
        name: string
        adress: string
        pincode: string
        phone: string
    }
    ship_To: {
        name: string
        adress: string
        pincode: string
        phone: string
    }
    date: string
    invoice_No: string
    shipping_Meathod: string
    delivery_Date: string
    due_Date: string
    payment_Terms: []
    notes: []
    total_Discount: number
    Total: number
    id: string
    _id: string
    createdAt: string
    updatedAt: string
    product: ISALES_ORDER_PRODUCT[]

}
