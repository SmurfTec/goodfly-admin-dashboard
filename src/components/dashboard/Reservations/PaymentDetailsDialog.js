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
  IconButton,
} from '@material-ui/core';

import { Plus as PlusIcon } from 'react-feather';
import { useManyInputs } from 'hooks';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Close } from '@material-ui/icons';
import { toast } from 'react-toastify';
import v4 from 'uuid/dist/v4';
import { getMuiDateFormat } from 'utils/dateMethods';

const PaymentDetailsDialog = ({
  open,
  toggleDialog,
  classes,
  handleSuccess,
  payment,
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`paymentParts`, paymentParts);

    if (
      paymentParts.reduce((accum, currentVal) => {
        return currentVal.amount * 1 + accum * 1;
      }, 0) !== payment.amount
    )
      return toast.error(
        `Payment Amounts Sum must be equal to installments amount!`
      );

    if (
      paymentParts.filter((el) => {
        if (
          !el.amount ||
          !el.date ||
          !el.paymentMethod ||
          (el.paymentMethod !== 'cash' && !el.transactionNumber)
        )
          return true;
      }).length > 0
    ) {
      return toast.error('Plz fillin all fields');
    }

    handleSuccess({
      ...state,
      paymentParts,
      date: new Date(state.date),
      paymentMethod: paymentParts[0].paymentMethod,
      transactionNumber: paymentParts[0].transactionNumber,
    });
  };

  const initialState = {
    paymentMethod: '',
    amount: '',
    date: getMuiDateFormat(new Date()),
    transactionNumber: '',
  };
  const [state, handleTxtChange, , , , setState] = useManyInputs(initialState);
  const { t } = useTranslation();

  const [paymentParts, setPaymentParts] = useState([
    {
      ...initialState,
    },
  ]);

  const addNewPart = () => {
    setPaymentParts((st) => [...st, { ...initialState }]);
  };

  const handleChange = (e, ind) => {
    if (e.target.name === 'paymentMethod') {
      if (paymentParts.find((el) => el.paymentMethod === e.target.value))
        return toast.error(
          `You Can't choose same payment methods on different parts`
        );
    }

    console.log('ind', ind);
    setPaymentParts((st) =>
      st.map((part, idx) =>
        idx === ind
          ? {
              ...part,
              [e.target.name]: e.target.value,
            }
          : part
      )
    );
  };

  useEffect(() => {
    if (!payment) return;

    setState((st) => ({
      ...st,
      amount: payment.amount,
      paymentMethod: payment.paymentMethod || '',
    }));
    if (payment?.isPaid) setPaymentParts(payment.paymentParts);
  }, [payment]);

  const handleDeletePart = (e) => {
    const { idx } = e.currentTarget.dataset;
    console.log('idx', idx);
    setPaymentParts((st) => st.filter((el, i) => i != idx));
  };

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
          {paymentParts.length === 1 && (
            <Box className={classes.flexAround} onClick={addNewPart}>
              <Typography variant='text'>
                {t('Add a payment method')}
              </Typography>
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
          )}
        </Box>
        <Divider />
        {paymentParts.map((_, idx) => (
          <form
            className={classes.paymentPart}
            id={`paymentForm${idx}`}
            onSubmit={handleSubmit}
            key={v4()}
          >
            {paymentParts.length > 1 && !payment?.isPaid && (
              <IconButton
                onClick={handleDeletePart}
                data-idx={idx}
                color='error'
                className={classes.deleteButton}
              >
                <Close />
              </IconButton>
            )}
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
              {/* {payment?.isPaid ? ( */}

              <FormControl component='fieldset' disabled={!!payment?.isPaid}>
                <RadioGroup
                  value={paymentParts[idx].paymentMethod}
                  disabled={!!payment?.isPaid}
                  onChange={(e) => {
                    handleChange(e, idx);
                  }}
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
            </Box>
            <Box className={classes.flexLeft}>
              <Box className={classes.form}>
                {paymentParts[idx].paymentMethod === 'cash' ? (
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
                    disabled={!!payment?.isPaid}
                    onChange={(e) => handleChange(e, idx)}
                    required={paymentParts[idx].amount === 'cash'}
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
                    value={paymentParts[idx].transactionNumber}
                    disabled={!!payment?.isPaid}
                    onChange={handleTxtChange}
                    name='transactionNumber'
                    required={paymentParts[idx].paymentMethod !== 'cash'}
                    disabled={!!payment?.isPaid}
                    onChange={(e) => handleChange(e, idx)}
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
                  disabled
                  style={{ marginRight: '2rem' }}
                  value={paymentParts[idx].date || state.date}
                  // value={/}
                  // onChange={(newDate) => changeInput('date', newDate)}
                  // disabled={!!payment?.isPaid}
                  // onChange={(e) => handleChange(e, idx)}
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
                  value={paymentParts[idx].amount}
                  name='amount'
                  required
                  type='number'
                  disabled={!!payment?.isPaid}
                  onChange={(e) => handleChange(e, idx)}
                />
              </Box>
            </Box>
          </form>
        ))}
      </DialogContent>
      <DialogActions
        className={classes.form}
        style={{ margin: '1rem', justifyContent: 'right' }}
      >
        <Button variant='outlined' onClick={toggleDialog}>
          {t('CANCEL')}
        </Button>
        {!!!payment?.isPaid && (
          <Button variant='contained' onClick={handleSubmit}>
            {t('VALIDATE')}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default PaymentDetailsDialog;
