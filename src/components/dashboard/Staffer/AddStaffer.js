import React from 'react';
import { makeStyles } from '@material-ui/styles';

import {
  Typography,
  Box,
  Button,
  TextField,
} from '@material-ui/core';
import useManyInputs from 'hooks/useManyInputs';

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

  const initialState = {
    name: '',
    fullName: '',
    telephoneNumber: '',
    email: '',
    telephoneLineNumber: '',
    address: '',
    postalCode: '',
    ciy: '',
    country: '',
    password: '',
    passwordConfirm: '',
  };

  const [state, handleTxtChange, , , resetState] =
    useManyInputs(initialState);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`state`, state);
    if (state.password !== state.passwordConfirm) {
      alert(' Passwrod must be same bruno');
      return;
    }
    resetState(); // reset data-fields
  };

  return (
    <div style={{ marginTop: '3rem' }}>
      <Typography variant='h5' m={2}>
        {' '}
        Add new Staffer{' '}
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
                value={state.name}
                name='name'
                onChange={handleTxtChange}
                id='standard-basic'
                label='name'
                variant='standard'
              />
              <TextField
                required
                value={state.fullName}
                name='fullName'
                onChange={handleTxtChange}
                id='standard-basic'
                label='fullnName'
                variant='standard'
              />
              <TextField
                required
                value={state.telephoneNumber}
                name='telephoneNumber'
                onChange={handleTxtChange}
                id='standard-basic'
                label='Telephone mobile'
                variant='standard'
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
              />
              <TextField
                required
                value={state.telephoneLineNumber}
                name='telephoneLineNumber'
                onChange={handleTxtChange}
                id='standard-basic'
                label='Telephone Home'
                variant='standard'
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
              />
              <TextField
                required
                value={state.city}
                name='city'
                onChange={handleTxtChange}
                id='standard-basic'
                label='City'
                variant='standard'
              />
              <TextField
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
