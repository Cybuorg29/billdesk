// src/App.tsx
import React, { useState } from 'react';
import UnitInput from '../components/Selects/UnitSelect';


interface props{
     unit:{value:string,Set:Function}
}
function UnitSelect({unit}:props) {

  const measuringTypes = ['Nos', 'kg', 'gram', 'meters', 'liters', 'pieces'];

  const handleMeasuringTypeChange = (type: string) => {
    unit.Set(type);
  };

  return (
    <div className="">
      <h1>Measuring Unit</h1>
      <UnitInput
        measuringTypes={measuringTypes}
        selectedType={unit.value}
        onSelectType={handleMeasuringTypeChange}
      />
    </div>
  );
}

export default UnitSelect;
