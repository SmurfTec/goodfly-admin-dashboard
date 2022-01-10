import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/styles';

import { Typography, Box, Button, TextField } from '@material-ui/core';
import useManyInputs from 'hooks/useManyInputs';
import { StaffersContext } from 'Contexts/StaffersContext';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();

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
    if (state.password !== state.passwordConfirm) {
      toast(' Passwrod must be same');
      return;
    }
    createNewStaffer(state, resetState);
  };

  return (
    <div>
      <Typography variant='h5' m={2}>
        {t('Add New Staffer')}
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
                name={'firstName'}
                type='text'
                onChange={handleTxtChange}
                id='standard-basic'
                label={t('First Name')}
                variant='standard'
              />
              <TextField
                required
                value={state.lastName}
                name='lastName'
                onChange={handleTxtChange}
                id='standard-basic'
                label={t('Last Name')}
                variant='standard'
                type='text'
              />
              <TextField
                required
                value={state.telephoneNumber}
                name='telephoneNumber'
                onChange={handleTxtChange}
                id='standard-basic'
                label={`${t('Telephone')}/${t('Mobile')}`}
                variant='standard'
                type='number'
              />
            </Box>
            <Box className={classes.form}>
              <TextField
                required
                value={state.email}
                name='email'
                onChange={handleTxtChange}
                id='standard-basic'
                label={t('Email Address')}
                variant='standard'
                style={{ width: '40%' }}
                type='email'
              />
              <TextField
                required
                value={state.telephoneLineNumber}
                name='telephoneLineNumber'
                onChange={handleTxtChange}
                id='standard-basic'
                label={t('Telephone Home')}
                variant='standard'
                type='number'
              />
            </Box>
            <Box className={classes.form}>
              <TextField
                required
                value={state.address}
                name='address'
                onChange={handleTxtChange}
                id='standard-basic'
                label={t('Address')}
                variant='standard'
                style={{ width: '68%' }}
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
                label={t('Postal Code')}
                variant='standard'
                type='number'
              />
              <TextField
                required
                value={state.city}
                name='city'
                onChange={handleTxtChange}
                id='standard-basic'
                label={t('City')}
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
                label={t('Country')}
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
                label={t('Password')}
                variant='standard'
              />
              <TextField
                required
                type='password'
                value={state.passwordConfirm}
                name='passwordConfirm'
                onChange={handleTxtChange}
                id='standard-basic'
                label={t('Confirm Password')}
                variant='standard'
              />
            </Box>
            <Box size='large' className={classes.form}>
              <Button variant='contained' type='submit'>
                {t('VALIDATE')}
              </Button>
            </Box>
          </div>
        </Box>
      </form>
    </div>
  );
};

export default AddStaffer;
