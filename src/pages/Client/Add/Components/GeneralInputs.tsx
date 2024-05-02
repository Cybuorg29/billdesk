import { MenuItem, Select } from "@mui/material"
import Inputs from "../../../inventory/create/components/Inputs"
import { clientModelObj } from "../../../../models/Client/ClientModel"
import React from "react"



type props = {
  client: any,
  handleClientInput: any,
  keys: any
  type: 0 | 1
}


const GeneralInputs = ({ client, handleClientInput, keys, type }: props) => {
  return <>
    <div className='grid lg:grid-cols-3 md:grid-cols-2 gap-3    ' >
      {
        keys.map((index: any) => {
          if (index === 'activities') {
            return <div className='grid'>
              <div>Business Activities</div>
              <Select name="activities" value={client.activities} onChange={(e: any) => { handleClientInput(e) }} >
                <MenuItem value={'Manufacturing'} >Manufacturing</MenuItem>
                <MenuItem value={'Distribution'} >Distribution</MenuItem>
              </Select>
            </div>
          } else if (index === 'type' || index === 'image') {

          } else if (index === 'type') {

          } else {
            return <>
              <Inputs name={index} onchange={(e: React.ChangeEvent<HTMLInputElement>) => { handleClientInput(e) }} type={typeof client[index]} value={client[index]} key={index} />

            </>

          }
        }
        )
      }


    </div>
  </>
}


export default React.memo(GeneralInputs)