import React from 'react';
import { Button, TextField, InputAdornment, Menu, MenuItem } from '@mui/material';
import { Add, ViewModule, ViewList, FilterList, Search, Sort } from '@mui/icons-material';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { useNavigate } from 'react-router-dom';

interface OfficeHeaderProps {
  viewMode: 'card' | 'table';
  setViewMode: (mode: 'card' | 'table') => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onFilterChange: (filter: string) => void;
  onSortChange: (sort: string) => void;
}

const OfficeHeader: React.FC<OfficeHeaderProps> = ({
  viewMode,
  setViewMode,
  searchQuery,
  setSearchQuery,
  onFilterChange,
  onSortChange,
}) => {
  const navigate = useNavigate();
  const [preferredView, setPreferredView] = useLocalStorage<'card' | 'table'>('officeViewMode', 'card');
  const [filterAnchor, setFilterAnchor] = React.useState<null | HTMLElement>(null);
  const [sortAnchor, setSortAnchor] = React.useState<null | HTMLElement>(null);

  const handleViewChange = (newMode: 'card' | 'table') => {
    setViewMode(newMode);
    setPreferredView(newMode);
  };

  return (
    <div className="space-y-6 mb-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex-1">
          <h1 className="text-3xl font-bold logo-gradient-text mb-2">Office Management</h1>
          <p className="text-foreground/70">Manage and view all office locations efficiently</p>
        </div>

        <div className="flex items-center gap-3 self-stretch md:self-auto">
          <div className="flex bg-secondary/50 rounded-lg p-1 shadow-sm">
            <Button
              startIcon={<ViewModule />}
              onClick={() => handleViewChange('card')}
              className={`normal-case text-base ${
                viewMode === 'card'
                  ? 'bg-white shadow-sm text-primary'
                  : '[&.MuiButton-root]:text-gray-600 hover:bg-white/50'
              }`}
              size="small"
            >
              Cards
            </Button>
            <Button
              startIcon={<ViewList />}
              onClick={() => handleViewChange('table')}
              className={`normal-case text-base ${
                viewMode === 'table'
                  ? 'bg-white shadow-sm text-primary'
                  : '[&.MuiButton-root]:text-gray-600 hover:bg-white/50'
              }`}
              size="small"
            >
              Table
            </Button>
          </div>

          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => navigate('/offices/new')}
            className="bg-primary hover:bg-primary/90 shadow-md normal-case text-base"
          >
            Add Office
          </Button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <TextField
          placeholder="Search offices..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search className="text-gray-400" />
              </InputAdornment>
            ),
            className: "bg-white shadow-sm rounded-lg",
          }}
          variant="outlined"
          size="small"
        />

        <div className="flex gap-3">
          <Button
            startIcon={<FilterList />}
            onClick={(e) => setFilterAnchor(e.currentTarget)}
            className="normal-case text-base [&.MuiButton-root]:border-primary [&.MuiButton-root]:text-primary hover:bg-primary/5 shadow-sm"
            variant="outlined"
          >
            Filter
          </Button>

          <Button
            startIcon={<Sort />}
            onClick={(e) => setSortAnchor(e.currentTarget)}
            className="normal-case text-base [&.MuiButton-root]:border-primary [&.MuiButton-root]:text-primary hover:bg-primary/5 shadow-sm"
            variant="outlined"
          >
            Sort
          </Button>
        </div>

        <Menu
          anchorEl={filterAnchor}
          open={Boolean(filterAnchor)}
          onClose={() => setFilterAnchor(null)}
        >
          <MenuItem onClick={() => { onFilterChange('all'); setFilterAnchor(null); }}>
            All Offices
          </MenuItem>
          <MenuItem onClick={() => { onFilterChange('active'); setFilterAnchor(null); }}>
            Active Only
          </MenuItem>
          <MenuItem onClick={() => { onFilterChange('inactive'); setFilterAnchor(null); }}>
            Inactive Only
          </MenuItem>
        </Menu>

        <Menu
          anchorEl={sortAnchor}
          open={Boolean(sortAnchor)}
          onClose={() => setSortAnchor(null)}
        >
          <MenuItem onClick={() => { onSortChange('name'); setSortAnchor(null); }}>
            Name (A-Z)
          </MenuItem>
          <MenuItem onClick={() => { onSortChange('date'); setSortAnchor(null); }}>
            Established Date
          </MenuItem>
          <MenuItem onClick={() => { onSortChange('location'); setSortAnchor(null); }}>
            Location
          </MenuItem>
        </Menu>
      </div>
    </div>
  );
};

export default OfficeHeader;