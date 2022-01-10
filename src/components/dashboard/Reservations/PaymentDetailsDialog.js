import {
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
  Box,
  DialogActions,
  Button,
  Divider,
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
import { useTranslation } from 'react-i18next';

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
  const [state, handleTxtChange, , , , setState] = useManyInputs(initialState);
  const { t } = useTranslation();

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
          {t('Payment of the due date Ref')} : GF125487
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Box className={classes.flexBetween} style={{ margin: 0 }}>
          <Typography variant='h5'>
            {t('Amount of the due date')} :{' '}
            {payment ? (
              payment.amount
            ) : (
              <Skeleton variant='react' height='10px' width='20px' />
            )}
          </Typography>
          <Box className={classes.flexAround}>
            <Typography variant='text'>{t('Add a payment method')}</Typography>
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
              {t('Payment Method')} : {payment?.paymentMethod}
            </Typography>
            {payment?.isPaid ? (
              <Box>
                <Typography variant='h5'>
                  {t('Paid On')}{' '}
                  {new Date(payment.paidDate).toLocaleDateString()}
                </Typography>
              </Box>
            ) : (
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
                    label={t('Bank Card')}
                  />

                  <FormControlLabel
                    value='bankTransaction'
                    control={<Radio />}
                    label={t('Bank Transfer')}
                  />
                  <FormControlLabel
                    value='bankCheck'
                    control={<Radio />}
                    label={t('Bank Check')}
                  />
                  <FormControlLabel
                    value='cash'
                    control={<Radio />}
                    label={t('Cash')}
                  />
                  <FormControlLabel
                    value='Loyalty points'
                    control={<Radio />}
                    label={t('Loyalty points')}
                  />
                </RadioGroup>
              </FormControl>
            )}
          </Box>
          {!payment?.isPaid && (
            <Box className={classes.flexLeft}>
              <Box className={classes.form}>
                {state.paymentMethod === 'cash' ? (
                  <TextField
                    autoFocus
                    margin='dense'
                    id='name'
                    label={t('Cash')}
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
                    label={t('Transaction number')}
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
                  label={t('Date')}
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
                  label={t('Payment Amount')}
                  fullWidth
                  style={{ marginRight: '2rem' }}
                  value={state.amount}
                  name='amount'
                  required
                  type='number'
                />
              </Box>
            </Box>
          )}
        </form>
      </DialogContent>
      <DialogActions
        className={classes.form}
        style={{ margin: '1rem', justifyContent: 'right' }}
      >
        <Button variant='outlined' onClick={toggleDialog}>
          {t('CANCEL')}
        </Button>
        {!!!payment?.isPaid && (
          <Button variant='contained' form='paymentForm' type='submit'>
            {t('VALIDATE')}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default PaymentDetailsDialog;
