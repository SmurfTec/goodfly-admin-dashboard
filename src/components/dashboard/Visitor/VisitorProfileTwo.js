import React, { useState } from 'react';
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
  CardMedia,
  Switch,
} from '@material-ui/core';
import { Plus as PlusIcon, File as FileIcon } from 'react-feather';
import CarouselLayout from 'components/common/Carousel/CarouselLayout';
import useManyInputs from 'hooks/useManyInputs';
import uuid from 'uuid/dist/v4';

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
const trips = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const VisitorProfileTwo = () => {
  const classes = styles();
  const [ok, setOk] = React.useState(true);

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
    facebookProfile: '',
    instagramProfile: '',
    twitterProfile: '',
    snapChatProfile: '',
    attachments: [],
  };

  const [modifyImageId, setModifyImageId] = useState();

  const [state, handleTxtChange, handleToggleChange, changeInput, resetState] =
    useManyInputs(initialState);

  const toggle = (event) => {
    setOk(event.target.ok);
  };

  const modifyCustomer = (e) => {
    e.preventDefault();
    console.log(`state`, state);
    resetState();
  };

  const deleteAttachment = (id) => {
    changeInput(
      'attachments',
      state.attachments.filter((el) => el._id !== id)
    );
  };

  const handleModify = (id) => {
    setModifyImageId(id);
  };

  const modifyImage = async (e) => {
    const file = e.target.files[0];
    try {
      const convert64 = await convertTobase64(file);

      changeInput(
        'attachments',
        state.attachment.map((el) =>
          el._id === modifyImageId ? { ...el, image: convert64 } : el
        )
      );
    } catch (err) {}
  };

  const handleImage = async (e) => {
    const file = e.target.files[0];
    const convert64 = await convertTobase64(file);

    changeInput('attachments', [
      ...state.attachments,
      { image: convert64, _id: uuid() },
    ]);
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
            // onClick={modifyCustomer}
            form='customerForm'
            type='submit'
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
        <form onSubmit={modifyCustomer} id='customerForm'>
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
                    defaultValue='Islamabad'
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
                    defaultValue='She'
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
                    defaultValue='MuhammadZain'
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
                    defaultValue='muhammadzain8@gmail.com'
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
                    defaultValue='+2123123131'
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
                    defaultValue='+2123123131'
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
                    defaultValue='h6 islamabad'
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
                    Additional Address
                  </Typography>
                  <TextField
                    hiddenLabel
                    id='filled-hidden-label-small'
                    defaultValue='www.instagram.com'
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
                    hiddenLabel
                    id='filled-hidden-label-small'
                    defaultValue='46000'
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
                    defaultValue='Islamabad'
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
                    defaultValue='pakistan'
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
                    size='small'
                    className={classes.textInput}
                    type='date'
                    value={state.dateOfBirth}
                    onChange={handleTxtChange}
                    name='dateOfBirth'
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
                    defaultValue='pakistan'
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
                    Deliverance date{' '}
                  </Typography>
                  <TextField
                    hiddenLabel
                    id='filled-hidden-label-small'
                    defaultValue='pakistan'
                    size='small'
                    type='date'
                    className={classes.textInput}
                    name='dateOfDeliverence'
                    value={state.dateOfDeliverence}
                    onChange={handleTxtChange}
                    required
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
                    name='placeOfDeliverence'
                    value={state.placeOfDeliverence}
                    onChange={handleTxtChange}
                    required
                  />
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} sm={5} md={5} className={classes.account}>
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
                      defaultValue='instagram'
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
                      defaultValue='twitter'
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
                      defaultValue='snapchat'
                      size='small'
                      className={classes.textInput}
                      name='snapChatProfile'
                      value={state.snapChatProfile}
                      onChange={handleTxtChange}
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
                <Typography variant='h4' style={{ width: '90%', margin: 15 }}>
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
                <Typography variant='h4' style={{ width: '90%', margin: 10 }}>
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
            <Typography
              variant='h3'
              style={{ width: '100%', marginTop: '3rem' }}
            >
              Attachments
            </Typography>

            <Grid container spacing={3}>
              <Grid item md={9}>
                <CarouselLayout>
                  {state.attachments?.map((attachment, i) => (
                    <div key={attachment._id} className={classes.carouselCard}>
                      <CardMedia
                        style={{ height: '10rem' }}
                        image={attachment.image}
                        title='Live from space album cover'
                      />
                      <Box
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                        }}
                      >
                        <input
                          accept='image/*'
                          style={{ display: 'none' }}
                          id='modify-button-file'
                          // onChange={handleImage}
                          onChange={modifyImage}
                          type='file'
                          name='photo'
                        />
                        <label
                          htmlFor='modify-button-file'
                          style={{ cursor: 'pointer' }}
                          onClick={handleModify.bind(this, attachment._id)}
                        >
                          <Button>modify</Button>
                        </label>
                        <Button
                          onClick={deleteAttachment.bind(this, attachment._id)}
                          style={{ color: 'red' }}
                        >
                          Delete
                        </Button>
                        <Switch
                          status={ok}
                          onChange={toggle}
                          inputProps={{
                            'aria-label': 'controlled',
                          }}
                        />
                      </Box>
                    </div>
                  ))}
                  {/* one */}
                </CarouselLayout>
              </Grid>
              <Grid
                item
                md={3}
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Box
                  style={{
                    backgroundColor: '#808080',
                    borderRadius: '10px',
                  }}
                >
                  <Box style={{ padding: '0.2rem' }}>
                    <Box>
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
                          <Box style={{ textAlign: 'center' }}>
                            <Typography style={{ color: '#fff' }}>
                              Upload Document
                            </Typography>
                          </Box>
                        </Box>
                      </label>{' '}
                    </Box>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </form>
      </Box>
    </div>
  );
};

export default VisitorProfileTwo;
