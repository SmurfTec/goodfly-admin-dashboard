import React from 'react';

import { Typography, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { Link } from 'react-router-dom';
import OffersCarousel from './OffersCarousel';
import { ArrowBack } from '@material-ui/icons';

const styles = makeStyles((theme) => ({
  main: {
    backgroundColor: '#f2f2f2',
    minHeight: '15rem',
    borderRadius: '0.8rem',
    padding: '0.1rem',
    margin: '2rem 1rem 2rem',
  },
  boxBack: {
    minHeight: '12rem',
    backgroundColor: '#f2f2f2',
    borderRadius: '0.5rem',
    margin: '0.8rem',
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

const SpecialOffers = ({ title, carouselTitle, offers }) => {
  const classes = styles();
  return (
    <>
      <Typography variant='h5' m={2}>
        {title}
      </Typography>
      <Button
        variant='contained'
        component={Link}
        to='/app/offers'
        sx={{ marginBottom: 2 }}
        startIcon={<ArrowBack />}
      ></Button>
      {/* TODO - Fetch Categories and then map them */}

      <OffersCarousel
        classes={classes}
        offers={offers}
        title={carouselTitle}
        isSpecialOffer
      />
    </>
  );
};

export default SpecialOffers;
