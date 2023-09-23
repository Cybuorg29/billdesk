// src/components/MeasuringTypeSelect.tsx
import React from 'react';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

interface MeasuringTypeSelectProps {
  measuringTypes: string[];
  selectedType: string;
  onSelectType: (type: string) => void;
}

const UnitInput: React.FC<MeasuringTypeSelectProps> = ({
  measuringTypes,
  selectedType,
  onSelectType,
}) => {
  return (
    <FormControl className='w-full'>
      <Select 
        value={selectedType}
        onChange={(event) => onSelectType(event.target.value as string)}
      >
        {measuringTypes.map((type) => (
          <MenuItem key={type} value={type}>
            {type}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default UnitInput;
