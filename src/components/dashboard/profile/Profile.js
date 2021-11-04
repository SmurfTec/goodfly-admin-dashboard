import React from 'react';
import { makeStyles } from '@material-ui/styles';
import {
  Typography,
  Grid,
  Box,
  TextField,
  Button,
  CardMedia,
  Avatar,
} from '@material-ui/core';
import useManyInputs from 'hooks/useManyInputs';

const styles = makeStyles((theme) => ({
  account: {
    minHeight: 200,
    marginTop: 10,
  },
  typo: {
    width: '25%',
  },
  mainBox: {
    backgroundColor: '#f2f2f2',
    borderRadius: '10px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 25,
    padding: 20,
  },
  inputBox: {
    border: 0,
    outline: 0,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
  },
  textInput: {
    width: '80%',
    backgroundColor: '#fff',
    marginBottom: 7,
  },
}));

const Profile = () => {
  const classes = styles();

  // * This will be replaced by logged User
  const user = {
    fullName: 'Umer Aziz',
  };

  const initialState = {
    name: '',
    fullName: '',
    email: '',
    telephoneNumber: '',
    facebookProfile: '',
    instagramProfile: '',
    twitterProfile: '',
    snapChatProfile: '',
    photp: '',
  };

  const [state, handleTxtChange, handleToggleChange, changeInput, resetState] =
    useManyInputs(initialState);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`state`, state);
    resetState();
  };

  const handleImage = async (e) => {
    const file = e.target.files[0];
    const convert64 = await convertTobase64(file);

    changeInput('photo', convert64);
  };

  const convertTobase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        console.log(`fileReader.result`, fileReader.result);
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        console.log(`error`, error);
        reject(error);
      };
    });
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
            <Grid item xs={12} sm={7} md={7} style={{ minHeight: 400 }}>
              <Box className={classes.mainBox}>
                <Box className={classes.inputBox}>
                  <Typography variant='h5' className={classes.typo}>
                    {' '}
                    Name{' '}
                  </Typography>
                  <TextField
                    hiddenLabel
                    id='filled-hidden-label-small'
                    defaultValue='zain'
                    size='small'
                    className={classes.textInput}
                    placeholder='Your Name'
                    name='name'
                    value={state.name}
                    onChange={handleTxtChange}
                    required
                  />
                </Box>
                <Box className={classes.inputBox}>
                  <Typography variant='h5' className={classes.typo}>
                    {' '}
                    fullName{' '}
                  </Typography>
                  <TextField
                    hiddenLabel
                    id='filled-hidden-label-small'
                    defaultValue='m.zain'
                    size='small'
                    className={classes.textInput}
                    placeholder='Your FullName'
                    name='fullName'
                    value={state.fullName}
                    onChange={handleTxtChange}
                    required
                  />
                </Box>{' '}
                <Box className={classes.inputBox}>
                  <Typography variant='h5' className={classes.typo}>
                    {' '}
                    Email{' '}
                  </Typography>
                  <TextField
                    hiddenLabel
                    id='filled-hidden-label-small'
                    defaultValue='muhammadzain8@gmail.com'
                    size='small'
                    className={classes.textInput}
                    placeholder='Your Email'
                    name='email'
                    value={state.email}
                    onChange={handleTxtChange}
                    required
                  />
                </Box>{' '}
                <Box className={classes.inputBox}>
                  <Typography variant='h5' className={classes.typo}>
                    {' '}
                    Telephone{' '}
                  </Typography>
                  <TextField
                    hiddenLabel
                    id='filled-hidden-label-small'
                    defaultValue='+2123123131'
                    size='small'
                    className={classes.textInput}
                    placeholder='Your Name'
                    name='telephoneNumber'
                    value={state.telephoneNumber}
                    onChange={handleTxtChange}
                    required
                  />
                </Box>{' '}
                <Box sx={{ pt: 5 }} />
                <Box className={classes.inputBox}>
                  <Typography variant='h5' className={classes.typo}>
                    {' '}
                    Facebook{' '}
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
                </Box>{' '}
                <Box className={classes.inputBox}>
                  <Typography variant='h5' className={classes.typo}>
                    {' '}
                    Twitter{' '}
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
                </Box>{' '}
                <Box className={classes.inputBox}>
                  <Typography variant='h5' className={classes.typo}>
                    {' '}
                    Snapchat{' '}
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
            <Grid item xs={12} sm={5} md={5} className={classes.account}>
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
                  <Box
                    display='flex'
                    flexDirection='column'
                    justifyContent='center'
                    alignItems='center'
                  >
                    <Typography variant='h5' mb={1}>
                      {' '}
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
                  <Box style={{ marginBottom: 65 }}>
                    <Typography variant='h5' style={{ width: '100%' }}>
                      New Password
                    </Typography>
                    <Button
                      variant='contained'
                      style={{ marginTop: 15, width: 150 }}
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
                  variant='contained'
                  size='medium'
                  style={{ backgroundColor: 'red', width: 150 }}
                >
                  Delete
                </Button>
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
    </div>
  );
};

export default Profile;
