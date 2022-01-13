import React, { useContext, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Button, TextField, Typography } from '@material-ui/core';
import { Box } from '@material-ui/core';

import {
  Settings as SettingsIcon,
  Trash2 as Trash2Icon,
  Download as DownloadIcon,
  Play as PlayIcon,
  ArrowLeft as ArrowLeftIcon,
} from 'react-feather';
import { Link, useParams } from 'react-router-dom';
import { OffersContext } from 'Contexts/OffersContext';
import { getMuiDateFormat } from 'utils/dateMethods';
import { useManyInputs, useToggleInput } from 'hooks';
import { ConfirmDialog } from '../Dialogs';
import { useTranslation } from 'react-i18next';

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
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10%',
  },
  icons: {
    backgroundColor: '#46B9F6',
    color: '#fff',
    width: '2.3rem',
    height: '2rem',
    margin: '0.5rem 0.2rem',
    padding: '0.2rem',
    cursor: 'pointer',
    '&:hover': {
      transform: 'scale(1.2)',
      transition: '0.3s',
    },
  },
}));

const CustomTrip = () => {
  const { getOfferById, customOffers, updateCustomOffer } =
    useContext(OffersContext);
  const classes = styles();
  const { t } = useTranslation();
  const [isDeleteOpen, toggleDeleteOpen] = useToggleInput(false);
  const initialState = {};
  const [offer, handleTxtChange, , , , setOffer] = useManyInputs(initialState);

  const { id } = useParams();

  useEffect(() => {
    const newOffer = getOfferById(id, true);
    if (newOffer) {
      setOffer({
        ...newOffer,
        departureDate: getMuiDateFormat(newOffer.departureDate),
        desiredReturnOn: getMuiDateFormat(newOffer.desiredReturnOn),
      });
    }
  }, [id, customOffers]);

  const handleDelete = () => {
    toggleDeleteOpen();
    updateCustomOffer(id, { ...offer, status: 'rejected' });
  };

  const handleSave = () => {
    updateCustomOffer(id, { ...offer, status: 'validated' });
  };

  return (
    <div>
      <Typography variant='h4' m={2}>
        {t('Tailor-made Travel Management')}
      </Typography>
      {offer ? (
        <Box className={classes.main}>
          <Box
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '100%',
            }}
          >
            <Button variant='outlined' component={Link} to='/app/customtrips'>
              <ArrowLeftIcon />
              {t('Back to the List')}
            </Button>
            <Box display='flex' alignItems='center' style={{ gap: '20px' }}>
              <div>
                {offer.status !== 'pending' && (
                  <Typography variant='h5'>{offer?.status}</Typography>
                )}
              </div>
              <div>
                <SettingsIcon className={classes.icons} />
                <DownloadIcon className={classes.icons} />
                {offer?.status === 'pending' && (
                  <>
                    {' '}
                    <Trash2Icon
                      onClick={toggleDeleteOpen}
                      className={classes.icons}
                    />
                    <PlayIcon onClick={handleSave} className={classes.icons} />{' '}
                  </>
                )}
              </div>
            </Box>
          </Box>
          <div
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
                    value={offer.pronoun}
                    name='pronoun'
                    id='standard-basic'
                    label={t('Civility')}
                    variant='standard'
                  />
                  <TextField
                    name='firstName'
                    value={offer.visitor?.firstName}
                    id='standard-basic'
                    label={t('First Name')}
                    variant='standard'
                  />
                  <TextField
                    name='lastName'
                    value={offer.visitor?.lastName}
                    id='standard-basic'
                    label={t('Last Name')}
                    variant='standard'
                  />
                </Box>
                <Box className={classes.form}>
                  <TextField
                    name='birthDate'
                    value={getMuiDateFormat(offer.visitor?.dateOfBirth)}
                    id='standard-basic'
                    label={t('Date of Birth')}
                    variant='standard'
                  />
                  <TextField
                    name='email'
                    value={offer.visitor?.email}
                    id='standard-basic'
                    label={t('Email Address')}
                    variant='standard'
                  />
                  <TextField
                    name='phone'
                    value={offer.visitor?.telephoneNumber}
                    id='standard-basic'
                    label={`${t('Telephone')}/${t('Mobile')}`}
                    variant='standard'
                  />
                </Box>
                <Box className={classes.form}>
                  <TextField
                    value={offer.visitor?.address}
                    id='standard-basic'
                    label={t('Address')}
                    variant='standard'
                    fullWidth
                  />
                </Box>
                <Box className={classes.form}>
                  <TextField
                    value={offer.visitor?.postalCode}
                    id='standard-basic'
                    label={t('Postal Code')}
                    variant='standard'
                  />
                  <TextField
                    value={offer.visitor?.city}
                    id='standard-basic'
                    label={t('City')}
                    variant='standard'
                  />
                  <TextField
                    value={offer.visitor?.country}
                    id='standard-basic'
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
                    value={offer.totalAmount}
                    onChange={handleTxtChange}
                    id='standard-basic'
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
                    value={offer.numOfParticipants}
                    onChange={handleTxtChange}
                    type='number'
                    id='standard-basic'
                    autoFocus
                    label={t('Number of Participants')}
                    variant='standard'
                  />
                  <TextField
                    name='type'
                    value={offer.type}
                    id='standard-basic'
                    autoFocus
                    label='Type'
                    variant='standard'
                  />
                  <TextField
                    name={`${offer.type2 ? 'type2' : 'groupType'}`}
                    value={offer.type2 || offer.groupType}
                    id='standard-basic'
                    label={t('Group Type')}
                    variant='standard'
                  />
                </Box>
                <Box className={classes.form}>
                  <TextField
                    name='destination'
                    value={offer.destination?.join(',')}
                    // onChange={handleTxtChange}
                    id='standard-basic'
                    label={t('Destinations')}
                    variant='standard'
                    fullWidth
                  />
                </Box>
                <Box className={classes.form}>
                  <TextField
                    name='numOfAdults'
                    value={offer.numOfAdults}
                    onChange={handleTxtChange}
                    id='numOfAdults'
                    label={t('Number of Adults')}
                    type='number'
                    variant='standard'
                  />
                  <TextField
                    name='numOfAdolescants'
                    value={offer.numOfAdolescants}
                    onChange={handleTxtChange}
                    onChange={handleTxtChange}
                    id='numOfAdolescants'
                    type='number'
                    label={t('Number of Adolescants')}
                    variant='standard'
                  />

                  <TextField
                    name='numOfChildren'
                    value={offer.numOfChildren}
                    onChange={handleTxtChange}
                    id='numOfChildren'
                    type='number'
                    label={t('Children')}
                    variant='standard'
                  />
                </Box>

                <Box className={classes.form}>
                  <TextField
                    style={{ flexGrow: 1 }}
                    name='numOfBabies'
                    value={offer.numOfBabies}
                    onChange={handleTxtChange}
                    id='numOfBabies'
                    type='number'
                    label={t('Babies')}
                    variant='standard'
                  />
                  <TextField
                    style={{ flexGrow: 1 }}
                    name='departureDate'
                    value={offer.departureDate}
                    onChange={handleTxtChange}
                    id='standard-basic'
                    label={t('Desired Departure')}
                    variant='standard'
                    type='date'
                  />
                  <TextField
                    style={{ flexGrow: 1 }}
                    name='desiredReturnOn'
                    value={offer.desiredReturnOn}
                    onChange={handleTxtChange}
                    id='standard-basic'
                    label={t('Desired Return Date')}
                    variant='standard'
                    type='date'
                  />
                </Box>

                <Box className={classes.form}>
                  <TextField
                    name='year'
                    value={offer.year}
                    onChange={handleTxtChange}
                    id='standard-basic'
                    label={t('Year')}
                    variant='standard'
                  />
                  <TextField
                    name='month'
                    value={offer.month}
                    id='standard-basic'
                    label={t('Month')}
                    variant='standard'
                    type='number'
                  />
                  <TextField
                    name='duration'
                    value={offer.duration}
                    id='standard-basic'
                    label={t('Duration')}
                    variant='standard'
                    type='number'
                  />
                </Box>

                <Box className={classes.form}>
                  <TextField
                    name='tripType'
                    value={offer.tripType}
                    onChange={handleTxtChange}
                    id='tripType'
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
                    value={offer.accomodationType}
                    onChange={handleTxtChange}
                    id='accomodationType'
                    label={t('Type of Accommodation')}
                    variant='standard'
                  />
                  <TextField
                    style={{
                      flexGrow: 1,
                    }}
                    name='flightsType'
                    value={offer.flightsType}
                    onChange={handleTxtChange}
                    id='flightsType'
                    label={t('Flight Type')}
                    variant='standard'
                  />
                </Box>
                <Box className={classes.form}>
                  <TextField
                    name='meals'
                    value={offer.meals}
                    onChange={handleTxtChange}
                    id='meals'
                    label='meals'
                    variant='standard'
                  />
                  <TextField
                    name='transportOnSite'
                    value={offer.transportOnSite}
                    id='transportOnSite'
                    label={t('Transport Type')}
                    variant='standard'
                  />
                  <TextField
                    name='guideAccompany'
                    value={offer.guideAccompany}
                    onChange={handleTxtChange}
                    id='guideAccompany'
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
                    value={offer.budgetPerPerson * offer.numOfParticipants}
                    onChange={handleTxtChange}
                    id='standard-basic'
                    label={t('Global Budget')}
                    variant='standard'
                  />
                  <TextField
                    style={{
                      flexGrow: 1,
                    }}
                    name='conatactClient'
                    value={offer.phone}
                    onChange={handleTxtChange}
                    id='conatactClient'
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
        </Box>
      ) : (
        <div className='loader'></div>
      )}
      <ConfirmDialog
        open={isDeleteOpen}
        toggleDialog={toggleDeleteOpen}
        success={handleDelete}
        dialogTitle='Cancel This Trip'
      />
    </div>
  );
};

export default CustomTrip;
