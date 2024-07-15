import { ProductObj } from '../../../../models/inventory/productModel';
import { setProducts } from '../../../features/inventory/inventorySlice';
import { actionPayload } from '../../../payload/payloadModel';
import { invoiceActions } from '../../../reducers/invoice/invoice.reducer';
import { store } from './../../../app/store';
import { toast } from 'react-toastify';



export function updateInventoryStockThroughInvoice(data: { name: string, qty: number }[]) {
    try {

        const { product } = store.getState();
        let newArray: ProductObj[] = []
        let prods: any = JSON.stringify([...product.products]);
        prods = JSON.parse(prods);
        data.map((value: { name: string, qty: number }) => {
            const index = prods.findIndex((prod: any) => prod.name === value.name);
            if (index === -1) throw new Error("Error Updating Inventory ")
            prods[index].stock = parseInt(`${prods[index].stock}`) - parseInt(`${value.qty}`);
            return newArray.push(...prods);
        })

        const payload: actionPayload = {
            type: invoiceActions.set,
            data: newArray
        }
        store.dispatch(setProducts(payload));

    } catch (Err: any) {
        toast.error(Err.message)
    }

}