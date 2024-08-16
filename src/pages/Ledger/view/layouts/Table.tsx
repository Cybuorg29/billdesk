import React, { useEffect, useState } from 'react'
import { useAppSelector } from '../../../../store/app/hooks'
import { incomeAndExpencesObjectSchema } from '../../../../store/features/IncomeAndExpences/IncomeAndExpences'
import { sortByDate, sortIsoDates } from '../../../../utils/SortDates'
import { IIncome } from '../../../../models/incomeAndExp/incomeInterface'
import { userDetailSchema } from '../../../../models/userModel'
import { toast } from 'react-toastify'
import { Iinvoice } from '../../../../models/invoice/invoice.model'
import { limitDecimalDigits } from '../../../../utils/limitDecimalDigits'
import { converToInrFormat } from '../../../../utils/ConvertInrFormat'
import convertIsoDate from '../../../../utils/convertIsoDates'
import { getConnection } from '../../../../store/actions/connections/set'
import { setInvoiceAction } from '../../../../store/actions/invoice/set'
import { getAccountDataByDates } from '../../../accounts/view/functions/getDataByDates'
import { IbillsPaylable } from '../../../../store/features/bills/receivable/model'
import { IExpence } from '../../../../models/incomeAndExp/expenceInterface'
import DownloadLedger from '../../download/Page'

type Props = {
    account: string | undefined
    dates: {
        upper: string,
        lower: string
    }
    setDates: any
    targetref: any
    accountArray: iAccounts[]
}

interface iAccounts {
    particular: string,
    cr: number,
    dr: number,
    balance: number
    date: any
}

