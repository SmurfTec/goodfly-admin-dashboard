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
  Switch,
  alpha,
  TextField,
  Table,
  TableHead,
  TableRow,
  Paper,
  TableContainer,
  TableCell,
  TableBody,
  Button,
  FormLabel,
  Radio,
  RadioGroup,
  FormControlLabel,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@material-ui/core';

import {
  Settings as SettingsIcon,
  Trash2 as Trash2Icon,
  Download as DownloadIcon,
  Play as PlayIcon,
} from 'react-feather';

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
  main: {
    backgroundColor: '#f2f2f2',
    minHeight: '25rem',
    borderRadius: '0.8rem',
    padding: '1rem',
    margin: '2rem 1.5rem 2rem',
  },
  form: {
    margin: '1rem 0rem  2rem',
    // marginBottom: '1rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  table: {
    margin: ' 2rem 1rem 1rem',
    padding: '1rem',
    width: 'inherit',
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
    backgroundColor: '#fff',
    marginTop: '1rem',
    minHeight: '20rem',
  },
  greenSwitch: {
    '& .MuiSwitch-switchBase.Mui-checked': {
      color: '#018786',
      '&:hover': {
        backgroundColor: alpha(
          '#018786',
          theme.palette.action.hoverOpacity
        ),
      },
    },
    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
      backgroundColor: '#018786',
    },
  },
  redSwitch: {
    '& .MuiSwitch-switchBase.Mui-checked': {
      color: '#B00020',
      '&:hover': {
        backgroundColor: alpha(
          '#B00020',
          theme.palette.action.hoverOpacity
        ),
      },
    },
    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
      backgroundColor: '#B00020',
    },
  },
  address: {
    width: '100%',
    textAlign: 'center',
    margin: '1rem',
  },
}));

