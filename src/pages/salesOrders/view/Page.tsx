import React, { useEffect, useState } from 'react'
import Document from './layouts/Document'
import { useAppDispatch, useAppSelector } from '../../../store/app/hooks';
import { useParams } from 'react-router-dom';
import { ISalesOrder } from '../Model/model';
import { SolidButton } from '../../../components/ui/Buttons/solid/SolidButton';
import { change } from '../../../store/features/loader/loaderSlice';
import jsPDF from 'jspdf'
import * as htmlToImage from 'html-to-image';
import { usePDF } from 'react-to-pdf';
import { toast } from 'react-toastify';
type Props = {}

const Page = (props: Props) => {
    const { Sales_Orders } = useAppSelector(state => state.salesOrders);
    const { _id } = useParams();
    const [doc, setDoc] = useState<"Original" | "Dublicate">('Original');
    const dispatch = useAppDispatch();
    const { targetRef, toPDF } = usePDF();
    const [data, setData] = useState<ISalesOrder>()


    useEffect(() => {

        Sales_Orders.map((value: ISalesOrder) => {
            if (value._id === _id) setData(value);
        })

    }, [Sales_Orders, _id])

    async function printOne() {
        dispatch(change());
        try {
            console.log(targetRef.current)
            targetRef.current = document.getElementById("print")
            await htmlToImage.toPng(targetRef.current, { quality: 0.50 })
                .then(function (dataUrl) {
                    console.error('in error')
                    var link = document.createElement('a');
                    link.download = 'my-image-name.jpeg';
                    const pdf = new jsPDF();
                    const imgProps = pdf.getImageProperties(dataUrl);
                    const pdfWidth = pdf.internal.pageSize.getWidth();
                    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
                    pdf.addImage(dataUrl, 'PNG', 0, 0, pdfWidth, pdfHeight);
                    pdf.save(`S.O-${data?.invoice_No}.pdf`);
                });
            // dispatch(change());
        } catch (err: any) {
            console.log(err);
            toast.error('an error occured');
        }
        dispatch(change());
    }

    return (
        <div className='h-full w-full flex gap-3 '>
            {/* <div className='w-[80%] h-full overflow-auto'> */}

            <div className='w-[80%]  bg-component h-full overflow-auto'>
                <Document data={data} printRef={targetRef} />
            </div>

            <div className='w-[20%] h-full bg-component'>
                <div className='h-[90%]'></div>
                <div className='h-[10%] flex place-content-center border-t-2 border-black'>
                    <SolidButton color='black' innerText='Download' onClick={() => { printOne() }} key={'Download Button'} />
                </div>
            </div>

        </div>
    )
}

export default Page