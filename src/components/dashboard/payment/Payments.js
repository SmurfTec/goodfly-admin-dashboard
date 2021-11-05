import React, { useState, useEffect } from 'react';
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

function createData(name, calories, clientName, client, protein) {
  return { name, calories, clientName, client, protein };
}

const rows = [
  createData(
    'Muhammadzain',
    ' zain@gmail.com',
    'zain',
    '+2233123312334',
    '11/07/2021'
  ),
  createData(
    'Muhammadali',
    ' ali@gmail.com',
    'sonu',
    '+2233123312334',
    '11/07/2021'
  ),
  createData(
    'Muhammadusman',
    ' usman@gmail.com',
    'ali',
    '+2233123312334',
    '11/07/2021'
  ),
  createData(
    'Muhammadkashif',
    ' kashif@gmail.com',
    'umer',
    '+2233123312334',
    '11/07/2021'
  ),
  createData(
    'Muhammadumer',
    ' umer@gmail.com',
    'kasi',
    '+2233123312334',
    '11/07/2021'
  ),
  createData(
    'Muhammadabc',
    ' abc@gmail.com',
    'qweew',
    '+2233123312334',
    '11/07/2021'
  ),
  createData(
    'Muhammadsonu',
    ' sonu@gmail.com',
    'gdasd',
    '+2233123312334',
    '11/07/2021'
  ),
  createData(
    'Muhammadsaqib',
    ' saqib@gmail.com',
    'fdasfs',
    '+2233123312334',
    '11/07/2021'
  ),
  createData(
    'Muhammadsohil',
    ' sohail@gmail.com',
    'eqwe',
    '+2233123312334',
    '11/07/2021'
  ),
  createData(
    'Muhammadtayyab',
    ' tayyab@gmail.com',
    'fasdf',
    '+2233123312334',
    '11/07/2021'
  ),
  createData(
    'Muhammadgul',
    'gul@gmail.com',
    'sdas',
    '+2233123312334',
    '11/07/2021'
  ),
  createData(
    'Muhammadtayyab',
    ' tayyab@gmail.com',
    'fsdfsa',
    '+2233123312334',
    '11/07/2021'
  ),
  createData(
    'Muhammadgul',
    'gul@gmail.com',
    'fasdfa',
    '+2233123312334',
    '11/07/2021'
  ),
  createData(
    'Muhammadtayyab',
    ' tayyab@gmail.com',
    'fasd',
    '+2233123312334',
    '11/07/2021'
  ),
  createData(
    'Muhammadgul',
    'gul@gmail.com',
    'fasdf',
    '+2233123312334',
    '11/07/2021'
  ),
  createData(
    'Muhammadtayyab',
    ' tayyab@gmail.com',
    'fsadf',
    '+2233123312334',
    '11/07/2021'
  ),
  createData(
    'Muhammadgul',
    'gul@gmail.com',
    'fdsa',
    '+2233123312334',
    '11/07/2021'
  ),
  createData(
    'Muhammadtayyab',
    ' tayyab@gmail.com',
    'fsdf',
    '+2233123312334',
    '11/07/2021'
  ),
  createData(
    'Muhammadgul',
    'gul@gmail.com',
    'adfsds',
    '+2233123312334',
    '11/07/2021'
  ),
];

const styles = makeStyles((theme) => ({
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

const Payments = () => {
  const classes = styles();
    const [filter, setFilter] = useState('');
    const [filteredItems, setFilteredItems] = useState([]);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    rowsPerPage -
    Math.min(rowsPerPage, rows.length - page * rowsPerPage);

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
  setFilteredItems(
    rows.filter(
      (row) =>
        row.clientName.toLowerCase().indexOf(filter.toLowerCase()) !==
        -1
    )
  );
}, [filter]);

// data must be updated
useEffect(() => {
  setFilteredItems(rows);
}, []);

  return (
    <div style={{ marginTop: '3rem' }}>
      <Typography variant='h4' m={2}>
        Payment Management
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
                <TableCell>Date of Creation</TableCell>
                <TableCell align='right'>Operation</TableCell>
                <TableCell align='right'>Client</TableCell>
                <TableCell align='right'>
                  Number of Transaction
                </TableCell>
                <TableCell align='right'>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredItems
                .slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
                .map((row, index) => (
                  <TableRow key={v4()}>
                    <TableCell component='th' scope='row'>
                      {row.name}
                    </TableCell>
                    <TableCell align='right'>
                      {row.calories}
                    </TableCell>
                    <TableCell align='right'>{row.clientName}</TableCell>
                    <TableCell align='right'>{row.client}</TableCell>
                    <TableCell align='right'>
                      <Button>Details</Button>
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
            count={rows.length}
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

export default Payments;
