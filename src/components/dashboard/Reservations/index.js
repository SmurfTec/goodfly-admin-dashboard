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
import { ReservationsContext } from 'Contexts/ReservationsContext';
import { Edit } from '@mui/icons-material';
import { useNavigate } from 'react-router';

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
  const { reservations } = useContext(ReservationsContext);
  const classes = styles();
  const [filter, setFilter] = useState('');
  const [filteredItems, setFilteredItems] = useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const navigate = useNavigate();

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    rowsPerPage -
    Math.min(rowsPerPage, (reservations?.length || 0) - page * rowsPerPage);

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
      // reservations?.filter(
      //   (el) => el.client.toLowerCase().indexOf(filter.toLowerCase()) !== -1
      // )
      reservations || []
    );
  }, [filter]);

  // data must be updated
  useEffect(() => {
    setFilteredItems(reservations);
  }, [reservations]);

  const handleClick = (id) => {
    // navigate(`/app/reservations/${id}`);
    navigate(`${id}`);
  };

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
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <Typography variant='text' style={{ margin: '0px 3px 0px' }}>
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
                <TableCell align='center'>reservation date</TableCell>
                <TableCell align='center'>Status</TableCell>
                <TableCell align='center'>Clients</TableCell>
                <TableCell align='center'>Emails</TableCell>
                <TableCell align='center'>Telephone</TableCell>
                <TableCell align='center'>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredItems
                ? filteredItems
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((purchase) => (
                      <TableRow key={v4()}>
                        <TableCell component='th' scope='row'>
                          {/* TODO- Purchase Reference */}
                          {purchase._id.slice(5)}
                        </TableCell>
                        <TableCell align='center'>
                          {new Date(purchase.createdAt).toLocaleDateString()}
                        </TableCell>
                        <TableCell align='center'>{purchase.status}</TableCell>
                        <TableCell align='center'>{`${purchase.firstName} ${purchase.lastName}`}</TableCell>
                        <TableCell align='center'>{purchase.email}</TableCell>
                        <TableCell align='center'>{purchase.phone}</TableCell>
                        <TableCell align='center'>
                          <Button
                            startIcon={<Edit />}
                            onClick={handleClick.bind(this, purchase._id)}
                          ></Button>
                        </TableCell>
                      </TableRow>
                    ))
                : [1, 2, 3, 4, 5].map(() => (
                    <TableRow key={v4()}>
                      <TableCell component='th' scope='row'>
                        <Skeleton variant='rect' />
                      </TableCell>
                      <TableCell align='center'>
                        <Skeleton variant='rect' />
                      </TableCell>
                      <TableCell align='center'>
                        <Skeleton variant='rect' />
                      </TableCell>
                      <TableCell align='center'>
                        <Skeleton variant='rect' />
                      </TableCell>
                      <TableCell align='center'>
                        <Skeleton variant='rect' />
                      </TableCell>
                      <TableCell align='center'>
                        <Skeleton variant='rect' />
                      </TableCell>
                      <TableCell align='center'>
                        <Skeleton variant='rect' />
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
            count={reservations?.length || 0}
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
