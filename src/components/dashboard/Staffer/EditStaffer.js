import React, { useState, useEffect, useContext } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Link } from 'react-router-dom';

import {
  Typography,
  Box,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Container,
} from '@material-ui/core';
import { StaffersContext } from 'Contexts/StaffersContext';
import { Navigate, useParams } from 'react-router';
import useManyInputs from 'hooks/useManyInputs';
import { toast } from 'react-toastify';
import Loading from 'pages/Loading';
import NotFound from 'pages/NotFound';
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
  '.MuiDialogContent-root': {
    backgroundColor: '#f2f2f2',
  },
}));

const EditStaffer = () => {
  const classes = styles();

  const { loading, getStafferById, staffers, modifyStaffer, modifyPassword } =
    useContext(StaffersContext);

  const { id } = useParams();

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
  const [notFound, setNotFound] = useState(false);

  const [openPass, setOpenPass] = useState(false);
  const { t } = useTranslation();

  const [state, handleTxtChange, , , , setState] = useManyInputs(initialState);

  // update the update-states
  useEffect(() => {
    if (loading) return;
    const staffer = getStafferById(id);
    console.log(`staffer`, staffer);

    if (!staffer) return setNotFound(true);

    setState({
      ...initialState,
      ...staffer,
    });
  }, [id, staffers, loading]);

  const handleSubmit = (e) => {
    e.preventDefault();
    modifyStaffer(id, { ...state });
  };

  const handleUpdatePass = (e) => {
    e.preventDefault();
    if (state.password !== state.passwordConfirm) {
      toast.error(' Password Should be Same');
      return;
    }
    modifyPassword(id, { ...state });
    setOpenPass(false);
  };
  const handleClickOpenPass = () => {
    setOpenPass(true);
  };

  const handleClosePass = () => {
    setOpenPass(false);
  };

  return (
    <Container>
      {loading ? (
        <Loading noTitle />
      ) : notFound ? (
        <Navigate to='/notfound' />
      ) : (
        <>
          <div>
            <Typography variant='h5' m={2}>
              {t('Modify the Staffer Ref')}:GO1245
            </Typography>
            {loading ? (
              <div className='loader'></div>
            ) : (
              <Box className={classes.main}>
                <Box size='large' className={classes.form}>
                  <Button
                    variant='outlined'
                    component={Link}
                    to='/app/staffers'
                    className={classes.topButtons}
                  >
                    {t('Back to the List')}
                  </Button>
                  <Button
                    variant='outlined'
                    onClick={handleClickOpenPass}
                    className={classes.topButtons}
                  >
                    {t('Change Password')}
                  </Button>
                </Box>
                <div
                  style={{
                    backgroundColor: '#fff',
                    minHeight: '20rem',
                    marginBottom: '1rem',
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
                      style={{ width: '45%' }}
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
                  <Box
                    size='large'
                    className={classes.form}
                    style={{ justifyContent: 'center' }}
                  >
                    <Button
                      variant='contained'
                      onClick={handleSubmit}
                      style={{ width: '12rem' }}
                    >
                      {t('UPDATE')}
                    </Button>
                  </Box>
                </div>
              </Box>
            )}
          </div>
          {/*DIALOG FOR PASSWORD UPDATE */}
          <Dialog
            open={openPass}
            onClose={handleClosePass}
            style={{
              border: '1px solid red',
            }}
          >
            <DialogTitle>
              <Typography variant='h4'>{t('Changing the Password')}</Typography>
            </DialogTitle>
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
                  label={t('New Password')}
                  type='password'
                  name='password'
                  value={state.password}
                  onChange={handleTxtChange}
                  fullWidth
                  style={{ width: '40rem', marginRight: '2rem' }}
                />
                <TextField
                  autoFocus
                  margin='dense'
                  id='name'
                  label={t('Confirm New Password')}
                  name='passwordConfirm'
                  value={state.passwordConfirm}
                  onChange={handleTxtChange}
                  type='password'
                  fullWidth
                  style={{ width: '40rem', marginRight: '2rem' }}
                />
              </Box>
            </DialogContent>

            <DialogActions
              className={classes.form}
              style={{ margin: '1rem', justifyContent: 'right' }}
            >
              <Button variant='outlined' onClick={handleClosePass}>
                {t('CANCEL')}
              </Button>
              <Button variant='contained' onClick={handleUpdatePass}>
                {t('UPDATE')}
              </Button>
            </DialogActions>
          </Dialog>
        </>
      )}
    </Container>
  );
};

export default EditStaffer;
