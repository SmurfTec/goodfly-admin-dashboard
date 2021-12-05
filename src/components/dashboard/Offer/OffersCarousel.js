import React from 'react';

// * ------- MUI Stuff --------- //
import { Box, Typography } from '@material-ui/core';
// * ----------------------------- //
import CarouselLayout from 'components/common/Carousel/CarouselLayout';
import TripCard from './TripCard';

import Skeleton from 'react-loading-skeleton';

const OffersCarousel = ({ title, offers, classes, isSpecialOffer }) => {
  return (
    <Box className={classes.boxBack}>
      <Box p={3}>
        <Typography variant='h5'>{title.toUpperCase()}</Typography>
        <CarouselLayout>
          {offers
            ? offers.map((trip) => (
                <div key={trip._id} className={classes.carouselCard}>
                  <TripCard trip={trip} isSpecialOffer={isSpecialOffer} />
                </div>
              ))
            : [1, 2, 3].map((el) => (
                <div key={el} className={classes.carouselCard}>
                  <Skeleton height={150} />
                </div>
              ))}
          {/* one */}
        </CarouselLayout>
      </Box>
    </Box>
  );
};

export default OffersCarousel;
