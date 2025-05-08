import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';

interface LongMenuProps {
    domainId: string;
    onDelete: (id: string) => void;
}

const options = [
    {
        label: "View pages",
        disabled: true
    },
    {
        label: "Verify",
        color: "black"
    },
    {
        label: "Install script",
        disabled: true
    },
    { 
        label: "Delete",
        color: "#c20404"
    }
];

const ITEM_HEIGHT = 48;

export default function LongMenu({ domainId, onDelete }: LongMenuProps) {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleDelete = () => {
        onDelete(domainId);
        handleClose();
    };

    return (
        <div>
            <IconButton
                aria-label="more"
                id="long-button"
                aria-controls={open ? 'long-menu' : undefined}
                aria-expanded={open ? 'true' : undefined}
                aria-haspopup="true"
                onClick={handleClick}
            >
                <MoreVertIcon />
            </IconButton>
            
            <Menu
                id="long-menu"
                MenuListProps={{
                    'aria-labelledby': 'long-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                slotProps={{
                    paper: {
                        style: {
                            maxHeight: ITEM_HEIGHT * 4.5,
                            width: '20ch',
                        },
                    },
                }}
            >
                {options.map((option) => (
                    <MenuItem 
                        key={option.label}
                        disabled={option.disabled}
                        onClick={option.label === "Delete" ? handleDelete : handleClose}
                        sx={{
                            color: option.color || 'inherit',
                            '&.Mui-disabled': {
                                color: 'text.disabled',
                                opacity: 0.7
                            }
                        }}
                    >
                        {option.label}
                    </MenuItem>
                ))}
            </Menu>
        </div>
    );
}