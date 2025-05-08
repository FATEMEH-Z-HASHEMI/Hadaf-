import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const options = [
    'order by ascending',
    'order by descending'
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

export default function Order() {
  const [value, setValue] = React.useState<string | null>(options[0]);
  const [inputValue, setInputValue] = React.useState('');

  return (
    <ThemeProvider theme = {theme}>
      <Autocomplete
        value={value}
        onChange={(event, newValue) => setValue(newValue)}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => setInputValue(newInputValue)}
        options={options}
        sx={{
          width: 280,
          '& .MuiInputBase-root': {
            color: 'gray',
            padding: '9px'
          },
        }}
        renderInput={(params) => <TextField {...params} />}
      />
    </ThemeProvider >
  );
}
