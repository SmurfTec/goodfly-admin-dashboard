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

function createData(name, calories, fat, client, protein) {
  return { name, calories, fat, client, protein };
}

const rows = [
  createData(
    'Muhammadzain',
    ' zain@gmail.com',
    '+2233123312334',
    'zain',
    '11/07/2021'
  ),
  createData(
    'Muhammadali',
    ' ali@gmail.com',
    '+2233123312334',
    'sonu',
    '11/07/2021'
  ),
  createData(
    'Muhammadusman',
    ' usman@gmail.com',
    '+2233123312334',
    'ali',
    '11/07/2021'
  ),
  createData(
    'Muhammadkashif',
    ' kashif@gmail.com',
    '+2233123312334',
    'umer',
    '11/07/2021'
  ),
  createData(
    'Muhammadumer',
    ' umer@gmail.com',
    '+2233123312334',
    'kasi',
    '11/07/2021'
  ),
  createData(
    'Muhammadabc',
    ' abc@gmail.com',
    '+2233123312334',
    'qweew',
    '11/07/2021'
  ),
  createData(
    'Muhammadsonu',
    ' sonu@gmail.com',
    '+2233123312334',
    'gdasd',
    '11/07/2021'
  ),
  createData(
    'Muhammadsaqib',
    ' saqib@gmail.com',
    '+2233123312334',
    'fdasfs',
    '11/07/2021'
  ),
  createData(
    'Muhammadsohil',
    ' sohail@gmail.com',
    '+2233123312334',
    'eqwe',
    '11/07/2021'
  ),
  createData(
    'Muhammadtayyab',
    ' tayyab@gmail.com',
    '+2233123312334',
    'fasdf',
    '11/07/2021'
  ),
  createData(
    'Muhammadgul',
    'gul@gmail.com',
    '+2233123312334',
    'sdas',
    '11/07/2021'
  ),
  createData(
    'Muhammadtayyab',
    ' tayyab@gmail.com',
    '+2233123312334',
    'fsdfsa',
    '11/07/2021'
  ),
  createData(
    'Muhammadgul',
    'gul@gmail.com',
    '+2233123312334',
    'fasdfa',
    '11/07/2021'
  ),
  createData(
    'Muhammadtayyab',
    ' tayyab@gmail.com',
    '+2233123312334',
    'fasd',
    '11/07/2021'
  ),
  createData(
    'Muhammadgul',
    'gul@gmail.com',
    '+2233123312334',
    'fasdf',
    '11/07/2021'
  ),
  createData(
    'Muhammadtayyab',
    ' tayyab@gmail.com',
    '+2233123312334',
    'fsadf',
    '11/07/2021'
  ),
  createData(
    'Muhammadgul',
    'gul@gmail.com',
    '+2233123312334',
    'fdsa',
    '11/07/2021'
  ),
  createData(
    'Muhammadtayyab',
    ' tayyab@gmail.com',
    '+2233123312334',
    'fsdf',
    '11/07/2021'
  ),
  createData(
    'Muhammadgul',
    'gul@gmail.com',
    '+2233123312334',
    'adfsds',
    '11/07/2021'
  ),
];
const styles = makeStyles((theme) => ({
  main: {
    backgroundColor: '#f2f2f2',
    minHeight: '20rem',
    borderRadius: '0.8rem',
    padding: '1rem',
    margin: '0.7rem 1.5rem 2rem',
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

const Reservations = () => {
  const classes = styles();
  const [filter, setFilter] = useState('');
  const [filteredItems, setFilteredItems] = useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

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
          row.client.toLowerCase().indexOf(filter.toLowerCase()) !==
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
        Reservation Management
      </Typography>
      <Box
        mt={3}
        mb={0}
        style={{
          display: 'flex',
          justifyContent: 'space-evenly',
          alignItems: 'center',
        }}
      >
        <Button
          variant='outlined'
          style={{
            color: 'green',
            border: '1px solid green',
            minWidth: '9rem',
          }}
        >
          InProgress
        </Button>
        <Button
          variant='outlined'
          style={{
            color: 'orange',
            border: '1px solid orange',
            minWidth: '9rem',
          }}
        >
          To be Verified
        </Button>
        <Button
          variant='outlined'
          style={{
            color: 'blue',
            border: '1px solid blue',
            minWidth: '9rem',
          }}
        >
          Archived
        </Button>
        <Button
          variant='outlined'
          style={{
            color: 'gray',
            border: '1px solid gray',
            minWidth: '9rem',
          }}
        >
          Before deletion
        </Button>
        <Button
          variant='outlined'
          style={{
            color: 'purple',
            border: '1px solid purple',
            minWidth: '9rem',
          }}
        >
          Finalized
        </Button>
        <Button
          variant='outlined'
          style={{
            color: 'red',
            border: '1px solid red',
            minWidth: '9rem',
          }}
        >
          Deleted
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
            Search Reservation
          </Typography>
          <SearchIcon style={{ margin: '0px 3px 0px' }} />
          <TextField
            hiddenLabel
            id='filled-hidden-label-small'
            placeholder='reservation name'
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
                <TableCell>Ref Reservation</TableCell>
                <TableCell align='right'>reservation date</TableCell>
                <TableCell align='right'>Status</TableCell>
                <TableCell align='right'>Clients</TableCell>
                <TableCell align='right'>Emails</TableCell>
                <TableCell align='right'>Telephone</TableCell>
                <TableCell align='right'>Actions</TableCell>
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
                    <TableCell align='right'>{row.fat}</TableCell>
                    <TableCell align='right'>{row.client}</TableCell>
                    <TableCell align='right'>{row.protein}</TableCell>
                    <TableCell align='right'>{row.protein}</TableCell>
                    <TableCell align='right'>
                      <Button>Edit</Button>
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

export default Reservations;
