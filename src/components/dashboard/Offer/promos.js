import React, { useContext } from 'react';

import { Container } from '@material-ui/core';

import { OffersContext } from 'Contexts/OffersContext';
import SpecialOffers from './specialOffers';
import { useTranslation } from 'react-i18next';

const FreshArrivals = () => {
  const { offers } = useContext(OffersContext);
  const { t } = useTranslation();

  return (
    <Container style={{ marginTop: '3rem' }}>
      <SpecialOffers
        offers={offers?.filter((offer) => offer.isPromo)}
        title={t('Fresh Arrivals')}
        carouselTitle={t('FRESH ARRIVALS')}
      />
    </Container>
  );
};

export default FreshArrivals;
