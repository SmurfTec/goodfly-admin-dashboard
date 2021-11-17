import React, { useContext, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import {
  Typography,
  Grid,
  Box,
  TextField,
  Button,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
  Switch,
  CardMedia,
  Paper,
} from '@material-ui/core';
import { Plus as PlusIcon, File as FileIcon } from 'react-feather';

import uuid from 'uuid/dist/v4';
import useManyInputs from 'hooks/useManyInputs';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { ProductContext } from 'Contexts/ProductContext';
import { toast } from 'react-toastify';
import useToggleInput from 'hooks/useToggleInput';
import LoadingOverlay from 'react-loading-overlay';
import axios from 'axios';
import { useParams } from 'react-router';
import CarouselLayout from 'components/common/Carousel/CarouselLayout';
import v4 from 'uuid/dist/v4';

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
    margin: 12,
    padding: 15,
    [theme.breakpoints.down('lg')]: {
      margin: 5,
      padding: 20,
    },
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
  image: {
    margin: '0.5rem',
    padding: '1rem',
    minHeight: '10rem',
    minWidth: '10rem',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    border: `2px dashed #fff`,
    borderRadius: '10px',
  },
  dimensions: {
    backgroundColor: '#fff',
    width: '25%',
    [theme.breakpoints.down('lg')]: {
      width: '30%',
    },
  },
}));

const productCategories = [
  { id: uuid(), value: 'Miscellaneous accessories' },
  { id: uuid(), value: 'Aromatics, Spices and Herbs' },
  { id: uuid(), value: 'Wellness & Health Articles' },
  { id: uuid(), value: 'Biscuits & Cakes' },
  { id: uuid(), value: 'Sweets & Confectionery' },
  { id: uuid(), value: 'Gifts & Boxes' },
  { id: uuid(), value: 'Coffees & Cocoas' },
  { id: uuid(), value: 'Cereals, Rice & Pasta' },
  { id: uuid(), value: 'Chocolates' },
  { id: uuid(), value: 'Home-made jams' },
  { id: uuid(), value: 'Dates' },
  { id: uuid(), value: 'Droguerie' },
  { id: uuid(), value: 'Dried Fruits' },
  { id: uuid(), value: 'Essential oils' },
  { id: uuid(), value: 'Oils, Vinegars, & Seasonings' },
  { id: uuid(), value: 'Juices, Lemonades & Syrups' },
  { id: uuid(), value: 'Honey' },
  { id: uuid(), value: 'Promotional offers' },
  { id: uuid(), value: 'Spreads' },
  { id: uuid(), value: 'Canned products' },
  { id: uuid(), value: 'Exceptional Products' },
  { id: uuid(), value: 'Sauces & Condiments' },
  { id: uuid(), value: 'Sugars, Salts & Peppers' },
  { id: uuid(), value: 'Teas & Infusions' },
];

