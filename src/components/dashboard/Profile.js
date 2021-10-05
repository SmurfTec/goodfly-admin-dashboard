import React from 'react';
import { makeStyles } from '@material-ui/styles';
import {
  Typography,
  Grid,
  Box,
  TextField,
  Button,
  Avatar,
} from '@material-ui/core';

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
                  {' '}
                  Name{' '}
                </Typography>
                <TextField
                  hiddenLabel
                  id='filled-hidden-label-small'
                  defaultValue='zain'
                  size='small'
                  className={classes.textInput}
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
                />
              </Box>
              <Box className={classes.inputBox}>
                <Typography variant='h5' className={classes.typo}>
                  {' '}
                  Instagram{' '}
                </Typography>
                <TextField
                  hiddenLabel
                  id='filled-hidden-label-small'
                  defaultValue='www.instagram.com'
                  size='small'
                  className={classes.textInput}
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
                }}
              >
                <Box>
                  <Typography variant='h5'> Profile Photo</Typography>
                  <Avatar
                    alt='Cindy Baker'
                    src='/static/images/avatar/3.jpg'
                    sx={{ width: 100, height: 100 }}
                    style={{ marginTop: 15 }}
                  />
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
                variant='contained'
                size='medium'
                style={{ width: 150 }}
              >
                Update
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default Profile;
