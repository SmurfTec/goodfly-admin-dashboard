import React from 'react';
import { makeStyles } from '@material-ui/styles';
import {
  Typography,
  Grid,
  Box,
  TextField,
  Button,
  Paper,
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

const VisitorProfile = () => {
  const classes = styles();

  return (
    <div style={{ backgroundColor: '#fff', overflow: 'hidden' }}>
      <Box>
        <Box>
          <Typography
            variant='h4'
            style={{ width: '100%', margin: '60px 20px 0px' }}
          >
            New Customer
          </Typography>
        </Box>

        <Grid container>
          <Grid item xs={12} sm={7} md={7} style={{ minHeight: 400 }}>
            <Box className={classes.mainBox}>
              <Box
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  width: '100%',
                  margin: '10px 0px 30px ',
                }}
              >
                <Typography variant='h4'> Client Profile</Typography>
                <div style={{ display: 'flex' }}>
                  <Typography
                    variant='h5'
                    style={{ margin: '0px 10px 0px' }}
                  >
                    {' '}
                    Number{' '}
                  </Typography>
                  <Paper
                    style={{
                      width: 70,
                      height: 25,
                      textAlign: 'right',
                      padding: 4,
                    }}
                  >
                    {' '}
                    0001
                  </Paper>
                </div>
              </Box>
              <Box className={classes.inputBox}>
                <Typography variant='h5' className={classes.typo}>
                  Birth Name
                </Typography>
                <TextField
                  hiddenLabel
                  id='filled-hidden-label-small'
                  defaultValue='Islamabad'
                  size='small'
                  className={classes.textInput}
                />
              </Box>
              <Box className={classes.inputBox}>
                <Typography variant='h5' className={classes.typo}>
                  Spouse Name
                </Typography>
                <TextField
                  hiddenLabel
                  id='filled-hidden-label-small'
                  defaultValue='She'
                  size='small'
                  className={classes.textInput}
                />
              </Box>
              <Box className={classes.inputBox}>
                <Typography variant='h5' className={classes.typo}>
                  Name
                </Typography>
                <TextField
                  hiddenLabel
                  id='filled-hidden-label-small'
                  defaultValue='MuhammadZain'
                  size='small'
                  className={classes.textInput}
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
                />
              </Box>{' '}
              <Box className={classes.inputBox}>
                <Typography variant='h5' className={classes.typo}>
                  {' '}
                  Mobile{' '}
                </Typography>
                <TextField
                  hiddenLabel
                  id='filled-hidden-label-small'
                  defaultValue='+2123123131'
                  size='small'
                  className={classes.textInput}
                />
              </Box>{' '}
              <Box className={classes.inputBox}>
                <Typography variant='h5' className={classes.typo}>
                  {' '}
                  TelePhone{' '}
                </Typography>
                <TextField
                  hiddenLabel
                  id='filled-hidden-label-small'
                  defaultValue='+2123123131'
                  size='small'
                  className={classes.textInput}
                />
              </Box>{' '}
              <Box className={classes.inputBox}>
                <Typography variant='h5' className={classes.typo}>
                  {' '}
                  Address{' '}
                </Typography>
                <TextField
                  hiddenLabel
                  id='filled-hidden-label-small'
                  defaultValue='h6 islamabad'
                  size='small'
                  className={classes.textInput}
                />
              </Box>
              <Box className={classes.inputBox}>
                <Typography variant='h5' className={classes.typo}>
                  {' '}
                  complete address{' '}
                </Typography>
                <TextField
                  hiddenLabel
                  id='filled-hidden-label-small'
                  defaultValue='www.instagram.com'
                  size='small'
                  className={classes.textInput}
                />
              </Box>{' '}
              <Box className={classes.inputBox} style={{marginBottom:5}}>
                <Typography variant='h5' className={classes.typo}>
                  {' '}
                  Postal Code{' '}
                </Typography>
                <TextField
                  hiddenLabel
                  id='filled-hidden-label-small'
                  defaultValue='46000'
                  size='small'
                  style={{ backgroundColor: '#fff',width: '22%'}}
                />
                <Typography variant='h5' className={classes.typo}>
                  {' '}
                  City{' '}
                </Typography>
                <TextField
                  hiddenLabel
                  id='filled-hidden-label-small'
                  defaultValue='Islamabad'
                  size='small'
                  style={{ backgroundColor: '#fff' }}
                />
              </Box>{' '}
              <Box className={classes.inputBox}>
                <Typography variant='h5' className={classes.typo}>
                  {' '}
                  Country{' '}
                </Typography>
                <TextField
                  hiddenLabel
                  id='filled-hidden-label-small'
                  defaultValue='pakistan'
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

export default VisitorProfile;