const EditProduct = () => {
  const classes = styles();
  const theme = useTheme();
  const lgDown = useMediaQuery(theme.breakpoints.down('lg'));

  const { products, getProductById, modifyProduct } =
    useContext(ProductContext);
  const { id } = useParams();

  const initialState = {
    name: '',
    price: '',
    category: '',
    weight: '',
    pricePerKilo: '',
    length: '',
    width: '',
    height: '',
    description: '',
    labels: [],
    label: '',
    images: [],
    isOnline: false,
  };

  const [loading, setLoading] = useState(true);

  const [isImageUploading, toggleImageUploading] =
    useToggleInput(false);
  const [uploadingText, setUploadingText] = useState(
    'Uploading Image...'
  );

  const [
    state,
    handleTxtChange,
    handleToggleChange,
    changeInput,
    resetState,
    setState,
  ] = useManyInputs(initialState);

  useEffect(() => {
    const product = getProductById(id);
    console.log(`product`, product);
    if (!product || product === 'loading') setLoading(true);
    else {
      setState({
        ...initialState,
        ...product,
      });
      setLoading(false);
    }
  }, [id, products]);

  // add new label
  const handleLabel = (e) => {
    e.preventDefault();
    changeInput('labels', [...state.labels, state.label]);
    changeInput('label', '');
  };

  const deleteImage = (id) => {
    changeInput(
      'images',
      state.images.filter((el) => el._id !== id)
    );
  };

  // remove label
  const removeLabel = (el) => {
    changeInput(
      'labels',
      state.labels.filter((item) => item !== el)
    );
  };

  // modify
  const handleSubmit = (e) => {
    e.preventDefault();
    modifyProduct(id, state);
  };

  const handleImage = async (e) => {
    setUploadingText('Uploading Image ...');
    toggleImageUploading();
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
          const uploadedImage = res.data.url;
          console.log(`res`, res);

          setUploadingText('Updating Image ...');

          changeInput('images', [
            ...state.images,
            { _id: v4(), image: uploadedImage },
          ]);

          toggleImageUploading();
        };
      } else {
        toast.error('Only Image files are acceptable !');
      }
    } catch (err) {
      toast(
        err?.response?.data?.message ||
          err.message ||
          'Something Went Wrong'
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
            New product
          </Typography>
        </Box>

        <Grid container>
          <Grid
            item
            xs={12}
            sm={12}
            md={12}
            style={{ minHeight: 400 }}
          >
            <Box
              className={classes.mainBox}
              style={{ padding: '5rem' }}
            >
              <Box
                style={{
                  display: 'flex',
                  justifyContent: 'right',
                  width: '100%',
                }}
              >
                <Typography variant='h5'>
                  Online
                  <Switch
                    checked={state.isOnline}
                    onChange={handleToggleChange}
                    name='isOnline'
                    inputProps={{ 'aria-label': 'controlled' }}
                  />
                </Typography>
              </Box>
              <Box className={classes.inputBox}>
                <Typography variant='h5' className={classes.typo}>
                  Name
                </Typography>
                <TextField
                  hiddenLabel
                  id='filled-hidden-label-small'
                  placeholder='name'
                  size='small'
                  className={classes.textInput}
                  name='name'
                  value={state.name}
                  onChange={handleTxtChange}
                />
              </Box>
              <Box className={classes.inputBox}>
                <Typography variant='h5' className={classes.typo}>
                  Price
                </Typography>
                <TextField
                  hiddenLabel
                  id='filled-hidden-label-small'
                  placeholder='price $'
                  size='small'
                  type='number'
                  InputProps={{ min: 5 }}
                  className={classes.textInput}
                  name='price'
                  value={state.price}
                  onChange={handleTxtChange}
                />
              </Box>
              <Box className={classes.inputBox}>
                <Typography variant='h5' className={classes.typo}>
                  Category
                </Typography>
                <FormControl
                  fullWidth
                  size='small'
                  style={{
                    width: '80%',
                    backgroundColor: '#fff',
                    marginBottom: 15,
                  }}
                >
                  <InputLabel id='demo-simple-select-label'>
                    Category
                  </InputLabel>

                  <Select
                    labelId='demo-simple-select-label'
                    id='demo-simple-select'
                    label='Category'
                    name='category'
                    value={state.category}
                    onChange={handleTxtChange}
                  >
                    {/* <MenuItem value={10}>One</MenuItem>
                    <MenuItem value={20}>Two</MenuItem> */}
                    {productCategories.map((category) => (
                      <MenuItem
                        value={category.value}
                        key={category.id}
                      >
                        {category.value}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>{' '}
              <Box className={classes.inputBox}>
                <Typography variant='h5' className={classes.typo}>
                  {' '}
                  Weight{' '}
                </Typography>
                <TextField
                  hiddenLabel
                  id='filled-hidden-label-small'
                  placeholder='1'
                  size='small'
                  className={classes.textInput}
                  name='weight'
                  type='number'
                  value={state.weight}
                  onChange={handleTxtChange}
                />
              </Box>{' '}
              <Box className={classes.inputBox}>
                <Typography variant='h5' className={classes.typo}>
                  Price Per Kilo
                </Typography>
                <TextField
                  hiddenLabel
                  id='filled-hidden-label-small'
                  placeholder='kg'
                  size='small'
                  className={classes.textInput}
                  name='pricePerKilo'
                  value={state.pricePerKilo}
                  onChange={handleTxtChange}
                />
              </Box>
              <Box className={classes.inputBox}>
                <Typography variant='h5' className={classes.typo}>
                  Dimensions
                </Typography>
                <Box
                  style={{
                    textAlign: 'center',
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-around',
                  }}
                >
                  <TextField
                    type='number'
                    InputProps={{ min: 1 }}
                    hiddenLabel
                    id='filled-hidden-label-small'
                    placeholder='Length (cm)'
                    size='small'
                    className={classes.dimensions}
                    name='length'
                    value={state.length}
                    onChange={handleTxtChange}
                  />
                  <TextField
                    type='number'
                    InputProps={{ min: 1 }}
                    hiddenLabel
                    id='filled-hidden-label-small'
                    placeholder='Width (cm)'
                    size='small'
                    className={classes.dimensions}
                    name='width'
                    value={state.width}
                    onChange={handleTxtChange}
                  />
                  <TextField
                    type='number'
                    InputProps={{ min: 1 }}
                    hiddenLabel
                    id='filled-hidden-label-small'
                    placeholder='Height (cm)'
                    size='small'
                    className={classes.dimensions}
                    name='height'
                    value={state.height}
                    onChange={handleTxtChange}
                  />
                </Box>
              </Box>{' '}
              <Box
                className={classes.inputBox}
                style={{ display: 'inline-block' }}
                mt={1}
              >
                <Typography variant='h5'>
                  Description of Product
                </Typography>
                <TextField
                  hiddenLabel
                  id='filled-hidden-label-small'
                  placeholder='Add product description'
                  size='small'
                  multiline
                  rows={7}
                  style={{
                    backgroundColor: '#fff',
                    width: '100%',
                    margin: '0.5rem 0rem  1rem',
                  }}
                  name='description'
                  value={state.description}
                  onChange={handleTxtChange}
                />
              </Box>{' '}
              <Box
                className={classes.inputBox}
                style={{ display: 'inline-block' }}
              >
                <Box
                  display='flex'
                  justifyContent='left'
                  alignItems='center'
                >
                  <Typography variant='h5' mr={12}>
                    Labels
                  </Typography>
                  <form id='labelForm' onSubmit={handleLabel}>
                    <TextField
                      hiddenLabel
                      required
                      id='filled-hidden-label-small'
                      placeholder='Add Five Labels'
                      size='small'
                      style={{
                        width: lgDown ? '60%' : '50%',
                        backgroundColor: '#fff',
                      }}
                      name='label'
                      value={state.label}
                      onChange={handleTxtChange}
                    />
                    <Button
                      form='labelForm'
                      variant='contained'
                      size='large'
                      disabled={state.labels?.length >= 5}
                      style={{ marginLeft: '0.5rem' }}
                      type='submit'
                    >
                      Add
                    </Button>
                  </form>
                </Box>
                <Box
                  style={{
                    backgroundColor: '#fff',
                    width: '60%',
                    margin: '1rem 1rem  1rem',
                    padding: '1rem',
                    minHeight: '7rem',
                  }}
                >
                  {state.labels?.map((el) => (
                    <Box
                      sx={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        cursor: 'pointer',
                        transition: '0.5s',
                        paddingInline: 20,
                        '&:hover': {
                          backgroundColor: '#ff00003b',
                          '& h5': {
                            textDecoration: 'line-through',
                          },
                        },
                      }}
                      onClick={removeLabel.bind(this, el)}
                    >
                      <Typography variant='h5' key={uuid()}>
                        {el}
                      </Typography>
                      <Typography component='p'>X</Typography>
                      {/* <XIcon  /> */}
                    </Box>
                  ))}
                  <Box />
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>

        {/*  product photos  */}

        <Box className={classes.mainBox}>
          <Typography
            variant='h3'
            style={{ width: '100%', marginTop: '1rem' }}
          >
            Products images
          </Typography>

          <Grid container spacing={3}>
            <Grid item md={9}>
              <CarouselLayout>
                {state.images?.map((image, index) => (
                  <div key={index} className={classes.carouselCard}>
                    <CardMedia
                      style={{ height: '10rem' }}
                      image={image.image}
                      title='Live from space album cover'
                    />
                    <Box
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                    >
                      <Button
                        onClick={deleteImage.bind(this, image._id)}
                        style={{ color: 'red' }}
                      >
                        Delete
                      </Button>
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
              <LoadingOverlay
                active={isImageUploading}
                spinner
                text={uploadingText}
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
                            <PlusIcon
                              size={35}
                              style={{ color: '#fff' }}
                            />
                            <FileIcon
                              size={35}
                              style={{ color: '#fff' }}
                            />
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
              </LoadingOverlay>{' '}
            </Grid>
          </Grid>
          <Box
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
              padding: '2rem 2rem 1rem',
            }}
          >
            <Button
              form='newProductForm'
              type='submit'
              variant='contained'
              size='medium'
              style={{ width: 150 }}
              onClick={handleSubmit}
            >
              Update
            </Button>
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default EditProduct;
