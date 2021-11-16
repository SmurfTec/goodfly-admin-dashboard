import React, { useContext, useEffect, useState } from 'react';
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
import { CustomersContext } from 'Contexts/CustomersContext';
import { useParams } from 'react-router';
import { toast } from 'react-toastify';
import axios from 'axios';
import useToggleInput from 'hooks/useToggleInput';
import LoadingOverlay from 'react-loading-overlay';

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

  const { createNewCustomer } = useContext(CustomersContext);

  const initialState = {
    pronoun: 'Mr',
    firstName: '',
    email: '',
    birthName: '',
    spouseName: '',
    photo: '',
    telephoneLineNumber: '',
    address: '',
    additionalAddress: '',
    dateOfBirth: new Date(),
    postalCode: '',
    city: '',
    country: '',
    nationality: '',
    passportNumber: '',
    facebookProfile: '',
    instagramProfile: '',
    twitterProfile: '',
    snapChatProfile: '',
    passportDateOfIssue: '',
    passportPlaceOfIssue: '',
  };

  const [
    state,
    handleTxtChange,
    handleToggleChange,
    changeInput,
    resetState,
    setState,
  ] = useManyInputs(initialState);

  const [isImageUploading, toggleImageUploading] = useToggleInput(false);
  const [uploadingText, setUploadingText] = useState('Uploading Image...');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`state`, state);
    createNewCustomer(state, resetState);
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

          changeInput('photo', uploadedImage);

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
                      Number
                    </Typography>
                    <Paper
                      style={{
                        width: 70,
                        height: 25,
                        textAlign: 'right',
                        padding: 4,
                      }}
                    >
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
                    Pronoun
                  </Typography>
                  <FormControl component='fieldset'>
                    <RadioGroup
                      row
                      aria-label='gender'
                      name='row-radio-buttons-group'
                      value={state.pronoun}
                      name='pronoun'
                      onChange={handleTxtChange}
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
                    placeholder='Islamabad'
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
                    placeholder='She'
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
                    placeholder='MuhammadZain'
                    size='small'
                    className={classes.textInput}
                    name='firstName'
                    value={state.firstName}
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
                    placeholder='muhammadzain8@gmail.com'
                    size='small'
                    className={classes.textInput}
                    name='email'
                    value={state.email}
                    onChange={handleTxtChange}
                    required
                  />
                </Box>
                <Box className={classes.inputBox}>
                  <Typography variant='h5' className={classes.typo}>
                    Mobile
                  </Typography>
                  <TextField
                    hiddenLabel
                    id='filled-hidden-label-small'
                    placeholder='+2123123131'
                    size='small'
                    className={classes.textInput}
                    name='telephoneNumber'
                    value={state.telephoneNumber}
                    onChange={handleTxtChange}
                    required
                  />
                </Box>
                <Box className={classes.inputBox}>
                  <Typography variant='h5' className={classes.typo}>
                    TelePhone
                  </Typography>
                  <TextField
                    hiddenLabel
                    id='filled-hidden-label-small'
                    placeholder='+2123123131'
                    size='small'
                    className={classes.textInput}
                    name='telephoneLineNumber'
                    value={state.telephoneLineNumber}
                    onChange={handleTxtChange}
                    required
                  />
                </Box>
                <Box className={classes.inputBox}>
                  <Typography variant='h5' className={classes.typo}>
                    Address
                  </Typography>
                  <TextField
                    hiddenLabel
                    id='filled-hidden-label-small'
                    placeholder='h6 islamabad'
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
                    Additional Address
                  </Typography>
                  <TextField
                    hiddenLabel
                    id='filled-hidden-label-small'
                    placeholder='www.instagram.com'
                    size='small'
                    className={classes.textInput}
                    name='additionalAddress'
                    value={state.additionalAddress}
                    onChange={handleTxtChange}
                    required
                  />
                </Box>
                <Box className={classes.inputBox} style={{ marginBottom: 5 }}>
                  <Typography variant='h5' className={classes.typo}>
                    Postal Code
                  </Typography>
                  <TextField
                    type='number'
                    hiddenLabel
                    id='filled-hidden-label-small'
                    placeholder='46000'
                    size='small'
                    style={{ backgroundColor: '#fff', width: '20%' }}
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
                    City
                  </Typography>
                  <TextField
                    hiddenLabel
                    id='filled-hidden-label-small'
                    placeholder='Islamabad'
                    size='small'
                    style={{ backgroundColor: '#fff', width: '20%' }}
                    name='city'
                    value={state.city}
                    onChange={handleTxtChange}
                    required
                  />
                </Box>
                <Box className={classes.inputBox}>
                  <Typography variant='h5' className={classes.typo}>
                    Country
                  </Typography>
                  <TextField
                    hiddenLabel
                    id='filled-hidden-label-small'
                    placeholder='pakistan'
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
                    Birth Date
                  </Typography>
                  <TextField
                    hiddenLabel
                    id='filled-hidden-label-small'
                    placeholder='pakistan'
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
                    Nationality
                  </Typography>
                  <TextField
                    hiddenLabel
                    id='filled-hidden-label-small'
                    placeholder='pakistan'
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
                    Passport No
                  </Typography>
                  <TextField
                    hiddenLabel
                    id='filled-hidden-label-small'
                    placeholder='pakistan'
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
                    Date of Issue
                  </Typography>
                  <TextField
                    hiddenLabel
                    id='filled-hidden-label-small'
                    placeholder='pakistan'
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
                    Place of Issue
                  </Typography>
                  <TextField
                    hiddenLabel
                    id='filled-hidden-label-small'
                    placeholder='pakistan'
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
                      placeholder='facebook'
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
                      placeholder='instagram'
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
                      placeholder='twitter'
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
                      placeholder='snapchat'
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
                <Typography
                  variant='h4'
                  style={{
                    width: '100%',
                    margin: 15,
                    padding: '0rem 0.5rem 0rem',
                  }}
                >
                  Photo
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
                <LoadingOverlay
                  active={isImageUploading}
                  spinner
                  text={uploadingText}
                >
                  <Box
                    style={{
                      backgroundColor: '#808080',
                      borderRadius: '10px',
                      padding: 1,
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
                      <Box className={classes.image}>
                        <Box>
                          <PlusIcon size={35} style={{ color: '#fff' }} />
                          <FileIcon size={35} style={{ color: '#fff' }} />
                        </Box>
                        <Typography style={{ color: '#fff' }}>
                          Upload Photo
                        </Typography>
                      </Box>
                    </label>
                  </Box>
                </LoadingOverlay>
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
