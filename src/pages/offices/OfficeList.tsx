// OfficeList.tsx
import React, { useEffect, useState } from 'react';
import { Grid, CircularProgress, Alert, TablePagination, Button } from '@mui/material';
import { getOffices } from '../../services/officeService';
import { Office } from '../../types/Office';
import OfficeHeader from '../../components/offices/OfficeHeader';
import OfficeCard from '../../components/offices/OfficeCard';
import OfficeTable from '../../components/offices/OfficeTable';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { useDebounce } from '../../hooks/useDebounce';
import { SearchOff } from '@mui/icons-material';

const OfficeList: React.FC = () => {
  const [offices, setOffices] = useState<Office[]>([]);
  const [filteredOffices, setFilteredOffices] = useState<Office[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [viewMode, setViewMode] = useLocalStorage<'card' | 'table'>('officeViewMode', 'card');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [sortBy, setSortBy] = useState('name');

  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  useEffect(() => {
    fetchOffices();
  }, [page, rowsPerPage]);

  useEffect(() => {
    filterAndSortOffices();
  }, [offices, debouncedSearchQuery, activeFilter, sortBy]);

  const fetchOffices = async () => {
    try {
      setLoading(true);
      const options = {
        offset: page * rowsPerPage,
        pageSize: rowsPerPage,
      };
      const data = await getOffices(options);
      setOffices(data);
      setTotalCount(data.length); // Replace with actual total count from API
      setError(null);
    } catch (err) {
      setError('Failed to fetch offices. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const filterAndSortOffices = () => {
    let filtered = [...offices];

    // Apply search filter
    if (debouncedSearchQuery) {
      filtered = filtered.filter(office =>
        office.registered_name.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
        office.code.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
        office.address.city.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
        office.address.country.toLowerCase().includes(debouncedSearchQuery.toLowerCase())
      );
    }

    // Apply status filter
    if (activeFilter !== 'all') {
      filtered = filtered.filter(office =>
        office.office_status.toLowerCase() === activeFilter
      );
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.registered_name.localeCompare(b.registered_name);
        case 'date':
          return new Date(b.established_date).getTime() - new Date(a.established_date).getTime();
        case 'location':
          return `${a.address.city}, ${a.address.country}`.localeCompare(
            `${b.address.city}, ${b.address.country}`
          );
        default:
          return 0;
      }
    });

    setFilteredOffices(filtered);
    setTotalCount(filtered.length);
  };

  const handlePageChange = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <CircularProgress className="text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8">
        <Alert
          severity="error"
          className="mb-4 shadow-sm"
          action={
            <Button
              color="inherit"
              size="small"
              onClick={fetchOffices}
              className="normal-case"
            >
              Retry
            </Button>
          }
        >
          {error}
        </Alert>
      </div>
    );
  }

  const paginatedOffices = filteredOffices.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <div className="p-8 min-h-screen bg-gray-50">
      <OfficeHeader
        viewMode={viewMode}
        setViewMode={setViewMode}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onFilterChange={setActiveFilter}
        onSortChange={setSortBy}
      />

      {filteredOffices.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
          <div className="bg-white rounded-lg p-8 shadow-sm max-w-md">
            <div className="text-gray-400 mb-4">
              <SearchOff style={{ fontSize: 48 }} />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No offices found</h3>
            <p className="text-gray-600">
              {searchQuery
                ? `No results found for "${searchQuery}". Try adjusting your search or filters.`
                : 'No offices match the current filters. Try adjusting your filters or add a new office.'}
            </p>
            <Button
              variant="outlined"
              onClick={() => {
                setSearchQuery('');
                setActiveFilter('all');
                setSortBy('name');
              }}
              className="mt-4 normal-case [&.MuiButton-root]:border-primary [&.MuiButton-root]:text-primary hover:bg-primary/5"
            >
              Clear Filters
            </Button>
          </div>
        </div>
      ) : viewMode === 'card' ? (
        <Grid container spacing={3}>
          {paginatedOffices.map((office) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={office.id}>
              <OfficeCard office={office} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <OfficeTable
          offices={paginatedOffices}
          page={page}
          rowsPerPage={rowsPerPage}
          totalCount={totalCount}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
        />
      )}

      {viewMode === 'card' && filteredOffices.length > rowsPerPage && (
        <div className="mt-6">
          <TablePagination
            component="div"
            count={totalCount}
            page={page}
            onPageChange={handlePageChange}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleRowsPerPageChange}
            rowsPerPageOptions={[10, 25, 50]}
            className="bg-white rounded-lg shadow-sm border border-gray-100"
          />
        </div>
      )}
    </div>
  );
};

export default OfficeList;