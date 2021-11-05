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
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  MenuItem,
  InputLabel,
  Select,
  FormControl,
} from '@material-ui/core';
import { Search as SearchIcon } from 'react-feather';
import v4 from 'uuid/dist/v4';

function createData(name, category, fat, carbs, protein) {
  return { name, category, fat, carbs, protein };
}

const rows = [
  createData('Muhammadzain', ' zain@gmail.com', '+2233123312334'),
  createData('Muhammadali', ' ali@gmail.com', '+2233123312334'),
  createData('Muhammadusman', ' usman@gmail.com', '+2233123312334'),
  createData('Muhammadkashif', ' kashif@gmail.com', '+2233123312334'),
  createData('Muhammadumer', ' umer@gmail.com', '+2233123312334'),
  createData('Muhammadabc', ' abc@gmail.com', '+2233123312334'),
  createData('Muhammadsonu', ' sonu@gmail.com', '+2233123312334'),
  createData('Muhammadsaqib', ' saqib@gmail.com', '+2233123312334'),
  createData('Muhammadsohil', ' sohail@gmail.com', '+2233123312334'),
  createData('Muhammadtayyab', ' tayyab@gmail.com', '+2233123312334'),
  createData('Muhammadgul', 'gul@gmail.com', '+2233123312334'),
  createData('Muhammadtayyab', ' tayyab@gmail.com', '+2233123312334'),
  createData('Muhammadgul', 'gul@gmail.com', '+2233123312334'),
  createData('Muhammadtayyab', ' tayyab@gmail.com', '+2233123312334'),
  createData('Muhammadgul', 'gul@gmail.com', '+2233123312334'),
  createData('Muhammadtayyab', ' tayyab@gmail.com', '+2233123312334'),
  createData('Muhammadgul', 'gul@gmail.com', '+2233123312334'),
  createData('Muhammadtayyab', ' tayyab@gmail.com', '+2233123312334'),
  createData('Muhammadgul', 'gul@gmail.com', '+2233123312334'),
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
    margin: ' 2rem 1rem 2rem',
    padding: '1rem',
    width: 'inherit',
  },
  form: {
    margin: '1rem 0rem  3rem',
    // marginBottom: '1rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  textInput: {
    width: '80%',
    backgroundColor: '#fff',
    marginBottom: 7,
  },
}));

const TourCategories = () => {
  const classes = styles();
  const [filter, setFilter] = useState('');
  const [filteredItems, setFilteredItems] = useState([]);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [status, setStatus] = useState('');

  const handleChange = (event) => {
    setStatus(event.target.value);
  };

  //confirmation
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  //update
  const [openCat, setOpenCat] = React.useState(false);
  const handleClickOpenCat = () => {
    setOpenCat(true);
  };

  const handleCloseCat = () => {
    setOpenCat(false);
  };

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
          row.category.toLowerCase().indexOf(filter.toLowerCase()) !== -1
      )
    );
  }, [filter]);

  // data must be updated
  useEffect(() => {
    setFilteredItems(rows);
  }, []);

  return (
    <div style={{ marginTop: '3rem' }}>
      <Box
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          margin: '0rem 2rem 0.5rem  0rem',
        }}
      >
        <Typography variant='h4' m={2}>
          Category Management
        </Typography>
        <Button
          variant='contained'
          style={{ width: '12rem' }}
          onClick={handleClickOpenCat}
        >
          {' '}
          Add a Category
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
            Search Category
          </Typography>
          <SearchIcon style={{ margin: '0px 3px 0px' }} />
          <TextField
            hiddenLabel
            id='filled-hidden-label-small'
            placeholder='category name'
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
                <TableCell align='right'>Category</TableCell>
                <TableCell align='right'>Type</TableCell>
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
                      {row.category}
                    </TableCell>
                    <TableCell align='right'>{row.fat}</TableCell>
                    <TableCell align='right'>
                      <Button>Edit</Button>
                      <Button
                        style={{ color: 'red' }}
                        onClick={handleClickOpen}
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
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>
      </Box>
      {/*  DOALOG FOR DELETING A Category*/}
      <div>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby='alert-dialog-title'
          aria-describedby='alert-dialog-description'
        >
          <DialogTitle id='alert-dialog-title'>
            {'Confirmation for Deletion'}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id='alert-dialog-description'>
              Are you Sure you want to Delete Category
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleClose} autoFocus>
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      </div>
      {/*  DIALOG FOR UPDATE CATEGORY */}
      <div>
        <Dialog
          open={openCat}
          onClose={handleClose}
          style={{
            border: '1px solid red',
          }}
        >
          <Box p={3}>
            <Typography variant='h4'>Add New Category</Typography>
          </Box>
          <DialogContent>
            <Box
              className={classes.form}
              style={{ margin: '1rem', padding: 'o.2rem' }}
              overlayStyle={{ backgroundColor: 'transparent' }}
            >
              <TextField
                autoFocus
                margin='dense'
                id='name'
                label='Name of Category'
                type='text'
                fullWidth
                style={{ width: '40rem', marginRight: '2rem' }}
              />
              <FormControl fullWidth>
                <InputLabel id='demo-simple-select-label'>
                  Status
                </InputLabel>

                <Select
                  labelId='demo-simple-select-label'
                  id='demo-simple-select'
                  value={status}
                  label='Status'
                  onChange={handleChange}
                >
                  <MenuItem value={10}>One</MenuItem>
                  <MenuItem value={20}>Two</MenuItem>
                  <MenuItem value={30}>Three</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </DialogContent>
          <DialogActions
            className={classes.form}
            style={{ margin: '1rem', justifyContent: 'center' }}
          >
            <Button variant='outlined' onClick={handleCloseCat}>
              Cancel
            </Button>
            <Button variant='contained' onClick={handleCloseCat}>
              Create
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};

export default TourCategories;