const Order = () => {
  const classes = styles();

  const [value, setValue] = React.useState(0);
  const [statusSwitch, setStatusSwitch] = React.useState(true);

  const [orderStatus, setOrderStatus] = React.useState('');
  const [deliveryMethod, setDeliveryMethod] = React.useState('');
  const [relayPoints, setRelayPoints] = React.useState('');
  const [manualPayment, setManualPayment] = React.useState(false);

  const handleOrderStatus = (event) => {
    setOrderStatus(event.target.value);
  };
  const handleDeliveryMethod = (event) => {
    setDeliveryMethod(event.target.value);
  };
  const handleRelayPoints = (event) => {
    setRelayPoints(event.target.value);
  };
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const toggle = (event) => {
    setStatusSwitch(event.target.checked);
  };

  const openManulPayment = () => {
    setManualPayment(true);
  };

  const closeManualPayment = () => {
    setManualPayment(false);
  };

  return (
    <div style={{ marginTop: '3rem' }}>
      <Typography variant='h4' m={2}>
        Tailor-made Travel Management
      </Typography>
      <Box className={classes.main}>
        <Box sx={{ width: '100%' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label='basic tabs example'
            >
              <Tab label='Product' {...a11yProps(0)} />
              <Tab label='Client' {...a11yProps(1)} />
              <Tab label='Carrier' {...a11yProps(2)} />
              <Tab label='Payment' {...a11yProps(2)} />
              <Box
                style={{
                  width: '280%',
                  marginTop: '0.5rem',
                  display: 'flex',
                  justifyContent: 'right',
                }}
              >
                <FormControl
                  size='small'
                  style={{
                    width: '45%',
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
                    value={orderStatus}
                    label='Category'
                    onChange={handleOrderStatus}
                  >
                    <MenuItem value={10}>One</MenuItem>
                    <MenuItem value={20}>Two</MenuItem>
                    <MenuItem value={30}>Three</MenuItem>
                  </Select>
                </FormControl>
              </Box>

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
                  <SettingsIcon className={classes.icons} />
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
              <Box
                style={{
                  display: 'flex',
                  justifyContent: 'left',
                }}
              >
                <Box
                  style={{
                    border: '1px solid #c6c6c6',
                    display: 'flex',
                  }}
                >
                  <Avatar
                    alt='Cindy Baker'
                    src='/static/images/avatar/3.jpg'
                    sx={{ width: 100, height: 100 }}
                    style={{ marginTop: 15, margin: '1.5rem' }}
                  />
                  <Box
                    style={{
                      width: '25rem',
                      border: '1px solid #c6c6c6',
                    }}
                  >
                    <Box
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                    >
                      <Typography variant='h5' m={1}>
                        productname - ref code
                      </Typography>

                      <Box
                        style={{
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                      >
                        <Typography variant='text'>Status</Typography>
                        <Switch
                          checked={statusSwitch}
                          onChange={toggle}
                          inputProps={{ 'aria-label': 'controlled' }}
                          className={classes.greenSwitch}
                        />
                      </Box>
                    </Box>
                    <Box
                      style={{
                        backgroundColor: '#f2f2f2',
                        height: '7rem',
                        display: 'inline-block',
                        padding: '3%',
                      }}
                    >
                      <Typography variant='text'>
                        The variant="fullWidth" prop should be used
                        for smaller views. This demo also uses
                      </Typography>
                    </Box>
                  </Box>
                </Box>
                <Box
                  style={{
                    border: '1px solid #c6c6c6',
                  }}
                  ml={5}
                >
                  <Typography variant='h5' m={2}>
                    {' '}
                    Order Quantity:{' '}
                  </Typography>
                  <Typography
                    variant='h1'
                    m={2}
                    style={{ textAlign: 'center' }}
                  >
                    1
                  </Typography>
                </Box>
              </Box>
            </TabPanel>
            <TabPanel value={value} index={1}>
              <Typography variant='h5'>
                {' '}
                Client Ref :1205489
              </Typography>
              <Box
                mt={3}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-around',
                }}
              >
                <TextField
                  id='standard-helperText'
                  label='name'
                  defaultValue='Muhammad Zain'
                  variant='outlined'
                />
                <TextField
                  id='standard-helperText'
                  label='firstname'
                  defaultValue='Muhammad'
                  variant='outlined'
                />
                <TextField
                  id='standard-helperText'
                  label='email'
                  defaultValue='Muhammadzain8@gmail.com'
                  variant='outlined'
                />
                <TextField
                  id='standard-helperText'
                  label='Telephone'
                  defaultValue='+33 600 00 000'
                  variant='outlined'
                />
              </Box>
              <Box
                m={3}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <Box
                  style={{
                    backgroundColor: '#f2f2f2',
                    width: '45%',
                    display: 'inline-block',
                    padding: '3%',
                  }}
                >
                  <Typography
                    variant='h4'
                    className={classes.address}
                  >
                    Shipping Address{' '}
                  </Typography>
                  <Typography className={classes.address}>
                    Text fields allow users to enter text into a UI.
                    They typically appear in forms and dialogs.
                  </Typography>
                </Box>
                <Box
                  style={{
                    backgroundColor: '#f2f2f2',
                    width: '45%',
                    display: 'inline-block',
                    padding: '3%',
                    // verticalAlign: 'top',
                  }}
                >
                  <Typography
                    variant='h4'
                    className={classes.address}
                  >
                    Billing Address{' '}
                  </Typography>
                  <Typography className={classes.address}>
                    Text fields allow users to enter text into a UI.
                    They typically appear in forms and dialogs.
                  </Typography>
                </Box>
              </Box>
            </TabPanel>
            <TabPanel value={value} index={2}>
              <Typography variant='h5'>
                Transport Management
              </Typography>
              <Box
                mt={3}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-around',
                }}
              >
                <FormControl
                  fullWidth
                  size='small'
                  style={{
                    width: '35%',
                    backgroundColor: '#fff',
                    marginBottom: 7,
                  }}
                >
                  <InputLabel id='demo-simple-select-label'>
                    Delivery Method
                  </InputLabel>

                  <Select
                    labelId='demo-simple-select-label'
                    id='demo-simple-select'
                    value={deliveryMethod}
                    label='Delivery Method'
                    onChange={handleDeliveryMethod}
                  >
                    <MenuItem value={10}>One</MenuItem>
                    <MenuItem value={20}>Two</MenuItem>
                    <MenuItem value={30}>Three</MenuItem>
                  </Select>
                </FormControl>
                <FormControl
                  fullWidth
                  size='small'
                  style={{
                    width: '30%',
                    backgroundColor: '#fff',
                    marginBottom: 7,
                  }}
                >
                  <InputLabel id='demo-simple-select-label'>
                    Relay Point
                  </InputLabel>

                  <Select
                    labelId='demo-simple-select-label'
                    id='demo-simple-select'
                    value={relayPoints}
                    label='RelayPoints'
                    onChange={handleRelayPoints}
                  >
                    <MenuItem value={10}>One</MenuItem>
                    <MenuItem value={20}>Two</MenuItem>
                    <MenuItem value={30}>Three</MenuItem>
                  </Select>
                </FormControl>

                <Button
                  variant='contained'
                  style={{ width: '12rem' }}
                >
                  Add a Carrier{' '}
                </Button>
              </Box>
              <Box
                m={3}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <Box
                  style={{
                    backgroundColor: '#f2f2f2',
                    width: '45%',
                    display: 'inline-block',
                    padding: '3%',
                  }}
                >
                  <Typography
                    variant='h4'
                    className={classes.address}
                  >
                    Shipping Address{' '}
                  </Typography>
                  <Typography className={classes.address}>
                    Text fields allow users to enter text into a UI.
                    They typically appear in forms and dialogs.
                  </Typography>
                </Box>
                <Box
                  style={{
                    backgroundColor: '#f2f2f2',
                    width: '45%',
                    display: 'inline-block',
                    padding: '3%',
                    // verticalAlign: 'top',
                  }}
                >
                  <Typography
                    variant='h4'
                    className={classes.address}
                  >
                    Billing Address{' '}
                  </Typography>
                  <Typography className={classes.address}>
                    Text fields allow users to enter text into a UI.
                    They typically appear in forms and dialogs.
                  </Typography>
                </Box>
              </Box>
              <Box
                style={{
                  display: 'flex',
                  justifyContent: 'right',
                  margin: '1rem',
                }}
              >
                <Button
                  variant='contained'
                  style={{ marginRight: '1rem' }}
                >
                  Download the packaging Slip
                </Button>
                <Button variant='contained'>
                  Validate the Modifications
                </Button>
              </Box>
            </TabPanel>
            <TabPanel value={value} index={3}>
              <TableContainer
                component={Paper}
                className={classes.table}
              >
                <Table
                  sx={{ minWidth: 650 }}
                  aria-label='simple table'
                >
                  <TableHead>
                    <TableRow>
                      <TableCell>Payment</TableCell>
                      <TableCell align='right'>Type</TableCell>
                      <TableCell align='right'>
                        Transaction Date
                      </TableCell>
                      <TableCell align='right'>
                        Transaction Amount
                      </TableCell>
                      <TableCell align='right'>
                        Transaction Status
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
                  display: 'flex',
                  justifyContent: 'right',
                  margin: '1rem',
                }}
              >
                <Button
                  variant='contained'
                  onClick={openManulPayment}
                >
                  Add a Manual Payment
                </Button>
              </Box>
            </TabPanel>
          </Box>
        </Box>
      </Box>

      {/*  Dialog  */}

      <div>
        <Dialog open={manualPayment} onClose={closeManualPayment}>
          <DialogTitle >
            <Typography variant='h4'>Manual Payment</Typography>
          </DialogTitle>
          <DialogContent>
            <Box
              style={{
                margin: '1rem',
                padding: 'o.2rem',
                height: '15rem',
              }}
            >
              <Box
                className={classes.form}
                style={{ justifyContent: 'space-between' }}
              >
                <FormControl component='fieldset'>
                  <FormLabel component='legend'>
                    Payment Method
                  </FormLabel>
                  <RadioGroup
                    row
                    aria-label='gender'
                    name='row-radio-buttons-group'
                  >
                    <FormControlLabel
                      value='Bank Check'
                      control={<Radio />}
                      label='Bank check'
                    />
                    <FormControlLabel
                      value='Bank Transfer'
                      control={<Radio />}
                      label='Bank Transfer'
                    />
                  </RadioGroup>
                </FormControl>
                <FormControl
                  fullWidth
                  size='small'
                  style={{
                    width: '40%',
                    backgroundColor: '#fff',
                    marginBottom: 7,
                  }}
                >
                  <InputLabel id='demo-simple-select-label'>
                    Status
                  </InputLabel>

                  <Select
                    labelId='demo-simple-select-label'
                    id='demo-simple-select'
                    value={orderStatus}
                    label='RelayPoints'
                    onChange={handleRelayPoints}
                  >
                    <MenuItem value={10}>One</MenuItem>
                    <MenuItem value={20}>Two</MenuItem>
                    <MenuItem value={30}>Three</MenuItem>
                  </Select>
                </FormControl>
              </Box>
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
                <TextField
                  autoFocus
                  margin='dense'
                  id='name'
                  label='Date of Transaction'
                  type='text'
                  fullWidth
                  style={{ marginRight: '2rem' }}
                />
                <TextField
                  autoFocus
                  margin='dense'
                  id='name'
                  label='Amount of Transaction'
                  type='email'
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
            <Button variant='outlined' onClick={closeManualPayment}>
              Cancel
            </Button>
            <Button variant='contained' onClick={closeManualPayment}>
              Validate
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};

export default Order;
