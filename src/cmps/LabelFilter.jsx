import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import { useSelector } from 'react-redux';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export function LabelFilter({handleChange}) {
    const labelsOptions = useSelector(storeState => storeState.toyModule.labels)
  const theme = useTheme();
  const [valueToShow, setvalueToShow] = React.useState([]);


function onFilterChanged (ev){
    setvalueToShow(ev.target.value)
const target = {name: ev.target.name, value: ev.target.value }
handleChange({target})
}

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300}} className='labels'>
        <InputLabel id="demo-multiple-chip-label">Choose Labels</InputLabel>
        <Select
        name="labels"
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={valueToShow}
          onChange={onFilterChanged}
          input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {labelsOptions.map((label) => (
            <MenuItem
              key={label}
              value={label}
              style={getStyles(label, label, theme)}
            >
              {label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}