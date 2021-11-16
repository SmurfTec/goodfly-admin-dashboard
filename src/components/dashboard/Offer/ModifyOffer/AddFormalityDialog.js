import React, { useState } from 'react';
import {
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  Box,
} from '@material-ui/core';
import { useManyInputs } from 'hooks';

const AddFormalityDialog = ({ open, toggleDialog, submit }) => {
  const initialState = {
    title: '',
    subtitle: '',
    description: '',
  };
  const [state, handleTxtChange, , , resetState] = useManyInputs(initialState);

  const handleSubmit = (e) => {
    e.preventDefault();

    submit(state);
    resetState();
  };
  return (
    <Dialog open={open} fullWidth onClose={toggleDialog}>
      <form onSubmit={handleSubmit}>
        <DialogTitle>Add a Formality</DialogTitle>
        <DialogContent>
          <TextField
            type='text'
            placeholder='Title of Formality '
            name='title'
            size='small'
            style={{
              backgroundColor: '#fff',
              width: '100%',
            }}
            required
            onChange={handleTxtChange}
            value={state.title}
          />
          <TextField
            type='text'
            placeholder='Subtitle '
            name='subtitle'
            size='small'
            style={{
              backgroundColor: '#fff',
              width: '100%',
              margin: '0.5rem 0rem 1rem',
            }}
            required
            onChange={handleTxtChange}
            value={state.subtitle}
          />
          <TextField
            type='text'
            placeholder='Description of Formality '
            name='description'
            multiline
            rows={10}
            style={{
              backgroundColor: '#fff',
              width: '100%',
              marginTop: '1rem',
            }}
            required
            onChange={handleTxtChange}
            value={state.description}
          />
        </DialogContent>
        <DialogActions>
          <Box
            style={{
              display: 'flex',
              alignitems: 'center',
              justifyContent: 'right',
              margin: '1rem',
            }}
          >
            <Button
              variant='outlined'
              style={{ width: '8rem', marginRight: '1rem' }}
              onClick={toggleDialog}
            >
              Cancel
            </Button>
            <Button variant='contained' style={{ width: '8rem' }} type='submit'>
              Validate
            </Button>
          </Box>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default AddFormalityDialog;
