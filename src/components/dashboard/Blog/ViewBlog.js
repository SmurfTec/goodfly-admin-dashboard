import React, { useState, useContext, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import {
  Typography,
  Grid,
  Box,
  Button,
  TextField,
  Switch,
  Container,
  IconButton,
} from '@material-ui/core';

import { Camera as CameraIcon } from 'react-feather';
import LoadingOverlay from 'react-loading-overlay';

// import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import ConfirmDialog from '../Dialogs/ConfirmDialogBox';
import { Editor } from '@tinymce/tinymce-react';
import axios from 'axios';
import { toast } from 'react-toastify';
import useToggleInput from 'hooks/useToggleInput';
import v4 from 'uuid/dist/v4';
import useTextInput from 'hooks/useTextInput';

import { BlogsContext } from 'Contexts/BlogsContext';
import { Navigate, useParams } from 'react-router';
import { getMuiDateFormat } from 'utils/dateMethods';
import NotFound from 'pages/NotFound';
import Loading from 'pages/Loading';
import { Cancel, Delete } from '@material-ui/icons';
import { useTranslation } from 'react-i18next';

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
    flexDirection: 'column',
  },
}));

const ModifyBlog = () => {
  const classes = styles();

  const { id } = useParams();
  const { t } = useTranslation();
  const { modifyBlog, getBlogFromId, blogs, loading, deleteBlog } =
    useContext(BlogsContext);

  const [notFound, setNotFound] = useState(false);

  const initialState = {
    publishDate: getMuiDateFormat(new Date()),
    title: '',
    theme: '',
    keywords: [],
    content: '',
    upload: false,
  };

  const [state, setState] = useState(initialState);

  const handleEditorChange = (e, editor) => {
    // console.clear();
    console.log('content ', editor.getContent());
    console.log('state.content ', state.content);

    let newContent = editor.getContent();
    // if (content !== state.content)
    setState((st) => ({ ...st, content: newContent }));
  };

  // const [editorState, setEditorState] = React.useState({});
  const [isImageUploading, toggleImageUploading] = useToggleInput(false);
  const [uploadingText, setUploadingText] = useState('Uploading Image...');
  const [keyword, handleChangeKeyword, resetKeyword] = useTextInput('');
  const [isOpen, setIsOpen] = useState(false);

  const [blogImages, setBlogImages] = useState([]);

  useEffect(() => {
    console.log(`loading`, loading);
    console.log(`blogs`, blogs);
    if (loading) return;

    const blog = getBlogFromId(id);
    console.log(`blog`, blog);

    if (!blog) return setNotFound(true);

    setState((st) => ({
      ...st,
      ...blog,
      publishDate: getMuiDateFormat(blog.publishDate),
    }));
    setBlogImages(blog.images);
  }, [id, blogs, loading]);

  const toggleIsOpen = () => {
    setIsOpen(!isOpen);
  };

  const handleBlogDelete = () => {
    deleteBlog(id);
    toggleIsOpen();
  };

  const handleImage = async (e) => {
    setUploadingText('Uploading Image ...');
    toggleImageUploading();
    const selectedFile = e.target.files[0];
    const fileType = ['image/'];
    try {
      console.log(`selectedFile.type`, selectedFile.type);
      if (selectedFile && selectedFile.type.includes(fileType)) {
        let reader = new FileReader();
        reader.readAsDataURL(selectedFile);
        reader.onloadend = async (e) => {
          console.log(`result onLoadEnd`, e.target.result);
          const file = e.target.result;

          // TODO  Delete Image from cloudinary if it exists on this user

          // // * 1 Upload Image on Cloudinary
          const formData = new FormData();
          formData.append('file', file);
          formData.append(
            'upload_preset',
            process.env.REACT_APP_CLOUDINARY_PRESET
          );

          const res = await axios.post(
            `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload`,
            formData
          );
          const uploadedImage = res.data.url;
          console.log(`res`, res);

          setUploadingText('Updating Image ...');

          setState((st) => ({
            ...st,
            content:
              st.content + `\n<img src="${uploadedImage}" alt='blog image' />`,
          }));

          setBlogImages((st) => [...st, uploadedImage]);
          toggleImageUploading();
        };
      } else {
        toast.error('Only Image files are acceptable !');
      }
    } catch (err) {
      toast(
        err?.response?.data?.message || err.message || 'Something Went Wrong'
      );
      console.log(`err`, err);
    }
  };

  const filterItem = (item) =>
    setState((st) => ({
      ...st,
      keywords: st.keywords.filter((el) => el !== item),
    }));

  const handleTxtChange = (e) => {
    setState((st) => ({ ...st, [e.target.name]: e.target.value }));
  };
  const handleToggleChange = (e) => {
    setState((st) => ({
      ...st,
      [e.target.name]: !st[e.target.name],
    }));
  };
  const handleAddKeyword = (e) => {
    e.preventDefault();
    if (state.keywords.length >= 5) {
      toast('Add only Five Keywords');
      return;
    }
    setState((st) => ({
      ...st,
      keywords: [...st.keywords, keyword],
    }));
    resetKeyword();
  };

  const handleUpdateBlog = () => {
    console.log(`state`, state);
    modifyBlog(id, { ...state, images: blogImages });
  };
  return (
    <Container>
      {loading ? (
        // <div className='loader'></div>
        <Loading noTitle />
      ) : notFound ? (
        <Navigate to='/notfound' />
      ) : (
        <>
          <Grid container style={{ marginTop: 50 }}>
            <Grid item sm={3} md={3}>
              <Box style={{ margin: 20 }}>
                <Typography variant='h5'>{state.title}</Typography>
                <LoadingOverlay
                  active={isImageUploading}
                  spinner
                  text={uploadingText}
                >
                  <Box className={classes.image}>
                    <label htmlFor='contained-button-file'>
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
                            onChange={handleImage}
                          />
                          <Typography style={{ color: '#808080' }}>
                            {t('Upload Image')}
                          </Typography>
                        </Box>
                      </Box>
                    </label>
                  </Box>
                </LoadingOverlay>
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
                {t('Offline')}
                <Switch
                  checked={state.upload}
                  name='upload'
                  onChange={handleToggleChange}
                  inputProps={{ 'aria-label': 'controlled' }}
                />
              </Typography>
              <Box style={{ margin: 20 }}>
                <Box
                  sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}
                >
                  <TextField
                    name='publishDate'
                    value={state.publishDate}
                    onChange={handleTxtChange}
                    id='standard-basic'
                    defaultValue={state.publishDate}
                    variant='standard'
                    style={{ marginRight: 50 }}
                    type='date'
                  />
                  <TextField
                    name='theme'
                    value={state.theme}
                    onChange={handleTxtChange}
                    id='standard-basic'
                    label={t('Theme')}
                    variant='standard'
                  />
                  <TextField
                    name='title'
                    value={state.title}
                    onChange={handleTxtChange}
                    id='standard-basic'
                    label={t('Title')}
                    variant='standard'
                    style={{ width: '100%' }}
                  />
                </Box>
              </Box>
            </Grid>
            <Grid item sm={3} md={3}>
              <form onSubmit={handleAddKeyword}>
                <Box>
                  <TextField
                    // name='Keywords'
                    value={keyword}
                    onChange={handleChangeKeyword}
                    id='standard-basic'
                    label='keywords'
                    variant='standard'
                    name='keywords'
                  />
                  <Box className={classes.keywords}>
                    {state.keywords.map((el) => (
                      <Box display='flex' alignItems='center' key={el}>
                        <Typography style={{ color: '#808080' }}>
                          {el}
                        </Typography>
                        <IconButton
                          color='error'
                          onClick={() => filterItem(el)}
                        >
                          <Cancel />
                        </IconButton>
                      </Box>
                    ))}
                  </Box>
                </Box>
              </form>
            </Grid>
          </Grid>
          <Box
            style={{
              border: '1px solid #cccccc',
              minHeight: 500,
              margin: 10,
            }}
          >
            <Editor
              // initialValue='<p>Your Blog Content Here</p>'
              init={{
                height: 500,
                menubar: false,
                plugins: [
                  'advlist autolink lists link image',
                  'charmap print preview anchor help',
                  'searchreplace visualblocks code',
                  'insertdatetime media table paste wordcount',
                ],
                toolbar:
                  'undo redo | image | formatselect | ' +
                  'bold italic backcolor forecolor | alignleft aligncenter ' +
                  'alignright alignjustify | bullist numlist outdent indent | ' +
                  'removeformat | help',
                content_style:
                  'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                // toolbar: 'undo redo | image ',
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
              // onChange={handleEditorChange}
              onEditorChange={handleEditorChange}
              value={state.content}
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
              {t('DELETE')}
            </Button>
            <Button
              onClick={handleUpdateBlog}
              variant='contained'
              size='medium'
              style={{ width: 150 }}
            >
              {t('UPDATE')}
            </Button>
          </Box>

          <ConfirmDialog
            open={isOpen}
            success={handleBlogDelete}
            toggleDialog={toggleIsOpen}
            dialogTitle='Are you Sure you want to cancel ?'
          />
        </>
      )}
    </Container>
  );
};

export default ModifyBlog;
