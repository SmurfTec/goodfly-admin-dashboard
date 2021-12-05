import {
  Button,
  CardMedia,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from '@material-ui/core';
import { Box } from '@material-ui/system';
import axios from 'axios';
import CarouselLayout from 'components/common/Carousel/CarouselLayout';
import { useManyInputs, useToggleInput } from 'hooks';
import { useEffect, useState } from 'react';
import { Plus as PlusIcon, Image as ImageIcon } from 'react-feather';
import LoadingOverlay from 'react-loading-overlay';
import { toast } from 'react-toastify';
import v4 from 'uuid/dist/v4';

const AddStageDialog = ({
  open,
  toggleDialog,
  handleSubmit,
  classes,
  stage,
  handleUpdate,
}) => {
  const initialState = {
    title: '',
    location: '',
    description: '',
    distance: '',
    images: [],
    accomodation: {
      images: [],
      boardType: 'breakfast',
    },
  };

  const [state, handleTxtChange, , changeInput, resetState, setState] =
    useManyInputs(initialState);

  const [isImageUploading, toggleImageUploading] = useToggleInput(false);
  const [uploadingText, setUploadingText] = useState('Uploading Image...');

  const [isAccodmodationUploading, toggleAccomodationUploading] =
    useToggleInput(false);
  // const [uploadingText, setUploadingText] = useState('Uploading Image...');

  useEffect(() => {
    console.log(`state.accomodation`, state.accomodation);
  }, [state]);

  const handleImage = async (e) => {
    const { type } = e.currentTarget.dataset;

    setUploadingText('Uploading Image ...');

    if (type === 'image') toggleImageUploading();
    else toggleAccomodationUploading();
    const selectedFile = e.target.files[0];
    const fileType = ['image/'];
    try {
      // console.log(`selectedFile.type`, selectedFile.type);
      if (selectedFile && selectedFile.type.includes(fileType)) {
        let reader = new FileReader();
        reader.readAsDataURL(selectedFile);
        reader.onloadend = async (e) => {
          // console.log(`result onLoadEnd`, e.target.result);
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
          const uploadedImage = {
            src: res.data.url,
            thumbnail: res.data.url,
            _id: v4(),
            thumbnailWidth: 450,
            thumbnailHeight: 250,
          };
          console.log(`res`, res);

          setUploadingText('Updating Image ...');

          console.clear();
          console.log(`state.accomodation`, state.accomodation);
          if (type === 'image')
            changeInput('images', [...state.images, uploadedImage]);
          else if (type === 'state.accomodation')
            setState((st) => ({
              ...st,
              accomodation: {
                ...st.accomodation,
                images: [...st.accomodation.images, uploadedImage],
              },
            }));

          if (type === 'image') toggleImageUploading();
          else toggleAccomodationUploading();
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

  useEffect(() => {
    console.log(`stage`, stage);
    if (stage) setState(stage);
  }, [stage]);

  const handleAccomodation = (e) => {
    setState((st) => ({
      ...st,
      accomodation: {
        ...st.accomodation,
        [e.target.name]: e.target.value,
      },
    }));
  };

  const handleDelete = (e) => {
    const { type, id } = e.currentTarget.dataset;

    if (type === 'image') {
      changeInput(
        'images',
        state.images.filter((img) => img._id !== id)
      );
    } else if (type === 'state.accomodation') {
      setState((st) => ({
        ...st,
        accomodation: {
          ...st.accomodation,
          images: st.accomodation.images.filter((img) => img._id !== id),
        },
      }));
    }
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (state.images.length === 0) {
      toast.error('Select at leat 1 image for stage');
      return;
    }
    // TODO - Accomodation
    // if(state.images.length === 0) {
    //   toast.error('Select at leat 1 image for stage')
    //   return
    // }
    resetState();
    if (stage) handleUpdate(state);
    else handleSubmit(state);
    console.log(`state`, state);
  };

  return (
    <Dialog
      open={open}
      fullWidth
      onClose={toggleDialog}
      className={classes.stageDialog}
    >
      <DialogTitle>Add Steps</DialogTitle>
      <DialogContent>
        <form onSubmit={handleFormSubmit}>
          <Grid container>
            <Grid item sm={12} md={12} lg={3} style={{ padding: '1rem' }}>
              <TextField
                type='text'
                placeholder='Stage Title'
                size='small'
                style={{
                  backgroundColor: '#fff',
                  width: '100%',
                }}
                name='title'
                value={state.title}
                onChange={handleTxtChange}
                required
              />
              <TextField
                type='text'
                placeholder='Destination'
                size='small'
                style={{
                  backgroundColor: '#fff',
                  width: '100%',
                  margin: '0.5rem 0rem 1rem',
                }}
                name='location'
                value={state.location}
                required
                onChange={handleTxtChange}
              />
              <TextField
                type='text'
                placeholder='Description'
                name='description'
                multiline
                rows={10}
                style={{
                  backgroundColor: '#fff',
                  width: '100%',
                  marginTop: '1rem',
                }}
                value={state.description}
                onChange={handleTxtChange}
                required
              />
              <Box className={classes.flexBetween}>
                <Typography variant='text'>Distance</Typography>
                <TextField
                  type='text'
                  placeholder='km'
                  name='distance'
                  size='small'
                  type='number'
                  style={{
                    backgroundColor: '#fff',
                    width: '45%',
                    margin: '1rem 0rem 1rem',
                  }}
                  value={state.distance}
                  required
                  onChange={handleTxtChange}
                />
              </Box>
            </Grid>
            <Grid item sm={12} md={12} lg={9}>
              <Grid container sx={{ justifyContent: 'flex-start' }}>
                <Grid item xs={12}>
                  <Grid
                    container
                    style={
                      {
                        // display: 'flex',
                        // justifyContent: 'flex-start',
                        // alignItems: 'center',
                        // marginRight: '1rem',
                      }
                    }
                  >
                    <Grid item sm={2}>
                      <Typography variant='h5'>Gallery of the Stage</Typography>
                      <input
                        accept='image/*'
                        style={{ display: 'none' }}
                        id='contained-button-file'
                        onChange={handleImage}
                        data-type='image'
                        type='file'
                        name='photo'
                      />
                      <label htmlFor='contained-button-file'>
                        <LoadingOverlay
                          active={isImageUploading}
                          spinner
                          text={uploadingText}
                        >
                          {' '}
                          <Box
                            sx={{ cursor: 'pointer' }}
                            className={classes.imgBackground}
                            mt={1}
                          >
                            <Box className={classes.dashes}>
                              <Box
                                className={classes.image}
                                style={{
                                  display: 'flex',
                                  flexDirection: 'column',
                                  justifyContent: 'center',
                                  marginLeft: '1rem',
                                }}
                              >
                                <Box>
                                  <PlusIcon
                                    size={35}
                                    style={{ color: '#fff' }}
                                  />
                                  <ImageIcon
                                    size={35}
                                    style={{ color: '#fff' }}
                                  />
                                </Box>

                                <Typography style={{ color: '#fff' }}>
                                  New Image
                                </Typography>
                              </Box>
                            </Box>
                          </Box>
                        </LoadingOverlay>
                      </label>
                    </Grid>
                    <Grid item sm={1} />
                    <Grid item sm={9} className={classes.carouselGrid}>
                      <CarouselLayout>
                        {state.images.map((image, i) => (
                          <>
                            <div
                              key={image._id}
                              style={{
                                width: '10rem',
                              }}
                            >
                              <CardMedia
                                className={classes.carouselImages}
                                image={image.src}
                                title='Live from space album cover'
                              />
                            </div>
                            <Box>
                              <Button
                                style={{ color: 'red' }}
                                data-type='image'
                                data-id={image._id}
                                onClick={handleDelete}
                              >
                                {' '}
                                delete{' '}
                              </Button>
                            </Box>
                          </>
                        ))}
                      </CarouselLayout>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item sm={12} md={12} mt={5}>
                  <Box
                    style={{
                      marginRight: '1rem',
                    }}
                  >
                    <Typography variant='h5'>Accommodation</Typography>
                  </Box>
                </Grid>
                <Grid item sm={12} md={12} mt={4}>
                  <Box>
                    <Box ml={2} style={{ width: '60%' }}>
                      <TextField
                        hiddenLabel
                        id='filled-hidden-label-small'
                        placeholder='Name'
                        size='small'
                        className={classes.textInput}
                        name='name'
                        value={state.accomodation?.name}
                        onChange={handleAccomodation}
                      />
                    </Box>
                    <Box ml={2}>
                      <FormControl component='fieldset'>
                        <RadioGroup
                          row
                          aria-label='gender'
                          name='row-radio-buttons-group'
                          value={state?.accomodation?.boardType}
                          name='boardType'
                          onChange={handleAccomodation}
                        >
                          <FormControlLabel
                            value='breakfast'
                            control={<Radio />}
                            label='breakfast'
                          />
                          <FormControlLabel
                            value='half-board'
                            control={<Radio />}
                            label='Half board'
                          />
                          <FormControlLabel
                            value='complete board'
                            control={<Radio />}
                            label='full-board'
                          />
                        </RadioGroup>
                      </FormControl>
                    </Box>
                  </Box>
                </Grid>
                <Grid item sm={2} md={2} mt={4}>
                  <Box
                    style={{
                      display: 'flex',
                      justifyContent: 'flex-start',
                      alignItems: 'center',
                      marginRight: '1rem',
                    }}
                  >
                    <input
                      accept='image/*'
                      style={{ display: 'none' }}
                      id='accomodationImage'
                      onChange={handleImage}
                      type='file'
                      data-type='state.accomodation'
                      name='photo'
                    />
                    <label htmlFor='accomodationImage'>
                      <LoadingOverlay
                        active={isAccodmodationUploading}
                        spinner
                        text={uploadingText}
                      >
                        {' '}
                        <Box
                          sx={{ cursor: 'pointer' }}
                          className={classes.imgBackground}
                        >
                          <Box className={classes.dashes}>
                            <Box
                              className={classes.image}
                              style={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                marginLeft: '1rem',
                              }}
                            >
                              <Box>
                                <PlusIcon size={35} style={{ color: '#fff' }} />
                                <ImageIcon
                                  size={35}
                                  style={{ color: '#fff' }}
                                />
                              </Box>

                              <Typography style={{ color: '#fff' }}>
                                New Image
                              </Typography>
                            </Box>
                          </Box>
                        </Box>
                      </LoadingOverlay>
                    </label>
                  </Box>
                </Grid>
                <Grid item sm={1} />
                <Grid item sm={9} mt={2} className={classes.carouselGrid}>
                  {state.accomodation?.images?.length > 0 && (
                    <CarouselLayout>
                      {state.accomodation?.images?.map((image, i) => (
                        <>
                          <div
                            key={image._id}
                            // className={classes.carouselCard}
                            style={{
                              width: '10rem',
                            }}
                          >
                            <CardMedia
                              className={classes.carouselImages}
                              image={image.src}
                              title='Live from space album cover'
                            />
                          </div>
                          <Box>
                            <Button
                              style={{ color: 'red' }}
                              data-type='state.accomodation'
                              data-id={image._id}
                              onClick={handleDelete}
                            >
                              {' '}
                              delete{' '}
                            </Button>
                          </Box>
                        </>
                      ))}
                    </CarouselLayout>
                  )}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={toggleDialog}
          variant='outlined'
          style={{ color: 'red' }}
        >
          Cancel{' '}
        </Button>
        <Button type='submit' variant='contained'>
          Validate{' '}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddStageDialog;
