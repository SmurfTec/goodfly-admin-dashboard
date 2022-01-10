import React, { useContext, useEffect, useState } from 'react';

// * MUI ----------------
import {
  Container,
  Typography,
  Box,
  Button,
  Grid,
  Badge,
  TextField,
  ToggleButtonGroup,
  ToggleButton,
} from '@material-ui/core';
import {
  Add,
  Work,
  Loyalty,
  Storefront,
  Description,
} from '@material-ui/icons';
//  -------------------- //
import LineChart from './LineChart';
import Person from '@material-ui/icons/Person';

import {
  fbSvg,
  instagramSvg,
  snapchatSvg,
  pinterestSvg,
  telegramSvg,
  twitterSvg,
  youtubeSvg,
} from 'Assets/img';

import useStyles from './DashboardHomeStyles';
import { ReactSVG } from 'react-svg';
import useTextInput from 'hooks/useTextInput';
import CreateCard from './CreateCard';
import { AuthContext } from 'Contexts/AuthContext';
import { OrderContext } from 'Contexts/OrderContext';
import { OffersContext } from 'Contexts/OffersContext';
import { ReservationsContext } from 'Contexts/ReservationsContext';
import { CustomersContext } from 'Contexts/CustomersContext';
import { ProductContext } from 'Contexts/ProductContext';
import { BlogsContext } from 'Contexts/BlogsContext';
import { useTranslation } from 'react-i18next';

