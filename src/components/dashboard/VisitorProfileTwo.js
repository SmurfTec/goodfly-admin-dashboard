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
  FormControl,
  FormControlLabel,
  FormLabel,
  RadioGroup,
  Radio,
} from '@material-ui/core';

import { Plus as PlusIcon, File as FileIcon } from 'react-feather';

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
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
  },
  inputBox2: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  textInput: {
    width: '70%',
    backgroundColor: '#fff',
    marginBottom: 7,
  },
  image: {
    minHeight: 130,
    margin: 8,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    border: `3px dashed #fff`,
    borderRadius: '10px',
    width: 200,
  },
}));

const VisitorProfileTwo = () => {
  const classes = styles();

  return (
    <div style={{ backgroundColor: '#fff', overflow: 'hidden' }}>
      <Box>
        <Box>
          <Typography
            variant='h4'
            style={{ width: '100%', margin: '60px 20px 0px' }}
          >
            Client Area
          </Typography>
          <Button
            variant='outlined'
            size='medium'
            style={{
              color: 'red',
              border: '1px solid rec',
              colorwidth: 150,
            }}
          >
            To Detelte
          </Button>
          <Button
            variant='outlined'
            size='medium'
            style={{ width: 150 }}
          >
            To Modify
          </Button>
          <Box>
            <Typography variant='h5'>
              {' '}
              Contact to Client Area
            </Typography>
            <Button
              variant='outlined'
              size='medium'
              style={{
                color: 'black',
                border: '1px solid #11111',
                backgroundColor: '#c6c6c6',
                width: 180,
              }}
            >
              +31231231231
            </Button>{' '}
          </Box>
          <Box>
            <Typography variant='h5'>
              {' '}
              N Fidelite{' '}
              <bold
                style={{
                  fontSize: 28,
                  fontWeight: 'bold ',
                  fontStyle: 'italic',
                  margin: 2,
                }}
              >
                827
              </bold>{' '}
            </Typography>
          </Box>
          <Box>
            <Typography variant='h5'>
              <bold
                style={{
                  fontSize: 28,
                  fontWeight: 'bold ',
                  fontStyle: 'italic',
                  margin: 5,
                }}
              >
                1725
              </bold>
              Points
            </Typography>
          </Box>
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
              <Box
                style={{
                  display: 'flex',
                  // justifyContent: 'space-between',
                  alignItems: 'center',
                  width: '100%',
                }}
              >
                <Typography variant='h5' style={{ width: '25%' }}>
                  Civilite
                </Typography>
                <FormControl component='fieldset'>
                  <RadioGroup
                    row
                    aria-label='gender'
                    name='row-radio-buttons-group'
                  >
                    <FormControlLabel
                      value='Mr'
                      control={<Radio />}
                      label='Mr'
                    />
                    <FormControlLabel
                      value='Mrs'
                      control={<Radio />}
                      label='Mrs'
                    />
                    <FormControlLabel
                      value='Ms'
                      control={<Radio />}
                      label='Ms'
                    />
                  </RadioGroup>
                </FormControl>
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
              <Box
                className={classes.inputBox}
                style={{ marginBottom: 5 }}
              >
                <Typography variant='h5' className={classes.typo}>
                  {' '}
                  Postal Code{' '}
                </Typography>
                <TextField
                  hiddenLabel
                  id='filled-hidden-label-small'
                  defaultValue='46000'
                  size='small'
                  style={{ backgroundColor: '#fff', width: '30%' }}
                />
                <Typography
                  variant='h5'
                  className={classes.typo}
                  style={{ textAlign: 'center' }}
                >
                  {' '}
                  City{' '}
                </Typography>
                <TextField
                  hiddenLabel
                  id='filled-hidden-label-small'
                  defaultValue='Islamabad'
                  size='small'
                  style={{ backgroundColor: '#fff', width: '40%' }}
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
              <Box className={classes.inputBox}>
                <Typography variant='h5' className={classes.typo}>
                  {' '}
                  Birth Date{' '}
                </Typography>
                <TextField
                  hiddenLabel
                  id='filled-hidden-label-small'
                  defaultValue='pakistan'
                  size='small'
                  className={classes.textInput}
                />
              </Box>
              <Box className={classes.inputBox}>
                <Typography variant='h5' className={classes.typo}>
                  {' '}
                  Nationality{' '}
                </Typography>
                <TextField
                  hiddenLabel
                  id='filled-hidden-label-small'
                  defaultValue='pakistan'
                  size='small'
                  className={classes.textInput}
                />
              </Box>
              <Box className={classes.inputBox}>
                <Typography variant='h5' className={classes.typo}>
                  {' '}
                  Passport No{' '}
                </Typography>
                <TextField
                  hiddenLabel
                  id='filled-hidden-label-small'
                  defaultValue='pakistan'
                  size='small'
                  className={classes.textInput}
                />
              </Box>
              <Box className={classes.inputBox}>
                <Typography variant='h5' className={classes.typo}>
                  {' '}
                  Deliverance date{' '}
                </Typography>
                <TextField
                  hiddenLabel
                  id='filled-hidden-label-small'
                  defaultValue='pakistan'
                  size='small'
                  className={classes.textInput}
                />
              </Box>
              <Box className={classes.inputBox}>
                <Typography variant='h5' className={classes.typo}>
                  {' '}
                  place of delivery{' '}
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
            <Box className={classes.mainBox} style={{ padding: 10 }}>
              <Box
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'start',
                  alignItems: 'center',
                  width: '100%',
                  minHeight: 180,
                  padding: 5,
                  margin: 5,
                }}
              >
                <Box className={classes.inputBox2}>
                  <Typography variant='h5'>Facebook</Typography>
                  <TextField
                    hiddenLabel
                    id='filled-hidden-label-small'
                    defaultValue='facebook'
                    size='small'
                    className={classes.textInput}
                  />
                </Box>
                <Box className={classes.inputBox2}>
                  <Typography variant='h5'>Instagram</Typography>
                  <TextField
                    hiddenLabel
                    id='filled-hidden-label-small'
                    defaultValue='instagram'
                    size='small'
                    className={classes.textInput}
                  />
                </Box>
                <Box className={classes.inputBox2}>
                  <Typography variant='h5'>Twitter</Typography>
                  <TextField
                    hiddenLabel
                    id='filled-hidden-label-small'
                    defaultValue='twitter'
                    size='small'
                    className={classes.textInput}
                  />
                </Box>
                <Box className={classes.inputBox2}>
                  <Typography variant='h5'>Snapchat</Typography>
                  <TextField
                    hiddenLabel
                    id='filled-hidden-label-small'
                    defaultValue='snapchat'
                    size='small'
                    className={classes.textInput}
                  />
                </Box>
              </Box>
            </Box>
            <Box className={classes.mainBox} style={{ padding: 10 }}>
              <Typography
                variant='h4'
                style={{ width: '100%', margin: 15 }}
              >
                Attatchments
              </Typography>
              <Box
                style={{
                  backgroundColor: '#808080',
                  borderRadius: '10px',
                }}
              >
                <Box className={classes.image}>
                  <Box>
                    <PlusIcon size={35} style={{ color: '#fff' }} />
                    <FileIcon size={35} style={{ color: '#fff' }} />
                  </Box>
                  <Typography style={{ color: '#fff' }}>
                    Upload Document
                  </Typography>
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
                style={{ width: 150 }}
              >
                Validate
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default VisitorProfileTwo;
