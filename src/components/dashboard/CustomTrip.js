import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Button, TextField, Typography } from '@material-ui/core';
import { Box } from '@material-ui/system';

import {
  Settings as SettingsIcon,
  Trash2 as Trash2Icon,
  Download as DownloadIcon,
  Play as PlayIcon,
  ArrowLeft as ArrowLeftIcon,
} from 'react-feather';

const styles = makeStyles((theme) => ({
  main: {
    backgroundColor: '#f2f2f2',
    minHeight: '100vh',
    borderRadius: '0.8rem',
    padding: '1rem',
    margin: '2rem 1.5rem 2rem',
  },
  form: {
    margin: '1.4rem 0rem  3rem',
    // marginBottom: '1rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  icons: {
    backgroundColor: '#46B9F6',
    color: '#fff',
    width: '2.3rem',
    height: '2rem',
    margin: '0.5rem 0.2rem',
    padding: '0.2rem',
  },
}));

const CustomTrip = () => {
  const classes = styles();

  return (
    <div style={{ marginTop: '3rem' }}>
      <Typography variant='h4' m={2}>
        Tailor-made Travel Management
      </Typography>
      <Box className={classes.main}>
        <Box
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <Button variant='outlined'>
            <ArrowLeftIcon />Back to the List</Button>
          <Box>
            <SettingsIcon className={classes.icons} />
            <DownloadIcon className={classes.icons} />
            <Trash2Icon className={classes.icons} />
            <PlayIcon className={classes.icons} />
          </Box>
        </Box>
        <div
          style={{
            backgroundColor: '#fff',
            minHeight: '100vh',
            margin: '1rem 0rem 1rem',
            border: '1px solid #fff',
          }}
        >
          <Box className={classes.form}>
            <TextField
              id='standard-basic'
              label='Civilite'
              variant='standard'
            />
            <TextField
              id='standard-basic'
              label='name'
              variant='standard'
            />
            <TextField
              id='standard-basic'
              label='firstname'
              variant='standard'
            />
          </Box>
          <Box className={classes.form}>
            <TextField
              id='standard-basic'
              label='Date of Birth'
              variant='standard'
            />
            <TextField
              id='standard-basic'
              label='Email Address'
              variant='standard'
            />
            <TextField
              id='standard-basic'
              label='Telephone mobile'
              variant='standard'
            />
          </Box>
          <Box className={classes.form}>
            <TextField
              id='standard-basic'
              label='Address'
              variant='standard'
              style={{ width: '75%' }}
            />
          </Box>
          <Box className={classes.form}>
            <TextField
              id='standard-basic'
              label='Postal Code'
              variant='standard'
            />
            <TextField
              id='standard-basic'
              label='City'
              variant='standard'
            />
            <TextField
              id='standard-basic'
              label='Country'
              variant='standard'
            />
          </Box>
          <Box className={classes.form} style={{ width: '42%' }}>
            <TextField
              id='standard-basic'
              label='Total Price '
              variant='standard'
            />
          </Box>
          <Box className={classes.form}>
            <TextField
              id='standard-basic'
              label='Number of Participants'
              variant='standard'
            />
            <TextField
              id='standard-basic'
              label='Opportunity'
              variant='standard'
            />
            <TextField
              id='standard-basic'
              label='Group Type'
              variant='standard'
            />
          </Box>
          <Box
            className={classes.form}
            style={{ margin: '0rem 6.3rem 0rem' }}
          >
            <TextField
              id='standard-basic'
              label='Number of Adults'
              variant='standard'
            />
            <TextField
              id='standard-basic'
              label='12-18 year olds'
              variant='standard'
            />
            <TextField
              id='standard-basic'
              label='2-12 year olds'
              variant='standard'
            />
            <TextField
              id='standard-basic'
              label='0-2 Babies'
              variant='standard'
            />
          </Box>
          <Box className={classes.form}>
            <TextField
              id='standard-basic'
              label='Destination'
              variant='standard'
              style={{ width: '75%' }}
            />
          </Box>
          <Box className={classes.form}>
            <TextField
              id='standard-basic'
              label='Type of accommodation'
              variant='standard'
              style={{ width: '30%' }}
            />
            <TextField
              id='standard-basic'
              label='Monyenne range'
              variant='standard'
              style={{ width: '30%' }}
            />
          </Box>
          <Box className={classes.form}>
            <TextField
              id='standard-basic'
              label='npensioname'
              variant='standard'
            />
            <TextField
              id='standard-basic'
              label='on-site transport'
              variant='standard'
            />
            <TextField
              id='standard-basic'
              label='on site guide'
              variant='standard'
            />
          </Box>
          <Box className={classes.form}>
            <TextField
              id='standard-basic'
              label='global budget
'
              variant='standard'
              style={{ width: '30%' }}
            />
            <TextField
              id='standard-basic'
              label='reach the client'
              variant='standard'
              style={{ width: '30%' }}
            />
          </Box>
          <Box style={{ margin: '2rem 9rem 2rem' }}>
            <Typography variant='h5' style={{ color: '#c6c6c6' ,marginBottom: '1rem'}}>
              Theme/Type of Trip
            </Typography>
            <Typography variant='text' style={{ color: '#8f8f8f' }}>
              These components use the Material-UI SvgIcon component
              to render the SVG path for each icon, and so a have a
              peer-dependency on the next release of Material-UI. If
              you are not already using Material-UI in your project,
              you can add it with: These components use the
              Material-UI SvgIcon component to render the SVG path for
              each icon, and so a have a peer-dependency on the next
              release of Material-UI. If you are not already using
              Material-UI in your project, you can add it with:
              each icon, and so a have a peer-dependency on the next
              release of Material-UI. If you are not already using
              Material-UI in your project, you can add it with:
            </Typography>
          </Box>
        </div>
      </Box>{' '}
    </div>
  );
};

export default CustomTrip;
