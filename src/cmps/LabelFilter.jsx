import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { setFilter } from '../store/actions/toy.actions';
import { useSelector } from 'react-redux';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export function LabelFilter() {
    const labels = useSelector(storeState => storeState.toyModule.labels)
    let filterBy = useSelector(storeState => storeState.toyModule.filterBy)
    const [selectedLabels, setSelectedLabels] = React.useState([]);

    React.useEffect(() => {
        let newFilter = { ...filterBy, toyLabels: selectedLabels }
        setFilter(newFilter)
    }, [selectedLabels])

    const handleLabelSelection = (event, newValue) => {
        setSelectedLabels(newValue);
    };

    return (
        <Autocomplete
            multiple
            id="checkboxes-tags-demo"
            options={labels}
            disableCloseOnSelect
            getOptionLabel={(option) => option}
            value={selectedLabels}
            onChange={handleLabelSelection}
            renderOption={(props, option, { selected }) => (
                <li {...props}>
                    <Checkbox
                        icon={icon}
                        checkedIcon={checkedIcon}
                        style={{ marginRight: 8 }}
                        checked={selected}
                    />
                    {option}
                </li>
            )}
            style={{ width: 300 }}
            className='filter'
            renderInput={(params) => (
                <TextField {...params} label="Filter By Labels" />
            )}
        />
    );
}


