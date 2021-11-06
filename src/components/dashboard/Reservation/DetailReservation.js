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
  CardMedia,
  Switch,
} from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import stageImg1 from 'Assets/img/stage1.png';
import stageImg2 from 'Assets/img/stage12.png';
import stageImg3 from 'Assets/img/stage2.png';
import stageImg4 from 'Assets/img/stage23.png';
import CarouselLayout from 'components/common/Carousel/CarouselLayout';

import {
  Trash2 as Trash2Icon,
  Printer as PrinterIcon,
  Play as PlayIcon,
} from 'react-feather';
import { Plus as PlusIcon, File as FileIcon } from 'react-feather';

import StagesTab from '../Offer/StagesTab';
import FormalitiesTab from '../Offer/FormalitiesTab';

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const stages = [
  {
    _id: '12312',
    date: '05/04/2020 - Jour #01 : ',
    locatation: 'Départ Aéroport Paris CDG',
    description: `Ut mi turpis, sagittis quis eleifend non, faucibus eget velit. Proin ullamcorper 
      pulvinar velit, vitae egestas mauris mattis in. Nam dapibus facilisis nisi, non mollis
      magna. Pellentesque at tincidunt tortor. Quisque imperdiet condimentum. 
      `,
    accommodations: [
      {
        _id: '12312312',
        location: 'Etape : Aéroport internationnal Paris Charles de Gaulle',
        description:
          'Aliquam vel purus molestie, bibendum quam ac, tempor tortor.',
      },
      {
        _id: '12312',
        location: 'Repas : Demi-pension',
        description:
          'Urna quis sodales luctus, leo diam porttitor ante, sit amet venenatis sapien nisi in lacus.',
      },
    ],
    images: [stageImg1],
  },
  {
    _id: '12122',
    date: '05/04/2020 - Jour #01 : ',
    locatation: 'Départ Aéroport Paris CDG',
    description: `Ut mi turpis, sagittis quis eleifend non, faucibus eget velit. Proin ullamcorper 
      pulvinar velit, vitae egestas mauris mattis in. Nam dapibus facilisis nisi, non mollis
      magna. Pellentesque at tincidunt tortor. Quisque imperdiet condimentum. 
      `,
    accommodations: [
      {
        _id: '12312312',
        location: 'Etape : Aéroport internationnal Paris Charles de Gaulle',
        description:
          'Aliquam vel purus molestie, bibendum quam ac, tempor tortor.',
      },
      {
        _id: '12312',
        location: 'Repas : Demi-pension',
        description:
          'Urna quis sodales luctus, leo diam porttitor ante, sit amet venenatis sapien nisi in lacus.',
      },
    ],
    images: [stageImg1, stageImg2, stageImg3, stageImg3, stageImg3],
  },
  {
    _id: '121dasdad2',
    date: '05/04/2020 - Jour #01 : ',
    locatation: 'Départ Aéroport Paris CDG',
    description: `Ut mi turpis, sagittis quis eleifend non, faucibus eget velit. Proin ullamcorper 
      pulvinar velit, vitae egestas mauris mattis in. Nam dapibus facilisis nisi, non mollis
      magna. Pellentesque at tincidunt tortor. Quisque imperdiet condimentum. 
      `,
    accommodations: [
      {
        _id: '12312312',
        location: 'Etape : Aéroport internationnal Paris Charles de Gaulle',
        description:
          'Aliquam vel purus molestie, bibendum quam ac, tempor tortor.',
      },
      {
        _id: '12312',
        location: 'Repas : Demi-pension',
        description:
          'Urna quis sodales luctus, leo diam porttitor ante, sit amet venenatis sapien nisi in lacus.',
      },
    ],
    images: [
      stageImg3,
      stageImg4,
      // stageImg3,
      // stageImg4,
      // stageImg3,
      // stageImg4,
    ],
  },
];

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

