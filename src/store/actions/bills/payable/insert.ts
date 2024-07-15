import { toast } from "react-toastify";
import { IcreateBillsPayable } from "../../../features/bills/receivable/model";
import { store } from "../../../app/store";
import { InsertPayableApi } from "../../../../api/v2/bills/payable/api";
import { responceObj } from "../../../../models/responce";
import { actionPayload } from "../../../payload/payloadModel";
import { payableActions } from "../../../reducers/bills/receivable/reducer";
import { changePayables } from "../../../features/bills/receivable/billsReceivableSlice";
import { change } from "../../../features/loader/loaderSlice";
import { changeProduct, ProductOperations, stockOperation } from "../../../reducers/inventory";
import { setProducts, updateStock } from "../../../features/inventory/inventorySlice";
import { getProducts } from "../../products";

export async function insertBillsPayable(payable: IcreateBillsPayable) {
    store.dispatch(change())
    try {

        const { data } = await InsertPayableApi(payable);
        const res: responceObj = data
        if (res.code === 500) {
            throw new Error('internal server error');
        }
        else if (res.code !== 200) throw new Error(res.error);
        else {

            const payload: actionPayload = {
                data: res.package,
                type: payableActions.PUSH
            }
            const { product, po } = store.getState()
            const { products } = product
            if (!product.isProducts) await getProducts();
            let newArray: any = []
            payable.products.map((index) => {
                return products.map((product) => {
                    let temp = { ...product };
                    if (index.name === product.name) {
                        temp.stock = parseInt(`${temp.stock}`) + parseInt(`${index.qty}`);
                    }
                    newArray.push(temp);
                })
            })
            const InventoryPayload: actionPayload = {
                data: newArray,
                type: ProductOperations.set
            }



            store.dispatch(changePayables(payload));
            store.dispatch(setProducts(InventoryPayload))

        }
    } catch (err: any) {
        toast.error('asdas')
        toast.error(err.message)
    }
    store.dispatch(change())


}