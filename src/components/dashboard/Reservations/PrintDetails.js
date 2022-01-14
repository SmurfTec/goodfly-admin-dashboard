import { Box, Typography, Paper } from '@material-ui/core';
import React from 'react';
import OfferView from '../Offer/OfferView';
import CustomerTripView from './CustomTripView';
import PaymentsTable from './paymentsTable';
import UserInfo from './UserInfo';

const PrintDetails = ({ reservation, classes, t }) => {
  return (
    <div>
      {reservation &&
        (reservation.trip ? (
          <OfferView offer={reservation.trip} noTabs />
        ) : (
          <CustomerTripView offer={reservation.customTrip} />
        ))}
      {reservation && !reservation.visitor && (
        <Typography variant='h3' style={{ width: '100%', marginTop: '3rem' }}>
          {t('Visitor No Longer Exists')}
        </Typography>
      )}
      <Box style={{ marginInline: '2rem' }}>
        {reservation?.visitor && (
          <>
            <Box className={classes.header}>
              <Typography variant='h4'>{t('Client Area')}</Typography>
              <div style={{ display: 'flex' }}>
                <Typography variant='h5' style={{ margin: '0px 10px 0px' }}>
                  {t('Number')}
                </Typography>
                <Paper
                  style={{
                    height: 25,
                    textAlign: 'right',
                    padding: 4,
                  }}
                >
                  {' '}
                  {reservation.visitor._id}
                </Paper>
              </div>

              <Box>
                <Typography variant='h5'>
                  <bold
                    style={{
                      fontSize: 28,
                      fontWeight: 'bold ',
                      fontStyle: 'italic',
                      margin: 5,
                    }}
                  >
                    {reservation.visitor.loyaltyPoints}
                  </bold>
                  Points
                </Typography>
              </Box>
            </Box>

            {reservation?.visitor && (
              <UserInfo
                classes={classes}
                reservationUser={reservation.visitor}
                isVisitor
                toPrint
              />
            )}
          </>
        )}
        <PaymentsTable
          noDetails
          purchaseAmounts={[
            reservation?.totalAmount || 0,
            reservation?.paidAmount || 0,
          ]}
          purchaseId={reservation?._id}
          data={reservation?.payments}
          classes={classes}
        />
      </Box>
    </div>
  );
};

export default PrintDetails;
