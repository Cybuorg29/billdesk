import { PayloadAction } from "@reduxjs/toolkit"
import removeIndex from "../../../utils/removeIndex"
import { ICreditNote } from "../../features/creditNote/model"
import { actionPayload } from "../../payload/payloadModel"
import { InitialCreditNoteStates } from "../../features/creditNote/slice"
import { toast } from "react-toastify"

export type creditNotePayloadType = {} & (
    {
        type: 'set',
        data: ICreditNote[]
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
        data: ICreditNote
    }
)

export const creditNoteReducer = (state: InitialCreditNoteStates, action: PayloadAction<actionPayload>) => {
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
        }
    } catch (err: any) {
        console.log(err.message);
        toast.error(err.message);
    }

}