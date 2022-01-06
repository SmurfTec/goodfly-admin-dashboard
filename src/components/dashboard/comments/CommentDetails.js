import React from 'react';
import { makeStyles } from '@material-ui/styles';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';

import { DialogActions, DialogContent, Typography } from '@material-ui/core';
import { useNavigate } from 'react-router';

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

export default function CommentDetails(props) {
  const { open, toggleDialog, comment, slug } = props;
  const classes = useStyles();
  const navigate = useNavigate();

  return (
    <Dialog
      aria-labelledby='simple-dialog-title'
      open={open}
      className={classes.root}
    >
      <DialogTitle id='simple-dialog-title' className={classes.Title}>
        Comment Details
      </DialogTitle>
      <DialogContent>
        <Typography
          onClick={() => {
            navigate(`/app/${slug}/${comment?.user?._id}`);
          }}
          variant='body1'
          style={{ marginBottom: '2rem', cursor: 'pointer' }}
        >
          Visitor :{comment?.user?.fullName || 'Visitor maybe deleted'}
        </Typography>

        <Typography variant='subtitl2'>Comment</Typography>
        <Typography variant='body1'>{comment?.text}</Typography>
      </DialogContent>
      <DialogActions>
        <Button variant='contained' color='info' onClick={toggleDialog}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
