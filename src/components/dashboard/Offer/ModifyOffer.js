import React from 'react';
import { makeStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import {
  Box,
  Tab,
  Tabs,
  Typography,
  Button,
  Grid,
  CardMedia,
  Card,
  Select,
  InputLabel,
  MenuItem,
  FormControl,
  TextField,
  FormControlLabel,
  Radio,
  RadioGroup,
  Checkbox,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  List,
  ListItem,
  ListItemText,
} from '@material-ui/core';
import Gallery from 'react-grid-gallery';
import CarouselLayout from 'components/common/Carousel/CarouselLayout';
import { Plus as PlusIcon, Image as ImageIcon } from 'react-feather';

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

const IMAGES = [
  {
    src: 'https://c2.staticflickr.com/9/8817/28973449265_07e3aa5d2e_b.jpg',
    thumbnail:
      'https://c2.staticflickr.com/9/8817/28973449265_07e3aa5d2e_n.jpg',
    thumbnailWidth: 450,
    thumbnailHeight: 250,
    caption: 'After Rain (Jeshu John - designerspics.com)',
  },
  {
    src: 'https://c2.staticflickr.com/9/8356/28897120681_3b2c0f43e0_b.jpg',
    thumbnail:
      'https://c2.staticflickr.com/9/8356/28897120681_3b2c0f43e0_n.jpg',
    thumbnailWidth: 450,
    thumbnailHeight: 250,
    border: '1px solid red',
    caption: 'Boats (Jeshu John - designerspics.com)',
  },

  {
    src: 'https://c4.staticflickr.com/9/8887/28897124891_98c4fdd82b_b.jpg',
    thumbnail:
      'https://c4.staticflickr.com/9/8887/28897124891_98c4fdd82b_n.jpg',
    thumbnailWidth: 450,
    thumbnailHeight: 250,
  },
  {
    src: 'https://c2.staticflickr.com/9/8356/28897120681_3b2c0f43e0_b.jpg',
    thumbnail:
      'https://c2.staticflickr.com/9/8356/28897120681_3b2c0f43e0_n.jpg',
    thumbnailWidth: 450,
    thumbnailHeight: 250,
    caption: 'Boats (Jeshu John - designerspics.com)',
  },
];

const Formalities = [
  {
    id: 1,
    title: 'Formalities administratives',
    subtitle: 'Prise en charge du dossier et de enregistment',
    description: 'Notre dsadas occupe de tout bla bla bla bla',
  },
  {
    id: 2,
    title: 'Formalities administratives',
    subtitle: 'Prise en charge du dossier et de enregistment',
    description: 'Notre dsadas occupe de tout bla bla bla bla',
  },
  {
    id: 3,
    title: 'Formalities administratives',
    subtitle: 'Prise en charge du dossier et de enregistment',
    description: 'Notre dsadas occupe de tout bla bla bla bla',
  },
  {
    id: 4,
    title: 'Formalities administratives',
    subtitle: 'Prise en charge du dossier et de enregistment',
    description: 'Notre dsadas occupe de tout bla bla bla bla',
  },
];
const trips = [
  {
    _id: 1,
    title: 'paksitan',
    category: 'ethical',
    images: [
      'https://picsum.photos/200/300?random=2',
      'https://picsum.photos/200/300?random=2',
    ],
    date: '12-12-12',
    services: ['Formalités administratives', 'Transferts internes', 'Guide'],
    price: 15000,
  },
  {
    _id: 2,
    title: 'paksitan',
    category: 'ethical',
    images: [
      'https://picsum.photos/200/300?random=2',
      'https://picsum.photos/200/300?random=2',
    ],
    date: '12-12-12',
    services: ['Formalités administratives', 'Transferts internes', 'Guide'],
    price: 15000,
  },
  {
    _id: 3,
    title: 'paksitan',
    category: 'ethical',
    images: [
      'https://picsum.photos/200/300?random=2',
      'https://picsum.photos/200/300?random=2',
    ],
    date: '12-12-12',
    services: ['Formalités administratives', 'Transferts internes', 'Guide'],
    price: 15000,
  },
  {
    _id: 4,
    title: 'paksitan',
    category: 'ethical',
    images: [
      'https://picsum.photos/200/300?random=2',
      'https://picsum.photos/200/300?random=2',
    ],
    date: '12-12-12',
    services: ['Formalités administratives', 'Transferts internes', 'Guide'],
    price: 15000,
  },
  {
    _id: 5,
    title: 'paksitan',
    category: 'ethical',
    images: [
      'https://picsum.photos/200/300?random=2',
      'https://picsum.photos/200/300?random=2',
    ],
    date: '12-12-12',
    services: ['Formalités administratives', 'Transferts internes', 'Guide'],
    price: 15000,
  },
  {
    _id: 6,
    title: 'paksitan',
    category: 'ethical',
    images: [
      'https://picsum.photos/200/300?random=2',
      'https://picsum.photos/200/300?random=2',
    ],
    date: '12-12-12',
    services: ['Formalités administratives', 'Transferts internes', 'Guide'],
    price: 15000,
  },
  {
    _id: 7,
    title: 'paksitan',
    category: 'ethical',
    images: [
      'https://picsum.photos/200/300?random=2',
      'https://picsum.photos/200/300?random=2',
    ],
    date: '12-12-12',
    services: ['Formalités administratives', 'Transferts internes', 'Guide'],
    price: 15000,
  },
];

const services = [1, 2, 3, 4, 5];

const styles = makeStyles((theme) => ({
  options: {
    backgroundColor: '#f2f2f2',
    height: '100%',
  },
  rootContainer: {
    '&.css-19kzrtu': {
      padding: '10px',
    },
  },
  flexBetween: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  root: {
    '& .css-cnltht-MuiTableCell-root': {
      padding: '8px',
    },
  },
  tabRoot: {
    '&.MuiTab-root': {
      // color: 'white',
      // backgroundColor: '#46B9F6',
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
    marginTop: '1rem',
  },
  textInput: {
    width: '100%',
    backgroundColor: '#fff',
    marginBottom: 7,
  },
  stageDialog: {
    '& .MuiPaper-root': {
      maxWidth: '90%',
    },
  },
  cover: {
    width: '10rem',
    height: '6rem',
    borderRadius: '5px',
  },
  imgBackground: {
    backgroundColor: '#808080',
    borderRadius: '10px',
    width: '10rem',
    padding: '0.5rem',
    [theme.breakpoints.down('lg')]: {
      width: '8rem',
    },
  },
  dashes: {
    border: `2px dashed #fff`,
    borderRadius: '10px',
  },
  image: {
    height: '8rem',
    width: '10rem',
    [theme.breakpoints.up('lg')]: {
      width: '15rem',
      height: '10rem',
    },
  },
  carouselImages: {
    width: '12rem',
    height: '12rem',
    borderRadius: '5px',
    [theme.breakpoints.down('lg')]: {
      width: '8rem',
      height: '8rem',
    },
  },
  offerImage: {
    width: '17rem',
    height: '14rem',
    borderRadius: '5px',
    [theme.breakpoints.down('lg')]: {
      width: '8rem',
      height: '8rem',
    },
  },
  stageImage: {
    width: '24rem',
    height: '18rem',
    [theme.breakpoints.down('lg')]: {
      width: '14rem',
      height: '12rem',
    },
  },

  demo: {
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    margin: theme.spacing(4, 0, 2),
    padding: '1rem',
  },
  dateFields: {
    backgroundColor: '#fff',
    width: '40%',
    [theme.breakpoints.down('lg')]: {
      width: '48%',
    },
  },
}));

const ModifyOffer = () => {
  const classes = styles();

  const [value, setValue] = React.useState(0);
  const [chooseOffer, setChooseOffer] = React.useState('');
  const [formality, setFormality] = React.useState('');
  const [formalityDialog, setFormalityDialog] = React.useState(false);
  const [stageDialog, setStageDialog] = React.useState(false);

  const [state, setState] = React.useState({
    checkedA: true,
    checkedB: true,
    checkedC: true,
    checkedD: true,
    checkedE: true,
    checkedF: true,
    checkedG: true,
  });
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleReservationStatus = (event) => {
    setChooseOffer(event.target.value);
  };

  const handleCheckBoxes = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };
  const handleFormality = (event) => {
    setFormality(event.target.value);
  };

  const openFormalityDialog = () => {
    setFormalityDialog(true);
  };

  const closeFormalityDialog = () => {
    setFormalityDialog(false);
  };
  const openStageDialog = () => {
    setStageDialog(true);
  };

  const closeStageDialog = () => {
    setStageDialog(false);
  };

  return (
    <div style={{ margin: '3rem 0rem 1rem' }}>
      <Box
        style={{
          minHeight: '25rem',
          margin: '2rem 1rem 0rem',
        }}
      >
        <Box sx={{ width: '100%' }}>
          <Box
            sx={{
              borderBottom: 1,
              borderColor: 'divider',
            }}
          >
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label='basic tabs example'
              indicatorColor='primary'
              centered
            >
              <Tab
                label='Offer'
                {...a11yProps(0)}
                className={classes.tabRoot}
              />
              <Tab label='Stages' {...a11yProps(1)} />
              <Tab label='Formalities' {...a11yProps(2)} />
            </Tabs>
          </Box>

          {/*  map the Product */}

          <Box>
            <TabPanel value={value} index={0} className={classes.options}>
              <Grid container className={classes.rootContainer}>
                <Grid item sm={12} md={5}>
                  <Box
                    className={classes.flexBetween}
                    style={{ margin: '1rem' }}
                  >
                    <Box
                      style={{
                        display: 'inline-grid',
                        paddingRight: '1rem',
                      }}
                    >
                      <Typography variant='h5'>Offer Gallery</Typography>

                      <Button variant='outlined' style={{ marginTop: '1rem' }}>
                        Add
                      </Button>
                      <Button
                        variant='outlined'
                        style={{
                          color: 'red',
                          marginTop: '0.5rem',
                        }}
                      >
                        Delete
                      </Button>
                    </Box>
                    <Box>
                      <Card>
                        <CardMedia
                          className={classes.offerImage}
                          image='https://picsum.photos/200/300?random=2'
                          title='Contemplative Reptile'
                        />
                      </Card>
                    </Box>
                  </Box>
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
                        Reservation Status
                      </InputLabel>

                      <Select
                        labelId='demo-simple-select-label'
                        id='demo-simple-select'
                        value={chooseOffer}
                        label='Reservation Status'
                        onChange={handleReservationStatus}
                      >
                        <MenuItem value={10}>One</MenuItem>
                        <MenuItem value={20}>Two</MenuItem>
                        <MenuItem value={30}>Three</MenuItem>
                      </Select>
                    </FormControl>

                    <Box className={classes.inputBox}>
                      <TextField
                        hiddenLabel
                        id='filled-hidden-label-small'
                        placeholder='Title'
                        size='small'
                        className={classes.textInput}
                      />
                    </Box>

                    <Box className={classes.inputBox}>
                      <TextField
                        hiddenLabel
                        id='filled-hidden-label-small'
                        placeholder='Description'
                        size='small'
                        className={classes.textInput}
                      />
                    </Box>
                    <Box className={classes.inputBox}>
                      <TextField
                        hiddenLabel
                        id='filled-hidden-label-small'
                        placeholder='Description'
                        size='small'
                        className={classes.textInput}
                        multiline
                        rows={8}
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
                    {' '}
                    <Typography variant='h5' style={{ marginRight: '1rem' }}>
                      Date
                    </Typography>
                    <FormControl component='fieldset'>
                      <RadioGroup
                        row
                        aria-label='Date'
                        name='row-radio-buttons-group'
                      >
                        <FormControlLabel
                          value='yes'
                          control={<Radio />}
                          label='yes'
                        />
                        <FormControlLabel
                          value='no'
                          control={<Radio />}
                          label='no'
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
                    {' '}
                    <TextField
                      type='date'
                      name='Departure Date'
                      placeholder='Departure Date'
                      size='small'
                      className={classes.dateFields}
                    />
                    <TextField
                      type='date'
                      placeholder='Arrival date'
                      name='Arrival Date'
                      size='small'
                      className={classes.dateFields}
                    />
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
                    {' '}
                    <Typography variant='h5' style={{ marginRight: '1rem' }}>
                      Place of departure
                    </Typography>
                    <FormControl component='fieldset'>
                      <RadioGroup
                        row
                        aria-label='Place'
                        name='row-radio-buttons-group'
                      >
                        <FormControlLabel
                          value='yes'
                          control={<Radio />}
                          label='yes'
                        />
                        <FormControlLabel
                          value='no'
                          control={<Radio />}
                          label='no'
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
                    {' '}
                    <TextField
                      type='text'
                      name='Departure'
                      placeholder='Departure'
                      size='small'
                      className={classes.dateFields}
                    />
                    <TextField
                      type='text'
                      placeholder='Arrival'
                      name='Arrival'
                      size='small'
                      className={classes.dateFields}
                    />
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
                          checked={state.checkedA}
                          onChange={handleCheckBoxes}
                          name='checkedA'
                        />
                      }
                      label='Guide'
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={state.checkedB}
                          onChange={handleCheckBoxes}
                          name='checkedB'
                        />
                      }
                      label='Airport transport'
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={state.checkedC}
                          onChange={handleCheckBoxes}
                          name='checkedC'
                        />
                      }
                      label='Religious courses'
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={state.checkedD}
                          onChange={handleCheckBoxes}
                          name='checkedD'
                        />
                      }
                      label='Legitimate visit(Mount uhud,Quba mosque)'
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={state.checkedE}
                          onChange={handleCheckBoxes}
                          name='checkedE'
                        />
                      }
                      label='Internal transfer'
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={state.checkedF}
                          onChange={handleCheckBoxes}
                          name='checkedF'
                        />
                      }
                      label='Formalities'
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={state.checkedG}
                          onChange={handleCheckBoxes}
                          name='checkedG'
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
                <Button variant='contained' style={{ width: '8rem' }}>
                  {' '}
                  Next{' '}
                </Button>
              </Box>
            </TabPanel>
            <TabPanel value={value} index={1} className={classes.options}>
              <Box
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Button
                  variant='contained'
                  style={{ width: '10rem', marginRight: '1rem' }}
                  onClick={openStageDialog}
                >
                  Add a Step
                </Button>
                <Button variant='contained' style={{ width: '10rem' }}>
                  Next
                </Button>
              </Box>
              <Box m={3} style={{ backgroundColor: '#ffffff' }}>
                <Grid container>
                  <Grid
                    item
                    sm={12}
                    md={5}
                    style={{
                      padding: '1rem',
                    }}
                  >
                    <Box
                      className={classes.flexBetween}
                      style={{ margin: '0rem 1rem 0.5rem' }}
                    >
                      <Typography variant='h5' mr={1}>
                        Visit of Mount Uhud
                      </Typography>
                      <Typography variant='text'> 554 km</Typography>
                    </Box>
                    <Box style={{ margin: '0rem 0.5rem 1rem' }}>
                      <CardMedia
                        className={classes.stageImage}
                        image='https://picsum.photos/200/300?random=2'
                        title='Contemplative Reptile'
                      />
                      <Box mt={2}>
                        <Typography variant='text'>
                          dfsafdsadfs fdsf a dfsafdsadfs fdsf adsadsad da sdas
                          dfsafdsadfs fdsf a dfsafdsadfs fdsf adasdasdadasdas
                          dfsafdsadfs fdsf a dfsafdsadfs fdsf adsadasdas
                          dfsafdsadfs fdsf a dfsafdsadfs fdsf adasdasdasdasdas
                          dfsafdsadfs fdsf a dfsafdsadfs fdsf adasdasdas
                          dfsafdsadfs fdsf a dfsafdsadfs fdsf adasdasdasdas
                          dfsafdsadfs fdsf a dfsafdsadfs fdsf adasdasda
                          dfsafdsadfs fdsf a dfsafdsadfs fdsf adasdas
                          dfsafdsadfs fdsf a dfsafdsadfs fdsf aasd dfsafdsadfs
                          fdsf a dfsafdsadfs fdsf asdasdas
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item sm={12} md={7}>
                    <Typography variant='h5' mt={4}>
                      Medina-Hotel foulane
                    </Typography>
                    <Box>
                      <Gallery images={IMAGES} style={{ width: '10rem' }} />
                      {/* <CardMedia
                        className={classes.cover}
                        image='https://picsum.photos/200/300?random=2'
                        title='Live from space album cover'
                      /> */}
                    </Box>
                    {/* <Typography variant='h5'> </Typography>
                    <Typography variant='h5'>
                      Service Includes
                    </Typography>

                    {/*  map the Services */}
                    {/* {services &&
                      services.map((s) => (
                        <Box>
                          <Box
                            style={{
                              display: 'flex',
                              alignItems: 'self-end',
                              justifyContent: 'left',
                              marginTop: 0,
                            }}
                          >
                            <Typography
                              variant='h1'
                              style={{ fontSize: '3rem' }}
                            >
                              .
                            </Typography>
                            <Typography variant='text'>
                              <bold>.</bold>Half pension
                            </Typography>
                          </Box>
                        </Box>
                      ))} */}
                    <Box>
                      <Typography variant='h4' className={classes.title}>
                        Text only
                      </Typography>
                      <div className={classes.demo}>
                        <List>
                          {services &&
                            services.map((service) => (
                              <ListItem style={{ height: '2rem' }}>
                                <ListItemText primary={`-Single-line item`} />
                              </ListItem>
                            ))}
                        </List>
                      </div>
                    </Box>
                  </Grid>
                </Grid>
                <Box
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingBottom: '1rem',
                  }}
                >
                  <Button
                    variant='outlined'
                    style={{
                      color: 'red',
                      border: '1px solid red',
                      width: '8rem',
                      marginRight: '1rem',
                    }}
                  >
                    Delete
                  </Button>
                  <Button variant='outlined' style={{ width: '8rem' }}>
                    Update
                  </Button>
                </Box>
              </Box>
            </TabPanel>
            <TabPanel value={value} index={2} className={classes.options}>
              <Box
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <FormControl
                  size='small'
                  style={{
                    width: '30%',
                    backgroundColor: '#fff',
                    margin: '1rem',
                  }}
                >
                  <InputLabel id='demo-simple-select-label'>
                    Choose an existing formality
                  </InputLabel>

                  <Select
                    labelId='demo-simple-select-label'
                    id='formality'
                    value={formality}
                    label='Choose an existing formality'
                    onChange={handleFormality}
                  >
                    <MenuItem value={10}>Formality Omra</MenuItem>
                    <MenuItem value={20}>Formality Malasia</MenuItem>
                    <MenuItem value={30}>Formality Riyad</MenuItem>
                    <MenuItem value={30}>Formality Desert</MenuItem>
                  </Select>
                </FormControl>
                <Button
                  variant='contained'
                  style={{ width: '12rem' }}
                  onClick={openFormalityDialog}
                >
                  {' '}
                  Add a Formality
                </Button>
              </Box>
              <Box
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Box
                  style={{
                    display: 'grid',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Typography variant='h3'> Formality Omra</Typography>
                  {/*  map the Formalities */}
                  {Formalities &&
                    Formalities.map((formality) => (
                      <>
                        <Box
                          style={{
                            display: 'flex',
                            alignItems: 'self-end',
                            justifyContent: 'left',
                          }}
                        >
                          <Typography variant='h1' style={{ fontSize: '3rem' }}>
                            {' '}
                            .{' '}
                          </Typography>
                          <Typography variant='h4'>
                            {formality.title}
                          </Typography>
                        </Box>
                        <Box style={{ paddingLeft: '1.5rem' }}>
                          <Typography variant='h5'>
                            {formality.subtitle}
                          </Typography>
                          <Typography
                            variant='text'
                            style={{ fontSize: '0.8rem' }}
                          >
                            {formality.description}
                          </Typography>
                        </Box>
                      </>
                    ))}
                </Box>
              </Box>
              <Box
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '4rem 0rem 0.5rem',
                }}
              >
                <Button
                  variant='outlined'
                  style={{
                    width: '8rem',
                    color: 'red',
                    border: '1px solid red',
                    marginRight: '1rem',
                  }}
                >
                  Delete
                </Button>
                <Button
                  variant='outlined'
                  style={{ width: '8rem', marginRight: '1rem' }}
                >
                  {' '}
                  Update
                </Button>
                <Button variant='contained' style={{ width: '8rem' }}>
                  {' '}
                  Validate
                </Button>
              </Box>
            </TabPanel>
          </Box>
        </Box>
      </Box>

      {/*  Stages Dialog */}
      <div>
        <Dialog
          open={stageDialog}
          fullWidth
          onClose={closeStageDialog}
          className={classes.stageDialog}
        >
          <DialogTitle>Add Steps</DialogTitle>
          <DialogContent>
            <Grid container>
              <Grid item md={3} style={{ padding: '1rem' }}>
                <TextField
                  type='text'
                  placeholder='Stage Title'
                  name='title'
                  size='small'
                  style={{
                    backgroundColor: '#fff',
                    width: '100%',
                  }}
                />
                <TextField
                  type='text'
                  placeholder='City '
                  name='city'
                  size='small'
                  style={{
                    backgroundColor: '#fff',
                    width: '100%',
                    margin: '0.5rem 0rem 1rem',
                  }}
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
                />
                <Box className={classes.flexBetween}>
                  <Typography variant='text'>Distance</Typography>
                  <TextField
                    type='text'
                    placeholder='km'
                    name='km'
                    size='small'
                    style={{
                      backgroundColor: '#fff',
                      width: '45%',
                      margin: '1rem 0rem 1rem',
                    }}
                  />
                </Box>
              </Grid>
              <Grid item md={9}>
                <Grid container>
                  <Grid item md={4}>
                    <Box
                      style={{
                        display: 'flex',
                        justifyContent: 'right',
                        alignItems: 'center',
                        marginRight: '1rem',
                      }}
                    >
                      <Box>
                        <Typography variant='h5'>
                          gallery of the stage
                        </Typography>
                        <Box className={classes.imgBackground} mt={1}>
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
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item md={8}>
                    <CarouselLayout>
                      {trips.map((trip, i) => (
                        <>
                          <div
                            key={trip._id}
                            style={{
                              width: '10rem',
                            }}
                          >
                            <CardMedia
                              className={classes.carouselImages}
                              image='https://picsum.photos/200/300?random=2'
                              title='Live from space album cover'
                            />
                          </div>
                          <Box style={{ textAlign: 'right' }}>
                            <Button style={{ color: 'red' }}> delete </Button>
                          </Box>
                        </>
                      ))}
                    </CarouselLayout>
                  </Grid>
                  <Grid item md={4} mt={5}>
                    <Box
                      style={{
                        textAlign: 'right',
                        marginRight: '1rem',
                      }}
                    >
                      <Typography variant='h5'>Accommodation</Typography>
                    </Box>
                  </Grid>
                  <Grid item md={8} mt={4}>
                    <Box>
                      <Box ml={2} style={{ width: '60%' }}>
                        <TextField
                          hiddenLabel
                          id='filled-hidden-label-small'
                          placeholder='Name of accommodation'
                          size='small'
                          className={classes.textInput}
                        />
                      </Box>
                      <Box ml={2}>
                        <FormControl component='fieldset'>
                          <RadioGroup
                            row
                            aria-label='gender'
                            name='row-radio-buttons-group'
                          >
                            <FormControlLabel
                              value='breakfast'
                              control={<Radio />}
                              label='breakfast'
                            />
                            <FormControlLabel
                              value='Half board'
                              control={<Radio />}
                              label='Half board'
                            />
                            <FormControlLabel
                              value='complete board'
                              control={<Radio />}
                              label='complete board'
                            />
                          </RadioGroup>
                        </FormControl>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item md={4} mt={4}>
                    <Box
                      style={{
                        display: 'flex',
                        justifyContent: 'right',
                        alignItems: 'center',
                        marginRight: '1rem',
                      }}
                    >
                      <Box className={classes.imgBackground}>
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
                              <ImageIcon size={35} style={{ color: '#fff' }} />
                            </Box>
                            <Typography style={{ color: '#fff' }}>
                              New Image
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item md={8} mt={2}>
                    <CarouselLayout>
                      {trips.map((trip, i) => (
                        <>
                          <div
                            key={trip._id}
                            // className={classes.carouselCard}
                            style={{
                              width: '10rem',
                            }}
                          >
                            <CardMedia
                              className={classes.carouselImages}
                              image='https://picsum.photos/200/300?random=2'
                              title='Live from space album cover'
                            />
                          </div>
                          <Box style={{ textAlign: 'right' }}>
                            <Button style={{ color: 'red' }}> delete </Button>
                          </Box>
                        </>
                      ))}
                      {/* one */}
                    </CarouselLayout>
                  </Grid>
                  <Grid item md={12} mt={3}>
                    <Box
                      display='flex'
                      justifyContent='right'
                      alignItems='center'
                      style={{ gap: '20px' }}
                    >
                      <Button variant='outlined' style={{ color: 'red' }}>
                        Cancel{' '}
                      </Button>
                      <Button variant='contained'>Validate </Button>
                    </Box>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </DialogContent>
        </Dialog>
      </div>

      {/*  Formality Dialog  */}
      <div>
        <Dialog open={formalityDialog} fullWidth onClose={closeFormalityDialog}>
          <DialogTitle>Add a Formality</DialogTitle>
          <DialogContent>
            <TextField
              type='text'
              placeholder='Title of Formality '
              name='title'
              size='small'
              style={{
                backgroundColor: '#fff',
                width: '100%',
              }}
            />
            <TextField
              type='text'
              placeholder='Subtitle '
              name='subtitle'
              size='small'
              style={{
                backgroundColor: '#fff',
                width: '100%',
                margin: '0.5rem 0rem 1rem',
              }}
            />
            <TextField
              type='text'
              placeholder='Title of Formality '
              name='description'
              multiline
              rows={10}
              style={{
                backgroundColor: '#fff',
                width: '100%',
                marginTop: '1rem',
              }}
            />
          </DialogContent>
          <DialogActions>
            <Box
              style={{
                display: 'flex',
                alignitems: 'center',
                justifyContent: 'right',
                margin: '1rem',
              }}
            >
              <Button
                variant='outlined'
                style={{ width: '8rem', marginRight: '1rem' }}
              >
                Cancel
              </Button>
              <Button variant='contained' style={{ width: '8rem' }}>
                Validate
              </Button>
            </Box>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};

