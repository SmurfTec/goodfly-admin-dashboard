import React from 'react';
import { makeStyles } from '@material-ui/styles';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import { blue, red } from '@material-ui/core/colors';

import { DialogActions, DialogContent, TextField } from '@material-ui/core';
import { useManyInputs } from 'hooks';
import { toast } from 'react-toastify';

const useStyles = makeStyles({
  root: {},
  Title: {
    // width: '300px',
    '& h2': {
      fontFamily: 'sans-serif',
    },
  },
  List: {
    '& span': {
      fontFamily: 'sans-serif',
    },
  },
  yesIcon: {
    backgroundColor: blue[100],
    color: blue[600],
  },
  cancelIcon: {
    backgroundColor: red[100],
    color: red[600],
  },
});

export default function AddDepartureDates(props) {
  const { open, toggleDialog, dialogTitle, success } = props;
  const classes = useStyles();

  const initialState = {
    departureDate: '',
    returnDate: '',
  };
  const [state, handleTxtChange, , , resetState, ,] =
    useManyInputs(initialState);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (new Date(state.departureDate) <= new Date())
      return toast.error('Departure Date must NOT be in the past');

    if (new Date(state.returnDate) <= new Date())
      return toast.error('Return Date must NOT be in the past');

    if (new Date(state.departureDate) >= new Date(state.returnDate))
      return toast.error('Return Date must be greater than departureDate');
    success({ ...state });
    resetState();
    toggleDialog();
  };

  return (
    <Dialog
      onClose={toggleDialog}
      aria-labelledby='simple-dialog-title'
      open={open}
      className={classes.root}
    >
      <DialogTitle id='simple-dialog-title' className={classes.Title}>
        Add Reservation Dates
      </DialogTitle>
      <DialogContent>
        <form id='form' onSubmit={handleSubmit}>
          <TextField
            variant='outlined'
            value={state.departureDate}
            onChange={handleTxtChange}
            name='departureDate'
            fullWidth
            label='Departure Date'
            sx={{ marginBottom: 2, marginTop: 2 }}
            type='date'
          />
          <TextField
            variant='outlined'
            value={state.returnDate}
            onChange={handleTxtChange}
            name='returnDate'
            fullWidth
            label='Return Date'
            type='date'
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button variant='contained' color='success' type='submit' form='form'>
          Add
        </Button>
        <Button variant='contained' color='error' onClick={toggleDialog}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}
