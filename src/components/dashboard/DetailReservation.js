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
  Radio,
  RadioGroup,
  FormControlLabel,
} from '@material-ui/core';

import {
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
  address: {
    width: '100%',
    textAlign: 'center',
    margin: '1rem',
  },
}));

const DetailReservation = () => {
  const classes = styles();

  const [value, setValue] = React.useState(0);
  const [reservationStatus, setReservationStatus] =
    React.useState('');

  const handleReservationStatus = (event) => {
    setReservationStatus(event.target.value);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div style={{ marginTop: '3rem' }}>
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

      <Box className={classes.main}>
        <Box sx={{ width: '100%' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label='basic tabs example'
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
              Offer
            </TabPanel>
            <TabPanel value={value} index={1}>
              Client
            </TabPanel>

            <TabPanel value={value} index={2}>
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
            </TabPanel>
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default DetailReservation;
