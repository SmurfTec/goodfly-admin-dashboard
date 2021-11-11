import React, { useState } from 'react';

import {
  Box,
  Button,
  Grid,
  Typography,
  Card,
  CardMedia,
  FormControl,
  InputLabel,
  Select,
  Checkbox,
  FormControlLabel,
  TextField,
  RadioGroup,
  MenuItem,
  Radio,
} from '@material-ui/core';
import { TabPanel } from '../../../common/TabPanel';
import { useManyInputs, useToggleInput } from 'hooks';
import LoadingOverlay from 'react-loading-overlay';
import axios from 'axios';
import { toast } from 'react-toastify';

const OffersTabs = ({ classes, value, handleNext }) => {
  const initialState = {
    image: '',
    title: '',
    destination: '',
    description: '',
    isDates: 'no',
    price: '',
    startingDate: new Date(),
    endingDate: new Date(),
    isDeparturePlace: 'no',
    departurePlace: '',
    category: '',
    arrivalPlace: '',
    services: {
      guide: false,
      airportTransport: false,
      religiousCourse: false,
      legitimateVisit: false,
      internelTransfer: false,
      formalities: false,
      sittingNextToScholors: false,
    },
  };

  const [state, handleTxtChange, , changeInput, resetState, setState] =
    useManyInputs(initialState);

  const handleCheckBox = (e) => {
    setState((st) => ({
      ...st,
      services: {
        ...st.services,
        [e.target.name]: e.target.checked,
      },
    }));
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

          changeInput('image', uploadedImage);

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

  const handleDeleteImage = () => {
    changeInput('image', '');
  };

  const [isImageUploading, toggleImageUploading] = useToggleInput(false);
  const [uploadingText, setUploadingText] = useState('Uploading Image...');

  const handleSubmit = (e) => {
    e.preventDefault();
    handleNext(state, resetState);
  };

  return (
    <TabPanel value={value} index={0} className={classes.options}>
      <form onSubmit={handleSubmit}>
        <Grid container className={classes.rootContainer}>
          <Grid item sm={12} md={5}>
            <Box className={classes.flexBetween} style={{ margin: '1rem' }}>
              <Box
                style={{
                  display: 'inline-grid',
                  paddingRight: '1rem',
                }}
              >
                <Typography variant='h5'>Offer Gallery</Typography>

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
                    style={{ marginTop: '1rem' }}
                  >
                    Add
                  </Button>
                </label>

                <Button
                  variant='outlined'
                  style={{
                    color: 'red',
                    marginTop: '0.5rem',
                  }}
                  onClick={handleDeleteImage}
                >
                  Delete
                </Button>
              </Box>
              <Box>
                <Card>
                  <LoadingOverlay
                    active={isImageUploading}
                    spinner
                    text={uploadingText}
                  >
                    <CardMedia
                      className={classes.offerImage}
                      image={state.image}
                    />
                  </LoadingOverlay>
                </Card>
              </Box>
            </Box>

            {/* TODO - Decide these Options */}
            <Box
              style={{
                maxWidth: '100%',
                margin: '3rem 1rem 1rem',
              }}
            >
              <FormControl
                size='small'
                style={{
                  width: '100%',
                  backgroundColor: '#fff',
                }}
              >
                <InputLabel id='demo-simple-select-label'>
                  Offer Category
                </InputLabel>

                <Select
                  labelId='demo-simple-select-label'
                  id='demo-simple-select'
                  value={state.category}
                  label='Offer Type'
                  name='category'
                  onChange={handleTxtChange}
                  required
                >
                  <MenuItem value={'hajj'}>Hajj</MenuItem>
                  <MenuItem value={'omra'}>Omra</MenuItem>
                  <MenuItem value={'organized'}>Organized</MenuItem>
                </Select>
              </FormControl>

              <Box className={classes.inputBox}>
                <TextField
                  required
                  hiddenLabel
                  id='filled-hidden-label-small'
                  placeholder='Title'
                  size='small'
                  className={classes.textInput}
                  name='title'
                  value={state.title}
                  onChange={handleTxtChange}
                />
              </Box>

              <Box className={classes.inputBox}>
                <TextField
                  required
                  hiddenLabel
                  id='filled-hidden-label-small'
                  placeholder='Price'
                  size='small'
                  type='number'
                  inputProps={{ min: 0, step: 100 }}
                  className={classes.textInput}
                  name='price'
                  value={state.price}
                  onChange={handleTxtChange}
                />
              </Box>

              <Box className={classes.inputBox}>
                <TextField
                  required
                  hiddenLabel
                  id='filled-hidden-label-small'
                  placeholder='Destination'
                  size='small'
                  className={classes.textInput}
                  name='destination'
                  value={state.destination}
                  onChange={handleTxtChange}
                />
              </Box>
              <Box className={classes.inputBox}>
                <TextField
                  required
                  hiddenLabel
                  id='filled-hidden-label-small'
                  placeholder='Description'
                  size='small'
                  className={classes.textInput}
                  multiline
                  rows={8}
                  name='description'
                  value={state.description}
                  onChange={handleTxtChange}
                />
              </Box>
            </Box>
          </Grid>
          <Grid item sm={12} md={7}>
            <Box
              style={{
                width: '100%',
                margin: '1rem 1rem 0rem',
                display: 'flex',
                justifyContent: 'left',
                alignItems: 'center',
              }}
            >
              <Typography variant='h5' style={{ marginRight: '1rem' }}>
                Dates
              </Typography>
              <FormControl component='fieldset'>
                <RadioGroup
                  row
                  aria-label='Date'
                  name='row-radio-buttons-group'
                  name='isDates'
                  value={state.isDates}
                  onChange={handleTxtChange}
                >
                  <FormControlLabel
                    value='yes'
                    control={<Radio />}
                    label='yes'
                  />
                  <FormControlLabel value='no' control={<Radio />} label='no' />
                </RadioGroup>
              </FormControl>
            </Box>
            <Box
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                margin: '0rem 1rem 0rem',
              }}
            >
              {state.isDates === 'yes' && (
                <>
                  <TextField
                    type='date'
                    name='Departure Date'
                    placeholder='Departure Date'
                    size='small'
                    className={classes.dateFields}
                    name='startingDate'
                    value={state.startingDate}
                    onChange={handleTxtChange}
                    required={state.isDates === 'yes'}
                  />
                  <TextField
                    type='date'
                    placeholder='Arrival date'
                    name='Arrival Date'
                    size='small'
                    className={classes.dateFields}
                    name='endingDate'
                    value={state.endingDate}
                    onChange={handleTxtChange}
                    required={state.isDates === 'yes'}
                  />
                </>
              )}
            </Box>
            <Box
              style={{
                width: '100%',
                margin: '1rem 1rem 0rem',
                display: 'flex',
                justifyContent: 'left',
                alignItems: 'center',
              }}
            >
              <Typography variant='h5' style={{ marginRight: '1rem' }}>
                Place of departure
              </Typography>
              <FormControl component='fieldset'>
                <RadioGroup
                  row
                  aria-label='Place'
                  name='isDeparturePlace'
                  value={state.isDeparturePlace}
                  onChange={handleTxtChange}
                >
                  <FormControlLabel
                    value='yes'
                    control={<Radio />}
                    label='yes'
                  />
                  <FormControlLabel value='no' control={<Radio />} label='no' />
                </RadioGroup>
              </FormControl>
            </Box>
            <Box
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                margin: '0rem 1rem 1rem',
              }}
            >
              {state.isDeparturePlace === 'yes' && (
                <>
                  <TextField
                    type='text'
                    name='Departure'
                    placeholder='Departure'
                    size='small'
                    className={classes.dateFields}
                    name='departurePlace'
                    value={state.departurePlace}
                    onChange={handleTxtChange}
                    required={state.isDeparturePlace === 'yes'}
                  />
                  <TextField
                    type='text'
                    placeholder='Arrival'
                    size='small'
                    className={classes.dateFields}
                    name='arrivalPlace'
                    value={state.arrivalPlace}
                    onChange={handleTxtChange}
                    required={state.isDeparturePlace === 'yes'}
                  />
                </>
              )}
            </Box>
            <Box
              style={{
                margin: '3rem 1rem 0rem',
                display: 'inline-grid',
              }}
            >
              <Typography variant='h5'> Services Includes</Typography>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={state.guide}
                    onChange={handleCheckBox}
                    name='checkedA'
                    name='guide'
                    value={state.guide}
                  />
                }
                label='Guide'
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={state.airportTransport}
                    onChange={handleCheckBox}
                    name='checkedB'
                    name='airportTransport'
                    value={state.airportTransport}
                  />
                }
                label='Airport transport'
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={state.religiousCourse}
                    onChange={handleCheckBox}
                    name='checkedC'
                    name='religiousCourse'
                    value={state.religiousCourse}
                  />
                }
                label='Religious courses'
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={state.legitimateVisit}
                    onChange={handleCheckBox}
                    name='checkedD'
                    name='legitimateVisit'
                    value={state.legitimateVisit}
                  />
                }
                label='Legitimate visit(Mount uhud,Quba mosque)'
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={state.internelTransfer}
                    onChange={handleCheckBox}
                    name='checkedE'
                    name='internelTransfer'
                    value={state.internelTransfer}
                  />
                }
                label='Internal transfer'
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={state.formalities}
                    onChange={handleCheckBox}
                    name='checkedF'
                    name='formalities'
                    value={state.formalities}
                  />
                }
                label='Formalities'
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={state.sittingNextToScholors}
                    onChange={handleCheckBox}
                    name='checkedG'
                    name='sittingNextToScholors'
                    value={state.sittingNextToScholors}
                  />
                }
                label='sitting next to the scholars'
              />
            </Box>
          </Grid>
        </Grid>
        <Box
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'right',
            marginRight: '1rem',
          }}
        >
          <Button type='submit' variant='contained' style={{ width: '8rem' }}>
            Next
          </Button>
        </Box>
      </form>
    </TabPanel>
  );
};

export default OffersTabs;
