import React from 'react';
import { makeStyles } from '@material-ui/styles';

import {
  Typography,
  Box,
  Table,
  TableHead,
  TableRow,
  TableContainer,
  TableCell,
  Avatar,
  TableBody,
  Button,
  TablePagination,
  TextField,
  Paper,
  Grid,
} from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import Rating from '@material-ui/core/Rating';

import {
  Search as SearchIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
} from 'react-feather';

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData(
    'Muhammadzain',
    ' zain@gmail.com',
    '+2233123312334',
    'GF12333',
    '11/07/2021'
  ),
  createData(
    'Muhammadali',
    ' ali@gmail.com',
    '+2233123312334',
    'GF12333',
    '11/07/2021'
  ),
  createData(
    'Muhammadusman',
    ' usman@gmail.com',
    '+2233123312334',
    'GF12333',
    '11/07/2021'
  ),
  createData(
    'Muhammadkashif',
    ' kashif@gmail.com',
    '+2233123312334',
    'GF12333',
    '11/07/2021'
  ),
  createData(
    'Muhammadumer',
    ' umer@gmail.com',
    '+2233123312334',
    'GF12333',
    '11/07/2021'
  ),
];
const styles = makeStyles((theme) => ({
  main: {
    backgroundColor: '#f2f2f2',
    minHeight: '15rem',
    borderRadius: '0.8rem',
    padding: '0.1rem',
    margin: '2rem 1rem 2rem',
  },
  form: {
    margin: '1rem 0rem  3rem',
    // marginBottom: '1rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  topButtons: {
    color: '#8c8c8c',
    width: '12rem',
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
  '.MuiDialogContent-root': {
    backgroundColor: '#f2f2f2',
  },
  flexLeft: {
    display: 'flex',
    justifyContent: 'left',
    alignItems: 'center',
    margin: '0.5rem',
  },
  flexBetween: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: '0.5rem',
  },
  flexAround: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    margin: '0.5rem',
  },
}));

const OrganizedTrips = () => {
  const classes = styles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [rating, setRating] = React.useState(2);

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
  return (
    <div style={{ marginTop: '3rem' }}>
      <Typography variant='h5' m={2}>
        {' '}
        Organized trips
      </Typography>
      <Box className={classes.main}>
        <Box className={classes.flexBetween}>
          <Box className={classes.flexLeft}>
            <Typography variant='h5' mr={5}>
              Trip Name
            </Typography>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Typography
                variant='h5'
                style={{ margin: '0px 10px 0px' }}
              >
                Reference
              </Typography>
              <Paper
                style={{
                  width: 70,
                  height: 25,
                  textAlign: 'right',
                  padding: 4,
                }}
              >
                {' '}
                0001
              </Paper>
            </div>
          </Box>
          <Box
            style={{
              display: 'flex',
              alignItems: 'center',
              margin: '1rem',
            }}
          >
            <ChevronLeftIcon />
            <Divider
              style={{ margin: '0rem 0.4rem 0rem 0.4rem' }}
              orientation='vertical'
              flexItem
            />
            <ChevronRightIcon />
          </Box>
        </Box>
        <Box
          style={{
            backgroundColor: '#ffffff',
            margin: '0rem 1rem 1rem 1rem',
            borderRadius: '0.4rem',
            minHeight: '10rem',
          }}
        >
          <Grid
            container
            style={{
              padding: '0.5rem',
              minHeight: '10rem',
              margin: '0.5rem 0.5rem  1rem',
            }}
          >
            <Grid item xs={6} sm={3}>
              <Typography variant='h5' mt={1}>
                April 5 to 29, 2020
              </Typography>
              <Typography variant='h2' mt={1}>
                5100$
              </Typography>
              <Typography variant='text' mt={1}>
                Popular: Spanish to English, French to English, and
                Popular: Spanish to English, French to English, and
                Japanese to English. Other languages:
              </Typography>
            </Grid>
            <Grid item xs={6} sm={2}>
              <Typography variant='h5' mt={1}>
                April 5 to 29, 2020
              </Typography>
              <Typography variant='text' mt={1}>
                Popular: Spanish to English, French to English, and
                Popular: Spanish to English, French to English, and
                Japanese to English. Other languages:
              </Typography>{' '}
            </Grid>
            <Grid item xs={6} sm={2}>
              <Box style={{ margin: '1rem' }}>
                {' '}
                <Avatar
                  alt='Cindy Baker'
                  src='/static/images/avatar/3.jpg'
                  sx={{ width: 100, height: 100 }}
                  style={{ marginRight: '1rem' }}
                />
              </Box>
            </Grid>
            <Grid item xs={6} sm={5}>
              <Box
                style={{
                  backgroundColor: '#f2f2f2',
                  padding:'0.5rem',
                  margin:'0.5rem'
                }}
              >
                <Box className={classes.flexLeft}>
                  <Typography variant='h5'> hotal name</Typography>
                  <Rating
                    name='simple-controlled'
                    value={rating}
                    onChange={(event, newValue) => {
                      setRating(newValue);
                    }}
                  />
                </Box>
                <Box className={classes.flexBetween}>
                  <Avatar
                    alt='Cindy Baker'
                    src='/static/images/avatar/3.jpg'
                    sx={{ width: 100, height: 100 }}
                    style={{ marginRight: '1rem' }}
                  />
                  <Typography variant='text' mt={1}>
                    Popular: Spanish to English, French to English,
                    and Popular: Spanish to English, French to
                    English, and Japanese to English. Other languages:
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
        <Box
          style={{
            display: 'flex',
            justifyContent: 'right',
            alignItems: 'center',
            margin: '1rem',
          }}
        >
          <Button
            variant='outlined'
            style={{ marginRight: '0.5rem', minWidth: '7rem' }}
          >
            {' '}
            Modify
          </Button>
          <Button
            variant='outlined'
            style={{ color: 'red', minWidth: '7rem' }}
          >
            {' '}
            Delete
          </Button>
        </Box>
      </Box>
      <Box className={classes.main} style={{ minHeight: '25rem' }}>
        <Box
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
            margin: '1rem',
          }}
        >
          <Typography variant='h5'> List of Registrants</Typography>
          <Box
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
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
              style={{ width: '50%' }}
              className={classes.textInput}
            />
          </Box>
        </Box>

        {/*  TABLE  */}

        <TableContainer component={Paper} className={classes.table}>
          <Table sx={{ minWidth: 650 }} aria-label='simple table'>
            <TableHead>
              <TableRow>
                <TableCell>Number</TableCell>
                <TableCell align='right'>Clients</TableCell>
                <TableCell align='right'>Telephone</TableCell>
                <TableCell align='right'>Customer Ref</TableCell>
                <TableCell align='right'>date of creation</TableCell>
                <TableCell align='right'>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
                .map((row, index) => (
                  <TableRow key={row.name}>
                    <TableCell component='th' scope='row'>
                      {row.name}
                    </TableCell>
                    <TableCell align='right'>
                      {row.calories}
                    </TableCell>
                    <TableCell align='right'>{row.fat}</TableCell>
                    <TableCell align='right'>{row.carbs}</TableCell>
                    <TableCell align='right'>{row.protein}</TableCell>
                    <TableCell align='right'>
                      <Button>Edit</Button>
                      <Button style={{ color: 'red' }}>Delete</Button>
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

export default OrganizedTrips;
