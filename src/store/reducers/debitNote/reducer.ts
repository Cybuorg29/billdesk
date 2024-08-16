import { PayloadAction } from "@reduxjs/toolkit"
import { IDebitNote } from "../../features/debitNote/model"
import { actionPayload } from "../../payload/payloadModel"
import { toast } from "react-toastify";
import { IinitiliseDebitNote } from "../../features/debitNote/slice";
import removeIndex from "../../../utils/removeIndex";



export type debitNotePayloadType = {} & (
    {
        type: 'set',
        data: IDebitNote[]
    } |
    {
        type: 'deleteById',
        data: string
    } |
    {
        type: 'deleteByIndex',
        data: number
    }
    |
    {
        type: 'push',
        data: IDebitNote
    }
)

export const debitNoteReducer = (state: IinitiliseDebitNote, action: PayloadAction<actionPayload>) => {
    try {
        const data = action.payload.data;
        const type = action.payload.type;
        switch (type) {
            case 'set':
                state.notes = data
                state.notes = state.notes.reverse();
                state.isLoaded = true;
                break;
            case 'deleteById':
                state.notes = state.notes.filter((value) => value._id !== data);
                break;
            case 'deleteByIndex':
                state.notes = removeIndex(state.notes, data);
                break;
            case 'push':
                state.notes = [data, ...state.notes];
                break;
            default:
                throw Error("Unknown option")
                break;
        }



    } catch (err: any) {
        console.log(err.message);
        toast.error(err.message);
    }

}