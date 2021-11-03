import React from 'react';
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
    margin: 12,
    padding: 15,
    cursor: 'pointer',
    [theme.breakpoints.down('lg')]: {
      margin: 25,
      padding: 25,
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
}));

const CreateProduct = () => {
  const classes = styles();

  const [category, setCategory] = React.useState('');
  const [checked, setChecked] = React.useState(true);

  const handleChange = (event) => {
    setCategory(event.target.value);
  };

  const toggle = (event) => {
    setChecked(event.target.checked);
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
          <Grid item xs={12} sm={7} md={7} style={{ minHeight: 400 }}>
            <Box className={classes.mainBox}>
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
                    checked={checked}
                    onChange={toggle}
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
                  placeholder='zain'
                  size='small'
                  className={classes.textInput}
                />
              </Box>
              <Box className={classes.inputBox}>
                <Typography variant='h5' className={classes.typo}>
                  Price
                </Typography>
                <TextField
                  hiddenLabel
                  id='filled-hidden-label-small'
                  placeholder='price'
                  size='small'
                  className={classes.textInput}
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
                    marginBottom: 7,
                  }}
                >
                  <InputLabel id='demo-simple-select-label'>
                    Category
                  </InputLabel>

                  <Select
                    labelId='demo-simple-select-label'
                    id='demo-simple-select'
                    value={category}
                    label='Category'
                    onChange={handleChange}
                  >
                    <MenuItem value={10}>One</MenuItem>
                    <MenuItem value={20}>Two</MenuItem>
                    <MenuItem value={30}>Three</MenuItem>
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
                  placeholder='+2123123131'
                  size='small'
                  className={classes.textInput}
                />
              </Box>{' '}
              <Box className={classes.inputBox}>
                <Typography variant='h5' className={classes.typo}>
                  Price Per Kilo
                </Typography>
                <TextField
                  hiddenLabel
                  id='filled-hidden-label-small'
                  placeholder='www.facebook.com'
                  size='small'
                  className={classes.textInput}
                />
              </Box>
              <Box
                className={classes.inputBox}
                style={{ margin: '1rem' }}
              >
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
                    hiddenLabel
                    id='filled-hidden-label-small'
                    placeholder='cm'
                    size='small'
                    // className={classes.textInput}
                    style={{
                      width: '20%',
                      backgroundColor: '#fff',
                    }}
                  />
                  <TextField
                    hiddenLabel
                    id='filled-hidden-label-small'
                    placeholder='cm'
                    size='small'
                    style={{
                      width: '20%',
                      backgroundColor: '#fff',
                    }}
                  />
                  <TextField
                    hiddenLabel
                    id='filled-hidden-label-small'
                    placeholder='cm'
                    size='small'
                    style={{
                      width: '20%',
                      backgroundColor: '#fff',
                    }}
                  />
                </Box>
              </Box>{' '}
              <Box
                className={classes.inputBox}
                style={{ display: 'inline-block' }}
              >
                <Typography variant='h5'>
                  Description of Product
                </Typography>
                <TextField
                  hiddenLabel
                  id='filled-hidden-label-small'
                  placeholder='add product description'
                  size='small'
                  multiline
                  rows={7}
                  style={{
                    backgroundColor: '#fff',
                    width: '100%',
                    margin: '1rem 0rem  1rem',
                  }}
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
                  <TextField
                    hiddenLabel
                    id='filled-hidden-label-small'
                    placeholder='www.facebook.com'
                    size='small'
                    style={{
                      width: '50%',
                      backgroundColor: '#fff',
                      marginBottom: 7,
                    }}
                  />
                </Box>
                <Box
                  style={{
                    backgroundColor: '#fff',
                    width: '50%',
                    margin: '1rem 0rem  1rem',
                    padding: '1rem',
                    minHeight: '7rem',
                  }}
                >
                  list of labels <Box />
                </Box>
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
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  width: '100%',
                  minHeight: 180,
                  padding: 15,
                  margin: 15,
                }}
              >
                <Grid container>
                  <Grid item lg={6}>
                    <Box mt={1}>
                      <CardMedia
                        style={{
                          width: '12rem',
                          height: '12rem',
                        }}
                        image='https://picsum.photos/200/300?random=2'
                        title='product name'
                      />
                    </Box>
                  </Grid>
                  <Grid item lg={6}>
                    {' '}
                    <Box
                      mt={1}
                      p={1}
                      style={{
                        backgroundColor: '#808080',
                        borderRadius: '10px',
                      }}
                    >
                      <Box className={classes.image}>
                        <input
                          accept='image/*'
                          style={{ display: 'none' }}
                          id='contained-button-file'
                          multiple
                          type='file'
                        />
                        <label htmlFor='contained-button-file'>
                          <Box
                            display='flex'
                            justifyContent='center'
                            style={{ cursor: 'pointer' }}
                          >
                            <PlusIcon
                              size={35}
                              style={{ color: '#fff' }}
                            />
                            <FileIcon
                              size={35}
                              style={{ color: '#fff' }}
                            />
                          </Box>
                          <Typography style={{ color: '#fff' }}>
                            Upload Document
                          </Typography>
                        </label>
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
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
                Create
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default CreateProduct;
