import React, { useState, useEffect, useContext } from 'react';

import {
  Typography,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableContainer,
  TableCell,
  TableBody,
  Box,
  Button,
  TablePagination,
  TextField,
} from '@material-ui/core';
import { Search as SearchIcon } from 'react-feather';
import styles from './styles';
import { OffersContext } from 'Contexts/OffersContext';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const CustomTrips = () => {
  const classes = styles();
  const { customOffers } = useContext(OffersContext);

  const [filter, setFilter] = useState('');
  const [filteredItems, setFilteredItems] = useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const { t } = useTranslation();

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    rowsPerPage -
    Math.min(rowsPerPage, filteredItems.length - page * rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const handleSearch = (e) => {
    const data = e.target.value;
    setFilter(data);
  };
  //  filtered
  useEffect(() => {
    if (!filter) return;
    setFilteredItems(
      customOffers?.filter(
        (row) =>
          row?.fullName
            ?.toLowerCase()
            ?.indexOf(filter.toLowerCase()) !== -1
      )
    );
  }, [filter]);

  // data must be updated
  useEffect(() => {
    setFilteredItems(
      customOffers?.filter((item) => item?.status === 'pending')
    );
  }, [customOffers]);
  return (
    <div>
      <Typography variant='h4' m={2}>
        {t('Tailor-made Travel Management')}
      </Typography>
      <Box className={classes.main}>
        <Box
          style={{
            display: 'flex',
            justifyContent: 'right',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <Typography
            variant='text'
            style={{ margin: '0px 3px 0px' }}
          >
            {t('Search Client')}
          </Typography>
          <SearchIcon style={{ margin: '0px 3px 0px' }} />
          <TextField
            hiddenLabel
            id='filled-hidden-label-small'
            placeholder={t('client name')}
            size='small'
            style={{ margin: '0px 5px 0px', width: '30%' }}
            className={classes.textInput}
            value={filter}
            onChange={handleSearch}
          />
        </Box>

        {/*  TABLE  */}

        <TableContainer component={Paper} className={classes.table}>
          <Table sx={{ minWidth: 650 }} aria-label='simple table'>
            <TableHead>
              <TableRow>
                <TableCell>{t('Name')}</TableCell>
                <TableCell align='center'>
                  {t('Date of Reservation')}
                </TableCell>
                <TableCell align='center'>{t('Emails')}</TableCell>
                <TableCell align='center'>{t('Telephone')}</TableCell>
                <TableCell align='center'>{t('Actions')}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredItems
                .slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
                .map((row) => (
                  <TableRow key={row._id}>
                    <TableCell component='th' scope='row'>
                      {row.visitor
                        ? row.visitor.fullName
                        : 'Visitor No Longer Exists'}
                    </TableCell>
                    <TableCell align='center'>
                      {new Date(row.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell align='center'>
                      {row.visitor?.email}
                    </TableCell>
                    <TableCell align='center'>
                      {row.visitor?.telephoneNumber}
                    </TableCell>
                    <TableCell align='center'>
                      <Button
                        component={Link}
                        to={`/app/customtrips/${row._id}`}
                      >
                        Show Details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[5, 10, 20]}
            component='div'
            count={filteredItems.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>
      </Box>
    </div>
  );
};

export default CustomTrips;
