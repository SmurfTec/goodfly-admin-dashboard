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
import React, { useContext, useState } from 'react';
import v4 from 'uuid/dist/v4';
import PaymentDetailsDialog from './PaymentDetailsDialog';

const PaymentsTable = ({ classes, data, purchaseId }) => {
  const theme = useTheme();
  const [isDialogOpen, toggleDialogOpen] = useToggleInput(false);
  const [currentPayment, setCurrentPayment] = useState();
  const { makePayment } = useContext(ReservationsContext);

  const handlePayment = (updatedPayment) => {
    makePayment(purchaseId, currentPayment._id, updatedPayment);
    toggleDialogOpen();
  };

  const handleClick = (payment) => {
    setCurrentPayment(payment);
    toggleDialogOpen();
  };

  return (
    <>
      <TableContainer component={Paper} className={classes.table}>
        <Table sx={{ minWidth: 750 }} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell>Reference</TableCell>
              <TableCell align='right'>Deadline</TableCell>
              <TableCell align='right'>Status </TableCell>
              <TableCell align='right'>Payment Date </TableCell>
              <TableCell align='right'>Payroll amount</TableCell>
              <TableCell align='right'>Payment means</TableCell>
              <TableCell align='right'>Actions</TableCell>
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
                      {item.isPaid ? 'paid' : 'not-paid'}
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
                    <TableCell
                      align='right'
                      onClick={handleClick.bind(this, item)}
                    >
                      <Button>
                        {item.isPaid || item.paymentMethod === 'cash'
                          ? 'Details'
                          : 'Validate'}
                      </Button>
                    </TableCell>
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
              Total Reservations
            </Typography>
            <Typography variant='h5' m={1}>
              Total Paye
            </Typography>
            <Typography variant='h5' m={1}>
              Stay paid
            </Typography>
          </Box>
          <Box>
            <Typography variant='h5' m={1}>
              12000.00$
            </Typography>
            <Typography variant='h5' m={1}>
              6300.00$
            </Typography>
            <Typography variant='h5' m={1}>
              2100.00$
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
