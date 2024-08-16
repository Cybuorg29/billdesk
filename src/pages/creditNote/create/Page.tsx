import React, { useEffect, useState } from 'react';
import { ICreateCreditNote } from '../../../store/features/creditNote/model';
import { useAppSelector } from '../../../store/app/hooks';
import { Dialog, MenuItem, Select } from '@mui/material';
import { Input } from '@mui/joy';
import { setInvoiceAction } from '../../../store/actions/invoice/set';
import { SolidButton } from '../../../components/ui/Buttons/solid/SolidButton';
import TableInputs from '../../invoice/create/components/TableInputs';
import { limitDecimalDigits } from '../../../utils/limitDecimalDigits';
import { toast } from 'react-toastify';
import removeIndex from '../../../utils/removeIndex';
import { createCreditNoteAction } from '../../../store/actions/creditNote/action';
import { preventBatch } from '@syncfusion/ej2-grids';

type Props = {
    open: boolean;
    close: () => void;
};

const CreateCreditNoteDialog = ({ open, close }: Props) => {
    const { userData, invoice, auth, bank } = useAppSelector(state => state);
    const [isAddProductDialogOpen, setIsAddProductDialogOpen] = useState<boolean>(false);
    const [minStockArray, setMinStockArray] = useState<{ min: number }[]>([]);

    const [data, setData] = useState<ICreateCreditNote>({
        against_Invoice_Id: '',
        against_Invoice_No: '',
        bank: {
            name: bank.name,
            bank: bank.bank,
            ifsc: bank.isfc,
            ac_no: bank.no
        },
        from: {
            adress: userData.adress,
            gmail: userData.email,
            gstin: userData.gstin,
            name: userData.name,
            phone: userData.phone,
            state: userData.state
        },
        id: '',
        note_No: '',
        place_Of_Supply: '',
        products: [],
        to: {
            adress: '',
            gmail: '',
            gstin: '',
            name: '',
            phone: '',
            state: ''
        },
        total: 0,
        token: auth.token,
        so_id: '',
        vehical_No: ''
    });

    useEffect(() => {
        if (!invoice.isLoaded) setInvoiceAction();
    }, [invoice]);

    const validateQtyChange = (index: number, qty: number): boolean => {
        if (isNaN(qty)) return true
        return qty > 0 && qty <= minStockArray[index].min;
    };

    const handleQtyChange = (value: number, index: number): void => {
        const updatedData = { ...data };
        updatedData.products[index].qty = isNaN(value) ? 0 : value;
        updatedData.products[index].total = updatedData.products[index].qty * updatedData.products[index].rate;
        setData((prev) => { return { ...prev, products: updatedData.products, total: calculateGrandTotal(updatedData) } });

    };

    const calculateGrandTotal = (data: ICreateCreditNote): number => {
        return data.products.reduce((total, product) => total + product.total, 0);
    };

    const validateAndPush = (obj: ICreateCreditNote) => {
        try {
            if (!obj.against_Invoice_Id) throw new Error("Please Select Invoice");
            if (!obj.note_No) throw new Error("Please Insert Debit Note Number");
            if (obj.products.length === 0) throw new Error("Please Add at least 1 product");

            createCreditNoteAction(obj, close);
            // close();
        } catch (err: any) {
            toast.error(err.message);
        }
    };

    const handleInvoiceSelect = (invoiceId: string, invoiceNo: string, soId: string, billedTo: any) => {
        setData(prev => ({
            ...prev,
            against_Invoice_Id: invoiceId,
            against_Invoice_No: invoiceNo,
            so_id: soId || '',
            to: {
                name: billedTo.name,
                adress: billedTo.adress,
                gmail: '',
                gstin: billedTo.gstin,
                state: billedTo.state,
                phone: ''
            }
        }));
    };

    const handleProductSelect = (product: any) => {
        setData(prev => ({
            ...prev,
            products: [...prev.products, { ...product, qty: 0, total: 0, taxable_Value: 0 }]
        }));
        setMinStockArray(prev => [...prev, { min: product.qty }]);
        setIsAddProductDialogOpen(false);
    };


    return (
        <Dialog open={open} fullScreen className="p-5">
            <div className="w-full h-full">
                <div className="h-[10%] flex p-5 border-b-2 place-content-between">
                    <div className="text-xl">Create Credit Note</div>
                    <div className="text-xl cursor-pointer" onClick={close}>X</div>
                </div>

                <div className="grid grid-cols-2 gap-3 p-5">
                    <div className="grid gap-4">
                        <label>Against Invoice:</label>
                        <Select
                            value={data.against_Invoice_Id}
                            onChange={(e) => handleInvoiceSelect(e.target.value, invoice.invoices.find(inv => inv._id === e.target.value)?.invoice_No || '', invoice.invoices.find(inv => inv._id === e.target.value)?.SO_Id || '', invoice.invoices.find(inv => inv._id === e.target.value)?.billed_To)}
                        >
                            {invoice.invoices.map(value => (
                                <MenuItem key={value._id} value={value._id}>
                                    {value.invoice_No}
                                </MenuItem>
                            ))}
                        </Select>
                    </div>

                    <div className="grid gap-4">
                        <label>Credit Note No:</label>
                        <Input value={data.note_No} onChange={(e) => setData(prev => ({ ...prev, note_No: e.target.value }))} />
                    </div>

                    <div className="grid gap-4">
                        <label>Vehical No:</label>
                        <Input value={data.vehical_No} onChange={(e) => setData(prev => ({ ...prev, vehical_No: e.target.value }))} />
                    </div>
                </div>

                <ProductSelectionDialog
                    open={isAddProductDialogOpen}
                    onClose={() => setIsAddProductDialogOpen(false)}
                    products={invoice.invoices.find(value => value._id === data.against_Invoice_Id)?.products || []}
                    onSelect={handleProductSelect}
                />

                <ProductTable
                    products={data.products}
                    onQtyChange={handleQtyChange}
                    onRemove={(index: any) => setData(prev => ({ ...prev, products: removeIndex(prev.products, index) }))}
                    validateQtyChange={validateQtyChange}
                    setIsAddProductDialogOpen={setIsAddProductDialogOpen}
                />

                <div className="flex gap-5 p-5">
                    <SolidButton color="black" innerText="View" onClick={() => console.log(data)} />
                    <SolidButton color="black" innerText="Create" onClick={() => validateAndPush(data)} />
                </div>
            </div>
        </Dialog>
    );
};

