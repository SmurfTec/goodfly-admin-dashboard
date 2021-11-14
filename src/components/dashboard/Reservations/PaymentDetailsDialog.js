import {
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
  Box,
  DialogActions,
  Button,
  Divider,
  FormCOntrol,
  FormControlLabel,
  Radio,
  TextField,
  FormControl,
  RadioGroup,
  Skeleton,
} from '@material-ui/core';

import { Plus as PlusIcon } from 'react-feather';
import { useManyInputs } from 'hooks';
import React, { useEffect } from 'react';

const PaymentDetailsDialog = ({
  open,
  toggleDialog,
  classes,
  handleSuccess,
  payment,
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`state`, state);
    handleSuccess({ ...state, date: new Date(state.date) });
  };

  const initialState = {
    paymentMethod: '',
    amount: '',
    date: '',
    transactionNumber: '',
  };
  const [
    state,
    handleTxtChange,
    handleToggleChange,
    changeInput,
    resetState,
    setState,
  ] = useManyInputs(initialState);

  useEffect(() => {
    if (!payment) return;

    setState((st) => ({
      ...st,
      amount: payment.amount,
      paymentMethod: payment.paymentMethod || '',
    }));
  }, [payment]);

  return (
    <Dialog open={open} maxWidth='lg' onClose={toggleDialog}>
      <DialogTitle>
        <Typography variant='h4'>
          Payment of the due date Ref : GF125487
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Box className={classes.flexBetween} style={{ margin: 0 }}>
          <Typography variant='h5'>
            Amount of the due date :{' '}
            {payment ? (
              payment.amount
            ) : (
              <Skeleton variant='react' height='10px' width='20px' />
            )}
          </Typography>
          <Box className={classes.flexAround}>
            <Typography variant='text'>Add a payment method</Typography>
            <Box>
              <PlusIcon
                style={{
                  borderRadius: '1.2rem',
                  width: '2.1rem',
                  marginLeft: '0.5rem',
                  transform: 'none',
                }}
                className={classes.icons}
              />
            </Box>
          </Box>
        </Box>
        <Divider />
        <form id='paymentForm' onSubmit={handleSubmit}>
          <Box
            style={{
              display: 'flex',
              justifyContent: 'right',
              alignItems: 'center',
            }}
          >
            <Typography variant='h5' mr={1}>
              Payment Method :
            </Typography>
            <FormControl component='fieldset'>
              <RadioGroup
                value={state.paymentMethod}
                onChange={handleTxtChange}
                row
                aria-label='gender'
                name='paymentMethod'
              >
                <FormControlLabel
                  value='bankCard'
                  control={<Radio />}
                  label='Bank Card'
                />

                <FormControlLabel
                  value='bankTransactio'
                  control={<Radio />}
                  label='Bank Transfer'
                />
                <FormControlLabel
                  value='bankCheck'
                  control={<Radio />}
                  label='Bank check'
                />
                <FormControlLabel
                  value='cash'
                  control={<Radio />}
                  label='Espece'
                />
                <FormControlLabel
                  value='Loyalty points'
                  control={<Radio />}
                  label='Loyalty points'
                />
              </RadioGroup>
            </FormControl>
          </Box>
          <Box className={classes.flexLeft}>
            <Box className={classes.form}>
              {state.paymentMethod === 'cash' ? (
                <TextField
                  autoFocus
                  margin='dense'
                  id='name'
                  label='Cash'
                  type='text'
                  value='Cash'
                  fullWidth
                  style={{ marginRight: '2rem' }}
                  // disabled
                  required={state.amount === 'cash'}
                />
              ) : (
                <TextField
                  autoFocus
                  margin='dense'
                  id='name'
                  label='Transaction number'
                  type='text'
                  fullWidth
                  style={{ marginRight: '2rem' }}
                  value={state.transactionNumber}
                  onChange={handleTxtChange}
                  name='transactionNumber'
                  required={state.paymentMethod !== 'cash'}
                />
              )}
            </Box>
            <Box className={classes.form}>
              <TextField
                autoFocus
                margin='dense'
                id='date'
                label='Date'
                type='date'
                fullWidth
                style={{ marginRight: '2rem' }}
                value={state.date}
                // onChange={(newDate) => changeInput('date', newDate)}
                onChange={handleTxtChange}
                name='date'
                required
              />
            </Box>
            <Box className={classes.form}>
              <TextField
                autoFocus
                margin='dense'
                id='payment'
                label='Payment Amount'
                fullWidth
                style={{ marginRight: '2rem' }}
                value={state.amount}
                name='amount'
                required
                type='number'
              />
            </Box>
          </Box>
        </form>
      </DialogContent>
      <DialogActions
        className={classes.form}
        style={{ margin: '1rem', justifyContent: 'right' }}
      >
        <Button variant='outlined' onClick={toggleDialog}>
          Cancel
        </Button>
        {!!!payment?.isPaid && (
          <Button variant='contained' form='paymentForm' type='submit'>
            Validate
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default PaymentDetailsDialog;
