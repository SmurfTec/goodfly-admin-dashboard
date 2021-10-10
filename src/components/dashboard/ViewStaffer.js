import React from 'react';
import { makeStyles } from '@material-ui/styles';

import {
  Typography,
  Box,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
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

const ViewStaffer = () => {
  const classes = styles();

  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const [openPass, setOpenPass] = React.useState(false);
  const handleClickOpenPass = () => {
    setOpenPass(true);
  };

  const handleClosePass = () => {
    setOpenPass(false);
  };

  return (
    <div style={{ marginTop: '3rem' }}>
      <Typography variant='h5' m={2}>
        {' '}
        Modify the Staffer Ref:GO1245
      </Typography>
      <Box className={classes.main}>
        <Box size='large' className={classes.form}>
          <Button variant='outlined' className={classes.topButtons}>
            {' '}
            Back to the List
          </Button>
          <Button
            variant='outlined'
            onClick={handleClickOpenPass}
            className={classes.topButtons}
          >
            {' '}
            Change Password
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
          <Box
            size='large'
            className={classes.form}
            style={{ justifyContent: 'center' }}
          >
            <Button
              variant='outlined'
              onClick={handleClickOpen}
              style={{
                width: '12rem',
                margin: '0rem 1rem 0rem',
                border: '1px solid red',
                color: 'red',
              }}
            >
              {' '}
              Delete{' '}
            </Button>
            <Button variant='contained' style={{ width: '12rem' }}>
              {' '}
              Update{' '}
            </Button>
          </Box>
        </div>
      </Box>

      {/*  DOALOG FOR DELETING A USER */}
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
              Are you Sure you want to Delete User.
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
      {/*  DIALOG FOR PASSWORD UPDATE */}
      <div>
        <Dialog
          open={openPass}
          onClose={handleClose}
          style={{
            border: '1px solid red',
          }}
        >
          <DialogTitle style={{ width: '100rem' }}>
            <Typography variant='h4'>
              Changing the Paaseword
            </Typography>
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
                label='new password'
                type='email'
                fullWidth
                style={{ width: '40rem', marginRight: '2rem' }}
              />
              <TextField
                autoFocus
                margin='dense'
                id='name'
                label='Confirm new password'
                type='email'
                fullWidth
                style={{ width: '40rem', marginRight: '2rem' }}
              />
            </Box>
          </DialogContent>
          <DialogActions
            className={classes.form}
            style={{ margin: '1rem', justifyContent: 'center' }}
          >
            <Button variant='outlined' onClick={handleClosePass}>
              Cancel
            </Button>
            <Button variant='contained' onClick={handleClosePass}>
              Subscribe
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};

export default ViewStaffer;
