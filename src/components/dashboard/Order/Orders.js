import React, { useState, useEffect, useContext } from 'react';
import { makeStyles } from '@material-ui/styles';

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
import v4 from 'uuid/dist/v4';
import { Link } from 'react-router-dom';
import { OrderContext } from 'Contexts/OrderContext';
import { useTranslation } from 'react-i18next';

const styles = makeStyles((theme) => ({
  main: {
    backgroundColor: '#f2f2f2',
    minHeight: '20rem',
    borderRadius: '0.8rem',
    padding: '1rem',
    margin: '2rem 1.5rem 2rem',
    [theme.breakpoints.down('lg')]: {
      padding: '0.5rem',
      margin: '1rem 1rem 1rem',
    },
  },
  table: {
    margin: ' 2rem 1rem 1rem',
    padding: '1rem',
    width: 'inherit',
  },
  textInput: {
    width: '80%',
    backgroundColor: '#fff',
    marginBottom: 7,
  },
}));

const Orders = () => {
  const classes = styles();
  const { t } = useTranslation();

  const { orders } = useContext(OrderContext);
  console.log(orders);

  const [filter, setFilter] = useState('');
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    setFilteredOrders(orders);
  }, [orders]);
  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    rowsPerPage -
    Math.min(
      rowsPerPage,
      orders === 'loading' ? 0 : orders?.length - page * rowsPerPage
    );

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
    // console.log(filter);
  };
  //  filtered
  useEffect(() => {
    setFilteredOrders(
      orders === 'loading'
        ? 'loading'
        : orders?.filter((row) => {
            console.log(`row`, row);
            return (
              row.visitor?.fullName
                .toLowerCase()
                .indexOf(filter.toLowerCase()) !== -1
            );
          })
    );
  }, [filter]);

  // data must be updated
  useEffect(() => {
    setFilteredOrders(orders);
  }, []);

  return (
    <div>
      <Typography variant='h4' m={2}>
        {t('E-commerce order Management')}
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
          <Typography variant='text' style={{ margin: '0px 3px 0px' }}>
            {t('Search Order')}
          </Typography>
          <SearchIcon style={{ margin: '0px 3px 0px' }} />
          <TextField
            hiddenLabel
            id='filled-hidden-label-small'
            placeholder={t('order name')}
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
                <TableCell>{t('Ref Orders')}</TableCell>
                <TableCell align='right'>{t('Order Date')}</TableCell>
                <TableCell align='right'>{t('Status')}</TableCell>
                <TableCell align='right'>{t('Clients')} </TableCell>
                <TableCell align='right'>{t('Emails')}</TableCell>
                <TableCell align='right'>{t('Telephone')}</TableCell>
                <TableCell align='right'>{t('Actions')}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredOrders === 'loading'
                ? 'loading'
                : filteredOrders
                    ?.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                    .map((row, index) => (
                      <TableRow key={v4()}>
                        <TableCell component='th' scope='row'>
                          {row._id}
                        </TableCell>
                        <TableCell align='right'>
                          {new Date(row.createdAt).toDateString()}
                        </TableCell>
                        <TableCell align='right'>{row.status}</TableCell>
                        <TableCell align='right'>
                          {row.visitor
                            ? row.visitor.fullName
                            : 'Visitor no longer exists'}
                        </TableCell>
                        <TableCell align='right'>
                          {row.visitor
                            ? row.visitor.email
                            : 'Visitor no longer exists'}
                        </TableCell>
                        <TableCell align='right'>
                          {row.visitor
                            ? row.visitor.telephoneNumber
                            : 'Visitor no longer exists'}
                        </TableCell>
                        <TableCell align='right'>
                          <Button
                            component={Link}
                            to={`/app/orders/edit/${row._id}`}
                          >
                            {t('EDIT')}
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
            count={orders.length}
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

export default Orders;
