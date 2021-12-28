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
  Skeleton,
} from '@material-ui/core';
import { Search as SearchIcon } from 'react-feather';
import v4 from 'uuid/dist/v4';
import { CustomersContext } from 'Contexts/CustomersContext';
import { Link } from 'react-router-dom';
import useToggleInput from 'hooks/useToggleInput';
import { ConfirmDialog } from '../Dialogs';

const useStyles = makeStyles((theme) => ({
  main: {
    backgroundColor: '#f2f2f2',
    minHeight: '20rem',
    borderRadius: '0.8rem',
    padding: '1rem',
    margin: '2rem 1.5rem 2rem',
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

const Visitors = () => {
  const { customers, deleteCustomer, loading } =
    useContext(CustomersContext);

  const classes = useStyles();
  const [filter, setFilter] = useState('');
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [currentDeleteId, setCurrentDeleteId] = useState();
  const [isDeleteOpen, toggleDeleteOpen] = useToggleInput();

  useEffect(() => {
    setFilteredCustomers(customers);
  }, [customers]);

  // Avoid a layout jump when reaching the last page with empty customers?.
  const emptyRows =
    rowsPerPage -
    Math.min(
      rowsPerPage,
      customers === 'loading'
        ? 0
        : customers?.length - page * rowsPerPage
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
    console.log(filter);
  };
  //  filtered
  useEffect(() => {
    setFilteredCustomers(
      customers === 'loading'
        ? 'loading'
        : customers?.filter(
            (row) =>
              row.fullName
                .toLowerCase()
                .indexOf(filter.toLowerCase()) !== -1
          )
    );
  }, [filter]);

  // data must be updated
  useEffect(() => {
    setFilteredCustomers(customers);
  }, []);

  const handleDelete = (id) => {
    // console.log(`id`, id);
    setCurrentDeleteId(id);
    toggleDeleteOpen();
  };

  const handleDeleteCustomer = () => {
    // console.log(`id`, id);
    deleteCustomer(currentDeleteId);
    toggleDeleteOpen();
  };

  return (
    <div>
      <Box
        display='flex'
        justifyContent='space-between'
        alignItems='center'
        m={3}
      >
        <Typography variant='h4'>Customer management</Typography>
        <Button
          variant='contained'
          style={{ width: '12rem' }}
          component={Link}
          to='/app/customers/new'
        >
          Create Customer
        </Button>
      </Box>
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
            Search Client
          </Typography>
          <SearchIcon style={{ margin: '0px 3px 0px' }} />
          <TextField
            hiddenLabel
            id='filled-hidden-label-small'
            placeholder='client name'
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
                <TableCell>Clients</TableCell>
                <TableCell align='right'>Emails</TableCell>
                <TableCell align='right'>Telephone</TableCell>
                <TableCell align='right'>Customer Ref</TableCell>
                <TableCell align='right'>date of creation</TableCell>
                <TableCell align='right'>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading
                ? Array(5)
                    .fill()
                    .map(() => (
                      <TableRow key={v4()}>
                        {Array(5)
                          .fill()
                          .map(() => (
                            <TableCell
                              component='th'
                              scope='row'
                              key={v4()}
                            >
                              <Skeleton />
                            </TableCell>
                          ))}
                        <TableCell align='right'>
                          <Skeleton />
                          <Skeleton />
                        </TableCell>
                      </TableRow>
                    ))
                : filteredCustomers
                    ?.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                    .map((row, index) => (
                      <TableRow key={v4()}>
                        <TableCell component='th' scope='row'>
                          {row.fullName}
                        </TableCell>
                        <TableCell align='right'>
                          {row.email}
                        </TableCell>
                        <TableCell align='right'>
                          {row.telephoneNumber}
                        </TableCell>
                        <TableCell align='right'>{row._id}</TableCell>
                        <TableCell align='right'>
                          {new Date(row.createdAt).toDateString()}
                        </TableCell>
                        <TableCell align='right'>
                          <Button
                            component={Link}
                            to={`/app/customers/edit/${row._id}`}
                          >
                            Edit
                          </Button>
                          <Button
                            onClick={handleDelete.bind(this, row._id)}
                            style={{ color: 'red' }}
                          >
                            Delete
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
            count={customers === 'loading' ? 0 : customers?.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>
      </Box>
      <ConfirmDialog
        open={isDeleteOpen}
        toggleDialog={toggleDeleteOpen}
        success={handleDeleteCustomer}
        dialogTitle='Delete this Customer ?'
      />
    </div>
  );
};

export default Visitors;
