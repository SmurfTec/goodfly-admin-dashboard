import React, { useContext, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/styles';

import { Typography, Box, Button, TextField } from '@material-ui/core';
import useManyInputs from 'hooks/useManyInputs';
import { StaffersContext } from 'Contexts/StaffersContext';
import { toast } from 'react-toastify';

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

  const { createNewStaffer } = useContext(StaffersContext);

  const initialState = {
    firstName: '',
    lastName: '',
    telephoneNumber: '',
    email: '',
    telephoneLineNumber: '',
    address: '',
    postalCode: '',
    city: '',
    country: '',
    password: '',
    passwordConfirm: '',
  };

  const [state, handleTxtChange, , , resetState] = useManyInputs(initialState);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`state`, state);
    if (state.password !== state.passwordConfirm) {
      toast(' Passwrod must be same');
      return;
    }
    createNewStaffer(state, resetState);
  };

  return (
    <div style={{ marginTop: '3rem' }}>
      <Typography variant='h5' m={2}>
        Add new Staffer
      </Typography>
      <form onSubmit={handleSubmit}>
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
                required
                value={state.firstName}
                name='firstName'
                type='text'
                onChange={handleTxtChange}
                id='standard-basic'
                label='firstName'
                variant='standard'
              />
              <TextField
                value={state.lastName}
                name='lastName'
                onChange={handleTxtChange}
                id='standard-basic'
                label='Last Name'
                variant='standard'
                type='text'
              />
              <TextField
                required
                value={state.telephoneNumber}
                name='telephoneNumber'
                onChange={handleTxtChange}
                id='standard-basic'
                label='Telephone mobile'
                variant='standard'
                type='text'
              />
            </Box>
            <Box className={classes.form}>
              <TextField
                required
                value={state.email}
                name='email'
                onChange={handleTxtChange}
                id='standard-basic'
                label='Email Address'
                variant='standard'
                style={{ width: '45%' }}
                type='email'
              />
              <TextField
                required
                value={state.telephoneLineNumber}
                name='telephoneLineNumber'
                onChange={handleTxtChange}
                id='standard-basic'
                label='Telephone Home'
                variant='standard'
                type='text'
              />
            </Box>
            <Box className={classes.form}>
              <TextField
                required
                value={state.address}
                name='address'
                onChange={handleTxtChange}
                id='standard-basic'
                label='Address'
                variant='standard'
                style={{ width: '75%' }}
                type='text'
              />
            </Box>
            <Box className={classes.form}>
              <TextField
                required
                value={state.postalCode}
                name='postalCode'
                onChange={handleTxtChange}
                id='standard-basic'
                label='Postal Code'
                variant='standard'
                type='text'
              />
              <TextField
                required
                value={state.city}
                name='city'
                onChange={handleTxtChange}
                id='standard-basic'
                label='City'
                variant='standard'
                type='text'
              />
              <TextField
                type='text'
                required
                value={state.country}
                name='country'
                onChange={handleTxtChange}
                id='standard-basic'
                label='Country'
                variant='standard'
              />
            </Box>
            <Box className={classes.form}>
              <TextField
                required
                type='password'
                value={state.password}
                name='password'
                onChange={handleTxtChange}
                id='standard-basic'
                label='Password'
                variant='standard'
              />
              <TextField
                required
                type='password'
                value={state.passwordConfirm}
                name='passwordConfirm'
                onChange={handleTxtChange}
                id='standard-basic'
                label='Confirm Password'
                variant='standard'
              />
            </Box>
            <Box size='large' className={classes.form}>
              <Button variant='contained' type='submit'>
                Validate
              </Button>
            </Box>
          </div>
        </Box>
      </form>
    </div>
  );
};

export default AddStaffer;