export default ModifyOffer;

// import React from 'react';
// import { makeStyles } from '@material-ui/styles';
// import Box from '@material-ui/core/Box';
// import Typography from '@material-ui/core/Typography';
// import ParallaxSlide from '@mui-treasury/components/slide/parallax';

// const data = [
//   {
//     id: 1,
//     boxProps: {
//       bgcolor: '#c7ffcf',
//     },
//     title: 'Parallax #1',
//     subtitle: 'Parallax #2',
//   },
//   {
//     id: 2,
//     boxProps: {
//       bgcolor: '#ffcaa9',
//     },
//     title: 'Parallax #1',
//     subtitle: 'Parallax #2',
//   },
//   {
//     id: 3,
//     boxProps: {
//       bgcolor: '#c6d4ff',
//     },
//     title: 'Parallax #1',
//     subtitle: 'Parallax #2',
//   },
// ];

// const useStyles = makeStyles(() => ({
//   root: {
//     fontSize: 48,
//     fontWeight: 900,
//   },
// }));

// const CreateOffer = () => {
//   const classes = useStyles();

//   return (
//     <Box width={'20rem'} height={'20rem'}>
//       <ParallaxSlide>
//         {({ injectStyle }) =>
//           data.map(({ boxProps, title, subtitle, id }, i) => (
//             <Box key={id} {...boxProps}>
//               <Typography
//                 noWrap
//                 align={'center'}
//                 className={classes.root}
//                 style={injectStyle(i, 80)}
//               >
//                 {title}
//               </Typography>
//               <Typography
//                 noWrap
//                 align={'center'}
//                 className={classes.root}
//                 style={injectStyle(i, 40)}
//               >
//                 {subtitle}
//               </Typography>
//               <Typography align={'center'} className={classes.root}>
//                 Static Text
//               </Typography>
//             </Box>
//           ))
//         }
//       </ParallaxSlide>
//     </Box>
//   );
// };

