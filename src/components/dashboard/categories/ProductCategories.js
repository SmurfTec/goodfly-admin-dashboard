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
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from '@material-ui/core';
import { Search as SearchIcon } from 'react-feather';
import v4 from 'uuid/dist/v4';

import { ProductContext } from 'Contexts/ProductContext';
import { useTextInput, useToggleInput } from 'hooks';

const styles = makeStyles(() => ({
  main: {
    backgroundColor: '#f2f2f2',
    minHeight: '20rem',
    borderRadius: '0.8rem',
    margin: '1rem 1.5rem 2rem',
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

const ProductCategories = () => {
  const classes = styles();
  const { categories, deleteCategory, modifyCategory, createNewCategory } =
    useContext(ProductContext);
  const [filter, setFilter] = useState('');
  const [filteredItems, setFilteredItems] = useState([]);
  const [currentCatId, setCurrentCatId] = useState();
  const [isEditOpen, toggleIsEditOpen] = useToggleInput(false);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [name, handleChange, resetName, setName] = useTextInput('');

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

  // Avoid a layout jump when reaching the last page with empty categories?.
  const emptyRows =
    rowsPerPage -
    Math.min(rowsPerPage, categories?.length - page * rowsPerPage);

  const handleChangePage = (_, newPage) => {
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
      categories?.filter((el) =>
        el.name.toLowerCase().includes(filter.toLowerCase())
      )
    );
  }, [filter]);

  // data must be updated
  useEffect(() => {
    setFilteredItems(categories);
  }, [categories]);

  return (
    <div>
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
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <Typography variant='text' style={{ margin: '0px 3px 0px' }}>
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
                <TableCell align='center'>Id</TableCell>
                <TableCell align='center'>Name</TableCell>
                <TableCell align='center'>Creation Date</TableCell>
                <TableCell align='center'>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredItems
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <TableRow key={v4()}>
                    <TableCell component='th' scope='row' align='center'>
                      {row._id}
                    </TableCell>
                    <TableCell component='th' scope='row' align='center'>
                      {row.name}
                    </TableCell>
                    <TableCell component='th' scope='row' align='center'>
                      {new Date(row.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell align='center'>
                      <Button
                        onClick={() => {
                          setCurrentCatId(row);
                          setName(row.name);
                          setTimeout(() => {
                            toggleIsEditOpen();
                          }, 1000);
                        }}
                      >
                        Edit
                      </Button>
                      <Button
                        style={{ color: 'red' }}
                        onClick={() => {
                          setCurrentCatId(row);
                          handleClickOpen();
                        }}
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
            count={categories?.length || 0}
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
          onClose={() => handleClose()}
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
            <Button onClick={handleClose} variant='outlined'>
              Cancel
            </Button>
            <Button
              onClick={() => {
                handleClose();
                deleteCategory(currentCatId._id);
              }}
              variant='outlined'
              autoFocus
              style={{ color: 'red', border: '1px solid red' }}
            >
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      </div>
      {/*  DIALOG FOR Creating CATEGORY */}
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
            <form
              id='addCat'
              onSubmit={(e) => {
                e.preventDefault();
                console.log('EEE');
                createNewCategory({ name });
                resetName();
                handleCloseCat();
              }}
            >
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
                  value={name}
                  onChange={handleChange}
                  required
                />
              </Box>
            </form>
          </DialogContent>
          <DialogActions
            className={classes.form}
            style={{ margin: '1rem', justifyContent: 'flex-end' }}
          >
            <Button variant='contained' form='addCat' type='submit'>
              Create
            </Button>
            <Button
              variant='contained'
              form='addCat'
              onClick={() => handleCloseCat()}
              color='error'
            >
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </div>

      <div>
        <Dialog
          open={isEditOpen}
          onClose={() => toggleIsEditOpen()}
          style={{
            border: '1px solid red',
          }}
        >
          <Box p={3}>
            <Typography variant='h4'>Update Category</Typography>
          </Box>
          <DialogContent>
            <form
              id='addCat'
              onSubmit={(e) => {
                e.preventDefault();
                console.log('EEE');
                modifyCategory(currentCatId._id, { name });
                resetName();
                toggleIsEditOpen();
              }}
            >
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
                  value={name}
                  onChange={handleChange}
                  required
                />
              </Box>
            </form>
          </DialogContent>
          <DialogActions
            className={classes.form}
            style={{ margin: '1rem', justifyContent: 'flex-end' }}
          >
            <Button variant='contained' form='addCat' type='submit'>
              Update
            </Button>
            <Button
              variant='contained'
              form='addCat'
              onClick={toggleIsEditOpen}
              color='error'
            >
              Cancell
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};

export default ProductCategories;
