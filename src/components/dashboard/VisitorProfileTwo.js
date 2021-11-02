import React from 'react';
import { makeStyles } from '@material-ui/styles';
import {
  Typography,
  Grid,
  Box,
  TextField,
  Button,
  Paper,
  FormControl,
  FormControlLabel,
  RadioGroup,
  Radio,
} from '@material-ui/core';
import { Plus as PlusIcon, File as FileIcon } from 'react-feather';

// import Carousel from 'react-material-ui-carousel';

const styles = makeStyles((theme) => ({
  header: {
    display: 'inline-flex',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'space-evenly',
    marginTop: 25,
  },
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
    margin: 10,
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
    width: '80%',
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
        <Box className={classes.header}>
          <Typography variant='h4'>Client Area</Typography>
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
          <Box mb={3}>
            <Typography variant='h5' mb={1}>
              {' '}
              Contact to Client
            </Typography>
            <Button
              variant='outlined'
              size='medium'
              style={{
                color: 'black',
                border: '1px solid #111111',
                backgroundColor: '#c6c6c6',
                width: 180,
              }}
            >
              +31231231231
            </Button>{' '}
          </Box>
          <Box style={{ width: 155 }}>
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
            <Box
              className={classes.mainBox}
              style={{ padding: 10, margin: '0px 10px 0px 0px ' }}
            >
              <Box
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'start',
                  alignItems: 'center',
                  width: '100%',
                  minHeight: 200,
                  padding: 10,
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
            <Box
              className={classes.mainBox}
              style={{
                padding: 10,
                minHeight: 200,
                margin: '40px 10px 0px 0px ',
              }}
            >
              <Typography
                variant='h4'
                style={{ width: '90%', margin: 15 }}
              >
                Last customer order
              </Typography>
              <Box
                style={{
                  minHeight: 160,
                  width: '90%',
                  backgroundColor: '#fff',
                  marginBottom: 20,
                }}
              >
                <Typography
                  variant='text'
                  style={{ color: '#c6c6c6', margin: 10 }}
                >
                  {' '}
                  Fake order details{' '}
                </Typography>
              </Box>
            </Box>
            <Box
              className={classes.mainBox}
              style={{ padding: 10, margin: '40px 10px 0px 0px ' }}
            >
              <Typography
                variant='h4'
                style={{ width: '90%', margin: 10 }}
              >
                Find a Client
              </Typography>
              <Box
                style={{
                  marginBottom: 20,
                  width: '80%',
                  marginRight: 45,
                }}
              >
                <TextField
                  hiddenLabel
                  id='filled-hidden-label-small'
                  defaultValue='name'
                  size='small'
                  style={{
                    backgroundColor: '#fff',
                  }}
                />
              </Box>

              <Box
                style={{
                  minHeight: 155,
                  width: '90%',
                  backgroundColor: '#fff',
                  marginBottom: 20,
                }}
              >
                <Typography
                  variant='text'
                  style={{ color: '#c6c6c6', margin: 10 }}
                >
                  List of users
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
        <Box className={classes.mainBox}>
          <Box
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-around',
              width: '100%',
            }}
          >
            <Typography variant='h3' style={{ width: '100%' }}>
              Attachments
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
          <Grid
            container
            style={{
              width: '100%',
              minHeight: '12rem',
            }}
          >
            <Grid
              item
              sm={6}
              md={3}
              style={{
                height: 'auto',
              }}
            >
              <img
                style={{
                  backgroundColor: '#fff',
                  padding: '0.8rem',
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                }}
                src='data:image/jpeg;base64,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'
                alt='data'
              />
            </Grid>
          </Grid>
        </Box>
      </Box>

      
    </div>
  );
};

export default VisitorProfileTwo;
