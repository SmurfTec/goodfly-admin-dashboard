import React from 'react';
import { makeStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import {
  Box,
  Tab,
  Tabs,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Avatar,
  Grid,
  TextField,
  Table,
  TableHead,
  TableRow,
  Paper,
  TableContainer,
  TableCell,
  TableBody,
  Button,
  Radio,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  RadioGroup,
  FormControlLabel,
  FormLabel,
} from '@material-ui/core';
import Divider from '@material-ui/core/Divider';

import {
  Trash2 as Trash2Icon,
  Download as DownloadIcon,
  Play as PlayIcon,
} from 'react-feather';
import { Plus as PlusIcon, File as FileIcon } from 'react-feather';

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData(
    'Muhammadzain',
    ' zain@gmail.com',
    '+2233123312334',
    'GF12333',
    '11/07/2021'
  ),
  createData(
    'Muhammadali',
    ' ali@gmail.com',
    '+2233123312334',
    'GF12333',
    '11/07/2021'
  ),
  createData(
    'Muhammadali',
    ' ali@gmail.com',
    '+2233123312334',
    'GF12333',
    '11/07/2021'
  ),

  createData(
    'Muhammadumer',
    ' umer@gmail.com',
    '+2233123312334',
    'GF12333',
    '11/07/2021'
  ),
];
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const styles = makeStyles((theme) => ({
  form: {
    margin: '1rem 0rem  2rem',
    // marginBottom: '1rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  table: {
    margin: ' 0.5rem 0.5rem 0.5rem',
  },
  icons: {
    backgroundColor: '#46B9F6',
    color: '#fff',
    width: '2.3rem',
    height: '2rem',
    margin: '0.5rem 0.1rem',
    padding: '0.2rem',
  },
  options: {
    backgroundColor: '#f2f2f2',
    minHeight: '25rem',
    padding: '1rem',
    minHeight: '20rem',
  },
  options2: {
    backgroundColor: '#fff',
    minHeight: '20rem',
  },
  address: {
    width: '100%',
    textAlign: 'center',
    margin: '1rem',
  },
  flexBetween: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: '1rem',
  },
  flexAround: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    margin: '1rem',
  },
  flexLeft: {
    display: 'flex',
    justifyContent: 'left',
    alignItems: 'center',
  },
  Tabs: {
    '& .MuiTab-root': {
      backgroundColor: '#e6e6e6',
      color: '#808080',
    },
    '& .Mui-selected': {
      backgroundColor: '#fafafa',
      color: '#333333',
    },
  },
  header: {
    display: 'inline-flex',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'space-between',
    marginTop: 25,
  },
  textInput: {
    width: '75%',
    backgroundColor: '#fff',
    marginBottom: 7,
  },
  inputBox: {
    border: 0,
    outline: 0,
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  typo: {
    width: '25%',
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
  mainBox: {
    backgroundColor: '#f2f2f2',
    borderRadius: '10px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '3rem 1rem 1rem',
    padding: 20,
  },
}));

