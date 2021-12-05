import React, { useContext } from 'react';

import { Container } from '@material-ui/core';

import { OffersContext } from 'Contexts/OffersContext';
import SpecialOffers from './specialOffers';

const FlashSales = () => {
  const { offers } = useContext(OffersContext);

  return (
    <Container style={{ marginTop: '3rem' }}>
      <SpecialOffers
        offers={offers?.filter((offer) => offer.sale)}
        title='Fresh Arrivals'
        carouselTitle='Fresh Arrivals'
      />
    </Container>
  );
};

export default FlashSales;
