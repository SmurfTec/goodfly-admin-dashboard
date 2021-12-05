import React, { useContext } from 'react';

import { Container } from '@material-ui/core';

import { OffersContext } from 'Contexts/OffersContext';
import SpecialOffers from './specialOffers';

const FreshArrivals = () => {
  const { offers } = useContext(OffersContext);

  return (
    <Container style={{ marginTop: '3rem' }}>
      <SpecialOffers
        offers={offers?.filter((offer) => offer.isPromo)}
        title='Fresh Arrivals'
        carouselTitle='Fresh Arrivals'
      />
    </Container>
  );
};

export default FreshArrivals;