const DashboardHome = () => {
  const classes = useStyles();
  const { user } = useContext(AuthContext);
  const { customers } = useContext(CustomersContext);
  const { orders } = useContext(OrderContext);
  const { customOffers, offerComments } = useContext(OffersContext);
  const { reservations } = useContext(ReservationsContext);
  const { productComments } = useContext(ProductContext);
  const { blogComments } = useContext(BlogsContext);
  const { t } = useTranslation();

  // TODO add mesages, comments...

  const [clientNumber, handleTxtChange] = useTextInput('');
  const [searchBy, setSearchBy] = useState('plane');

  const handleChange = (event, nextView) => {
    setSearchBy(nextView);
  };

  return (
    <Container sx={{ paddingBottom: 5 }}>
      <Box
        mb={2}
        mt={2}
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap-reverse',
          rowGap: 30,
        }}
      >
        {' '}
        <Box sx={{ maxWidth: 900 }}>
          <Typography variant='h5' color='textSecondary' gutterBottom>
            {t('Welcome to GoodFly Dashboard')} . {user?.fullName}
          </Typography>
          <Typography variant='h5' fontWeight='normal' color='textSecondary'>
            {t('Welcome to GoodFly Dashboard')} . {t('Hope you are going good')}
            .
          </Typography>
        </Box>
        {/* <Clock /> */}
      </Box>

      <Box
        display='flex'
        justifyContent='space-evenly'
        alignItems='center'
        gap='20px'
        flexWrap='wrap'
        sx={{
          padding: '19px 20px',
          background: '#f2f2f2f2',
          borderRadius: '0.5rem',
        }}
      >
        <Box className={classes.Card}>
          <Typography variant='h5' gutterBottom>
            {t('Add/Create')}
          </Typography>
          <Box className={classes.MiniCard}>
            <Box className={classes.image}>
              <Box>
                <Add size={35} style={{ color: '#cccccc', fontSize: '90px' }} />
                {/* <Icon size={35} style={{ color: '#fff' }} /> */}
              </Box>
              <Typography style={{ color: '#fff' }}>
                {/* {secondarytext} */}
              </Typography>
            </Box>
          </Box>
        </Box>
        <CreateCard
          link='/app/customers/new'
          classes={classes}
          Icon={Person}
          primaryText={`${t('Manage')} ${t('Client')}`}
          secondarytext={`${t('New')} ${t('Client')}`}
        />
        <CreateCard
          link='/app/offers/createOffer'
          classes={classes}
          Icon={Loyalty}
          primaryText={`${t('Manage')} ${t('Offer')}`}
          secondarytext={`${t('New')} ${t('Offer')}`}
        />
        <CreateCard
          link='/app/products/create'
          classes={classes}
          Icon={Storefront}
          primaryText={`${t('Manage')} ${t('Product')}`}
          secondarytext={`${t('New')} ${t('Product')}`}
        />
        <CreateCard
          link='/app/blogs/create'
          classes={classes}
          Icon={Description}
          primaryText={`${t('Manage')} ${t('Article')}`}
          secondarytext={`${t('New')} ${t('Blog')}`}
        />
      </Box>

      <Grid container sx={{ mt: 5 }} spacing={1}>
        <Grid
          item
          xs={12}
          sm={8}
          sx={{
            backgroundColor: '#f2f2f2',
            borderRadius: '0.5rem',
            height: 290,
          }}
        >
          <LineChart reservations={reservations} orders={orders} />
        </Grid>
        <Grid
          sx={{
            paddingTop: '0px !important',
            paddingBottom: '0px !important',
            minHeight: '290px',
            borderRadius: '0.5rem',
          }}
          item
          xs={12}
          sm={4}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              rowGap: '18px',
              background: '#f2f2f2f2',
              padding: '19px 20px',
              borderRadius: '0.5rem',
              height: '100%',
            }}
          >
            <Box className={classes.InfoItem}>
              <Typography variant='h5' color='InfoText'>
                {t('Reservations')}
              </Typography>

              <Badge
                badgeContent={reservations?.length || 0}
                className={classes.Badge}
                style={{ border: '2px solid red' }}
                color='primary'
              />
            </Box>
            <Box className={classes.InfoItem}>
              <Typography variant='h5' color='InfoText'>
                {t('Tailor-Made Trips')}
              </Typography>
              <Badge
                badgeContent={customOffers?.length || 0}
                color='primary'
                className={classes.Badge}
              />
            </Box>
            <Box className={classes.InfoItem}>
              <Typography variant='h5' color='InfoText'>
                {t('Store Orders')}
              </Typography>
              <Badge
                badgeContent={orders?.length || 0}
                color='primary'
                className={classes.Badge}
              />
            </Box>
            <Box className={classes.InfoItem}>
              <Typography variant='h5' color='InfoText'>
                {t('Product Reviews')}
              </Typography>
              <Badge
                badgeContent={productComments?.length || 0}
                color='primary'
                className={classes.Badge}
              />
            </Box>
            <Box className={classes.InfoItem}>
              <Typography variant='h5' color='InfoText'>
                {t('Travels Reviews')}
              </Typography>
              <Badge
                badgeContent={offerComments?.length || 0}
                color='primary'
                className={classes.Badge}
              />
            </Box>
            <Box className={classes.InfoItem}>
              <Typography variant='h5' color='InfoText'>
                {t('Blog Comments')}
              </Typography>
              <Badge
                badgeContent={blogComments?.length || 0}
                color='primary'
                className={classes.Badge}
              />
            </Box>
          </Box>
        </Grid>
      </Grid>
      <Grid container sx={{ mt: 5 }} spacing={1}>
        <Grid
          item
          xs={12}
          sm={6}
          sx={{
            display: 'flex',
            backgroundColor: '#f2f2f2',
            borderRadius: '0.5rem',
          }}
        >
          <Box
            style={{
              padding: '0.5rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Box className={classes.InfoButtonGrid}>
              <Box className={classes.InfoButton}>
                <Typography variant='h5'>Goodfly Clients</Typography>
                <Button
                  size='large'
                  variant='contained'
                  fullWidth
                  color='primary'
                  startIcon={<Person />}
                >
                  {customers?.length || 0}
                </Button>
              </Box>
              <Box className={classes.InfoButton}>
                <Typography variant='h5'>{t('Store Orders')}</Typography>
                <Button
                  size='large'
                  variant='contained'
                  fullWidth
                  color='primary'
                  startIcon={<Work />}
                >
                  {orders?.length || 0}
                </Button>
              </Box>
            </Box>
            <Box className={classes.FollowersGrid}>
              <Typography variant='h5'>{t('Followers')}</Typography>
              <Box py={2} px={3} className={classes.SocialIcons}>
                <Box>
                  <ReactSVG src={fbSvg} />
                  <Typography variant='h6'>10.1K</Typography>
                </Box>
                <Box>
                  <ReactSVG src={instagramSvg} />
                  <Typography variant='h6'>10.1K</Typography>
                </Box>
                <Box>
                  <ReactSVG src={snapchatSvg} />
                  <Typography variant='h6'>10.1K</Typography>
                </Box>
                <Box>
                  <ReactSVG src={pinterestSvg} />
                  <Typography variant='h6'>10.1K</Typography>
                </Box>
                <Box>
                  <ReactSVG src={telegramSvg} />
                  <Typography variant='h6'>10.1K</Typography>
                </Box>
                <Box>
                  <ReactSVG src={twitterSvg} />
                  <Typography variant='h6'>10.1K</Typography>
                </Box>
                <Box>
                  <ReactSVG src={youtubeSvg} />
                  <Typography variant='h6'>10.1K</Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
          style={{ paddingTop: 0, borderRadius: '0.5rem' }}
        >
          <Box className={classes.ActionsGrid}>
            <Box>
              <Typography variant='h5' style={{ color: '#828282' }}>
                {t('Find a Client')}
              </Typography>
              <TextField
                hiddenLabel
                id='filled-hidden-label-small'
                size='small'
                className={classes.textInput}
                color='primary'
                value={clientNumber}
                onChange={handleTxtChange}
                label={t('by name or file')}
              />
            </Box>
            <ToggleButtonGroup
              orientation='vertical'
              value={searchBy}
              exclusive
              onChange={handleChange}
              style={{ borderLeft: '2px solid #ccc' }}
            >
              <ToggleButton sx={{ border: 0 }} value='plane' aria-label='plane'>
                <Button
                  disableRipple
                  fullWidth
                  disableFocusRipple
                  size={'small'}
                  variant='outlined'
                  sx={{
                    color: searchBy === 'plane' ? '#46B9F6' : '#000',
                    borderColor: searchBy === 'plane' ? '#46B9F6' : '#000',
                  }}
                >
                  {t('FIND A PLANE TICKET')}
                </Button>
              </ToggleButton>
              <ToggleButton sx={{ border: 0 }} value='boat' aria-label='boat'>
                <Button
                  disableRipple
                  fullWidth
                  disableFocusRipple
                  size={'small'}
                  variant='outlined'
                  sx={{
                    color: searchBy === 'boat' ? '#46B9F6' : '#000',
                    borderColor: searchBy === 'boat' ? '#46B9F6' : '#000',
                  }}
                >
                  {t('FIND A BOAT TICKET')}
                </Button>
              </ToggleButton>
              <ToggleButton
                sx={{ border: 0 }}
                value='reservation'
                aria-label='reservation'
              >
                <Button
                  disableRipple
                  fullWidth
                  disableFocusRipple
                  size={'small'}
                  variant='outlined'
                  sx={{
                    color: searchBy === 'reservation' ? '#46B9F6' : '#000',
                    borderColor:
                      searchBy === 'reservation' ? '#46B9F6' : '#000',
                  }}
                >
                  {t('FIND A RESERVATION')}
                </Button>
              </ToggleButton>
              <ToggleButton
                sx={{ border: 0 }}
                value='vehicle'
                aria-label='vehicle'
              >
                <Button
                  disableRipple
                  fullWidth
                  disableFocusRipple
                  size={'small'}
                  variant='outlined'
                  sx={{
                    color: searchBy === 'vehicle' ? '#46B9F6' : '#000',
                    borderColor: searchBy === 'vehicle' ? '#46B9F6' : '#000',
                  }}
                >
                  {t('FIND A VEHICLE RENTAL')}
                </Button>
              </ToggleButton>
            </ToggleButtonGroup>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default DashboardHome;
