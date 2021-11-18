import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/styles';

import { Typography, Box, Grid, Button } from '@material-ui/core';
import {
  Plus as PlusIcon,
  Archive as ArchiveIcon,
  Tag as TagIcon,
} from 'react-feather';

import { Link } from 'react-router-dom';
import { OffersContext } from 'Contexts/OffersContext';
import OffersCarousel from './OffersCarousel';

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
    width: '9rem',
    marginBottom: '1rem',
    [theme.breakpoints.down('lg')]: {
      width: '6.5rem',
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

const Offers = () => {
  const classes = styles();
  const { offers } = useContext(OffersContext);

  return (
    <div style={{ marginTop: '3rem' }}>
      <Typography variant='h5' m={2}>
        Offers Mangment
      </Typography>
      <Grid container>
        <Grid item sm={10}>
          {/* TODO - Fetch Categories and then map them */}

          <OffersCarousel
            classes={classes}
            offers={offers?.filter((offer) => offer.category === 'spiritual')}
            title='spiritual'
          />
          <OffersCarousel
            classes={classes}
            offers={offers?.filter((offer) => offer.category === 'ethical')}
            title='ethical'
          />
          <OffersCarousel
            classes={classes}
            offers={offers?.filter((offer) => offer.category === 'excursions')}
            title='excursions'
          />
        </Grid>
        <Grid item sm={2}>
          <Box
            className={classes.boxBack}
            style={{
              minHeight: '25rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Box className={classes.imgBackground}>
              <Box
                className={classes.image}
                component={Link}
                to='/app/offers/createoffer'
              >
                <Box>
                  <PlusIcon size={35} style={{ color: '#fff' }} />
                  <TagIcon size={35} style={{ color: '#fff' }} />
                </Box>
                <Button style={{ color: '#fff' }}>New Offer</Button>
              </Box>
            </Box>
            <Box
              className={classes.imgBackground}
              // component={Link}
              // to='/app/offers/createoffer'
            >
              <Box className={classes.image}>
                <Box>
                  <ArchiveIcon size={35} style={{ color: '#fff' }} />
                </Box>
                <Typography style={{ color: '#fff' }}>archives</Typography>
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};

export default Offers;
