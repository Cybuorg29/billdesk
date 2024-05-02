import { IPURCHASE_ORDER } from "../../model/model";

export function initlisePurchaseOrderArray(array: IPURCHASE_ORDER[], _id: string | undefined): IPURCHASE_ORDER {

    let newArray: IPURCHASE_ORDER = {
        date: '',
        from: {
            adress: '',
            gstin: '',
            name: '',
            phone: ''
        },

        id: '',
        note: [],
        po_NO: '',
        product: [],
        ref: '',
        terms_And_Conditions: [],
        to: {
            adress: '',
            gstin: '',
            name: '',
            phone: ''
        },
        total: 0,
        valid_Date: '',
        ship_To: {
            adress: '',
            gstin: '',
            name: '',
            phone: ''

        }
        ,
        _id: '',
        bills: [],
        createdAt: '',
        updatedAt: ''
    }

    array.map((index: IPURCHASE_ORDER) => {
        if (index._id === _id) {
            return newArray = index
        }
    })

    return newArray



}