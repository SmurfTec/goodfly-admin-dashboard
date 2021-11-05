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
  Avatar,
} from '@material-ui/core';

import { Plus as PlusIcon, File as FileIcon } from 'react-feather';
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

const VisitorProfile = () => {
  const classes = styles();

  const initialState = {
    pronoun: 'Mr',
    name: '',
    email: '',
    birthName: '',
    spouseName: '',
    telephoneLineNumber: '',
    address: '',
    additionalAddress: '',
    dateOfBirth: new Date(),
    postalCode: '',
    city: '',
    country: '',
    nationality: '',
    passportNumber: '',
    attatchments: '',
    facebookProfile: '',
    instagramProfile: '',
    twitterProfile: '',
    snapChatProfile: '',
    passportDateOfIssue: '',
    passportPlaceOfIssue: '',
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
            New Customer
          </Typography>
        </Box>
        <form onSubmit={handleSubmit}>
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
                    <Typography variant='h5' style={{ margin: '0px 10px 0px' }}>
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
                    // defaultValue='Islamabad'
                    size='small'
                    className={classes.textInput}
                    name='birthName'
                    value={state.birthName}
                    onChange={handleTxtChange}
                    required
                  />
                </Box>
                <Box className={classes.inputBox}>
                  <Typography variant='h5' className={classes.typo}>
                    Spouse Name
                  </Typography>
                  <TextField
                    hiddenLabel
                    id='filled-hidden-label-small'
                    // defaultValue='She'
                    size='small'
                    className={classes.textInput}
                    name='spouseName'
                    value={state.spouseName}
                    onChange={handleTxtChange}
                    required
                  />
                </Box>
                <Box className={classes.inputBox}>
                  <Typography variant='h5' className={classes.typo}>
                    Name
                  </Typography>
                  <TextField
                    hiddenLabel
                    id='filled-hidden-label-small'
                    // defaultValue='MuhammadZain'
                    size='small'
                    className={classes.textInput}
                    name='name'
                    value={state.name}
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
                    // defaultValue='muhammadzain8@gmail.com'
                    size='small'
                    className={classes.textInput}
                    name='email'
                    value={state.email}
                    onChange={handleTxtChange}
                    required
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
                    // defaultValue='+2123123131'
                    size='small'
                    className={classes.textInput}
                    name='mobileNumber'
                    value={state.mobileNumber}
                    onChange={handleTxtChange}
                    required
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
                    // defaultValue='+2123123131'
                    size='small'
                    className={classes.textInput}
                    name='telephoneNumber'
                    value={state.telephoneNumber}
                    onChange={handleTxtChange}
                    required
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
                    // defaultValue='h6 islamabad'
                    size='small'
                    className={classes.textInput}
                    name='address'
                    value={state.address}
                    onChange={handleTxtChange}
                    required
                  />
                </Box>
                <Box className={classes.inputBox}>
                  <Typography variant='h5' className={classes.typo}>
                    {' '}
                    Additional Address{' '}
                  </Typography>
                  <TextField
                    hiddenLabel
                    id='filled-hidden-label-small'
                    // defaultValue='www.instagram.com'
                    size='small'
                    className={classes.textInput}
                    name='additionalAddress'
                    value={state.additionalAddress}
                    onChange={handleTxtChange}
                    required
                  />
                </Box>{' '}
                <Box className={classes.inputBox} style={{ marginBottom: 5 }}>
                  <Typography variant='h5' className={classes.typo}>
                    {' '}
                    Postal Code{' '}
                  </Typography>
                  <TextField
                    type='number'
                    hiddenLabel
                    id='filled-hidden-label-small'
                    // defaultValue='46000'
                    size='small'
                    style={{ backgroundColor: '#fff', width: '30%' }}
                    name='postalCode'
                    value={state.postalCode}
                    onChange={handleTxtChange}
                    required
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
                    // defaultValue='Islamabad'
                    size='small'
                    style={{ backgroundColor: '#fff', width: '40%' }}
                    name='city'
                    value={state.city}
                    onChange={handleTxtChange}
                    required
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
                    // defaultValue='pakistan'
                    size='small'
                    className={classes.textInput}
                    name='country'
                    value={state.country}
                    onChange={handleTxtChange}
                    required
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
                    // defaultValue='pakistan'
                    type=''
                    size='small'
                    type='date'
                    className={classes.textInput}
                    name='dateOfBirth'
                    value={state.dateOfBirth}
                    onChange={handleTxtChange}
                    required
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
                    // defaultValue='pakistan'
                    size='small'
                    className={classes.textInput}
                    name='nationality'
                    value={state.nationality}
                    onChange={handleTxtChange}
                    required
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
                    // defaultValue='pakistan'
                    size='small'
                    className={classes.textInput}
                    name='passportNumber'
                    value={state.passportNumber}
                    onChange={handleTxtChange}
                    required
                  />
                </Box>
                <Box className={classes.inputBox}>
                  <Typography variant='h5' className={classes.typo}>
                    {' '}
                    Date of Issue
                  </Typography>
                  <TextField
                    hiddenLabel
                    id='filled-hidden-label-small'
                    // defaultValue='pakistan'
                    size='small'
                    className={classes.textInput}
                    name='passportDateOfIssue'
                    value={state.passportDateOfIssue}
                    onChange={handleTxtChange}
                    required
                  />
                </Box>
                <Box className={classes.inputBox}>
                  <Typography variant='h5' className={classes.typo}>
                    {' '}
                    Place of Issue{' '}
                  </Typography>
                  <TextField
                    hiddenLabel
                    id='filled-hidden-label-small'
                    // defaultValue='pakistan'
                    size='small'
                    className={classes.textInput}
                    name='passportPlaceOfIssue'
                    value={state.passportPlaceOfIssue}
                    onChange={handleTxtChange}
                    required
                  />
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} sm={5} md={5} className={classes.account}>
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
                      // defaultValue='facebook'
                      size='small'
                      className={classes.textInput}
                      name='facebookProfile'
                      value={state.facebookProfile}
                      onChange={handleTxtChange}
                    />
                  </Box>
                  <Box className={classes.inputBox2}>
                    <Typography variant='h5'>Instagram</Typography>
                    <TextField
                      hiddenLabel
                      id='filled-hidden-label-small'
                      // defaultValue='instagram'
                      size='small'
                      className={classes.textInput}
                      name='instagramProfile'
                      value={state.instagramProfile}
                      onChange={handleTxtChange}
                    />
                  </Box>
                  <Box className={classes.inputBox2}>
                    <Typography variant='h5'>Twitter</Typography>
                    <TextField
                      hiddenLabel
                      id='filled-hidden-label-small'
                      // defaultValue='twitter'
                      size='small'
                      className={classes.textInput}
                      name='twitterProfile'
                      value={state.twitterProfile}
                      onChange={handleTxtChange}
                    />
                  </Box>
                  <Box className={classes.inputBox2}>
                    <Typography variant='h5'>Snapchat</Typography>
                    <TextField
                      hiddenLabel
                      id='filled-hidden-label-small'
                      // defaultValue='snapchat'
                      size='small'
                      className={classes.textInput}
                      name='snapChatProfile'
                      value={state.snapChatProfile}
                      onChange={handleTxtChange}
                    />
                  </Box>
                </Box>
              </Box>
              <Box className={classes.mainBox} style={{ padding: 10 }}>
                <Typography variant='h4' style={{ width: '100%', margin: 15 }}>
                  Attatchments
                </Typography>
                <Avatar
                  style={{
                    width: '10rem',
                    height: '8rem',
                    borderRadius: '50%',
                  }}
                  src={state.photo}
                  title='Live from space album cover'
                />
                <Box
                  style={{
                    backgroundColor: '#808080',
                    borderRadius: '10px',
                  }}
                >
                  <input
                    accept='image/*'
                    style={{ display: 'none' }}
                    id='contained-button-file'
                    onChange={handleImage}
                    type='file'
                    name='photo'
                  />
                  <label
                    htmlFor='contained-button-file'
                    style={{ cursor: 'pointer' }}
                  >
                    {' '}
                    <Box className={classes.image}>
                      <Box>
                        <PlusIcon size={35} style={{ color: '#fff' }} />
                        <FileIcon size={35} style={{ color: '#fff' }} />
                      </Box>
                      <Typography style={{ color: '#fff' }}>
                        Upload Document
                      </Typography>
                    </Box>
                  </label>{' '}
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
                  variant='contained'
                  size='medium'
                  style={{ width: 150 }}
                >
                  Validate
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Box>
    </div>
  );
};

export default VisitorProfile;
