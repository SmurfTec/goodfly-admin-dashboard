import React, { useState, useEffect, useContext } from 'react';
import { makeStyles } from '@material-ui/styles';
import {
  Box,
  Tab,
  Tabs,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CardMedia,
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
  Sidebar as SidebarIcon,
  Trash2 as Trash2Icon,
  Printer as PrintIcon,
  Play as PlayIcon,
} from 'react-feather';

import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { a11yProps, TabPanel } from 'components/common/TabPanel';
import { OrderContext } from 'Contexts/OrderContext';
import { useParams } from 'react-router';
import { useTranslation } from 'react-i18next';

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
];

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
    [theme.breakpoints.up('md')]: {
      marginRight: '2rem',
    },
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
    margin: '0rem 0.5rem 0.5rem',
  },
}));

const Order = () => {
  const classes = styles();
  const theme = useTheme();
  const lgDown = useMediaQuery(theme.breakpoints.down('lg'));
  const { t } = useTranslation();

  const { orders, getOrderById, modifyOrder } =
    useContext(OrderContext);

  const { id } = useParams();

  const [loading, setLoading] = useState(true);

  const [value, setValue] = useState(0);
  const [statusSwitch, setStatusSwitch] = useState(true);

  const [singleOrder, setSingleOrder] = useState();

  const [orderStatus, setOrderStatus] = useState('');
  const [deliveryMethod, setDeliveryMethod] = useState('');
  const [relayPoints, setRelayPoints] = useState('');
  const [manualPayment, setManualPayment] = useState(false);

  useEffect(() => {
    const order = getOrderById(id);
    console.log('order :>> ', order);
    if (!order || order === 'loading') setLoading(true);
    setSingleOrder(order);
    setOrderStatus(order.status);
  }, [id, orders]);

  console.log('singleOrder :>> ', singleOrder);

  const handleSubmit = (e) => {
    e.preventDefault();
    modifyOrder(id, { status: orderStatus });
  };

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
    <div>
      <Typography variant='h4' m={3}>
        {t('Order REf')} : {singleOrder?._id}
      </Typography>
      <Box className={classes.main}>
        <Box sx={{ width: '100%' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label='basic tabs example'
            >
              <Tab label={t('Product')} {...a11yProps(0)} />
              <Tab label={t('Client')} {...a11yProps(1)} />
              <Tab label={t('Carrier')} {...a11yProps(2)} />
              <Tab label={t('Payment')} {...a11yProps(2)} />
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
                  <Select
                    id='demo-simple-select'
                    value={orderStatus}
                    onChange={handleOrderStatus}
                  >
                    <MenuItem value='unpaid' disabled>
                      {t('Unpaid')}
                    </MenuItem>
                    <MenuItem value='paid' disabled>
                      {t('Paid')}
                    </MenuItem>
                    <MenuItem value='inProgress'>
                      {t('InProgress')}
                    </MenuItem>
                    <MenuItem value='dispatched'>
                      {t('Dispatched')}
                    </MenuItem>
                    <MenuItem value='delivered'>
                      {t('Delivered')}
                    </MenuItem>
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
                  <SidebarIcon className={classes.icons} />
                  <PrintIcon className={classes.icons} />
                  <Trash2Icon className={classes.icons} />
                  <PlayIcon
                    className={classes.icons}
                    onClick={handleSubmit}
                  />
                </Box>
              </Box>
            </Tabs>
          </Box>

          {/*  map the Product */}

          <Box className={classes.options}>
            <TabPanel value={value} index={0}>
              {singleOrder &&
                singleOrder.orderItems?.map((order, index) => (
                  <Box
                    style={{
                      display: 'flex',
                      justifyContent: 'left',
                      margin: '1.5rem 1rem 1rem',
                    }}
                    key={order.index}
                  >
                    <Box
                      style={{
                        border: '1px solid #c6c6c6',
                        display: 'flex',
                      }}
                    >
                      <CardMedia
                        style={{
                          height: '9.5rem',
                          width: lgDown ? '7rem' : '8rem',
                        }}
                        image={order.product.images[0].image}
                        title='product'
                      />
                      <Box
                        style={{
                          width: lgDown ? '20rem' : '25rem',
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
                            {order.product.name} - {order._id}
                          </Typography>

                          <Box
                            style={{
                              display: 'flex',
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}
                          >
                            <Typography variant='text'>
                              {order.status}
                            </Typography>
                            <Switch
                              checked={statusSwitch}
                              onChange={toggle}
                              inputProps={{
                                'aria-label': 'controlled',
                              }}
                              className={classes.greenSwitch}
                            />
                          </Box>
                        </Box>
                        <Box style={{ backgroundColor: '#f2f2f2' }}>
                          <Box
                            style={{
                              height: '7rem',
                              display: 'inline-block',
                              padding: '3%',
                            }}
                          >
                            <Typography variant='text'>
                              {order.product.description}
                            </Typography>
                          </Box>
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
                        {t('Order Quantity')}:
                      </Typography>
                      <Typography
                        variant='h1'
                        m={2}
                        style={{ textAlign: 'center' }}
                      >
                        {order.quantity}
                      </Typography>
                    </Box>
                  </Box>
                ))}
            </TabPanel>
            <TabPanel value={value} index={1}>
              {singleOrder &&
                (singleOrder.visitor ? (
                  <>
                    <Typography variant='h5'>
                      {t('Client Ref')} :{singleOrder?.visitor._id}
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
                        label={t('Name')}
                        value={singleOrder?.visitor.firstName}
                        variant='outlined'
                        inputProps={{ readOnly: true }}
                      />
                      <TextField
                        id='standard-helperText'
                        label={t('First Name')}
                        value={singleOrder?.visitor.lastName}
                        variant='outlined'
                        inputProps={{ readOnly: true }}
                      />
                      <TextField
                        id='standard-helperText'
                        label={t('Email')}
                        value={singleOrder?.visitor.email}
                        variant='outlined'
                        inputProps={{ readOnly: true }}
                      />
                      <TextField
                        id='standard-helperText'
                        label={t('Telephone')}
                        value={singleOrder?.visitor.telephoneNumber}
                        variant='outlined'
                        inputProps={{ readOnly: true }}
                      />
                    </Box>
                  </>
                ) : (
                  <Typography variant='h5'>
                    {t('Visitor No Longer Exists')}
                  </Typography>
                ))}
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
                    {t('Shipping Address')}
                  </Typography>
                  <Typography className={classes.address}>
                    <b>{t('Address')}:</b>{' '}
                    {singleOrder?.shippingAddress?.address}
                  </Typography>
                  <Typography className={classes.address}>
                    <b>{t('Country')}:</b>
                    {singleOrder?.shippingAddress?.country}
                  </Typography>
                  <Typography className={classes.address}>
                    <b>{t('City')}:</b>
                    {singleOrder?.shippingAddress?.city}
                  </Typography>
                  <Typography className={classes.address}>
                    <b>{t('Postal Code')}:</b>
                    {singleOrder?.shippingAddress?.postalCode}
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
                    {t('Billing Address')}
                  </Typography>
                  <Typography className={classes.address}>
                    <b>{t('Address')}:</b>{' '}
                    {singleOrder?.shippingAddress?.address}
                  </Typography>
                  <Typography className={classes.address}>
                    <b>{t('Country')}:</b>
                    {singleOrder?.shippingAddress?.country}
                  </Typography>
                  <Typography className={classes.address}>
                    <b>{t('City')}:</b>
                    {singleOrder?.shippingAddress?.city}
                  </Typography>
                  <Typography className={classes.address}>
                    <b>{t('Postal Code')}:</b>
                    {singleOrder?.shippingAddress?.postalCode}
                  </Typography>
                </Box>
              </Box>
            </TabPanel>
            <TabPanel value={value} index={2}>
              <Typography variant='h5'>
                {t('Transport Management')}
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
                  label={t('Delivery Method')}
                  value={singleOrder?.deliveryMethod}
                  variant='outlined'
                  inputProps={{ readOnly: true }}
                />
                <TextField
                  id='standard-helperText'
                  label={t('Relay Point')}
                  value={singleOrder?.relayPoint}
                  inputProps={{ readOnly: true }}
                />

                <Button
                  variant='contained'
                  style={{ width: '12rem' }}
                >
                  {t('ADD A CARRIER')}
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
                    {t('Shipping Address')}
                  </Typography>
                  <Typography className={classes.address}>
                    <b>{t('Address')}:</b>{' '}
                    {singleOrder?.shippingAddress?.address}
                  </Typography>
                  <Typography className={classes.address}>
                    <b>{t('Country')}:</b>
                    {singleOrder?.shippingAddress?.country}
                  </Typography>
                  <Typography className={classes.address}>
                    <b>{t('City')}:</b>
                    {singleOrder?.shippingAddress?.city}
                  </Typography>
                  <Typography className={classes.address}>
                    <b>{t('Postal Code')}:</b>
                    {singleOrder?.shippingAddress?.postalCode}
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
                    {t('Billing Address')}
                  </Typography>
                  <Typography className={classes.address}>
                    <b>{t('Address')}:</b>{' '}
                    {singleOrder?.shippingAddress?.address}
                  </Typography>
                  <Typography className={classes.address}>
                    <b>{t('Country')}:</b>
                    {singleOrder?.shippingAddress?.country}
                  </Typography>
                  <Typography className={classes.address}>
                    <b>{t('City')}:</b>
                    {singleOrder?.shippingAddress?.city}
                  </Typography>
                  <Typography className={classes.address}>
                    <b>{t('Postal Code')}:</b>
                    {singleOrder?.shippingAddress?.postalCode}
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
                  {t('DOWNLOAD THE PACKAGING SLIP')}
                </Button>
                <Button variant='contained' onClick={handleSubmit}>
                  {t('VALIDATE THE MODIFICATIONS')}
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
                      <TableCell>{t('Payment')}</TableCell>
                      <TableCell align='right'>{t('Type')}</TableCell>
                      <TableCell align='right'>
                        {t('Transaction Date')}
                      </TableCell>
                      <TableCell align='right'>
                        {t('Transaction Amount')}
                      </TableCell>
                      <TableCell align='right'>
                        {t('Transaction Status')}
                      </TableCell>
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
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </TabPanel>
          </Box>
        </Box>
      </Box>

      {/*  Dialog  */}

      <div>
        <Dialog open={manualPayment} onClose={closeManualPayment}>
          <DialogTitle>
            <Typography variant='h4'>
              {t('Manual Payment')}
            </Typography>
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
                    {t('Payment Method')}
                  </FormLabel>
                  <RadioGroup
                    row
                    aria-label='gender'
                    name='row-radio-buttons-group'
                  >
                    <FormControlLabel
                      value='Bank Check'
                      control={<Radio />}
                      label={t('Bank check')}
                    />
                    <FormControlLabel
                      value='Bank Transfer'
                      control={<Radio />}
                      label={t('Bank Transfer')}
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
                    {t('Status')}
                  </InputLabel>

                  <Select
                    labelId='demo-simple-select-label'
                    id='demo-simple-select'
                    value={orderStatus}
                    label={t('RelayPoints')}
                    onChange={handleRelayPoints}
                  >
                    <MenuItem value={10}>{t('One')}</MenuItem>
                    <MenuItem value={20}>{t('Two')}</MenuItem>
                    <MenuItem value={30}>{t('Three')}</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <Box className={classes.form}>
                <TextField
                  autoFocus
                  margin='dense'
                  id='name'
                  label={t('Transaction number')}
                  type='text'
                  fullWidth
                  style={{ marginRight: '2rem' }}
                />
                <TextField
                  autoFocus
                  margin='dense'
                  id='name'
                  label={t('Date of Transaction')}
                  type='text'
                  fullWidth
                  style={{ marginRight: '2rem' }}
                />
                <TextField
                  autoFocus
                  margin='dense'
                  id='name'
                  label={t('Amount of Transaction')}
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
              {t('CANCEL')}
            </Button>
            <Button variant='contained' onClick={closeManualPayment}>
              {t('VALIDATE')}
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};

export default Order;
