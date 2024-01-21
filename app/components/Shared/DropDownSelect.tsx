import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useState } from "react";

interface DropDownSelectProps {
  list: string[];
  selectedValue?: string
  onSelect: (selectedIndx: number) => void;
}
function DropDownSelect({ list, onSelect, selectedValue }: DropDownSelectProps) {
  let idx = list.indexOf(selectedValue!) || -1
  console.log(idx)
  const [selected, setSelected] = useState(selectedValue ? list[idx] : "0");

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
