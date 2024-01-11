import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useState } from "react";

interface DropDownSelectProps {
  list: string[];
  onSelect: (selectedIndx: number) => void;
}
function DropDownSelect({ list, onSelect }: DropDownSelectProps) {
  const [selected, setSelected] = useState("0");

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
