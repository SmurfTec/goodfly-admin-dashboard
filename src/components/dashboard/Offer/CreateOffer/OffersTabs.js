import React, { useEffect, useState } from 'react';

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
  Switch,
} from '@material-ui/core';

import Autocomplete from '@mui/material/Autocomplete';

import { TabPanel } from '../../../common/TabPanel';
import { useManyInputs, useToggleInput } from 'hooks';
import LoadingOverlay from 'react-loading-overlay';
import axios from 'axios';
import { toast } from 'react-toastify';
import { getMuiDateFormat } from 'utils/dateMethods';
import { countries, regions } from 'utils/constants';
import { Add, Delete } from '@material-ui/icons';
import { useTranslation } from 'react-i18next';
import v4 from 'uuid/dist/v4';

const OffersTabs = ({ classes, value, handleNext, offer }) => {
  const { t } = useTranslation();
  const initialState = {
    image: '',
    upload: false,
    title: '',
    country: null,
    region: null,
    description: '',
    isDates: 'no',
    price: '',
    startingDate: new Date(),
    endingDate: new Date(),
    isDeparturePlace: 'no',
    departurePlace: '',
    category: '',
    subCategory: '',
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

  const [
    state,
    handleTxtChange,
    handleToggleChange,
    changeInput,
    resetState,
    setState,
  ] = useManyInputs(initialState);
  const [subCategories, setSubCategories] = useState([]);

  useEffect(() => {
    if (!offer) return;

    const newState = {
      ...offer,
      isDates: offer.startingDate ? 'yes' : 'no',
      startingDate: getMuiDateFormat(offer.startingDate),
      endingDate: getMuiDateFormat(offer.endingDate),
      isDeparturePlace: offer.departurePlace ? 'yes' : 'no',
      departurePlace: offer.departurePlace || '',
      arrivalPlace: offer.arrivalPlace || '',
      country: countries.find((el) => el.label === offer.country) || '',
      region: regions.find((el) => el.label === offer.region) || '',
      services: !!offer.services?.includes
        ? {
            guide: offer.services.includes('guide'),
            airportTransport: offer.services.includes('airportTransport'),
            religiousCourse: offer.services.includes('religiousCourse'),
            legitimateVisit: offer.services.includes('legitimateVisit'),
            internelTransfer: offer.services.includes('internelTransfer'),
            formalities: offer.services.includes('formalities'),
            sittingNextToScholors: offer.services.includes(
              'sittingNextToScholors'
            ),
          }
        : offer.services,

      //       category : of
    };
    setState(newState);
  }, [offer]);

  useEffect(() => {
    if (!state.category) return;

    // * Get Sub Categories against category
    switch (state.category) {
      case 'spiritual':
        setSubCategories(['hajj', 'omra', 'al-quds', 'combine-hajj-omra']);
        break;
      case 'ethical':
        setSubCategories(['organized', 'organic', 'train', 'cruises']);
        break;
      case 'excursions':
        setSubCategories(['excursion', 'circuit']);
        break;

      default:
        setSubCategories(['organized', 'organic', 'train', 'cruises']);
        break;
    }
  }, [state.category]);

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
      if (selectedFile && selectedFile.type.includes(fileType)) {
        let reader = new FileReader();
        reader.readAsDataURL(selectedFile);
        reader.onloadend = async (e) => {
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
    }
  };

  const handleDeleteImage = () => {
    changeInput('image', '');
  };

  const [isImageUploading, toggleImageUploading] = useToggleInput(false);
  const [uploadingText, setUploadingText] = useState('Uploading Image...');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!state.image) {
      toast.error('Offer Must have an Image');
      return;
    }
    if (
      state.isDates === 'yes' &&
      state.startingDate < getMuiDateFormat(new Date())
    ) {
      toast.error('Starting date must NOT be in past');
      return;
    }
    if (state.isDates === 'yes' && state.startingDate >= state.endingDate) {
      toast.error('Starting date must be less than Ending Date');
      return;
    }

    handleNext(state, resetState);
  };

  // return <h1>Returned</h1>;
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
                <Typography variant='h5'>{t('Offer Gallery')}</Typography>

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
                    style={{ marginTop: '1rem', width: 100 }}
                  >
                    {t('ADD')}
                  </Button>
                </label>

                <Button
                  variant='outlined'
                  style={{
                    color: 'red',
                    marginTop: '0.5rem',
                    width: 100,
                  }}
                  onClick={handleDeleteImage}
                >
                  {t('DELETE')}
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
              <FormControlLabel
                sx={{ marginLeft: 'auto', marginBottom: 2 }}
                control={
                  <Switch
                    checked={state.upload}
                    onChange={handleToggleChange}
                    name='upload'
                    color='primary'
                  />
                }
                label={t('Online')}
              />

              <FormControl
                size='small'
                style={{
                  width: '100%',
                  backgroundColor: '#fff',
                }}
              >
                <InputLabel id='demo-simple-select-label'>
                  {t('Offer Category')}
                </InputLabel>

                <Select
                  labelId='demo-simple-select-label'
                  id='demo-simple-select'
                  value={state.category}
                  label={t('Offer Type')}
                  name='category'
                  onChange={handleTxtChange}
                  required
                >
                  <MenuItem value={'spiritual'}>{t('Spiritual')}</MenuItem>
                  <MenuItem value={'ethical'}>{t('Ethical')}</MenuItem>
                  <MenuItem value={'excursions'}>{t('Excursions')}</MenuItem>
                </Select>
              </FormControl>

              <FormControl
                size='small'
                style={{
                  width: '100%',
                  marginTop: '1rem',
                  backgroundColor: '#fff',
                }}
              >
                <InputLabel id='demo-simple-select-label'>
                  {t('Offer SubCategory')}
                </InputLabel>

                <Select
                  labelId='demo-simple-select-label'
                  id='demo-simple-select'
                  value={state.subCategory}
                  label={t('Offer Type')}
                  name='subCategory'
                  onChange={handleTxtChange}
                  required
                >
                  {subCategories.map((cat) => (
                    <MenuItem key={v4()} value={cat}>
                      {t(cat)}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Box className={classes.inputBox}>
                <TextField
                  required
                  hiddenLabel
                  id='filled-hidden-label-small'
                  placeholder={t('Title')}
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
                  placeholder={t('Price')}
                  size='small'
                  type='number'
                  inputProps={{ min: 100 }}
                  className={classes.textInput}
                  name='price'
                  value={state.price}
                  onChange={handleTxtChange}
                />
              </Box>

              <Box className={classes.inputBox}>
                <Autocomplete
                  id='country'
                  sx={{ backgroundColor: '#fff' }}
                  options={countries}
                  fullWidth
                  autoHighlight
                  value={state.country}
                  onChange={(event, newValue) => {
                    changeInput('country', newValue);
                  }}
                  getOptionLabel={(option) => option.label}
                  renderOption={(props, option) => (
                    <Box
                      component='li'
                      sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
                      {...props}
                    >
                      <img
                        loading='lazy'
                        width='20'
                        src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                        srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                        alt=''
                      />
                      {option.label}
                    </Box>
                  )}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label='Choose a country'
                      inputProps={{
                        ...params.inputProps,
                      }}
                      required
                    />
                  )}
                />
              </Box>
              <Box className={classes.inputBox}>
                <Autocomplete
                  id='region'
                  sx={{ backgroundColor: '#fff' }}
                  options={regions}
                  fullWidth
                  autoHighlight
                  value={state.region}
                  onChange={(event, newValue) => {
                    changeInput('region', newValue);
                  }}
                  getOptionLabel={(option) => option.label}
                  renderOption={(props, option) => (
                    <Box
                      component='li'
                      sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
                      {...props}
                    >
                      <img
                        loading='lazy'
                        width='20'
                        src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                        srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                        alt=''
                      />
                      {option.label}
                    </Box>
                  )}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label={t('Choose  Region')}
                      inputProps={{
                        ...params.inputProps,
                      }}
                      required
                    />
                  )}
                />
              </Box>
              <Box className={classes.inputBox}>
                <TextField
                  required
                  hiddenLabel
                  id='filled-hidden-label-small'
                  placeholder={t('Description')}
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
                {t('Dates')}
              </Typography>
              <FormControl component='fieldset'>
                <RadioGroup
                  row
                  aria-label='Date'
                  name='isDates'
                  value={state.isDates}
                  onChange={handleTxtChange}
                >
                  <FormControlLabel
                    value='yes'
                    control={<Radio />}
                    label={t('yes')}
                  />
                  <FormControlLabel
                    value='no'
                    control={<Radio />}
                    label={t('no')}
                  />
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
                    placeholder={t('Departure Date')}
                    size='small'
                    className={classes.dateFields}
                    name='startingDate'
                    value={state.startingDate}
                    onChange={handleTxtChange}
                    required={state.isDates === 'yes'}
                  />
                  <TextField
                    type='date'
                    placeholder={t('Arrival date')}
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
                {t('Place of departure')}
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
                    label={t('yes')}
                  />
                  <FormControlLabel
                    value='no'
                    control={<Radio />}
                    label={t('no')}
                  />
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
                    placeholder={t('Departure')}
                    size='small'
                    className={classes.dateFields}
                    name='departurePlace'
                    value={state.departurePlace}
                    onChange={handleTxtChange}
                    required={state.isDeparturePlace === 'yes'}
                  />
                  <TextField
                    type='text'
                    placeholder={t('Arrival')}
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
              <Typography variant='h5'> {t('Services Includes')}</Typography>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={state.services.guide}
                    onChange={handleCheckBox}
                    name='guide'
                    // value={state.services.guide}
                  />
                }
                label={t('Guide')}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={state.services.airportTransport}
                    onChange={handleCheckBox}
                    name='airportTransport'
                    // value={state.services.airportTransport}
                  />
                }
                label={t('Airport transport')}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={state.services.religiousCourse}
                    onChange={handleCheckBox}
                    name='religiousCourse'
                    // value={state.services.religiousCourse}
                  />
                }
                label={t('Religious courses')}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={state.services.legitimateVisit}
                    onChange={handleCheckBox}
                    name='legitimateVisit'
                    // value={state.services.legitimateVisit}
                  />
                }
                label={t('Legitimate visit(Mount uhud,Quba mosque)')}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={state.services.internelTransfer}
                    onChange={handleCheckBox}
                    name='internelTransfer'
                    // value={state.services.internelTransfer}
                  />
                }
                label={t('Internal transfer')}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={state.services.formalities}
                    onChange={handleCheckBox}
                    name='formalities'
                    // value={state.services.formalities}
                  />
                }
                label={t('Formalities')}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={state.services.sittingNextToScholors}
                    onChange={handleCheckBox}
                    name='sittingNextToScholors'
                    // value={state.services.sittingNextToScholors}
                  />
                }
                label={t('sitting next to the scholars')}
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
            {t('NEXT')}
          </Button>
        </Box>
      </form>
    </TabPanel>
  );
};

export default OffersTabs;
