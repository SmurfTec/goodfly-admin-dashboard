import { TextField, Box, Typography } from '@material-ui/core';
import React from 'react';
import { getMuiDateFormat } from 'utils/dateMethods';

const PrintCustomTrip = React.forwardRef((props, ref) => {
  const { id, classes, offer, handleTxtChange, t } = props;
  return (
    <div
      ref={ref}
      style={{
        backgroundColor: '#fff',
        minHeight: '100vh',
        margin: '1rem 0rem 1rem',
        border: '1px solid #fff',
        padding: '30px 30px',
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: 'auto',
        }}
      >
        <Box
          style={{
            maxWidth: 700,
            margin: 'auto',
          }}
        >
          <Box className={classes.form}>
            <TextField
              value={offer.pronoun || ''}
              name='pronoun'
              id='pronoun'
              label={t('Civility')}
              variant='standard'
            />
            <TextField
              name='firstName'
              id='firstName'
              value={offer.visitor?.firstName || ''}
              label={t('First Name')}
              variant='standard'
            />

            <TextField
              name='lastName'
              id='lastName'
              value={offer.visitor?.lastName || ''}
              label={t('Last Name')}
              variant='standard'
            />
          </Box>
          <Box className={classes.form}>
            <TextField
              name='birthDate'
              id='birthDate'
              value={getMuiDateFormat(offer.visitor?.dateOfBirth)}
              label={t('Date of Birth')}
              variant='standard'
            />
            <TextField
              name='email'
              id='email'
              value={offer.visitor?.email || ''}
              label={t('Email Address')}
              variant='standard'
            />
            <TextField
              name='phone'
              id='phone'
              value={offer.visitor?.telephoneNumber || ''}
              label={`${t('Telephone')}/${t('Mobile')}`}
              variant='standard'
            />
          </Box>
          <Box className={classes.form}>
            <TextField
              value={offer.visitor?.address || ''}
              label={t('Address')}
              variant='standard'
              fullWidth
            />
          </Box>
          <Box className={classes.form}>
            <TextField
              value={offer.visitor?.postalCode || ''}
              label={t('Postal Code')}
              variant='standard'
            />
            <TextField
              value={offer.visitor?.city || ''}
              label={t('City')}
              variant='standard'
            />
            <TextField
              value={offer.visitor?.country || ''}
              label={t('Country')}
              variant='standard'
            />
          </Box>
        </Box>
        {/* <Typography variant='h6'>{t('Trip Details')}</Typography> */}
        <Box
          style={{
            maxWidth: 700,
            margin: 'auto',
          }}
        >
          <Box className={classes.form}>
            <TextField
              name='totalAmount'
              id='totalAmount'
              value={offer.totalAmount || ''}
              onChange={handleTxtChange}
              label={t('Total Price')}
              type='number'
              autoFocus
              variant='standard'
              style={{ fontSize: '1.2em' }}
              fullWidth
            />
          </Box>
          <Box className={classes.form}>
            <TextField
              name='numOfParticipants'
              id='numOfParticipants'
              value={offer.numOfParticipants || ''}
              onChange={handleTxtChange}
              type='number'
              autoFocus
              label={t('Number of Participants')}
              variant='standard'
            />
            <TextField
              name='type'
              id='type'
              value={offer.type || ''}
              autoFocus
              label='Type'
              variant='standard'
            />
            <TextField
              name={`${offer.type2 ? 'type2' : 'groupType'}`}
              id={`${offer.type2 ? 'type2' : 'groupType'}`}
              value={offer.type2 || offer.groupType || ''}
              label={t('Group Type')}
              variant='standard'
            />
          </Box>
          <Box className={classes.form}>
            <TextField
              name='destination'
              id='destination'
              value={offer.destination?.join(',') || ''}
              // onChange={handleTxtChange}
              label={t('Destinations')}
              variant='standard'
              fullWidth
            />
          </Box>
          <Box className={classes.form}>
            <TextField
              name='numOfAdults'
              id='numOfAdults'
              value={offer.numOfAdults || ''}
              onChange={handleTxtChange}
              label={t('Number of Adults')}
              type='number'
              variant='standard'
            />
            <TextField
              name='numOfAdolescants'
              id='numOfAdolescants'
              value={offer.numOfAdolescants || ''}
              onChange={handleTxtChange}
              onChange={handleTxtChange}
              type='number'
              label={t('Number of Adolescants')}
              variant='standard'
            />

            <TextField
              name='numOfChildren'
              id='numOfChildren'
              value={offer.numOfChildren || ''}
              onChange={handleTxtChange}
              type='number'
              label={t('Children')}
              variant='standard'
            />
          </Box>

          <Box className={classes.form}>
            <TextField
              style={{ flexGrow: 1 }}
              name='numOfBabies'
              id='numOfBabies'
              value={offer.numOfBabies || ''}
              onChange={handleTxtChange}
              type='number'
              label={t('Babies')}
              variant='standard'
            />
            <TextField
              style={{ flexGrow: 1 }}
              name='departureDate'
              id='departureDate'
              value={offer.departureDate || ''}
              onChange={handleTxtChange}
              label={t('Desired Departure')}
              variant='standard'
              type='date'
            />
            <TextField
              style={{ flexGrow: 1 }}
              name='desiredReturnOn'
              id='desiredReturnOn'
              value={offer.desiredReturnOn || ''}
              onChange={handleTxtChange}
              label={t('Desired Return Date')}
              variant='standard'
              type='date'
            />
          </Box>

          <Box className={classes.form}>
            <TextField
              name='year'
              id='year'
              value={offer.year || ''}
              onChange={handleTxtChange}
              label={t('Year')}
              variant='standard'
            />
            <TextField
              name='month'
              id='month'
              value={offer.month || ''}
              label={t('Month')}
              variant='standard'
              type='number'
            />
            <TextField
              name='duration'
              id='duration'
              value={offer.duration || ''}
              label={t('Duration')}
              variant='standard'
              type='number'
            />
          </Box>

          <Box mt={10} className={classes.form}>
            <TextField
              name='tripType'
              id='tripType'
              value={offer.tripType || ''}
              onChange={handleTxtChange}
              label={t('Trip Type')}
              variant='standard'
              fullWidth
            />
          </Box>

          <Box className={classes.form}>
            <TextField
              style={{
                flexGrow: 1,
              }}
              name='accomodationType'
              id='accomodationType'
              value={offer.accomodationType || ''}
              onChange={handleTxtChange}
              label={t('Type of Accommodation')}
              variant='standard'
            />
            <TextField
              style={{
                flexGrow: 1,
              }}
              name='flightsType'
              id='flightsType'
              value={offer.flightsType || ''}
              onChange={handleTxtChange}
              label={t('Flight Type')}
              variant='standard'
            />
          </Box>
          <Box className={classes.form}>
            <TextField
              name='meals'
              id='meals'
              value={offer.meals || ''}
              onChange={handleTxtChange}
              label='meals'
              variant='standard'
            />
            <TextField
              name='transportOnSite'
              id='transportOnSite'
              value={offer.transportOnSite || ''}
              label={t('Transport Type')}
              variant='standard'
            />
            <TextField
              name='guideAccompany'
              id='guideAccompany'
              value={offer.guideAccompany || ''}
              // onChange={handleTxtChange}
              label={t('Guide Accompany')}
              variant='standard'
            />
          </Box>
          <Box className={classes.form}>
            <TextField
              style={{
                flexGrow: 1,
              }}
              name='budget'
              id='budget'
              value={offer.budgetPerPerson * offer.numOfParticipants || ''}
              onChange={handleTxtChange}
              label={t('Global Budget')}
              variant='standard'
            />
            <TextField
              style={{
                flexGrow: 1,
              }}
              name='conatactClient'
              id='conatactClient'
              value={offer.phone || ''}
              onChange={handleTxtChange}
              label={t('Contact Client')}
              variant='standard'
            />
          </Box>
          <Box>
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
      </div>
    </div>
  );
});

export default PrintCustomTrip;
