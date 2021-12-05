import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import { blue, red } from '@material-ui/core/colors';

import { DialogActions, DialogContent, TextField } from '@material-ui/core';
import { useManyInputs } from 'hooks';
import { toast } from 'react-toastify';
import { getMuiDateFormat } from 'utils/dateMethods';

const useStyles = makeStyles({
  root: {
    '& .MuiDialogContent-root': {
      paddingTop: 20,
      minWidth: 400,
    },
  },
  Title: {
    // width: '300px',
    // '& h2': {
    //   fontFamily: 'sans-serif',
    // },
  },
});

export default function AddPromo(props) {
  const { open, success } = props;
  const classes = useStyles();

  const initialState = {
    promoExpires: getMuiDateFormat(new Date()),
    isPromo: true,
  };

  const [state, handleTxtChange, , , resetState] = useManyInputs(initialState);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (new Date(state.returnDate) <= new Date())
      return toast.error('Flash End Date must NOT be in past');

    success({ promoExpires: new Date(state.promoExpires), isPromo: true });
    resetState();
  };

  return (
    <Dialog
      aria-labelledby='simple-dialog-title'
      open={open}
      className={classes.root}
    >
      <DialogTitle id='simple-dialog-title' className={classes.Title}>
        Mark as Fresh Arival
      </DialogTitle>
      <DialogContent>
        <form id='form' onSubmit={handleSubmit}>
          <TextField
            variant='outlined'
            value={state.promoExpires}
            onChange={handleTxtChange}
            name='promoExpires'
            fullWidth
            label='Arrival End Date'
            type='date'
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button variant='contained' color='success' type='submit' form='form'>
          Yes
        </Button>
        <Button variant='contained' color='info' onClick={() => success({})}>
          No
        </Button>
      </DialogActions>
    </Dialog>
  );
}
