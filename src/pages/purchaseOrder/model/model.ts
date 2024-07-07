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
    terms_And_Conditions: any[]
    total: number
    note: any[],
    ship_To: {
        name: string
        adress: string
        gstin: string
        phone: string
    }


}


export interface ICREATE_PURCHASE_ORDER_PRODUCT {
    description: string
    quantity: number
    measuring_Unit: string
    rate: number
    value: number
    del_sch: string
    tax: []
    name: string
}

export interface ICREATE_PURCHASE_ORDER {
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
    terms_And_Conditions: any[
    ]
    total: number
    note: any[],
    ship_To: {
        name: string
        adress: string
        gstin: string
        phone: string
    }
    product: ICREATE_PURCHASE_ORDER_PRODUCT[],
}

export interface ICREATE_PURCHASE_ORDER_PRODUCT {
    description: string
    quantity: number
    measuring_Unit: string
    rate: number
    value: number
    del_sch: string
    tax: []
    in_id: string
    name: string
}

export interface IPURCHASE_ORDER_PRODUCT {
    description: string
    quantity: number
    measuring_Unit: string
    rate: number
    value: number
    del_sch: string
    tax: []
    delivered: number
    name: string
    _id: string
    in_id: string
    createdAt: string
    updatedAt: string
    __v: number
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
    terms_And_Conditions: any[
    ]
    total: number
    note: any[],
    ship_To: {
        name: string
        adress: string
        gstin: string
        phone: string
    }
    product: IPURCHASE_ORDER_PRODUCT[],
    _id: string
    createdAt: string
    updatedAt: string
    bills: any[]
}