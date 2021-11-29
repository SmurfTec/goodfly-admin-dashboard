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
  root: {},
  Title: {
    // width: '300px',
    // '& h2': {
    //   fontFamily: 'sans-serif',
    // },
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

export default function AddFlashSale(props) {
  const { open, toggleDialog, success, offer } = props;
  const classes = useStyles();

  const initialState = {
    discount: '50',
    saleExpires: getMuiDateFormat(new Date()),
    sale: true,
  };

  const [state, handleTxtChange, , , resetState, setState] =
    useManyInputs(initialState);

  useEffect(() => {
    if (!offer || !offer.sale) return;
    setState({
      discount: offer.discount,
      saleExpires: getMuiDateFormat(new Date(offer.saleExpires)),
      sale: offer.sale,
    });
  }, [offer]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (new Date(state.returnDate) <= new Date())
      return toast.error('Flash End Date must NOT be in past');

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
        Make Flash Sale
      </DialogTitle>
      <DialogContent>
        <form id='form' onSubmit={handleSubmit}>
          <TextField
            variant='outlined'
            value={state.discount}
            onChange={handleTxtChange}
            name='discount'
            fullWidth
            label='Discount Percentage'
            sx={{ marginBottom: 2, marginTop: 2 }}
            type='Number'
            inputProps={{ min: 5, max: 99 }}
          />
          <TextField
            variant='outlined'
            value={state.saleExpires}
            onChange={handleTxtChange}
            name='saleExpires'
            fullWidth
            label='Sale Finish Date'
            type='date'
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button variant='contained' color='success' type='submit' form='form'>
          Create
        </Button>
        <Button variant='contained' color='error' onClick={toggleDialog}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}