// export default CreateOffer;

// import React from 'react';
// import cx from 'clsx';
// import { makeStyles } from '@material-ui/styles';
// import Typography from '@material-ui/core/Typography';
// import Button from '@material-ui/core/Button';
// import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
// import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
// import ParallaxSlide from '@mui-treasury/components/slide/parallax';
// // import DotIndicator from '@mui-treasury/components/indicator/dot';
// import { useArrowDarkButtonStyles } from '@mui-treasury/styles/button/arrowDark';

// const data = [
//   {
//     id: 1,
//     title: 'Huarache',
//     subtitle: 'Gripp',
//     image:
//       // eslint-disable-next-line max-len
//       'https://firebasestorage.googleapis.com/v0/b/mui-treasury.appspot.com/o/public%2Fshoes%2Fair-huarache-gripp.png?alt=media',
//   },
//   {
//     id: 2,
//     title: 'Air Max',
//     subtitle: '270 P',
//     image:
//       // eslint-disable-next-line max-len
//       'https://firebasestorage.googleapis.com/v0/b/mui-treasury.appspot.com/o/public%2Fshoes%2Fair-max-270.png?alt=media',
//   },
//   {
//     id: 3,
//     title: 'Air Max',
//     subtitle: 'Deluxe',
//     image:
//       // eslint-disable-next-line max-len
//       'https://firebasestorage.googleapis.com/v0/b/mui-treasury.appspot.com/o/public%2Fshoes%2Fair-max-deluxe.png?alt=media',
//   },
// ];

