import React, { useState } from 'react'
import Document from './layouts/Document'
import { useParams } from 'react-router-dom'
import { SolidButton } from '../../../components/ui/Buttons/solid/SolidButton'
import { usePDF } from 'react-to-pdf'
import { toast } from 'react-toastify'
import { useAppDispatch } from '../../../store/app/hooks'
import { change } from '../../../store/features/loader/loaderSlice'
import jsPDF from 'jspdf'
import * as htmlToImage from 'html-to-image';


type Props = {}

const ViewPurchaseOrder = (props: Props) => {
    const { _id } = useParams();
    const [doc, setDoc] = useState<"Original" | "Dublicate">('Original');
    const dispatch = useAppDispatch();
    const { targetRef, toPDF } = usePDF();




    async function printOne() {
        dispatch(change());
        try {
            console.log(targetRef.current)
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
                    pdf.save(`${"Po"}.pdf`);
                });

            // dispatch(change());
        } catch (err: any) {
            console.log(err);
            toast.error('an error occured');
        }
        dispatch(change());
    }
    return (
        <div className='w-full h-full flex gap-2 '>

            <div className='w-[80%]  bg-component h-full overflow-auto'>
                <Document _id={_id} doc={doc} targetref={targetRef} />
            </div>
            <div className='w-[18%] bg-component h-full'>
                <div className='h-[80%] border-2 '>
                    <div className='text-center text-sm  border-b-2 '>Templates</div>
                </div>
                <div className='grid  place-content-center h-[20%]'>
                    <SolidButton color='black' innerText='Download Original' onClick={() => { setDoc('Original'); printOne() }} />
                    <SolidButton color='black' innerText='Download Dublicate' onClick={() => { setDoc('Dublicate'); printOne() }} />
                </div>

            </div>


        </div>
    )
}

export default ViewPurchaseOrder