import React from 'react';
import {
  Typography,
  Box,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@material-ui/core';

import useManyInputs from 'hooks/useManyInputs';
import { toast } from 'react-toastify';
import { makeReq, handleCatch } from 'utils/makeReq';

const SendEmail = (props) => {
  const { id, open, toggleDialog } = props;
  const initialState = {
    subject: '',
    emailContent: '',
  };

  const [state, handleTxtChange, , , , setState] = useManyInputs(initialState);

  const handleSendEmail = async (e) => {
    e.preventDefault();
    if (state.subject === '' || state.emailContent === '') {
      toast.error('subject or emailContent cannot be empty');
      return;
    }
    try {
      await makeReq(
        `/users/email/${id}`,
        {
          body: {
            subject: state.subject,
            emailContent: state.emailContent,
          },
        },
        'POST'
      );
      toast.success('Email Sent Success');
      setState(initialState);
      toggleDialog();
    } catch (err) {
      handleCatch(err);
    }
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={toggleDialog}
        style={{
          border: '1px solid red',
        }}
      >
        <DialogTitle>
          <Typography variant='h4'>Send Email</Typography>
        </DialogTitle>
        <DialogContent>
          <Box
            // className={classes.form}
            style={{ margin: '1rem', padding: 'o.2rem' }}
            overlayStyle={{ backgroundColor: 'transparent' }}
          >
            <TextField
              autoFocus
              margin='dense'
              id='subject'
              label='Subject'
              type='text'
              name='subject'
              value={state.subject}
              onChange={handleTxtChange}
              fullWidth
              style={{ width: '40rem', marginRight: '2rem' }}
            />
            <TextField
              autoFocus
              margin='dense'
              id='emailContent'
              label='Email Content'
              name='emailContent'
              value={state.emailContent}
              onChange={handleTxtChange}
              type='text'
              fullWidth
              multiline
              minRows={5}
              style={{ width: '40rem', marginRight: '2rem' }}
            />
          </Box>
        </DialogContent>

        <DialogActions
          // className={classes.form}
          style={{ margin: '1rem', justifyContent: 'right' }}
        >
          <Button variant='outlined' onClick={toggleDialog}>
            Cancel
          </Button>
          <Button variant='contained' onClick={handleSendEmail}>
            Send
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default SendEmail;
