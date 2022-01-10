import React, { useContext } from 'react';

import { Container } from '@material-ui/core';

import { OffersContext } from 'Contexts/OffersContext';
import SpecialOffers from './specialOffers';
import { useTranslation } from 'react-i18next';

const ArchieveOffers = () => {
  const { offers } = useContext(OffersContext);
  const { t } = useTranslation();

  return (
    <Container style={{ marginTop: '3rem' }}>
      <SpecialOffers
        offers={offers?.filter((offer) => offer.archieve)}
        title={t('Archieved Offers')}
        carouselTitle={t('ARCHIVES')}
      />
    </Container>
  );
};

export default ArchieveOffers;
