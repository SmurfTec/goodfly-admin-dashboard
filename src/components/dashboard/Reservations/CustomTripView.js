import { makeStyles } from '@material-ui/styles';
import React from 'react';

import { Button, TextField, Typography, Box } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  form: {
    margin: '1.4rem 0rem  3rem',
    // marginBottom: '1rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
}));

const CustomTripView = ({ offer }) => {
  const classes = useStyles();
  return (
    <div
      style={{
        backgroundColor: '#fff',
        minHeight: '100vh',
        margin: '1rem 0rem 1rem',
        border: '1px solid #fff',
        padding: '30px 30px',
      }}
    >
      <Box>
        <Typography variant='h6'>Contact Details</Typography>
        <Box className={classes.form}>
          <TextField
            value={offer.pronoun}
            name='pronoun'
            id='standard-basic'
            label='Civilite'
            variant='standard'
          />
          <TextField
            name='firstName'
            value={offer.firstName}
            id='standard-basic'
            label='firstname'
            variant='standard'
          />
          <TextField
            name='lastName'
            value={offer.lastName}
            id='standard-basic'
            label='lastName'
            variant='standard'
          />
        </Box>
        <Box className={classes.form}>
          <TextField
            name='birthDate'
            value={offer.birthDate}
            id='standard-basic'
            label='Date of Birth'
            variant='standard'
          />
          <TextField
            name='email'
            value={offer.email}
            id='standard-basic'
            label='Email Address'
            variant='standard'
          />
          <TextField
            name='phone'
            value={offer.phone}
            id='standard-basic'
            label='Telephone mobile'
            variant='standard'
          />
        </Box>
        <Box className={classes.form}>
          <TextField
            name='address'
            value={offer.address}
            id='standard-basic'
            label='Address'
            variant='standard'
            style={{ width: '75%' }}
          />
        </Box>
        <Box className={classes.form}>
          <TextField
            name='zipCode'
            value={offer.zipCode}
            id='standard-basic'
            label='Postal Code'
            variant='standard'
          />
          <TextField
            name='city'
            value={offer.city}
            id='standard-basic'
            label='City'
            variant='standard'
          />
          <TextField
            name='country'
            value={offer.country}
            id='standard-basic'
            label='Country'
            variant='standard'
          />
        </Box>
      </Box>
      <Box>
        <Typography variant='h6'>Trip Details</Typography>

        <Box className={classes.form} style={{ width: '42%' }}>
          <TextField
            name='price'
            value={offer.budgetPerPerson * offer.numOfParticipants}
            id='standard-basic'
            label='Total Price'
            type='number'
            variant='standard'
            style={{ fontSize: '1.2em' }}
          />
        </Box>
        <Box className={classes.form}>
          <TextField
            name='numOfParticipants'
            value={offer.numOfParticipants}
            type='number'
            id='standard-basic'
            label='Number of Participants'
            variant='standard'
          />
          <TextField
            name='type'
            value={offer.type}
            id='standard-basic'
            label='Type'
            variant='standard'
          />
          <TextField
            name={`${offer.type2 ? 'type2' : 'groupType'}`}
            value={offer.type2 || offer.groupType}
            id='standard-basic'
            label='Group Type'
            variant='standard'
          />
        </Box>
        <Box
          className={classes.form}
          // style={{ margin: '0rem 6.3rem 0rem' }}
        >
          <TextField
            name='numOfAdults'
            value={offer.numOfAdults}
            id='numOfAdults'
            label='Number of Adults'
            type='number'
            variant='standard'
          />
          <TextField
            name='numOfAdolescants'
            value={offer.numOfAdolescants}
            id='numOfAdolescants'
            type='number'
            label='Number of Adolescants'
            variant='standard'
          />
          <TextField
            name='numOfChildren'
            value={offer.numOfChildren}
            id='numOfChildren'
            type='number'
            label='Children'
            variant='standard'
          />
          <TextField
            name='numOfBabies'
            value={offer.numOfBabies}
            id='numOfBabies'
            type='number'
            label='Babies'
            variant='standard'
          />
        </Box>
        <Box className={classes.form}>
          <TextField
            name='destination'
            value={offer.destination.join(',')}
            id='standard-basic'
            label='Destinations'
            variant='standard'
            fullWidth
          />
        </Box>
        <Box className={classes.form}>
          <TextField
            name='departureDate'
            value={offer.departureDate}
            id='standard-basic'
            label='Desired Departure'
            variant='standard'
            type='date'
          />
          <TextField
            name='desiredReturnOn'
            value={offer.desiredReturnOn}
            id='standard-basic'
            label='Desired Return Date'
            variant='standard'
            type='date'
          />
        </Box>

        <Box className={classes.form}>
          <TextField
            name='year'
            value={offer.year}
            id='standard-basic'
            label='Year'
            variant='standard'
            style={{ width: '30%' }}
          />
          <TextField
            name='month'
            value={offer.month}
            id='standard-basic'
            label='Month'
            variant='standard'
            style={{ width: '30%' }}
            type='number'
          />
          <TextField
            name='duration'
            value={offer.duration}
            id='standard-basic'
            label='Duration'
            variant='standard'
            style={{ width: '30%' }}
            type='number'
          />
        </Box>

        <Box className={classes.form}>
          <TextField
            name='tripType'
            value={offer.tripType}
            id='tripType'
            label='Trip Type'
            variant='standard'
            fullWidth
          />
        </Box>

        <Box className={classes.form}>
          <TextField
            name='accomodationType'
            value={offer.accomodationType}
            id='accomodationType'
            label='Type of accommodation'
            variant='standard'
            style={{ width: '30%' }}
          />
          <TextField
            name='flightsType'
            value={offer.flightsType}
            id='flightsType'
            label='Flight Type'
            variant='standard'
            style={{ width: '30%' }}
          />
        </Box>
        <Box className={classes.form}>
          <TextField
            name='meals'
            value={offer.meals}
            id='meals'
            label='meals'
            variant='standard'
          />
          <TextField
            name='transportOnSite'
            value={offer.transportOnSite}
            id='transportOnSite'
            label='Transport Type'
            variant='standard'
          />
          <TextField
            name='guideAccompany'
            value={offer.guideAccompany}
            id='guideAccompany'
            label='Guide Accompany'
            variant='standard'
          />
        </Box>
        <Box className={classes.form}>
          <TextField
            name='budget'
            value={offer.budgetPerPerson * offer.numOfParticipants}
            id='standard-basic'
            label='global budget'
            variant='standard'
            style={{ width: '30%' }}
          />
          <TextField
            name='conatactClient'
            value={offer.phone}
            id='conatactClient'
            label='Contact Client'
            variant='standard'
            style={{ width: '30%' }}
          />
        </Box>
        <Box style={{ margin: '2rem 5rem 2rem' }}>
          <Typography
            variant='h5'
            style={{ color: '#c6c6c6', marginBottom: '1rem' }}
          >
            Desires
          </Typography>
          <Typography variant='text' style={{ color: '#8f8f8f' }}>
            {offer.desires}
          </Typography>
        </Box>
      </Box>
    </div>
  );
};

export default CustomTripView;
