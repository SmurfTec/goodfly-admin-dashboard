import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import {
  Typography,
  Grid,
  Box,
  Button,
  TextField,
  Switch,
} from '@material-ui/core';

import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const styles = makeStyles((theme) => ({
  image: {
    minHeight: 130,
    marginTop: 15,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    border: `3px dashed #808080`,
    maxWidth: 190,
  },
  keywords: {
    minHeight: 130,
    backgroundColor: '#f2f2f2',
    marginTop: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    border: `3px dashed #808080`,
    maxWidth: 185,
  },
}));

const CreateBlog = () => {
  const classes = styles();

  const [checked, setChecked] = React.useState(true);
  const [editorState, setEditorState] = React.useState({});
  const [state, setState] = useState({
    dateOfPublish: '2021-10-04',
  });

  const toggle = (event) => {
    setChecked(event.target.checked);
  };

  const handleChange = (e) => {
    setState((st) => ({ ...st, [e.target.name]: e.target.value }));
  };

  const handleEditor = () => {
    console.log('setEditor');
  };

  return (
    <div>
      <Grid container style={{ marginTop: 50 }}>
        <Grid item sm={3} md={2}>
          <Box style={{ margin: 20 }}>
            <Typography variant='h5'>New Article</Typography>
            <Box className={classes.image}>
              <Box mt={1}>
                <input
                  accept='image/*'
                  style={{ display: 'none' }}
                  id='contained-button-file'
                  multiple
                  type='file'
                />
                <label htmlFor='contained-button-file'>
                  <Typography style={{ color: '#808080' }}>
                    Upload Image
                  </Typography>
                </label>
              </Box>
            </Box>
          </Box>
        </Grid>
        <Grid item sm={6} md={5}>
          <Typography
            variant='h5'
            style={{
              width: '100%',
              textAlign: 'right',
            }}
          >
            Offline
            <Switch
              checked={checked}
              onChange={toggle}
              inputProps={{ 'aria-label': 'controlled' }}
            />
          </Typography>
          <Box style={{ margin: 20 }}>
            <Box>
              <TextField
                name='dateOfPublish'
                value={state.dateOfPublish}
                // onChange={handleChange}
                id='standard-basic'
                label='Date of Publish'
                variant='standard'
                style={{ marginRight: 50 }}
                type='date'
              />
              <TextField
                name='theme'
                // value={state.theme}
                // onChange={handleChange}
                id='standard-basic'
                label='Theme of Article'
                variant='standard'
              />
              <TextField
                name='title'
                // value={state.Title}
                // onChange={handleChange}
                id='standard-basic'
                label='Title of Article'
                variant='standard'
                style={{ width: '100%' }}
              />
            </Box>
          </Box>
        </Grid>
        <Grid item sm={3} md={2}>
          <Box style={{ marginLeft: 10 }}>
            <TextField
              name='Keywords'
              // value={state.Title}
              // onChange={handleChange}
              id='standard-basic'
              label='keywords'
              variant='standard'
            />
            <Box className={classes.keywords}>
              <Typography style={{ color: '#808080' }}></Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
      <Box
        style={{
          border: '1px solid #cccccc',
          minHeight: 500,
          margin: 20,
        }}
      >
        <Editor
          // editorState={setEditorState}
          toolbarClassName='toolbarClassName'
          wrapperClassName='wrapperClassName'
          editorClassName='editorClassName'
          // onEditorStateChange={handleEditor}
        />
      </Box>
      <Box
        style={{
          display: 'flex',
          justifyContent: 'space-evenly',
          alignItems: 'center',
          width: '100%',
          marginBottom: 20,
        }}
      >
        <Button
          variant='contained'
          size='medium'
          style={{ backgroundColor: 'red', width: 150 }}
        >
          Cancel
        </Button>
        <Button
          variant='contained'
          size='medium'
          style={{ width: 150 }}
        >
          Create
        </Button>
      </Box>
    </div>
  );
};

export default CreateBlog;