// const useStyles = makeStyles(({ palette, breakpoints, spacing }) => ({
//   root: {
//     // a must if you want to set arrows, indicator as absolute
//     position: 'relative',
//     width: '100%',
//   },
//   slide: {
//     perspective: 1000, // create perspective
//     overflow: 'hidden',
//     // relative is a must if you want to create overlapping layers in children
//     position: 'relative',
//     paddingTop: spacing(8),
//     [breakpoints.up('sm')]: {
//       paddingTop: spacing(10),
//     },
//     [breakpoints.up('md')]: {
//       paddingTop: spacing(14),
//     },
//   },
//   imageContainer: {
//     display: 'block',
//     position: 'relative',
//     zIndex: 2,
//     paddingBottom: '56.25%',
//   },
//   image: {
//     display: 'block',
//     position: 'absolute',
//     zIndex: 10,
//     width: '100%',
//     height: '100%',
//     objectFit: 'cover',
//     marginLeft: '12%',
//     [breakpoints.up('sm')]: {
//       marginLeft: '4%',
//     },
//   },
//   arrow: {
//     display: 'none',
//     position: 'absolute',
//     top: '50%',
//     transform: 'translateY(-50%)',
//     [breakpoints.up('sm')]: {
//       display: 'inline-flex',
//     },
//   },
//   arrowLeft: {
//     left: 0,
//     [breakpoints.up('lg')]: {
//       left: -64,
//     },
//   },
//   arrowRight: {
//     right: 0,
//     [breakpoints.up('lg')]: {
//       right: -64,
//     },
//   },
//   text: {
//     // shared style for text-top and text-bottom
//     fontFamily: 'Poppins, san-serif',
//     fontWeight: 900,
//     position: 'absolute',
//     color: palette.common.white,
//     padding: '0 8px',
//     transform: 'rotateY(45deg)',
//     lineHeight: 1.2,
//     [breakpoints.up('sm')]: {
//       padding: '0 16px',
//     },
//     [breakpoints.up('md')]: {
//       padding: '0 24px',
//     },
//   },
//   title: {
//     top: 20,
//     left: '20%',
//     height: '40%',
//     fontSize: 40,
//     zIndex: 1,
//     background:
//       'linear-gradient(0deg, rgba(255,255,255,0) 0%, #9c9c9c 100%)',
//     [breakpoints.up('sm')]: {
//       top: 40,
//       fontSize: 72,
//     },
//     [breakpoints.up('md')]: {
//       top: 52,
//       fontSize: 72,
//     },
//   },
//   subtitle: {
//     top: 60,
//     left: '0%',
//     height: '52%',
//     fontSize: 56,
//     zIndex: 2,
//     background:
//       'linear-gradient(0deg, rgba(255,255,255,0) 0%, #888888 100%)',
//     [breakpoints.up('sm')]: {
//       top: 112,
//       left: '6%',
//       fontSize: 96,
//     },
//     [breakpoints.up('md')]: {
//       top: 128,
//       fontSize: 104,
//     },
//   },
//   indicatorContainer: {
//     textAlign: 'center',
//   },
// }));

