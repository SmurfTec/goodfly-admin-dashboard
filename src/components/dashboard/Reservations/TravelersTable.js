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
  Skeleton,
} from '@material-ui/core';
import React from 'react';
import { useTranslation } from 'react-i18next';
import v4 from 'uuid/dist/v4';

const TravelersTable = ({ classes, data }) => {
  const { t } = useTranslation();

  return (
    <>
      <h1>{t('Travelers')}</h1>
      <TableContainer component={Paper} className={classes.table}>
        <Table sx={{ minWidth: 750 }} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell align='right'>{t('First Name')}</TableCell>
              <TableCell align='right'>{t('Last Name')} </TableCell>
              <TableCell align='right'>{t('Date of Birth')} </TableCell>
              <TableCell align='right'>{t('Email')}</TableCell>
              <TableCell align='right'>{t('Passport No')}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data
              ? data.map((item, index) => (
                  <TableRow key={v4()}>
                    <TableCell align='right' component='th' scope='row'>
                      {item.firstName}
                    </TableCell>
                    <TableCell align='right' component='th' scope='row'>
                      {item.lastName}
                    </TableCell>
                    <TableCell align='right' component='th' scope='row'>
                      {item.dateOfBirth}
                    </TableCell>
                    <TableCell align='right' component='th' scope='row'>
                      {item.email}
                    </TableCell>
                    <TableCell align='right' component='th' scope='row'>
                      {item.passportNumber}
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
    </>
  );
};

export default TravelersTable;
