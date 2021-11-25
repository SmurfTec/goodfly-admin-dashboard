import React, { useState, useContext, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import {
  Typography,
  Grid,
  Box,
  TextField,
  Button,
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@material-ui/core';
import useManyInputs from 'hooks/useManyInputs';

import useStyles from './styles';
import { toast } from 'react-toastify';
import axios from 'axios';

import LoadingOverlay from 'react-loading-overlay';
import useToggleInput from 'hooks/useToggleInput';
import { AuthContext } from 'Contexts/AuthContext';
import { makeReq } from 'utils/makeReq';
import { useTextInput } from 'hooks';

const Profile = () => {
  const classes = useStyles();
  const { user, updateMe, changeMyPassword } = useContext(AuthContext);
  const initialState = {
    firstName: user.firstName || '',
    lastName: user.lastName || '',
    email: user.email || '',
    telephoneNumber: user.telephoneNumber || '',
    facebookProfile: user.facebookProfile || '',
    instagramProfile: user.instagramProfile || '',
    twitterProfile: user.twitterProfile || '',
    snapChatProfile: user.snapChatProfile || '',
    photo: user.photo || '',
  };

  const [passwordState, handlePassChange, , , resetPassState] = useManyInputs({
    password: '',
    passwordConfirm: '',
  });

  const [isPassDialogOpen, togglePassOpen] = useToggleInput(false);

  const [
    state,
    handleTxtChange,
    handleToggleChange,
    changeInput,
    resetState,
    setState,
  ] = useManyInputs(initialState);

  const [isImageUploading, toggleImageUploading] =
    useToggleInput(false);
  const [uploadingText, setUploadingText] = useState(
    'Uploading Image...'
  );

  const handleUpdatePass = (e) => {
    e.preventDefault();
    if (passwordState.password !== passwordState.passwordConfirm) {
      toast.error('Password must be Same');
      return;
    }
    changeMyPassword({ ...passwordState });
    togglePassOpen(false);
    resetPassState();
  };

  useEffect(() => {
    setState({ ...user });
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(`state`, state);
    updateMe(state, setState);
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
          // console.log(`result onLoadEnd`, e.target.result);
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
          // console.log(`res`, res);

          setUploadingText('Updating Image ...');

          const resData = await makeReq(
            `/users/me`,
            { body: { photo: uploadedImage } },
            'PATCH'
          );
          // console.log(`resData`, resData);

          changeInput('photo', uploadedImage);

          toggleImageUploading();
        };
      } else {
        toast.error('Only Image files are acceptable !');
      }
    } catch (err) {
      toast(
        err?.response?.data?.message ||
          err.message ||
          'Something Went Wrong'
      );
      // console.log(`err`, err);
    }
  };

  return (
    <div style={{ backgroundColor: '#fff', overflow: 'hidden' }}>
      <Box>
        <Box>
          <Typography
            variant='h4'
            style={{ width: '100%', margin: '60px 20px 0px' }}
          >
            My Profile
          </Typography>
        </Box>

        <form id='profileForm' onSubmit={handleSubmit}>
          <Grid container>
            <Grid
              item
              xs={12}
              sm={7}
              md={7}
              style={{ minHeight: 400 }}
            >
              <Box className={classes.mainBox}>
                <Box className={classes.inputBox}>
                  <Typography variant='h5' className={classes.typo}>
                    First Name
                  </Typography>
                  <TextField
                    hiddenLabel
                    id='filled-hidden-label-small'
                    size='small'
                    className={classes.textInput}
                    placeholder='First Name'
                    name='firstName'
                    value={state.firstName}
                    onChange={handleTxtChange}
                    required
                  />
                </Box>
                <Box className={classes.inputBox}>
                  <Typography variant='h5' className={classes.typo}>
                    Last Name
                  </Typography>
                  <TextField
                    hiddenLabel
                    id='filled-hidden-label-small'
                    defaultValue='m.zain'
                    size='small'
                    className={classes.textInput}
                    placeholder='Last Name'
                    name='lastName'
                    value={state.lastName}
                    onChange={handleTxtChange}
                    required
                  />
                </Box>
                <Box className={classes.inputBox}>
                  <Typography variant='h5' className={classes.typo}>
                    Email
                  </Typography>
                  <TextField
                    hiddenLabel
                    id='filled-hidden-label-small'
                    defaultValue='muhammadzain8@gmail.com'
                    size='small'
                    className={classes.textInput}
                    inputProps={{ readOnly: true }}
                    placeholder='Your Email'
                    name='email'
                    value={state.email}
                    required
                  />
                </Box>
                <Box className={classes.inputBox}>
                  <Typography variant='h5' className={classes.typo}>
                    Telephone
                  </Typography>
                  <TextField
                    hiddenLabel
                    id='filled-hidden-label-small'
                    defaultValue='+2123123131'
                    size='small'
                    className={classes.textInput}
                    placeholder='TelephoneNumber'
                    name='telephoneNumber'
                    value={state.telephoneNumber}
                    onChange={handleTxtChange}
                    required
                  />
                </Box>
                <Box sx={{ pt: 5 }} />
                <Box className={classes.inputBox}>
                  <Typography variant='h5' className={classes.typo}>
                    Facebook
                  </Typography>
                  <TextField
                    hiddenLabel
                    id='filled-hidden-label-small'
                    defaultValue='www.facebook.com'
                    size='small'
                    className={classes.textInput}
                    name='facebookProfile'
                    value={state.facebookProfile}
                    onChange={handleTxtChange}
                    required
                  />
                </Box>
                <Box className={classes.inputBox}>
                  <Typography variant='h5' className={classes.typo}>
                    Instagram
                  </Typography>
                  <TextField
                    hiddenLabel
                    id='filled-hidden-label-small'
                    defaultValue='www.instagram.com'
                    size='small'
                    className={classes.textInput}
                    name='instagramProfile'
                    value={state.instagramProfile}
                    onChange={handleTxtChange}
                    required
                  />
                </Box>
                <Box className={classes.inputBox}>
                  <Typography variant='h5' className={classes.typo}>
                    Twitter
                  </Typography>
                  <TextField
                    hiddenLabel
                    id='filled-hidden-label-small'
                    defaultValue='www.twitter.com'
                    size='small'
                    className={classes.textInput}
                    name='twitterProfile'
                    value={state.twitterProfile}
                    onChange={handleTxtChange}
                    required
                  />
                </Box>
                <Box className={classes.inputBox}>
                  <Typography variant='h5' className={classes.typo}>
                    Snapchat
                  </Typography>
                  <TextField
                    hiddenLabel
                    id='filled-hidden-label-small'
                    defaultValue='www.Snapchat.com'
                    size='small'
                    className={classes.textInput}
                    name='snapChatProfile'
                    value={state.snapChatProfile}
                    onChange={handleTxtChange}
                    required
                  />
                </Box>
              </Box>
            </Grid>
            <Grid
              item
              xs={12}
              sm={5}
              md={5}
              className={classes.account}
            >
              <Box className={classes.mainBox}>
                <Typography variant='h5' style={{ width: '100%' }}>
                  Account managment
                </Typography>
                <Box
                  style={{
                    display: 'flex',
                    justifyContent: 'space-around',
                    alignItems: 'center',
                    width: '100%',
                    minHeight: 180,
                    padding: 15,
                    margin: 15,
                    flexWrap: 'wrap',
                    rowGap: 20,
                    textAlign: 'center',
                  }}
                >
                  <LoadingOverlay
                    active={isImageUploading}
                    spinner
                    text={uploadingText}
                  >
                    <Box
                      display='flex'
                      flexDirection='column'
                      justifyContent='center'
                      alignItems='center'
                    >
                      <Typography variant='h5' mb={1}>
                        Profile Photo
                      </Typography>
                      <Avatar
                        style={{
                          width: '10rem',
                          height: '8rem',
                          borderRadius: '50%',
                        }}
                        src={
                          state.photo
                            ? state.photo
                            : `https://ui-avatars.com/api/?name=${user.fullName
                                .split(' ')
                                .join(
                                  '+'
                                )}&background=0D8ABC&color=fff&rounded=true`
                        }
                        title='Live from space album cover'
                      />
                      <Box mt={1}>
                        <input
                          accept='image/*'
                          style={{ display: 'none' }}
                          id='contained-button-file'
                          onChange={handleImage}
                          type='file'
                          name='photo'
                        />
                        <label htmlFor='contained-button-file'>
                          <Button
                            variant='outlined'
                            color='primary'
                            component='span'
                          >
                            Upload
                          </Button>
                        </label>
                      </Box>
                    </Box>
                  </LoadingOverlay>

                  <Box style={{ marginBottom: 65 }}>
                    <Typography
                      variant='h5'
                      style={{ width: '100%' }}
                    >
                      New Password
                    </Typography>
                    <Button
                      variant='contained'
                      style={{ marginTop: 15, width: 150 }}
                      onClick={togglePassOpen}
                    >
                      Set New Pass
                    </Button>
                  </Box>
                </Box>
              </Box>
              <Box
                style={{
                  display: 'flex',
                  justifyContent: 'space-evenly',
                  alignItems: 'center',
                  width: '100%',
                }}
              >
                <Button
                  type='submit'
                  id='profileForm'
                  variant='contained'
                  size='medium'
                  style={{ width: 150 }}
                >
                  Update
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Box>
      <Dialog
        open={isPassDialogOpen}
        onClose={togglePassOpen}
        style={{
          border: '1px solid red',
        }}
      >
        <DialogTitle>
          <Typography variant='h4'>Changing the Paasword</Typography>
        </DialogTitle>
        <DialogContent>
          <Box
            className={classes.form}
            style={{ margin: '1rem', padding: 'o.2rem' }}
            overlayStyle={{ backgroundColor: 'transparent' }}
          >
            <TextField
              autoFocus
              margin='dense'
              id='name'
              label='New Password'
              type='password'
              name='password'
              value={passwordState.password}
              onChange={handlePassChange}
              fullWidth
              style={{ width: '40rem', marginRight: '2rem' }}
            />
            <TextField
              autoFocus
              margin='dense'
              id='name'
              label='Confirm new password'
              name='passwordConfirm'
              value={passwordState.passwordConfirm}
              onChange={handlePassChange}
              type='password'
              fullWidth
              style={{ width: '40rem', marginRight: '2rem' }}
            />
          </Box>
        </DialogContent>

        <DialogActions
          className={classes.form}
          style={{ margin: '1rem', justifyContent: 'right' }}
        >
          <Button variant='outlined' onClick={togglePassOpen}>
            Cancel
          </Button>
          <Button variant='contained' onClick={handleUpdatePass}>
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Profile;
