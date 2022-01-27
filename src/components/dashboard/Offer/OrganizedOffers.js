import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/styles';

import { Typography, Box, Grid, Button } from '@material-ui/core';

import { Link } from 'react-router-dom';
import { OffersContext } from 'Contexts/OffersContext';
import OffersCarousel from './OffersCarousel';
import { useTranslation } from 'react-i18next';

const styles = makeStyles((theme) => ({
  main: {
    backgroundColor: '#f2f2f2',
    minHeight: '15rem',
    borderRadius: '0.8rem',
    padding: '0.1rem',
    margin: '1rem 0rem 2rem',
  },
  boxBack: {
    minHeight: '12rem',
    backgroundColor: '#f2f2f2',
    borderRadius: '0.5rem',
    margin: '0.4rem',
    [theme.breakpoints.down('lg')]: {
      margin: '0.2rem',
    },
  },
  imgBackground: {
    backgroundColor: '#808080',
    borderRadius: '10px',
    width: '10rem',
    marginBottom: '1rem',
    [theme.breakpoints.down('lg')]: {
      width: '9rem',
    },
  },
  image: {
    minHeight: '8rem',
    margin: '0.5rem',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    border: `2px dashed #fff`,
    borderRadius: '10px',
  },
  carouselCard: {
    display: 'block',
    height: '100%',
    minHeight: 206,
    boxSizing: 'border-box',
    // width: '15rem',
    '& .MuiPaper-root': {
      boxShadow: 'rgba(0, 0, 0, 0.15) 2.4px 2.4px 3.2px',
    },
  },
}));

const OrganizedOffers = () => {
  const classes = styles();
  const { offerOrganizeds: offers } = useContext(OffersContext);
  const { t } = useTranslation();

  return (
    <div>
      <Box display='flex' justifyContent='space-between' alignItems='center'>
        <Typography variant='h5' m={2}>
          {t('Offers Management')}
        </Typography>
      </Box>
      <Grid container sx={{ paddingBottom: '20px' }}>
        <Grid item sm={10}>
          {/* TODO - Fetch Categories and then map them */}

          <OffersCarousel
            organized
            classes={classes}
            offers={offers?.filter(
              (offer) => !offer.archieve && offer.category === 'spiritual'
            )}
            title={t('Spiritual')}
          />
          <OffersCarousel
            organized
            classes={classes}
            offers={offers?.filter(
              (offer) => !offer.archieve && offer.category === 'ethical'
            )}
            title={t('Ethical')}
          />
          <OffersCarousel
            organized
            classes={classes}
            offers={offers?.filter(
              (offer) => !offer.archieve && offer.category === 'excursions'
            )}
            title={t('Excursions')}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default OrganizedOffers;