const DetailReservation = () => {
  const classes = styles();

  const [value, setValue] = React.useState(0);
  const [tabValue, setTabValue] = React.useState(0);
  const [reservationStatus, setReservationStatus] =
    React.useState('');
  const [payment, setPayment] = React.useState(false);

  const handleReservationStatus = (event) => {
    setReservationStatus(event.target.value);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const openPayment = () => {
    setPayment(true);
  };

  const closePayment = () => {
    setPayment(false);
  };

  return (
    <div style={{ margin: '3rem 0rem 1rem' }}>
      <Typography variant='h4' m={2}>
        Reservation Reference : GF125487
      </Typography>
      <Box
        style={{
          width: '50%',
          margin: '1rem',
          display: 'flex',
          justifyContent: 'left',
          alignItems: 'center',
        }}
      >
        <Typography variant='h5'> Reservation Status :</Typography>
        <FormControl
          size='small'
          style={{
            width: '45%',
            backgroundColor: '#fff',
            margin: '1rem',
          }}
        >
          <InputLabel id='demo-simple-select-label'>
            Reservation Status
          </InputLabel>

          <Select
            labelId='demo-simple-select-label'
            id='demo-simple-select'
            value={reservationStatus}
            label='Reservation Status'
            onChange={handleReservationStatus}
          >
            <MenuItem value={10}>One</MenuItem>
            <MenuItem value={20}>Two</MenuItem>
            <MenuItem value={30}>Three</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Box
        style={{
          width: '50%',
          margin: '1rem',
          display: 'flex',
          justifyContent: 'left',
          alignItems: 'center',
        }}
      >
        {' '}
        <Typography variant='h5' style={{ marginRight: '1rem' }}>
          Payment :{' '}
        </Typography>
        <FormControl component='fieldset'>
          <RadioGroup
            row
            aria-label='gender'
            name='row-radio-buttons-group'
          >
            <FormControlLabel
              value='Total'
              control={<Radio />}
              label='Total'
            />
            <FormControlLabel
              value='3X'
              control={<Radio />}
              label='3X'
            />
            <FormControlLabel
              value='4X'
              control={<Radio />}
              label='4X'
            />
            <FormControlLabel
              value='5X'
              control={<Radio />}
              label='5X'
            />
          </RadioGroup>
        </FormControl>
      </Box>

      <Box
        style={{
          minHeight: '25rem',
          margin: '2rem 1.5rem 0rem',
        }}
      >
        <Box sx={{ width: '100%' }}>
          <Box
            sx={{
              borderBottom: 1,
              borderColor: 'divider',
              borderRadius: '1rem',
            }}
          >
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label='basic tabs example'
              style={{
                backgroundColor: 'white',
              }}
            >
              <Tab label='Offer' {...a11yProps(0)} />
              <Tab label='Client' {...a11yProps(1)} />
              <Tab label='Payment' {...a11yProps(2)} />

              <Box
                style={{
                  display: 'flex',
                  justifyContent: 'right',
                  alignItems: 'center',
                  width: '100%',
                  margin: '0rem 0.5rem 0rem',
                }}
              >
                <Box>
                  <DownloadIcon className={classes.icons} />
                  <Trash2Icon className={classes.icons} />
                  <PlayIcon className={classes.icons} />
                </Box>
              </Box>
            </Tabs>
          </Box>

          {/*  map the Product */}

          <Box className={classes.options}>
            <TabPanel value={value} index={0}>
              <Grid
                container
                style={{ minHeight: '12rem', marginLeft: '1rem' }}
              >
                <Grid item md={3}>
                  <Box>
                    <Avatar
                      alt='Cindy Baker'
                      src='/static/images/avatar/3.jpg'
                      sx={{ width: 100, height: 100 }}
                      style={{ marginTop: 15, margin: '1.5rem' }}
                    />
                  </Box>
                </Grid>
                <Grid item md={7}>
                  <Box className={classes.flexBetween}>
                    <Typography variant='h3'>
                      {' '}
                      #01 Formule Hajj 2020
                    </Typography>
                    <Typography variant='h5'>
                      {' '}
                      Du 5 au 29 avril 2020
                    </Typography>
                  </Box>
                  <Box style={{ margin: '1rem' }}>
                    <Typography variant='text'>
                      Description Search for French expressions in the
                      Description Search for French expressions in the
                      French-English Linguee dictionary and in
                      1000000000 translations.
                    </Typography>
                  </Box>
                </Grid>
              </Grid>

              <Box sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                  <Tabs
                    value={tabValue}
                    onChange={handleTabChange}
                    aria-label='basic tabs example'
                    variant='fullWidth'
                    indicatorColor='primary'
                    textColor='primary'
                    centered
                    className={classes.Tabs}
                  >
                    <Tab label='Journey' {...a11yProps(0)} />
                    <Tab label='Farmalities' {...a11yProps(1)} />
                  </Tabs>
                </Box>
                <Box className={classes.options2}>
                  <TabPanel value={tabValue} index={0}>
                    Item One
                  </TabPanel>
                  <TabPanel value={tabValue} index={1}>
                    Item Two
                  </TabPanel>
                </Box>
              </Box>
            </TabPanel>
            <TabPanel value={value} index={1}>
              <Box className={classes.header}>
                <Typography variant='h4'>Client Area</Typography>
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
                      width: 150,
                      height: 25,
                      textAlign: 'right',
                      padding: 4,
                    }}
                  >
                    {' '}
                    0001
                  </Paper>
                </div>

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
                <Box>
                  <Button
                    variant='outlined'
                    size='medium'
                    style={{
                      color: 'black',
                      border: '1px solid #111111',
                      backgroundColor: '#c6c6c6',
                      minWidth: 140,
                    }}
                  >
                    Modify
                  </Button>{' '}
                </Box>
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
              <Grid container>
                <Grid item md={5}>
                  <Box className={classes.inputBox}>
                    <Typography variant='h5' className={classes.typo}>
                      Name
                    </Typography>
                    <TextField
                      hiddenLabel
                      id='filled-hidden-label-small'
                      defaultValue='Muhammadzain'
                      size='small'
                      className={classes.textInput}
                    />
                  </Box>{' '}
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
                  </Box>{' '}
                  <Box className={classes.inputBox}>
                    <Typography variant='h5' className={classes.typo}>
                      First Name
                    </Typography>
                    <TextField
                      hiddenLabel
                      id='filled-hidden-label-small'
                      defaultValue='Muhammad'
                      size='small'
                      className={classes.textInput}
                    />
                  </Box>{' '}
                  <Box m={5}></Box>
                  <Box className={classes.inputBox}>
                    <Typography variant='h5' className={classes.typo}>
                      Address
                    </Typography>
                    <TextField
                      hiddenLabel
                      id='filled-hidden-label-small'
                      defaultValue='G4 street 20 house no 10 Islamabad'
                      size='small'
                      className={classes.textInput}
                    />
                  </Box>{' '}
                  <Box className={classes.inputBox}>
                    <Typography variant='h5' className={classes.typo}>
                      Comp.address
                    </Typography>
                    <TextField
                      hiddenLabel
                      id='filled-hidden-label-small'
                      defaultValue='Comp.address'
                      size='small'
                      className={classes.textInput}
                    />
                  </Box>{' '}
                  <Box className={classes.inputBox}>
                    <Typography variant='h5' className={classes.typo}>
                      Postal-Code
                    </Typography>
                    <TextField
                      hiddenLabel
                      id='filled-hidden-label-small'
                      defaultValue='44000'
                      size='small'
                      className={classes.textInput}
                    />
                  </Box>{' '}
                  <Box className={classes.inputBox}>
                    <Typography variant='h5' className={classes.typo}>
                      City
                    </Typography>
                    <TextField
                      hiddenLabel
                      id='filled-hidden-label-small'
                      defaultValue='Islamabad'
                      size='small'
                      className={classes.textInput}
                    />
                  </Box>{' '}
                  <Box m={11}></Box>
                  <Box className={classes.inputBox}>
                    <Typography variant='h5' className={classes.typo}>
                      Country
                    </Typography>
                    <TextField
                      hiddenLabel
                      id='filled-hidden-label-small'
                      defaultValue='Pakistan'
                      size='small'
                      className={classes.textInput}
                    />
                  </Box>{' '}
                  <Box className={classes.inputBox}>
                    <Typography variant='h5' className={classes.typo}>
                      Facebook
                    </Typography>
                    <TextField
                      hiddenLabel
                      id='filled-hidden-label-small'
                      defaultValue='www.facebook.com'
                      size='small'
                      className={classes.textInput}
                    />
                  </Box>{' '}
                </Grid>
                <Grid item md={1}></Grid>
                <Grid item md={6}>
                  <Box className={classes.inputBox}>
                    <Typography variant='h5' className={classes.typo}>
                      Email
                    </Typography>
                    <TextField
                      hiddenLabel
                      id='filled-hidden-label-small'
                      defaultValue='Muhammadzain@gmail.com'
                      size='small'
                      className={classes.textInput}
                    />
                  </Box>{' '}
                  <Box className={classes.inputBox}>
                    <Typography variant='h5' className={classes.typo}>
                      Mobile
                    </Typography>
                    <TextField
                      hiddenLabel
                      id='filled-hidden-label-small'
                      defaultValue='+3131231231'
                      size='small'
                      className={classes.textInput}
                    />
                  </Box>{' '}
                  <Box className={classes.inputBox}>
                    <Typography variant='h5' className={classes.typo}>
                      Fixe
                    </Typography>
                    <TextField
                      hiddenLabel
                      id='filled-hidden-label-small'
                      defaultValue='12312312312'
                      size='small'
                      className={classes.textInput}
                    />
                  </Box>{' '}
                  <Box m={5}></Box>
                  <Box className={classes.inputBox}>
                    <Typography variant='h5' className={classes.typo}>
                      Birth date
                    </Typography>
                    <TextField
                      hiddenLabel
                      id='filled-hidden-label-small'
                      defaultValue='12/12/12'
                      size='small'
                      className={classes.textInput}
                    />
                  </Box>{' '}
                  <Box className={classes.inputBox}>
                    <Typography variant='h5' className={classes.typo}>
                      Nationality
                    </Typography>
                    <TextField
                      hiddenLabel
                      id='filled-hidden-label-small'
                      defaultValue='Pakistani'
                      size='small'
                      className={classes.textInput}
                    />
                  </Box>{' '}
                  <Box className={classes.inputBox}>
                    <Typography variant='h5' className={classes.typo}>
                      Passport No
                    </Typography>
                    <TextField
                      hiddenLabel
                      id='filled-hidden-label-small'
                      defaultValue='12dsa132s'
                      size='small'
                      className={classes.textInput}
                    />
                  </Box>{' '}
                  <Box className={classes.inputBox}>
                    <Typography variant='h5' className={classes.typo}>
                      Date of issue
                    </Typography>
                    <TextField
                      hiddenLabel
                      id='filled-hidden-label-small'
                      defaultValue='12/12/12'
                      size='small'
                      className={classes.textInput}
                    />
                  </Box>{' '}
                  <Box className={classes.inputBox}>
                    <Typography variant='h5' className={classes.typo}>
                      place of delivery
                    </Typography>
                    <TextField
                      hiddenLabel
                      id='filled-hidden-label-small'
                      defaultValue='pakistan'
                      size='small'
                      className={classes.textInput}
                    />
                  </Box>{' '}
                  <Box m={5}></Box>
                  <Box className={classes.inputBox}>
                    <Typography variant='h5' className={classes.typo}>
                      Twitter
                    </Typography>
                    <TextField
                      hiddenLabel
                      id='filled-hidden-label-small'
                      defaultValue='www.twitter.com'
                      size='small'
                      className={classes.textInput}
                    />
                  </Box>{' '}
                  <Box className={classes.inputBox}>
                    <Typography variant='h5' className={classes.typo}>
                      Snapchat
                    </Typography>
                    <TextField
                      hiddenLabel
                      id='filled-hidden-label-small'
                      defaultValue='www.snapchat.com'
                      size='small'
                      className={classes.textInput}
                    />
                  </Box>{' '}
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
                      alt='image'
                    />
                  </Grid>
                </Grid>
              </Box>
            </TabPanel>

            <TabPanel value={value} index={2}>
              <TableContainer
                component={Paper}
                className={classes.table}
              >
                <Table
                  sx={{ minWidth: 750 }}
                  aria-label='simple table'
                >
                  <TableHead>
                    <TableRow>
                      <TableCell>Reference</TableCell>
                      <TableCell align='right'>Deadline</TableCell>
                      <TableCell align='right'>Status </TableCell>
                      <TableCell align='right'>
                        Payment Date{' '}
                      </TableCell>
                      <TableCell align='right'>
                        Payroll amount
                      </TableCell>
                      <TableCell align='right'>
                        Payment means
                      </TableCell>
                      <TableCell align='right'>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((row, index) => (
                      <TableRow key={row.name}>
                        <TableCell component='th' scope='row'>
                          {row.name}
                        </TableCell>
                        <TableCell align='right'>
                          {row.calories}
                        </TableCell>
                        <TableCell align='right'>{row.fat}</TableCell>
                        <TableCell align='right'>
                          {row.carbs}
                        </TableCell>
                        <TableCell align='right'>
                          {row.protein}
                        </TableCell>
                        <TableCell align='right'>
                          {row.protein}
                        </TableCell>
                        <TableCell align='right'>
                          <Button>Detail</Button>{' '}
                        </TableCell>
                        <TableCell align='right'>
                          <Button>Edit</Button>{' '}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <Box
                style={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'right',
                  alignItems: 'center',
                }}
              >
                <Box
                  style={{
                    backgroundColor: 'white',
                    minHeight: '10rem',
                    width: '18rem',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '1rem',
                  }}
                >
                  <Box>
                    <Typography variant='h5' m={1}>
                      Total Reservations
                    </Typography>
                    <Typography variant='h5' m={1}>
                      Total Paye
                    </Typography>
                    <Typography variant='h5' m={1}>
                      Stay paid
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant='h5' m={1}>
                      12000.00${' '}
                    </Typography>
                    <Typography variant='h5' m={1}>
                      6300.00$
                    </Typography>
                    <Typography variant='h5' m={1}>
                      2100.00$
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </TabPanel>
          </Box>
        </Box>
      </Box>

      {/*  Dialog */}

      <Button onClick={openPayment}> Dialog ????</Button>

      <div>
        <Dialog open={payment} maxWidth='lg' onClose={closePayment}>
          <DialogTitle>
            <Typography variant='h4'>
              Payment of the due date Ref : GF125487
            </Typography>
          </DialogTitle>
          <DialogContent>
            <Box
              className={classes.flexBetween}
              style={{ margin: 0 }}
            >
              <Typography variant='h5'>
                Amount of the due date : 2100.00$
              </Typography>
              <Box className={classes.flexAround}>
                <Typography variant='text'>
                  Add a payment method
                </Typography>
                <Box>
                  <PlusIcon
                    style={{
                      borderRadius: '1.2rem',
                      width: '2.1rem',
                      marginLeft: '0.5rem',
                    }}
                    className={classes.icons}
                  />
                </Box>
              </Box>
            </Box>
            <Divider />

            <Box
              style={{
                display: 'flex',
                justifyContent: 'right',
                alignItems: 'center',
              }}
            >
              <Typography variant='h5' mr={1}>
                Payment Method :{' '}
              </Typography>
              <FormControl component='fieldset'>
                <RadioGroup
                  row
                  aria-label='gender'
                  name='row-radio-buttons-group'
                >
                  <FormControlLabel
                    value='Bank card'
                    control={<Radio />}
                    label='Bank card'
                  />
                  <FormControlLabel
                    value='Bank Transfer'
                    control={<Radio />}
                    label='Bank Transfer'
                  />
                  <FormControlLabel
                    value='Bank check'
                    control={<Radio />}
                    label='Bank check'
                  />
                  <FormControlLabel
                    value='Espece'
                    control={<Radio />}
                    label='Espece'
                  />
                  <FormControlLabel
                    value='Loyalty points'
                    control={<Radio />}
                    label='Loyalty points'
                  />
                </RadioGroup>
              </FormControl>
            </Box>
            <Box className={classes.flexLeft}>
              <Box className={classes.form}>
                <TextField
                  autoFocus
                  margin='dense'
                  id='name'
                  label='Espece'
                  type='text'
                  fullWidth
                  style={{ marginRight: '2rem' }}
                />
              </Box>
              <Box className={classes.form}>
                <TextField
                  autoFocus
                  margin='dense'
                  id='date'
                  label='20/12/21'
                  type='date'
                  fullWidth
                  style={{ marginRight: '2rem' }}
                />
              </Box>
              <Box className={classes.form}>
                <TextField
                  autoFocus
                  margin='dense'
                  id='payment'
                  label='1000.00'
                  type='text'
                  fullWidth
                  style={{ marginRight: '2rem' }}
                />
              </Box>
            </Box>
            <Divider />

            <Box
              style={{
                display: 'flex',
                justifyContent: 'right',
                alignItems: 'center',
              }}
            >
              <Typography variant='h5' mr={1}>
                Payment Method :{' '}
              </Typography>
              <FormControl component='fieldset'>
                <RadioGroup
                  row
                  aria-label='gender'
                  name='row-radio-buttons-group'
                >
                  <FormControlLabel
                    value='Bank card'
                    control={<Radio />}
                    label='Bank card'
                  />
                  <FormControlLabel
                    value='Bank Transfer'
                    control={<Radio />}
                    label='Bank Transfer'
                  />
                  <FormControlLabel
                    value='Bank check'
                    control={<Radio />}
                    label='Bank check'
                  />
                  <FormControlLabel
                    value='Espece'
                    control={<Radio />}
                    label='Espece'
                  />
                  <FormControlLabel
                    value='Loyalty points'
                    control={<Radio />}
                    label='Loyalty points'
                  />
                </RadioGroup>
              </FormControl>
            </Box>
            <Box className={classes.flexLeft}>
              <Box className={classes.form}>
                <TextField
                  autoFocus
                  margin='dense'
                  id='name'
                  label='Transaction number'
                  type='text'
                  fullWidth
                  style={{ marginRight: '2rem' }}
                />
              </Box>
              <Box className={classes.form}>
                <TextField
                  autoFocus
                  margin='dense'
                  id='transication'
                  label='Transaction  Date'
                  type='text'
                  fullWidth
                  style={{ marginRight: '2rem' }}
                />
              </Box>
              <Box className={classes.form}>
                <TextField
                  autoFocus
                  margin='dense'
                  id='Transaction Amount'
                  label='Transaction Amount'
                  type='text'
                  fullWidth
                  style={{ marginRight: '2rem' }}
                />
              </Box>
            </Box>
          </DialogContent>
          <DialogActions
            className={classes.form}
            style={{ margin: '1rem', justifyContent: 'right' }}
          >
            <Button variant='outlined' onClick={closePayment}>
              Cancel
            </Button>
            <Button variant='contained' onClick={closePayment}>
              Validate
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};

export default DetailReservation;
