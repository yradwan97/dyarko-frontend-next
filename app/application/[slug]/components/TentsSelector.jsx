import React, { useEffect, useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Chip from '@mui/material/Chip';
import { format } from 'date-fns';

const CustomChip = ({ code, onDelete }) => (
  <Chip
    label={`Tent: ${code}`}
    onDelete={onDelete}
    onMouseDown={(e) => {
      e.preventDefault();
      e.stopPropagation();
    }}
    color="primary"
    variant="outlined"
    style={{ margin: '4px' }}
  />
);



const TentsSelector = ({ options, onChange, }) => {
  const [selectedTents, setSelectedTents] = useState([]);

  useEffect(() => {
    onChange(selectedTents)
  }, [selectedTents])

  const handleSelectionChange = (event) => {
    const selectedCode = event.target.value[event.target.value.length - 1];

    setSelectedTents((prevSelected) => {
      if (!prevSelected.includes(selectedCode)) {
        const updatedSelectedItems = [...prevSelected, selectedCode];
        return updatedSelectedItems;
      }
      return prevSelected;
    });
  };


  const handleDelete = (code) => {
    const updatedSelectedItems = selectedTents.filter((item) => item !== code);
    setSelectedTents(updatedSelectedItems);
    onChange(updatedSelectedItems);
  };

  return (
    <FormControl required fullWidth>
      <InputLabel id="dropdown-label">Select Tents</InputLabel>
      <Select
        labelId="dropdown-label"
        id="dropdown"
        multiple
        value={selectedTents}
        onChange={handleSelectionChange}
        renderValue={(selected) => (
          <div>
            {selected.map((code) => (
              <CustomChip key={code} code={code} onDelete={() => handleDelete(code)} />
            ))}
          </div>
        )}
        MenuProps={{
          anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'left',
          },
          transformOrigin: {
            vertical: 'top',
            horizontal: 'left',
          },
        }}
      >
        {options.length > 0 ? options.map((item) => (
          <MenuItem key={item.code} value={item.code}>
            {`Capacity: ${item.capacity} | Available Date: ${format(
              new Date(item?.available_date),
              'dd/MM/yyyy'
            )} | Price: ${item.price} | Code: ${item.code}`}
          </MenuItem>
        ))
          :
          <MenuItem key={"none"} value={null} disabled>
            No available tents in your selected date range.
          </MenuItem>
        }
      </Select>
    </FormControl>
  );
};

export default TentsSelector;
