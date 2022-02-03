import { makeStyles } from '@material-ui/styles';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { Button, TextField, Typography, Box } from '@material-ui/core';
import { getMuiDateFormat } from 'utils/dateMethods';

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
  const { t } = useTranslation();
  const classes = useStyles();

  console.log('OFFER', offer);

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
      {!offer && (
        <Typography variant='h5'>{t('Offer No Longer Exists')}</Typography>
      )}
      {offer && (
        <>
          <Box>
            <Typography variant='h6'>{t('Contact Details')}</Typography>
            <Box className={classes.form}>
              <TextField
                value={offer.visitor?.pronoun}
                name='pronoun'
                id='pronoun'
                label={t('Civility')}
                variant='standard'
              />
              <TextField
                name='firstName'
                id='firstName'
                value={offer.visitor?.firstName}
                label={t('First Name')}
                variant='standard'
              />
              <TextField
                name='lastName'
                id='lastName'
                value={offer.visitor?.lastName}
                label={t('Last Name')}
                variant='standard'
              />
            </Box>
            <Box className={classes.form}>
              <TextField
                name='birthDate'
                id='birthDate'
                value={getMuiDateFormat(offer.visitor?.birthDate)}
                label={t('Date of Birth')}
                variant='standard'
              />
              <TextField
                name='email'
                id='email'
                value={offer.visitor?.email}
                label={t('Email Address')}
                variant='standard'
              />
              <TextField
                name='phone'
                id='phone'
                value={offer.visitor?.phone}
                label={`${t('Telephone')}/${t('Mobile')}`}
                variant='standard'
              />
            </Box>
            <Box className={classes.form}>
              <TextField
                name='address'
                id='address'
                value={offer.visitor?.address}
                label={t('Address')}
                variant='standard'
                style={{ width: '75%' }}
              />
            </Box>
            <Box className={classes.form}>
              <TextField
                name='zipCode'
                id='zipCode'
                value={offer.visitor?.zipCode}
                label={t('Postal Code')}
                variant='standard'
              />
              <TextField
                name='city'
                id='city'
                value={offer.visitor?.city}
                label={t('City')}
                variant='standard'
              />
              <TextField
                name='country'
                id='country'
                value={offer.visitor?.country}
                label={t('Country')}
                variant='standard'
              />
            </Box>
          </Box>
          <Box>
            <Typography variant='h6'>{t('Trip Details')}</Typography>

            <Box className={classes.form} style={{ width: '42%' }}>
              <TextField
                name='price'
                id='price'
                value={offer.budgetPerPerson * offer.numOfParticipants}
                label={t('Total Price')}
                type='number'
                variant='standard'
                style={{ fontSize: '1.2em' }}
              />
            </Box>
            <Box className={classes.form}>
              <TextField
                name='numOfParticipants'
                id='numOfParticipants'
                value={offer.numOfParticipants}
                type='number'
                label={t('Number of Participants')}
                variant='standard'
              />
              <TextField
                name='type'
                id='type'
                value={offer.type}
                label={t('Type')}
                variant='standard'
              />
              <TextField
                name={`${offer.type2 ? 'type2' : 'groupType'}`}
                id={`${offer.type2 ? 'type2' : 'groupType'}`}
                value={offer.type2 || offer.groupType}
                label={t('Group Type')}
                variant='standard'
              />
            </Box>
            <Box
              className={classes.form}
              // style={{ margin: '0rem 6.3rem 0rem' }}
            >
              <TextField
                name='numOfAdults'
                id='numOfAdults'
                value={offer.numOfAdults}
                id='numOfAdults'
                label={t('Number of Adults')}
                type='number'
                variant='standard'
              />
              <TextField
                name='numOfAdolescants'
                id='numOfAdolescants'
                value={offer.numOfAdolescants}
                id='numOfAdolescants'
                type='number'
                label={t('Number of Adolescants')}
                variant='standard'
              />
              <TextField
                name='numOfChildren'
                id='numOfChildren'
                value={offer.numOfChildren}
                id='numOfChildren'
                type='number'
                label={t('Children')}
                variant='standard'
              />
              <TextField
                name='numOfBabies'
                id='numOfBabies'
                value={offer.numOfBabies}
                id='numOfBabies'
                type='number'
                label={t('Babies')}
                variant='standard'
              />
            </Box>
            <Box className={classes.form}>
              <TextField
                name='destination'
                id='destination'
                value={offer.destination.join(',')}
                label={t('Destinations')}
                variant='standard'
                fullWidth
              />
            </Box>
            <Box className={classes.form}>
              <TextField
                name='departureDate'
                id='departureDate'
                value={getMuiDateFormat(offer.departureDate)}
                label={t('Desired Departure')}
                variant='standard'
                type='date'
              />
              <TextField
                name='desiredReturnOn'
                id='desiredReturnOn'
                value={getMuiDateFormat(offer.desiredReturnOn)}
                label={t('Desired Return Date')}
                variant='standard'
                type='date'
              />
            </Box>

            <Box className={classes.form}>
              <TextField
                name='year'
                id='year'
                value={offer.year}
                label={t('Year')}
                variant='standard'
                style={{ width: '30%' }}
              />
              <TextField
                name='month'
                id='month'
                value={offer.month}
                label={t('Month')}
                variant='standard'
                style={{ width: '30%' }}
                type='number'
              />
              <TextField
                name='duration'
                id='duration'
                value={offer.duration}
                label={t('Duration')}
                variant='standard'
                style={{ width: '30%' }}
                type='number'
              />
            </Box>

            <Box className={classes.form}>
              <TextField
                name='tripType'
                id='tripType'
                value={offer.tripType}
                id='tripType'
                label={t('Trip Type')}
                variant='standard'
                fullWidth
              />
            </Box>

            <Box className={classes.form}>
              <TextField
                name='accomodationType'
                id='accomodationType'
                value={offer.accomodationType}
                id='accomodationType'
                label={t('Type of Accommodation')}
                variant='standard'
                style={{ width: '30%' }}
              />
              <TextField
                name='flightsType'
                id='flightsType'
                value={offer.flightsType}
                id='flightsType'
                label={t('Flight Type')}
                variant='standard'
                style={{ width: '30%' }}
              />
            </Box>
            <Box className={classes.form}>
              <TextField
                name='meals'
                id='meals'
                value={offer.meals}
                id='meals'
                label={t('meals')}
                variant='standard'
              />
              <TextField
                name='transportOnSite'
                id='transportOnSite'
                value={offer.transportOnSite}
                id='transportOnSite'
                label={t('Transport Type')}
                variant='standard'
              />
              <TextField
                name='guideAccompany'
                id='guideAccompany'
                value={offer.guideAccompany}
                id='guideAccompany'
                label={t('Guide Accompany')}
                variant='standard'
              />
            </Box>
            <Box className={classes.form}>
              <TextField
                name='budget'
                id='budget'
                value={offer.budgetPerPerson * offer.numOfParticipants}
                label={t('Global Budget')}
                variant='standard'
                style={{ width: '30%' }}
              />
              <TextField
                name='conatactClient'
                id='conatactClient'
                value={offer.phone}
                id='conatactClient'
                label={t('Contact Client')}
                variant='standard'
                style={{ width: '30%' }}
              />
            </Box>
            <Box style={{ margin: '2rem 5rem 2rem' }}>
              <Typography
                variant='h5'
                style={{ color: '#c6c6c6', marginBottom: '1rem' }}
              >
                {t('Desires')}
              </Typography>
              <Typography variant='text' style={{ color: '#8f8f8f' }}>
                {offer.desires}
              </Typography>
            </Box>
          </Box>
        </>
      )}
    </div>
  );
};

export default CustomTripView;