const trips = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
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
    minHeight: 150,
    margin: 7,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    border: `2px dashed #fff`,
    borderRadius: '10px',
    cursor: 'pointer',
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
  const [reservationStatus, setReservationStatus] = React.useState('');
  const [payment, setPayment] = React.useState(false);
  const [ok, setOk] = React.useState(true);

  const toggle = (event) => {
    setOk(event.target.ok);
  };
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
          <RadioGroup row aria-label='gender' name='row-radio-buttons-group'>
            <FormControlLabel value='Total' control={<Radio />} label='Total' />
            <FormControlLabel value='3X' control={<Radio />} label='3X' />
            <FormControlLabel value='4X' control={<Radio />} label='4X' />
            <FormControlLabel value='5X' control={<Radio />} label='5X' />
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
                  <PrinterIcon className={classes.icons} />
                  <Trash2Icon className={classes.icons} />
                  <PlayIcon className={classes.icons} />
                </Box>
              </Box>
            </Tabs>
          </Box>

          {/*  map the Product */}

          <Box className={classes.options}>
            <TabPanel
              value={value}
              index={0}
              style={{ backgroundColor: '#f2f2f2' }}
            >
              <Grid
                container
                style={{ minHeight: '12rem', marginLeft: '1rem' }}
              >
                <Grid item md={3} style={{ padding: '1.5rem' }}>
                  <CardMedia
                    style={{ height: '8rem' }}
                    image='https://picsum.photos/200/300?random=2'
                    title='trip'
                  />
                </Grid>
                <Grid item md={9} style={{ padding: '1.5rem' }}>
                  <Box className={classes.flexBetween}>
                    <Typography variant='h3'> #01 Formule Hajj 2020</Typography>
                    <Typography variant='h5'> Du 5 au 29 avril 2020</Typography>
                  </Box>
                  <Box style={{ margin: '1rem' }}>
                    <Typography variant='text'>
                      Description Search for French expressions in the
                      Description Search for French expressions in the
                      French-English Linguee dictionary and in 1000000000
                      translations.
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
                    <Tab label='Formalities' {...a11yProps(1)} />
                  </Tabs>
                </Box>
                <Box className={classes.options2}>
                  <TabPanel value={tabValue} index={0}>
                    <StagesTab stages={stages ? stages : []} />
                  </TabPanel>
                  <TabPanel value={tabValue} index={1}>
                    <FormalitiesTab />
                  </TabPanel>
                </Box>
              </Box>
            </TabPanel>
            <TabPanel
              value={value}
              index={1}
              style={{ backgroundColor: '#f2f2f2' }}
            >
              <Box className={classes.header}>
                <Typography variant='h4'>Client Area</Typography>
                <div style={{ display: 'flex' }}>
                  <Typography variant='h5' style={{ margin: '0px 10px 0px' }}>
                    Number
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
              <Typography
                variant='h3'
                style={{ width: '100%', marginTop: '3rem' }}
              >
                Attachments
              </Typography>

              <Grid container spacing={3}>
                <Grid item md={9}>
                  <CarouselLayout>
                    {trips.map((trip, i) => (
                      <div key={trip._id} className={classes.carouselCard}>
                        <CardMedia
                          style={{ height: '10rem' }}
                          image='https://picsum.photos/200/300?random=2'
                          title='Live from space album cover'
                        />
                        <Box
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                          }}
                        >
                          <Button>modify</Button>
                          <Button style={{ color: 'red' }}>Delete</Button>
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
                <Grid item md={3}>
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
                          multiple
                          type='file'
                        />
                        <label htmlFor='contained-button-file'>
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
                        </label>
                      </Box>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </TabPanel>

            <TabPanel
              value={value}
              index={2}
              style={{ backgroundColor: '#f2f2f2' }}
            >
              <TableContainer component={Paper} className={classes.table}>
                <Table sx={{ minWidth: 750 }} aria-label='simple table'>
                  <TableHead>
                    <TableRow>
                      <TableCell>Reference</TableCell>
                      <TableCell align='right'>Deadline</TableCell>
                      <TableCell align='right'>Status </TableCell>
                      <TableCell align='right'>Payment Date </TableCell>
                      <TableCell align='right'>Payroll amount</TableCell>
                      <TableCell align='right'>Payment means</TableCell>
                      <TableCell align='right'>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((row, index) => (
                      <TableRow key={row.name}>
                        <TableCell component='th' scope='row'>
                          {row.name}
                        </TableCell>
                        <TableCell align='right'>{row.calories}</TableCell>
                        <TableCell align='right'>{row.fat}</TableCell>
                        <TableCell align='right'>{row.carbs}</TableCell>
                        <TableCell align='right'>{row.protein}</TableCell>
                        <TableCell align='right'>{row.protein}</TableCell>
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
            <Box className={classes.flexBetween} style={{ margin: 0 }}>
              <Typography variant='h5'>
                Amount of the due date : 2100.00$
              </Typography>
              <Box className={classes.flexAround}>
                <Typography variant='text'>Add a payment method</Typography>
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
