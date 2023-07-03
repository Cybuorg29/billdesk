import { Button } from '@mui/material'
import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getExpences } from '../../../store/actions/data/DataActions'
import { useAppSelector } from '../../../store/app/hooks'
import { incomeAndExpencesObjectSchema } from '../../../store/features/IncomeAndExpences/IncomeAndExpences'
import ExpenceTable from './components/ExpenceTable'
import TopTab from './components/TopTab'


type Props = {}

const ViewExpences = (props: Props) => {
  const { expences } = useAppSelector(state => state.incomeAndExpence)
  const { sort } = useParams()
  useEffect(() => {
    getExpences()
  }, [])
  useEffect(() => {

  }, [sort])


  return (
    <div   >
      <TopTab />
      <ExpenceTable />
    </div>

    //  </div>    
  )
}

export default ViewExpences