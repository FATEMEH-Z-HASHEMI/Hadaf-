import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { createTheme, ThemeProvider } from '@mui/material/styles';

export type SortOption = 'ascending' | 'descending';

interface OrderProps {
  onSortChange: (sortOption: SortOption) => void;
}

const options = [
  { label: 'order by ascending', value: 'ascending' },
  { label: 'order by descending', value: 'descending' }
];

const theme = createTheme({
  components: {
    MuiAutocomplete: {
      styleOverrides: {
        option: {
          color: 'gray',
        },
      },
    },
  },
});

export default function Order({ onSortChange }: OrderProps) {
  const [value, setValue] = React.useState<{label: string, value: SortOption} | null>(options[0]);
  const [inputValue, setInputValue] = React.useState('');

  const handleChange = (event: any, newValue: {label: string, value: SortOption} | null) => {
    setValue(newValue);
    if (newValue) {
      onSortChange(newValue.value);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Autocomplete
        value={value}
        onChange={handleChange}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => setInputValue(newInputValue)}
        options={options}
        getOptionLabel={(option) => option.label}
        sx={{
          width: 280,
          '& .MuiInputBase-root': {
            color: 'gray',
            padding: '9px'
          },
        }}
        renderInput={(params) => <TextField {...params} />}
      />
    </ThemeProvider>
  );
}