const Table = ({ account, dates, setDates, targetref, accountArray }: Props) => {
    const { incomeAndExpence, connections, invoice } = useAppSelector(state => state);
    const [Balance, setBalance] = useState<
        {
            cr: number
            dr: number
        }>({
            cr: 0,
            dr: 0
        })


    useEffect(() => {
        setBalance(setbalance());
    }, [accountArray])



    function setbalance(): {
        cr: number,
        dr: number
    } {

        let cr = 0;
        let dr = 0;

        accountArray.map((value) => {
            cr = cr + value.cr;
            dr = dr + value.dr;
        })

        return {
            cr: cr,
            dr: dr
        }

    }

    useEffect(() => {

    }, [incomeAndExpence, account])
    return (
        <div style={{ width: '100%', minHeight: '100%' }}>
            <div style={{ borderTop: '1px solid', height: '95%', overflow: 'hidden', width: '100%' }}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <div>
                        <div style={{ display: 'inline-block', minWidth: '100%' }}>
                            <div style={{ overflow: 'hidden' }}>
                                <table style={{ minWidth: '100%', textAlign: 'left', fontSize: '0.875rem' }}>
                                    <thead style={{ borderBottom: '1px solid', borderColor: '#737373', textTransform: 'uppercase', position: 'sticky', top: 0 }}>
                                        <tr style={{ borderBottom: '2px solid black' }}>
                                            <th scope="col" style={{ padding: '0.25rem', position: 'sticky' }}>#</th>
                                            <th scope="col" style={{ padding: '0.25rem', position: 'sticky' }}>Date</th>
                                            <th scope="col" style={{ padding: '0.25rem', position: 'sticky' }}>Particular</th>
                                            <th scope="col" style={{ padding: '0.25rem', position: 'sticky' }}>Dr.</th>
                                            <th scope="col" style={{ padding: '0.25rem', position: 'sticky' }}>Cr.</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {accountArray.map((value, index) => {
                                            return (
                                                <tr key={index}>
                                                    <th scope="col" style={{ whiteSpace: 'nowrap', padding: '0.5rem', border: '1px solid black', position: 'sticky' }}>{++index}</th>
                                                    <th scope="col" style={{ whiteSpace: 'nowrap', padding: '0.5rem', border: '1px solid black', position: 'sticky' }}>{convertIsoDate(value.date).split('at')[0]}</th>
                                                    <th scope="col" style={{ whiteSpace: 'nowrap', padding: '0.5rem', border: '1px solid black', position: 'sticky' }}>{value.particular}</th>
                                                    <th scope="col" style={{ whiteSpace: 'nowrap', padding: '0.5rem', border: '1px solid black', position: 'sticky' }}>{(value.dr) ? converToInrFormat(limitDecimalDigits(value.dr)) : '-'}</th>
                                                    <th scope="col" style={{ whiteSpace: 'nowrap', padding: '0.5rem', border: '1px solid black', position: 'sticky' }}>{(value.cr) ? converToInrFormat(limitDecimalDigits(value.cr)) : '-'}</th>
                                                </tr>
                                            )
                                        })}

                                        <tr style={{ borderTop: '2px solid black', marginTop: '0.5rem' }}>
                                            <th scope="col" style={{ whiteSpace: 'nowrap', padding: '1.5rem', position: 'sticky' }}></th>
                                            <th scope="col" style={{ whiteSpace: 'nowrap', padding: '1.5rem', position: 'sticky' }}></th>
                                            <th scope="col" style={{ whiteSpace: 'nowrap', padding: '1.5rem', position: 'sticky' }}>Closing Balance</th>
                                            <th scope="col" style={{ whiteSpace: 'nowrap', padding: '1.5rem', position: 'sticky' }}>{converToInrFormat(limitDecimalDigits(Balance.dr))}</th>
                                            <th scope="col" style={{ whiteSpace: 'nowrap', padding: '1.5rem', position: 'sticky' }}>{converToInrFormat(limitDecimalDigits(Balance.cr))}</th>
                                        </tr>
                                        <tr>
                                            <th scope="col" style={{ whiteSpace: 'nowrap', padding: '1.5rem', position: 'sticky' }}></th>
                                            <th scope="col" style={{ whiteSpace: 'nowrap', padding: '1.5rem', position: 'sticky' }}></th>
                                            <th scope="col" style={{ whiteSpace: 'nowrap', padding: '1.5rem', position: 'sticky' }}></th>
                                            <th scope="col" style={{ whiteSpace: 'nowrap', padding: '1.5rem', position: 'sticky' }}>{(Balance.dr < Balance.cr) ? converToInrFormat(limitDecimalDigits(Balance.cr - Balance.dr)) : null}</th>
                                            <th scope="col" style={{ whiteSpace: 'nowrap', padding: '1.5rem', position: 'sticky' }}>{(Balance.dr > Balance.cr) ? converToInrFormat(limitDecimalDigits(Balance.dr - Balance.cr)) : null}</th>
                                        </tr>
                                        <tr style={{ borderTop: '2px solid black', marginTop: '0.5rem', borderBottom: '2px solid black' }}>
                                            <th scope="col" style={{ whiteSpace: 'nowrap', padding: '1.25rem', position: 'sticky' }}></th>
                                            <th scope="col" style={{ whiteSpace: 'nowrap', padding: '1.25rem', position: 'sticky' }}></th>
                                            <th scope="col" style={{ whiteSpace: 'nowrap', padding: '1.25rem', position: 'sticky' }}></th>
                                            <th scope="col" style={{ whiteSpace: 'nowrap', padding: '1.25rem', position: 'sticky' }}>{(Balance.dr > Balance.cr) ? converToInrFormat(limitDecimalDigits(Balance.dr)) : converToInrFormat(limitDecimalDigits(Balance.dr + (Balance.cr - Balance.dr)))}</th>
                                            <th scope="col" style={{ whiteSpace: 'nowrap', padding: '1.25rem', position: 'sticky' }}>{(Balance.dr > Balance.cr) ? converToInrFormat(limitDecimalDigits(Balance.cr + (Balance.dr - Balance.cr))) : converToInrFormat(limitDecimalDigits(Balance.cr))}</th>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Table