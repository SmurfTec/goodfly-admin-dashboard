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
} from '@material-ui/core';

import { Plus as PlusIcon } from 'react-feather';
import { useManyInputs } from 'hooks';
import React from 'react';

const PaymentDetailsDialog = ({
  open,
  toggleDialog,
  classes,
  handleSuccess,
  payment,
}) => {
  const handleSubmit = () => {
    // handleSuccess()
  };

  const initialState = {};
  const [
    state,
    handleTxtChange,
    handleToggleChange,
    changeInput,
    resetState,
    setState,
  ] = useManyInputs(initialState);

  return (
    <Dialog open={payment} maxWidth='lg' onClose={toggleDialog}>
      <DialogTitle>
        <Typography variant='h4'>
          Payment of the due date Ref : GF125487
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Box className={classes.flexBetween} style={{ margin: 0 }}>
          <Typography variant='h5'>
            Amount of the due date : 2100.00$
          </Typography>
          <Box className={classes.flexAround}>
            <Typography variant='text'>Add a payment method</Typography>
            <Box>
              <PlusIcon
                style={{
                  borderRadius: '1.2rem',
                  width: '2.1rem',
                  marginLeft: '0.5rem',
                }}
                className={classes.icons}
              />
            </Box>
          </Box>
        </Box>
        <Divider />

        <Box
          style={{
            display: 'flex',
            justifyContent: 'right',
            alignItems: 'center',
          }}
        >
          <Typography variant='h5' mr={1}>
            Payment Method :{' '}
          </Typography>
          <FormControl component='fieldset'>
            <RadioGroup row aria-label='gender' name='row-radio-buttons-group'>
              <FormControlLabel
                value='Bank card'
                control={<Radio />}
                label='Bank card'
              />
              <FormControlLabel
                value='Bank Transfer'
                control={<Radio />}
                label='Bank Transfer'
              />
              <FormControlLabel
                value='Bank check'
                control={<Radio />}
                label='Bank check'
              />
              <FormControlLabel
                value='Espece'
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
            <TextField
              autoFocus
              margin='dense'
              id='name'
              label='Espece'
              type='text'
              fullWidth
              style={{ marginRight: '2rem' }}
            />
          </Box>
          <Box className={classes.form}>
            <TextField
              autoFocus
              margin='dense'
              id='date'
              label='20/12/21'
              type='date'
              fullWidth
              style={{ marginRight: '2rem' }}
            />
          </Box>
          <Box className={classes.form}>
            <TextField
              autoFocus
              margin='dense'
              id='payment'
              label='1000.00'
              type='text'
              fullWidth
              style={{ marginRight: '2rem' }}
            />
          </Box>
        </Box>
        <Divider />

        <Box
          style={{
            display: 'flex',
            justifyContent: 'right',
            alignItems: 'center',
          }}
        >
          <Typography variant='h5' mr={1}>
            Payment Method :{' '}
          </Typography>
          <FormControl component='fieldset'>
            <RadioGroup row aria-label='gender' name='row-radio-buttons-group'>
              <FormControlLabel
                value='Bank card'
                control={<Radio />}
                label='Bank card'
              />
              <FormControlLabel
                value='Bank Transfer'
                control={<Radio />}
                label='Bank Transfer'
              />
              <FormControlLabel
                value='Bank check'
                control={<Radio />}
                label='Bank check'
              />
              <FormControlLabel
                value='Espece'
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
            <TextField
              autoFocus
              margin='dense'
              id='name'
              label='Transaction number'
              type='text'
              fullWidth
              style={{ marginRight: '2rem' }}
            />
          </Box>
          <Box className={classes.form}>
            <TextField
              autoFocus
              margin='dense'
              id='transication'
              label='Transaction  Date'
              type='text'
              fullWidth
              style={{ marginRight: '2rem' }}
            />
          </Box>
          <Box className={classes.form}>
            <TextField
              autoFocus
              margin='dense'
              id='Transaction Amount'
              label='Transaction Amount'
              type='text'
              fullWidth
              style={{ marginRight: '2rem' }}
            />
          </Box>
        </Box>
      </DialogContent>
      <DialogActions
        className={classes.form}
        style={{ margin: '1rem', justifyContent: 'right' }}
      >
        <Button variant='outlined' onClick={toggleDialog}>
          Cancel
        </Button>
        <Button variant='contained' onClick={handleSubmit}>
          Validate
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PaymentDetailsDialog;
