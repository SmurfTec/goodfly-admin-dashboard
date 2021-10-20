import React from 'react';
import { makeStyles } from '@material-ui/styles';
import CarouselLayout from 'components/common/Carousel/CarouselLayout';
import TripCard from './TripCard';

import { Typography, Box, Grid } from '@material-ui/core';

import {
  Plus as PlusIcon,
  Archive as ArchiveIcon,
  Tag as TagIcon,
} from 'react-feather';

const trips = [
  {
    _id: 1,
    title: 'paksitan',
    category: 'ethical',
    images: [
      'https://picsum.photos/200/300?random=2',
      'https://picsum.photos/200/300?random=2',
    ],
    date: '12-12-12',
    services: [
      'Formalités administratives',
      'Transferts internes',
      'Guide',
    ],
    price: 15000,
  },
  {
    _id: 2,
    title: 'paksitan',
    category: 'ethical',
    images: [
      'https://picsum.photos/200/300?random=2',
      'https://picsum.photos/200/300?random=2',
    ],
    date: '12-12-12',
    services: [
      'Formalités administratives',
      'Transferts internes',
      'Guide',
    ],
    price: 15000,
  },
  {
    _id: 3,
    title: 'paksitan',
    category: 'ethical',
    images: [
      'https://picsum.photos/200/300?random=2',
      'https://picsum.photos/200/300?random=2',
    ],
    date: '12-12-12',
    services: [
      'Formalités administratives',
      'Transferts internes',
      'Guide',
    ],
    price: 15000,
  },
  {
    _id: 4,
    title: 'paksitan',
    category: 'ethical',
    images: [
      'https://picsum.photos/200/300?random=2',
      'https://picsum.photos/200/300?random=2',
    ],
    date: '12-12-12',
    services: [
      'Formalités administratives',
      'Transferts internes',
      'Guide',
    ],
    price: 15000,
  },
  {
    _id: 5,
    title: 'paksitan',
    category: 'ethical',
    images: [
      'https://picsum.photos/200/300?random=2',
      'https://picsum.photos/200/300?random=2',
    ],
    date: '12-12-12',
    services: [
      'Formalités administratives',
      'Transferts internes',
      'Guide',
    ],
    price: 15000,
  },
  {
    _id: 6,
    title: 'paksitan',
    category: 'ethical',
    images: [
      'https://picsum.photos/200/300?random=2',
      'https://picsum.photos/200/300?random=2',
    ],
    date: '12-12-12',
    services: [
      'Formalités administratives',
      'Transferts internes',
      'Guide',
    ],
    price: 15000,
  },
  {
    _id: 7,
    title: 'paksitan',
    category: 'ethical',
    images: [
      'https://picsum.photos/200/300?random=2',
      'https://picsum.photos/200/300?random=2',
    ],
    date: '12-12-12',
    services: [
      'Formalités administratives',
      'Transferts internes',
      'Guide',
    ],
    price: 15000,
  },
];

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
    // border: '1px solid red',
    height: '100%',
    boxSizing: 'border-box',
    // width: '15rem',
    '& .MuiPaper-root': {
      boxShadow: 'rgba(0, 0, 0, 0.15) 2.4px 2.4px 3.2px',
    },
  },
}));

const Offers = () => {
  const classes = styles();

  return (
    <div style={{ marginTop: '3rem' }}>
      <Typography variant='h5' m={2}>
        Offer Mangment
      </Typography>
      <Grid container>
        <Grid item sm={9}>
          <Box className={classes.boxBack}>
            <Box style={{ padding: '1rem' }}>
              <Typography variant='h5'>HAJJ</Typography>
              <CarouselLayout>
                {trips.map((trip, i) => (
                  <div
                    key={trip._id}
                    className={classes.carouselCard}
                  >
                    <TripCard trip={trip} />
                  </div>
                ))}
                {/* one */}
              </CarouselLayout>
            </Box>
          </Box>
          <Box className={classes.boxBack}>
            {' '}
            <Box style={{ padding: '1rem' }}>
              <Typography variant='h5'>OMRA</Typography>
            </Box>
          </Box>
          <Box className={classes.boxBack}>
            {' '}
            <Box style={{ padding: '1rem' }}>
              <Typography variant='h5'>Organized Trips</Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item sm={3}>
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
            <Box
              style={{
                backgroundColor: '#808080',
                borderRadius: '10px',
                width: '12rem',
                marginBottom: '1rem',
              }}
            >
              <Box className={classes.image}>
                <Box>
                  <PlusIcon size={35} style={{ color: '#fff' }} />
                  <TagIcon size={35} style={{ color: '#fff' }} />
                </Box>
                <Typography style={{ color: '#fff' }}>
                  New Offer
                </Typography>
              </Box>
            </Box>
            <Box
              style={{
                backgroundColor: '#808080',
                borderRadius: '10px',
                width: '12rem',
              }}
            >
              <Box className={classes.image}>
                <Box>
                  <ArchiveIcon size={35} style={{ color: '#fff' }} />
                </Box>
                <Typography style={{ color: '#fff' }}>
                  Offer archives
                </Typography>
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};

export default Offers;
