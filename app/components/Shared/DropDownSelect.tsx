import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useState, useEffect } from "react";

interface DropDownSelectProps {
  list: string[];
  onSelect: (selectedIndx: number) => void;
  selectedValue?: number; // New prop for the selected value
}

function DropDownSelect({ list, onSelect, selectedValue }: DropDownSelectProps) {
  const [selected, setSelected] = useState(selectedValue !== undefined ? String(selectedValue) : "0");

  useEffect(() => {
    // Update selected value when the prop changes
    if (selectedValue !== undefined) {
      setSelected(String(selectedValue));
    }
  }, [selectedValue]);

  const handleChange = (event: SelectChangeEvent) => {
    setSelected(event.target.value);
    onSelect(parseInt(event.target.value));
  };

  return (
    <div>
      <FormControl fullWidth variant="standard">
        <Select disableUnderline value={selected} onChange={handleChange}>
          {list.map((value, indx) => (
            <MenuItem key={indx} value={indx}>
              {value}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}

export default DropDownSelect;
