import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Plus } from 'lucide-react';

export default function AddDomain() {
  return (
    <Stack>
      <Button variant="contained" sx={{fontSize : "15px" , textTransform : "none" , padding : "10px 30px"}}>

        <Plus size={22} className='mr-2'/>
        <p>
            Add Domain
        </p>

      </Button>
    </Stack>
  );
}