const ProductSelectionDialog = ({ open, onClose, products, onSelect }: any) => (
    <Dialog open={open} fullWidth>
        <div className="p-5">
            <div className="flex place-content-between">
                <div>Select Product To Add</div>
                <div className="cursor-pointer" onClick={onClose}>X</div>
            </div>
            <div className="h-[70%] overflow-y-auto">
                <div className="flex gap-5 border-b-2">
                    <div>#</div>
                    <div>Name</div>
                </div>
                {products.map((product: any, index: number) => (
                    <div
                        key={product.name + index}
                        className="flex gap-5 p-2 cursor-pointer hover:bg-black/20 border-b-2"
                        onClick={() => onSelect(product)}
                    >
                        <div>{index + 1}</div>
                        <div>{product.name}</div>
                    </div>
                ))}
            </div>
        </div>
    </Dialog>
);

const ProductTable = ({ products, onQtyChange, onRemove, validateQtyChange, setIsAddProductDialogOpen }: any) => (
    <div className="h-[40%] border-2 w-full">
        <div className="h-full w-full relative">
            <div className="border-t w-full h-[90%] overflow-auto text-xs relative">
                <table className="min-w-full text-left">
                    <thead className="border-b text-table border-neutral-500 uppercase sticky top-0">
                        <tr className="border-b border-neutral-500">
                            <th scope="col" className="px-1 py-2 sticky text-grayFont"></th>
                            <th scope="col" className="px-1 py-2 sticky text-grayFont">#</th>
                            <th scope="col" className="px-1 py-2 sticky text-grayFont">Description</th>
                            <th scope="col" className="px-1 py-2 sticky text-grayFont">Qty</th>
                            <th scope="col" className="px-1 py-2 sticky text-grayFont">Unit</th>
                            <th scope="col" className="px-1 py-2 sticky text-grayFont">Rate</th>
                            <th scope="col" className="px-1 py-2 sticky text-grayFont">Amount</th>
                            <th scope="col" className="px-1 py-2 sticky text-grayFont">Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product: any, i: number) => (
                            <tr className="border-b border-gray-400 font-source2 p-3" key={`product-${i}`}>
                                <th className="sticky text-gray-700 p-3 pl-1 text-start cursor-pointer" onClick={() => onRemove(i)}>X</th>
                                <th className="sticky text-gray-700 p-3 pl-0 text-start">{i + 1}</th>
                                <th className="sticky text-gray-700 p-3 pl-0 text-start">{product.name}</th>
                                <th className="sticky text-gray-700 p-3 pl-0 text-start">
                                    <TableInputs
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                            const value = parseFloat(e.target.value);
                                            if (validateQtyChange(i, value)) {
                                                onQtyChange(value, i);
                                            } else {
                                                toast.error("Cannot add quantity more than invoice");
                                            }
                                        }}
                                        type="text"
                                        value={product.qty}
                                    />
                                </th>
                                <th className="sticky text-gray-700 p-3 pl-0 text-start">{product.unit}</th>
                                <th className="sticky text-gray-700 p-3 pl-0 text-start">{limitDecimalDigits(product.rate)}</th>
                                <th className="sticky text-gray-700 p-3 pl-0 text-start">{limitDecimalDigits(product.total)}</th>
                                <th className="sticky text-gray-700 p-3 pl-0 text-start">{limitDecimalDigits(product.total)}</th>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="w-full h-[10%] flex items-center justify-center rounded-lg cursor-pointer bg-blue-300 border-2 border-blue-600" onClick={() => setIsAddProductDialogOpen(true)}>
                Add +
            </div>
        </div>
    </div>
);

export default CreateCreditNoteDialog;
