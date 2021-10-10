import React from 'react';
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

const styles = makeStyles((theme) => ({
  main: {
    backgroundColor: '#f2f2f2',
    minHeight: '20rem',
    borderRadius: '0.8rem',
    padding: '1rem',
    margin: '2rem 1.5rem 2rem',
  },
  form: {
    margin: '1.4rem 0rem  3rem',
    // marginBottom: '1rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
}));

const AddStaffer = () => {
  const classes = styles();

  return (
    <div style={{ marginTop: '3rem' }}>
      <Typography variant='h5' m={2}>
        {' '}
        Add new Staffer{' '}
      </Typography>
      <Box className={classes.main}>
        <div
          style={{
            backgroundColor: '#fff',
            minHeight: '20rem',
            margin: '1rem 0rem 1rem',
            border: '1px solid #fff',
          }}
        >
          <Box className={classes.form}>
            <TextField
              id='standard-basic'
              label='name'
              variant='standard'
            />
            <TextField
              id='standard-basic'
              label='firstname'
              variant='standard'
            />
            <TextField
              id='standard-basic'
              label='Telephone mobile'
              variant='standard'
            />
          </Box>
          <Box className={classes.form}>
            <TextField
              id='standard-basic'
              label='Email Address'
              variant='standard'
              style={{ width: '45%' }}
            />
            <TextField
              id='standard-basic'
              label='Telephone Home'
              variant='standard'
            />
          </Box>
          <Box className={classes.form}>
            <TextField
              id='standard-basic'
              label='Address'
              variant='standard'
              style={{ width: '75%' }}
            />
          </Box>
          <Box className={classes.form}>
            <TextField
              id='standard-basic'
              label='Postal Code'
              variant='standard'
            />
            <TextField
              id='standard-basic'
              label='City'
              variant='standard'
            />
            <TextField
              id='standard-basic'
              label='Country'
              variant='standard'
            />
          </Box>
          <Box className={classes.form}>
            <TextField
              id='standard-basic'
              label='Password'
              variant='standard'
            />
            <TextField
              id='standard-basic'
              label='Confirm Password'
              variant='standard'
            />
          </Box>
          <Box size='large' className={classes.form}>
            <Button variant='contained'> Validate </Button>
          </Box>
        </div>
      </Box>
    </div>
  );
};

export default AddStaffer;
