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
  CardMedia,
} from '@material-ui/core';
import { Search as SearchIcon } from 'react-feather';
import { Link } from 'react-router-dom';
import v4 from 'uuid/dist/v4';
import { ProductContext } from 'Contexts/ProductContext';
import useToggleInput from 'hooks/useToggleInput';
import { ConfirmDialog } from '../Dialogs';

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

const Products = () => {
  const { products, deleteProduct } = useContext(ProductContext);

  // console.log('PRODUCTS', products);

  const classes = styles();
  const [filter, setFilter] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentDeleteId, setCurrentDeleteId] = useState();
  const [isDeleteOpen, toggleDeleteOpen] = useToggleInput();

  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    rowsPerPage -
    Math.min(
      rowsPerPage,
      products === 'loading' ? 0 : products?.length - page * rowsPerPage
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
    setFilteredProducts(
      products === 'loading'
        ? 'loading'
        : products?.filter(
            (row) => row.name.toLowerCase().indexOf(filter.toLowerCase()) !== -1
          )
    );
  }, [filter]);

  const handleDelete = (id) => {
    // console.log(`id`, id);
    setCurrentDeleteId(id);
    toggleDeleteOpen();
  };

  const handleDeleteProduct = () => {
    deleteProduct(currentDeleteId);
    toggleDeleteOpen();
  };
  return (
    <div style={{ marginTop: '3rem' }}>
      <Box
        display='flex'
        justifyContent='space-between'
        alignItems='center'
        m={2}
      >
        <Typography variant='h4' m={2}>
          Product Management
        </Typography>
        <Button
          variant='contained'
          style={{ width: '12rem' }}
          component={Link}
          to='/app/products/create'
        >
          Add a Product
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
          <Typography variant='text' style={{ margin: '0px 3px 0px' }}>
            Search Product
          </Typography>
          <SearchIcon style={{ margin: '0px 3px 0px' }} />
          <TextField
            hiddenLabel
            id='filled-hidden-label-small'
            placeholder='product name'
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
                <TableCell>Product</TableCell>
                <TableCell align='right'>State</TableCell>
                <TableCell align='right'>Category</TableCell>
                <TableCell align='right'>Reference</TableCell>
                <TableCell align='right'>Date of Creation</TableCell>
                <TableCell align='right'>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredProducts === 'loading'
                ? 'loading'
                : filteredProducts
                    ?.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                    .map((row, index) => (
                      <TableRow key={v4()}>
                        <TableCell component='th' scope='row'>
                          <Box
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-around',
                            }}
                          >
                            <CardMedia
                              style={{
                                width: '2.5rem',
                                height: '2.5rem',
                              }}
                              image={
                                row.images
                                  ? row.images?.[0]?.image
                                  : 'https://picsum.photos/200/300?random=2'
                              }
                              title='product name'
                            />
                            {row.name}
                          </Box>
                        </TableCell>
                        <TableCell align='right'>
                          {row.isOnline ? 'online' : 'offline'}
                        </TableCell>
                        <TableCell align='right'>
                          {row.category ? row.category.name : 'No Category'}
                        </TableCell>
                        <TableCell align='right'>{row._id}</TableCell>
                        <TableCell align='right'>
                          {new Date().toDateString()}
                        </TableCell>
                        <TableCell align='right'>
                          <Button
                            component={Link}
                            to={`/app/products/edit/${row._id}`}
                          >
                            Edit
                          </Button>
                          <Button
                            style={{ color: 'red' }}
                            onClick={handleDelete.bind(this, row._id)}
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
            count={products === 'loading' ? 0 : products?.length}
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
        success={handleDeleteProduct}
        dialogTitle='Delete this Product ?'
      />
    </div>
  );
};

export default Products;
