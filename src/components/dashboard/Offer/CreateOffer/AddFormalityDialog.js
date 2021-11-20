import React, { useState } from 'react';
import {
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  Box,
  Typography,
} from '@material-ui/core';
import { useManyInputs } from 'hooks';
import { Editor } from '@tinymce/tinymce-react';

const AddFormalityDialog = ({ open, toggleDialog, submit }) => {
  const initialState = {
    title: '',
    content: '',
  };
  const [state, handleTxtChange, , , resetState, setState] =
    useManyInputs(initialState);

  const handleEditorChange = (e, editor) => {
    // console.clear();
    let newContent = editor.getContent();
    // if (content !== state.content)
    setState((st) => ({ ...st, content: newContent }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    resetState();

    submit(state);
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
          <Typography sx={{ mt: 2, mb: 2 }} variant='h5'>
            Description
          </Typography>
          <Editor
            initialValue=''
            init={{
              height: 500,
              menubar: false,
              plugins: [
                'advlist autolink lists link',
                'charmap preview anchor help',
                'searchreplace visualblocks code',
                'insertdatetime paste wordcount',
              ],
              toolbar:
                'undo redo | formatselect | ' +
                'bold italic backcolor | alignleft aligncenter ' +
                'alignright alignjustify | bullist numlist outdent indent | ' +
                'removeformat | help',
              content_style:
                'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
            }}
            apiKey='xof67rwsnw3lkcm0cgnxpki7y4onajon4fxcahqdpmog5qba'
            // onChange={handleEditorChange}
            onEditorChange={handleEditorChange}
            value={state.content}
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
