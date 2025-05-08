import { useState } from 'react';
import { Drawer } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { addDomain } from '../apiService/apiService';
import { useDomainsData } from '../hook/useData';

interface DrawerMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onAddDomain: (domain: string) => Promise<boolean>;
}

export const DrawerMenu = ({ isOpen, onClose }: DrawerMenuProps) => {
  const theme = useTheme();
  const [domain, setDomain] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { fetchData } = useDomainsData();

  const handleClose = () => {
    setDomain('');
    setError('');
    onClose();
  };

  const handleAddDomain = async () => {
    if (!domain.trim()) {
      setError('Domain is required');
      return;
    }

    if (!domain.match(/^https?:\/\//)) {
      setError('Domain must start with http:// or https://');
      return;
    }

    setIsSubmitting(true);
    try {
      const newDomain = {
        domain: domain.trim(),
        status: "pending",
        isActive: false
      };

      await addDomain(newDomain);
      
      await fetchData();
      
      handleClose();
    } catch (err) {
      setError(err.message || 'Failed to add domain');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDomain(e.target.value);
    if (error) setError('');
  };

  return (
    <Drawer
      anchor="right"
      open={isOpen}
      onClose={handleClose}
      sx={{
        '& .MuiDrawer-paper': {
          [theme.breakpoints.up('xs')]: { width: 300 },
          [theme.breakpoints.up('sm')]: { width: 500 },
          [theme.breakpoints.up('md')]: { width: 700 },
          padding: '20px',
          backgroundColor: '#f8fafc',
        },
      }}
    >
      <div className='flex flex-col items-start justify-between h-full py-1'>
        <div className='w-full'>
          <h3 className="text-xl font-semibold mb-4">
            Add domain
          </h3>
          <input 
            type="text" 
            className={`border rounded-md bg-none pl-2 shadow-sm w-full h-[7vh] placeholder:text-md ${
              error ? 'border-notActiveColor' : 'border-gray-300'
            }`}
            placeholder='Ex: https://www.bridgedmedia'
            value={domain}
            onChange={handleChange}
            disabled={isSubmitting}
          />
          {error && (
            <p className="text-red-500 text-sm mt-2">
                {error}
            </p>
          )}
        </div>

        <div className='flex flex-row items-center justify-center ml-auto gap-4'>
          <button 
            onClick={handleClose}
            disabled={isSubmitting}
            className='py-2 w-24 text-center bg-white text-gray-500 border border-gray-300 shadow-md rounded-sm hover:border-gray-400 hover:text-black hover:shadow-lg transition-all duration-300 hover:rounded-md disabled:opacity-50'
          >
            <p className='text-sm'>
                Cancel
            </p>
          </button>
          <button 
            onClick={handleAddDomain}
            disabled={!domain.trim() || !domain.match(/^https?:\/\//) || isSubmitting}
            className={`py-2 w-24 text-center shadow-md rounded-sm hover:shadow-lg transition-all duration-300 hover:rounded-md ${
              !domain.trim() || !domain.match(/^https?:\/\//) || isSubmitting
                ? 'bg-gray-300 cursor-not-allowed'
                : 'bg-[#319AF6] hover:bg-[#258eea] hover:text-bgColor'
            }`}
          >
            <p className='text-sm'>
              {isSubmitting ? 'Adding...' : 'Add'}
            </p>
          </button>
        </div>
      </div>
    </Drawer>
  );
};