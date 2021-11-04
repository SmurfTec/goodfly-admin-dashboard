import React, { useState, useRef } from 'react';
import { makeStyles } from '@material-ui/styles';
import {
  Typography,
  Grid,
  Box,
  Button,
  TextField,
  Switch,
  CardMedia,
} from '@material-ui/core';

import { Camera as CameraIcon } from 'react-feather';

// import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import ConfirmDialog from '../Dialogs/ConfirmDialogBox';
import { Editor } from '@tinymce/tinymce-react';

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

  const [paragraphs, setParagraphs] = useState([]);

  const handleEditorChange = (e) => {
    console.clear();
    console.log(`e.target.value`, e.target.value);
    console.log(e.target.getContent());

    let content = e.target.getContent();
    // * Separate Paragraphs
    let paras = content.split('</p>');

    // * Remove "" para in the end
    paras.pop();

    // * remove "<p>" , "&nbsp" , "\n" etc from paras
    paras = paras.map((para) => para.replace(/<p>|&nbsp;|\n/g, ''));

    // * remove empty paragraphs ""
    paras = paras.filter((el) => !!el);

    console.log(`paras`, paras);
    setParagraphs(paras);
  };

  const editorRef = useRef(null);
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };

  const [checked, setChecked] = React.useState(true);
  // const [editorState, setEditorState] = React.useState({});
  const [state, setState] = useState({
    dateOfPublish: '2021-10-04',
  });
  const [isOpen, setIsOpen] = useState(false);
  const toggleIsOpen = () => {
    setIsOpen(!isOpen);
  };

  const toggle = (event) => {
    setChecked(event.target.checked);
  };

  // const handleChange = (e) => {
  //   setState((st) => ({ ...st, [e.target.name]: e.target.value }));
  // };

  // const handleEditor = () => {
  //   console.log('setEditor');
  // };
  const handleBlogCancel = () => {
    toggleIsOpen();
  };

  return (
    <div>
      <Grid container style={{ marginTop: 50 }}>
        <Grid item sm={3} md={3}>
          <Box style={{ margin: 20 }}>
            <Typography variant='h5'>New Article</Typography>
            <Box className={classes.image}>
              <Box>
                <Box style={{ textAlign: 'center' }}>
                  <CameraIcon style={{ color: '#808080' }} />
                </Box>
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
          </Box>
        </Grid>
        <Grid item sm={6} md={6}>
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
        <Grid item sm={3} md={3}>
          <Box>
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
          margin: 10,
        }}
      >
        {/* <Editor
          // editorState={setEditorState}
          toolbarClassName='toolbarClassName'
          wrapperClassName='wrapperClassName'
          editorClassName='editorClassName'
          // onEditorStateChange={handleEditor}
        /> */}
        <Editor
          initialValue='<p>Your Blog Content Here</p>'
          init={{
            height: 500,
            menubar: false,
            plugins: [
              'advlist autolink lists link image',
              'charmap print preview anchor help',
              'searchreplace visualblocks code',
              'insertdatetime media table paste wordcount',
            ],
            toolbar: 'undo redo | image ',
            automatic_uploads: true,
            // add custom filepicker only to Image dialog
            file_picker_types: 'image',
            // file_picker_callback: function (cb, value, meta) {
            //   var input = document.createElement('input');
            //   input.setAttribute('type', 'file');
            //   input.setAttribute('accept', 'image/*');

            //   input.onchange = function () {
            //     var file = this.files[0];
            //     var reader = new FileReader();

            //     reader.onload = function () {
            //       console.log(`reader.result`, reader.result);
            //       // var id = 'blobid' + new Date().getTime();
            //       // var blobCache = Editor.activeEditor.editorUpload.blobCache;
            //       // var base64 = reader.result.split(',')[1];
            //       // var blobInfo = blobCache.create(id, file, base64);
            //       // blobCache.add(blobInfo);
            //       // // call the callback and populate the Title field with the file name
            //       cb('', { title: file.name });
            //     };
            //     reader.readAsDataURL(file);
            //   };

            //   input.click();
            // },
          }}
          apiKey='xof67rwsnw3lkcm0cgnxpki7y4onajon4fxcahqdpmog5qba'
          onChange={handleEditorChange}
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
          onClick={toggleIsOpen}
        >
          Cancel
        </Button>
        <Button variant='contained' size='medium' style={{ width: 150 }}>
          Create
        </Button>
      </Box>

      <ConfirmDialog
        open={isOpen}
        Success={handleBlogCancel}
        toggleDialog={toggleIsOpen}
        dialogTitle=' Are you Sure you want to cancel ?'
      ></ConfirmDialog>
    </div>
  );
};

export default CreateBlog;