// const CreateOffer = () => {
//   const classes = useStyles();
//   // const arrowStyles = useArrowDarkButtonStyles();
//   const createStyle = (slideIndex, fineIndex) => {
//     const diff = slideIndex - fineIndex;
//     if (Math.abs(diff) > 1) return {};
//     return {
//       transform: `rotateY(${(-diff + 1) * 45}deg)`,
//     };
//   };
//   // eslint-disable-next-line react/prop-types
//   const renderElements = ({ index, onChangeIndex }) => (
//     <>
//       <Button
//         className={cx(classes.arrow, classes.arrowLeft)}
//         // classes={arrowStyles}
//         disabled={index === 0}
//         onClick={() => onChangeIndex(index - 1)}
//       >
//         <KeyboardArrowLeft />
//       </Button>
//       <Button
//         className={cx(classes.arrow, classes.arrowRight)}
//         // classes={arrowStyles}
//         disabled={index === data.length - 1}
//         onClick={() => onChangeIndex(index + 1)}
//       >
//         <KeyboardArrowRight />
//       </Button>
//       {/* <div className={classes.indicatorContainer}>
//         {data.map(({ id }, i) => (
//           <DotIndicator
// key={id}
//             active={i === index}
//             onClick={() => onChangeIndex(i)}
//           />
//         ))}
//       </div> */}
//     </>
//   );
//   const renderChildren = ({ injectStyle, fineIndex }) =>
//     data.map(({ id, title, subtitle, image }, i) => (
//       <div key={id} className={classes.slide}>
//         <Typography
//           noWrap
//           className={cx(classes.text, classes.title)}
//           style={{
//             ...injectStyle(i, 60),
//             ...createStyle(i, fineIndex),
//           }}
//         >
//           {title}
//         </Typography>
//         <Typography
//           noWrap
//           className={cx(classes.text, classes.subtitle)}
//           style={{
//             ...injectStyle(i, 40),
//             ...createStyle(i, fineIndex),
//           }}
//         >
//           {subtitle}
//         </Typography>
//         <div className={classes.imageContainer}>
//           <img className={classes.image} src={image} alt={'slide'} />
//         </div>
//       </div>
//     ));
//   return (
//     <div className={classes.root}>
//       <ParallaxSlide renderElements={renderElements}>
//         {renderChildren}
//       </ParallaxSlide>
//     </div>
//   );
// };

// export default CreateOffer;
