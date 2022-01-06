import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';

import { DialogActions, DialogContent, TextField } from '@material-ui/core';
import { useManyInputs, useTextInput } from 'hooks';
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

export default function CommentReply(props) {
  const { open, success, toggleDialog } = props;
  const classes = useStyles();

  const [reply, handleReply, resetReply] = useTextInput('');

  const handleSubmit = (e) => {
    e.preventDefault();

    success(reply);
    resetReply();
  };

  return (
    <Dialog
      aria-labelledby='simple-dialog-title'
      open={open}
      className={classes.root}
    >
      <DialogTitle id='simple-dialog-title' className={classes.Title}>
        Reply To Comment
      </DialogTitle>
      <DialogContent>
        <form id='form' onSubmit={handleSubmit}>
          <TextField
            variant='outlined'
            value={reply}
            onChange={handleReply}
            fullWidth
            label='Reply'
            type='text'
            required
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button variant='contained' color='success' type='submit' form='form'>
          Reply
        </Button>
        <Button variant='contained' color='info' onClick={toggleDialog}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}
