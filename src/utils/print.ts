import jsPDF from 'jspdf';
import { change } from '../store/features/loader/loaderSlice';
import { store } from './../store/app/store';
import { Margin, usePDF } from 'react-to-pdf'
import * as htmlToImage from 'html-to-image'
import { toast } from 'react-toastify';

async function convertToImage(element: any, pdf: any): Promise<any[3]> {
    let pdfHeight = 0
    let pdfWidth = 0
    let dataUri = ''
    await htmlToImage.toPng(element, { quality: 1, backgroundColor: '#ffffff' })
        .then(async function (dataUrl: any) {
            var link = document.createElement('a');
            link.download = 'my-image-name.png';
            const imgProps = pdf.getImageProperties(dataUrl);
            pdfWidth = pdf.internal.pageSize.getWidth();
            pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
            console.log(dataUrl)
            dataUri = dataUrl
        }
        )
    return [dataUri, pdfWidth, pdfHeight]
}








export async function print(targetRef: any, toPDF: any) {
    store.dispatch(change());
    // const { toPDF } = usePDF()
    try {
        console.log(targetRef.current)
        const pdf = new jsPDF('portrait', 'pt', 'a4', true);


        const [data1, data1Width, data1Height]: any = await convertToImage(targetRef.current, pdf);
        // const elem: any = document.getElementById("toPrint")
        // pdf.addImage(data1, 'PNG', 0, 0, data1Width, data1Height, 'NONE');
        // pdf.addImage(elem);
        pdf.addImage(data1, 'PNG', 0, 0, data1Width, data1Height);
        const str = pdf.output('blob');
        window.open(URL.createObjectURL(str));
        // toPDF({
        //     overrides: {
        //         pdf: {
        //             putOnlyUsedFonts: true,
        //             compress: true
        //         },

        //         canvas: {
        //             useCORS: true
        //         }
        //     },
        //     page: {
        //         // margin is in MM, default is Margin.NONE = 0
        //         margin: Margin.SMALL,
        //         // default is 'A4'
        //         // format: '',
        //         // default is 'portrait'
        //         // orientation: 'landscape',
        //     },
        // })


    } catch (err: any) {
        console.log(err);
        toast.error('an error occured');
    }
    store.dispatch(change());
}
