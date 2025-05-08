import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import { Search } from 'lucide-react';

interface SearchBarProps {
  onSearch: (searchTerm: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(event.target.value);
  };

  return (
    <Box component="form" noValidate autoComplete="off">
      <TextField
        id="search-input"
        placeholder="Search"
        variant="outlined"
        sx={{ width: 280 }}
        onChange={handleChange}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search />
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
}