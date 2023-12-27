export interface userDetailSchema {
    name: string
    gstin: string
    phone: string
    email: string
    activities: string
    pincode: string
    image: any,
    _id: string,
    type: string
    state: string
    adress: string
}

export interface bankDetails {
    name: string
    isfc: string
    no: string
    branch: string
    bank: string
}

export interface createUserModel {
    name: string
    gstin: string
    phone: string
    email: string
    activities: string
    pincode: string
    image: any
    adress: string
    type: 0 | 1
    state: string
}