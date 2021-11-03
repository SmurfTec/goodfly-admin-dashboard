import React from 'react';
import { makeStyles } from '@material-ui/styles';
import {
  Typography,
  Grid,
  Box,
  TextField,
  Button,
  Avatar,
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
    margin: 25,
    padding: 20,
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
    minHeight: '8rem',
    margin: '0.5rem',
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
                  defaultValue='zain'
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
                  defaultValue='price'
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
                  defaultValue='+2123123131'
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
                  defaultValue='www.facebook.com'
                  size='small'
                  className={classes.textInput}
                />
              </Box>
              <Box
                className={classes.inputBox}
                style={{ margin: '1rem' }}
              >
                <Typography variant='h5'>Dimensions</Typography>
                <Box
                  style={{
                    textAlign: 'center',
                    width: '82%',
                    display: 'flex',
                    justifyContent: 'space-around',
                  }}
                >
                  <TextField
                    hiddenLabel
                    id='filled-hidden-label-small'
                    defaultValue='cm'
                    size='small'
                    // className={classes.textInput}
                    style={{
                      width: '18%',
                      backgroundColor: '#fff',
                    }}
                  />
                  <TextField
                    hiddenLabel
                    id='filled-hidden-label-small'
                    defaultValue='cm'
                    size='small'
                    style={{
                      width: '18%',
                      backgroundColor: '#fff',
                    }}
                  />
                  <TextField
                    hiddenLabel
                    id='filled-hidden-label-small'
                    defaultValue='cm'
                    size='small'
                    style={{
                      width: '18%',
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
                  defaultValue='add product description'
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
                <Typography variant='h5' className={classes.typo}>
                  Labels
                </Typography>
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
                  justifyContent: 'space-around',
                  alignItems: 'center',
                  width: '100%',
                  minHeight: 180,
                  padding: 15,
                  margin: 15,
                }}
              >
                <Box
                  style={{
                    backgroundColor: '#fff',
                    minHeight: '8rem',
                  }}
                >
                  <CardMedia
                    style={{
                      width: '5rem',
                      height: '5rem',
                    }}
                    image='https://picsum.photos/200/300?random=2'
                    title='product name'
                  />
                </Box>
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
