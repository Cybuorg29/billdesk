export interface IPurchaseOrderBody {

    id: string
    from: {
        name: string
        adress: string
        gstin: string
        phone: string
    }
    po_NO: string
    date: string
    ref: string
    to: {
        name: string
        adress: string
        gstin: string
        phone: string
    }
    valid_Date: string
    terms_And_Conditions: [
        {
            type: string,
            description: string
        }
    ]
    total: number
    note: any[],
    ship_To: {
        name: string
        adress: string
        gstin: string
        phone: string
    }


}


export interface IPURCHASE_ORDER_PRODUCT {
    description: string
    quantity: number
    measuring_Unit: string
    rate: number
    value: number
    del_sch: string
    tax: []
    name: string
}

export interface IPURCHASE_ORDER {
    id: string
    from: {
        name: string
        adress: string
        gstin: string
        phone: string
    }
    po_NO: string
    date: string
    ref: string
    to: {
        name: string
        adress: string
        gstin: string
        phone: string
    }
    valid_Date: string
    terms_And_Conditions: [
        {
            type: string,
            description: string
        }
    ]
    total: number
    note: any[],
    ship_To: {
        name: string
        adress: string
        gstin: string
        phone: string
    }
    products: IPURCHASE_ORDER_PRODUCT[]
}