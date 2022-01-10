import React, { useContext } from 'react';

import { Container } from '@material-ui/core';

import { OffersContext } from 'Contexts/OffersContext';
import SpecialOffers from './specialOffers';
import { useTranslation } from 'react-i18next';

const FlashSales = () => {
  const { offers } = useContext(OffersContext);
  const { t } = useTranslation();

  return (
    <Container style={{ marginTop: '3rem' }}>
      <SpecialOffers
        offers={offers?.filter((offer) => offer.sale)}
        title={t('Flash Sales')}
        carouselTitle={t('FLASH SALES')}
      />
    </Container>
  );
};

export default FlashSales;
