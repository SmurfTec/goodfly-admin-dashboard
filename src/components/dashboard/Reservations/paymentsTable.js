import {
  Button,
  Paper,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Skeleton,
  useTheme,
} from '@material-ui/core';
import { ReservationsContext } from 'Contexts/ReservationsContext';
import { useToggleInput } from 'hooks';
import React, { useContext, useMemo, useState } from 'react';
import v4 from 'uuid/dist/v4';
import PaymentDetailsDialog from './PaymentDetailsDialog';
import { useTranslation } from 'react-i18next';

const PaymentsTable = ({
  classes,
  data,
  purchaseId,
  purchaseAmounts,
  noDetails = false,
}) => {
  const theme = useTheme();
  const [isDialogOpen, toggleDialogOpen] = useToggleInput(false);
  const [currentPayment, setCurrentPayment] = useState();
  const { makePayment } = useContext(ReservationsContext);
  const { t } = useTranslation();

  const handlePayment = (updatedPayment) => {
    makePayment(purchaseId, currentPayment._id, updatedPayment);
    toggleDialogOpen();
  };

  const handleClick = (payment) => {
    setCurrentPayment(payment);
    toggleDialogOpen();
  };

  const info = useMemo(() => {
    if (!data?.length) return [0, 0, 0];

    let totalAmount = data;
  }, [data]);

  return (
    <>
      <h1>{t('Payments')}</h1>
      <TableContainer component={Paper} className={classes.table}>
        <Table sx={{ minWidth: 750 }} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell>Reference</TableCell>
              <TableCell align='right'>{t('Deadline')}</TableCell>
              <TableCell align='right'>{t('Status')} </TableCell>
              <TableCell align='right'>{t('Payment Date')} </TableCell>
              <TableCell align='right'>{t('Payroll amount')}</TableCell>
              <TableCell align='right'>{t('Payment means')}</TableCell>
              <TableCell align='right'>{t('Actions')}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data
              ? data.map((item, index) => (
                  <TableRow key={v4()}>
                    <TableCell component='th' scope='row'>
                      {item._id}
                    </TableCell>
                    <TableCell align='right'>
                      {new Date(item.deadline).toLocaleDateString()}
                    </TableCell>
                    <TableCell
                      align='right'
                      style={{
                        color: item.isPaid
                          ? theme.palette.success.main
                          : theme.palette.error.main,
                      }}
                    >
                      {item.isPaid ? t('paid') : t('not-paid')}
                    </TableCell>
                    <TableCell align='right'>
                      {item.isPaid
                        ? new Date(item.paidDate).toDateString()
                        : '---'}
                    </TableCell>
                    <TableCell align='right'>{item.amount}</TableCell>
                    <TableCell align='right'>
                      {item.paymentMethod ?? '---'}
                    </TableCell>
                    {!noDetails && (
                      <TableCell
                        align='right'
                        onClick={handleClick.bind(this, item)}
                      >
                        <Button>
                          {item.isPaid || item.paymentMethod === 'cash'
                            ? t('DETAILS')
                            : t('VALIDATE')}
                        </Button>
                      </TableCell>
                    )}
                  </TableRow>
                ))
              : Array(5)
                  .fill()
                  .map((el) => (
                    <TableRow key={v4()}>
                      <TableCell component='th' scope='row'>
                        <Skeleton />
                      </TableCell>
                      <TableCell align='right'>
                        <Skeleton />
                      </TableCell>
                      <TableCell align='right'>
                        <Skeleton />
                      </TableCell>
                      <TableCell align='right'>
                        <Skeleton />
                      </TableCell>
                      <TableCell align='right'>
                        <Skeleton />
                      </TableCell>
                      <TableCell align='right'>
                        <Skeleton />
                      </TableCell>
                      <TableCell align='right'>
                        <Skeleton />
                      </TableCell>
                    </TableRow>
                  ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'right',
          alignItems: 'center',
        }}
      >
        <Box
          style={{
            backgroundColor: 'white',
            minHeight: '10rem',
            width: '18rem',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '1rem',
          }}
        >
          <Box>
            <Typography variant='h5' m={1}>
              {t('Total Reservations')}
            </Typography>
            <Typography variant='h5' m={1}>
              {t('Total Paye')}
            </Typography>
            <Typography variant='h5' m={1}>
              {t('Stay paid')}
            </Typography>
          </Box>
          <Box>
            <Typography variant='h5' m={1}>
              €{purchaseAmounts[0]}
            </Typography>
            <Typography variant='h5' m={1}>
              €{purchaseAmounts[1]}
            </Typography>
            <Typography variant='h5' m={1}>
              €{purchaseAmounts[0] - purchaseAmounts[1]}
            </Typography>
          </Box>
        </Box>
      </Box>
      <PaymentDetailsDialog
        classes={classes}
        open={isDialogOpen}
        toggleDialog={toggleDialogOpen}
        payment={currentPayment}
        handleSuccess={handlePayment}
      />
    </>
  );
};

export default PaymentsTable;
