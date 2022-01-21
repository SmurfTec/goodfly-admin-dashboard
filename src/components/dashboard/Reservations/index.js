import React, { useState, useEffect, useContext } from 'react';
import { makeStyles } from '@material-ui/styles';
import SyncIcon from '@mui/icons-material/Sync';
import {
  Typography,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableContainer,
  TableCell,
  TableBody,
  Box,
  Button,
  TablePagination,
  TextField,
  Container,
  Skeleton,
} from '@material-ui/core';
import { Search as SearchIcon } from 'react-feather';
import v4 from 'uuid/dist/v4';
import { ReservationsContext } from 'Contexts/ReservationsContext';
import { Edit } from '@mui/icons-material';
import { useNavigate } from 'react-router';
import { daysBetween } from 'utils/dateMethods';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { useTextInput } from 'hooks';
import { formatDistanceToNow } from 'date-fns';
import { useTranslation } from 'react-i18next';

const styles = makeStyles(() => ({
  main: {
    backgroundColor: '#f2f2f2',
    minHeight: '20rem',
    borderRadius: '0.8rem',
    padding: '1rem',
    margin: '0.7rem 1.5rem 2rem',
  },
  table: {
    margin: ' 2rem 1rem 1rem',
    padding: '1rem',
    width: 'inherit',
  },
  textInput: {
    width: '80%',
    backgroundColor: '#fff',
    marginBottom: 7,
  },
}));

const filterButtons = [
  {
    text: 'In progress',
    status: 'green',
    color: 'green',
  },
  {
    text: 'To be verified',
    status: 'orange',
    color: 'orange',
  },
  {
    text: 'Archived',
    status: 'blue',
    color: 'blue',
  },
  {
    text: 'Black List',
    status: 'black',
    color: '#000',
  },
  {
    text: 'Before Deletion',
    status: 'grey',
    color: 'gray',
  },
  {
    text: 'Finalized',
    status: 'white',
    color: 'purple',
    // color: '#fff',
  },
  {
    text: 'Deleted',
    status: 'red',
    color: 'red',
  },
];

const FilterButton = ({ currentStatus, text, handleFilter, status, color }) => (
  <Button
    data-statusfilter={status}
    onClick={handleFilter}
    variant={`${currentStatus === status ? 'contained' : 'outlined'}`}
    style={{
      // color: `${color}`,
      // border: `1px solid ${color}`,
      minWidth: '8rem',
    }}
    sx={{
      // '&.MuiButton-root': {
      //   border: `2px black solid`,
      // },
      '&.MuiButton-contained': {
        color: '#fff',
        backgroundColor: color,
      },
      '&.MuiButton-outlined': {
        color: color,
        border: `1px solid ${color}`,
      },
    }}
  >
    {text}
  </Button>
);

const Reservations = ({ isSpiritual }) => {
  const { reservations, fetchReservations, loading } =
    useContext(ReservationsContext);
  const classes = styles();
  const [filter, setFilter] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchBy, handleSearchBy] = useTextInput('fullName');

  const [currentReservations, setCurrentReservations] = useState([]);

  const [currentStatus, setCurrentStatus] = useState('green');
  const [greenReseravtions, setGreenReseravtions] = useState([]);
  const [orangeReservations, setOrangeReservations] = useState([]);
  const [blueReservations, setBlueReservations] = useState([]);
  const [blackReservations, setBlackReservations] = useState([]);
  const [greyReservations, setGreyReservations] = useState([]);
  const [whiteReservations, setWhiteReservations] = useState([]);
  const [redReservations, setRedReservations] = useState([]);
  const { t } = useTranslation();

  const navigate = useNavigate();

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    rowsPerPage -
    Math.min(rowsPerPage, (reservations?.length || 0) - page * rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const handleSearch = (e) => {
    const data = e.target.value;
    setFilter(data);
    // console.log(filter);
  };
  //  filtered
  useEffect(() => {
    setCurrentReservations(
      reservations?.filter((el) => {
        let preCondition = false;

        if (!!isSpiritual === true)
          preCondition = el.trip?.category === 'spiritual';
        else {
          // console.log(el.trip.category)
          preCondition = !el.trip || el.trip.category !== 'spiritual';
        }

        let filterCondition = false;
        switch (searchBy) {
          case 'fullName':
            filterCondition = el.visitor?.fullName
              .toLowerCase()
              .includes(filter.toLowerCase());
            break;
          case 'email':
            filterCondition = el.visitor?.email
              .toLowerCase()
              .includes(filter.toLowerCase());
            break;
          case 'date':
            filterCondition = new Date(el.createdAt)
              .toLocaleDateString()
              .includes(filter);
            break;

          default:
            filterCondition =
              el.visitor?.fullName
                .toLowerCase()
                .indexOf(filter.toLowerCase()) !== -1;
            break;
        }

        return preCondition && filterCondition;
      }) || []
    );
  }, [filter]);

  useEffect(() => {
    setCurrentReservations(
      reservations?.filter((el) => {
        let preCondition = false;

        if (!!isSpiritual === true)
          preCondition = el.trip?.category === 'spiritual';
        else {
          // console.log(el.trip.category)
          preCondition = !el.trip || el.trip.category !== 'spiritual';
        }

        return preCondition;
      }) || []
    );

    const nonPaidStatuses = [
      'pre-reservation',
      'validated',
      'schedule-inProgress',
    ];

    try {
      const greenOrangeReservations =
        reservations?.filter((el) => nonPaidStatuses.includes(el.status)) || [];

      console.log(`greenOrangeReservations`, greenOrangeReservations);
      // * Reservations which have more than 8 weeks till departure date
      // * Fall in green category
      const greenReseravtionsNew =
        greenOrangeReservations?.filter((el) => {
          // * Reservations for open offers fall in this category also
          if (!el.departureDate && !el.returnDate) return true;
          // const departureDate = new Date(el.departureDate);
          const departureDate = new Date(
            el.departureDate ||
              el.trip.startingDate ||
              el.customTrip.startingDate
          );
          const currentDate = new Date();

          // * 8 Weeks after departure date = > 48 days
          return daysBetween(departureDate, currentDate) > 48;
        }) || [];

      const orangeReservationsNew =
        greenOrangeReservations?.filter((el) => {
          // * Reservations for open offers fall in this category also
          if (!el.departureDate && !el.returnDate) return true;

          const departureDate = new Date(
            el.departureDate ||
              el.trip.startingDate ||
              el.customTrip.startingDate
          );
          const currentDate = new Date();

          // * 8 Weeks before departure date =  <= 48 days
          const daysLeft = daysBetween(departureDate, currentDate);
          console.log(`departureDate`, departureDate);
          console.log(`daysLeft`, daysLeft);
          return daysLeft <= 48 && daysLeft > 42;
        }) || [];

      // * Those reservations , which got archieved since 6 weeks
      // * till 4 weeks , after that they will move to black list
      const blueReservationsNew =
        reservations?.filter((el) => {
          const departureDate = new Date(
            // el.trip ? el.trip.startingDate : el.customTrip.startingDate
            el.departureDate
          );
          const currentDate = new Date();

          // * Till 4 Weeks from  departure date =  > 28 days
          // * If someone reserves at 5 weeks , maybe thay NOT archieved yet
          // * So thats why I put 2nd condition
          return (
            (el.status === 'archived' || nonPaidStatuses.includes(el.status)) &&
            daysBetween(departureDate, currentDate) >= 28 &&
            daysBetween(departureDate, currentDate) <= 42
          );
        }) || [];

      // * Those reservations , which arrive 4 weeks before departure date
      // * till 2 weeks , after that they move to red List
      // * OR is archived since 6 weeks and still not recovered

      // console.log(`reservations?.length`, reservations?.length);
      const blackReservationsNew =
        reservations?.filter((el) => {
          const departureDate = new Date(
            // el.trip ? el.trip.startingDate : el.customTrip.startingDate
            el.departureDate
          );
          const currentDate = new Date();

          // * Till 2 Weeks from  departure date =  > 14 days
          // * If someone reserves at 5 weeks , maybe thay NOT archieved yet
          // * So thats why I put 2nd condition

          return (
            (el.status === 'archived' || nonPaidStatuses.includes(el.status)) &&
            daysBetween(departureDate, currentDate) < 28 &&
            daysBetween(departureDate, currentDate) > 14
          );
        }) || [];

      // ! Unrecoverable Reservations (status 'cancelled')
      // ! Either cancelled by staffer , or black reservations with less than 2 weeks
      // * Note : Reservations status will change automatically from backend
      // * When 2 weeks left ....
      const redReservationsNew =
        reservations?.filter((el) => el.status === 'cancelled') || [];

      // * Cancellation Requests by client
      const greyReservationsNew =
        reservations?.filter((el) => el.status === 'cancellation-request') ||
        [];

      // * Reservations paid / Finalized
      const whiteReservationsNew =
        reservations?.filter((el) => el.status === 'reservation-paid') || [];

      setGreenReseravtions(greenReseravtionsNew);
      setOrangeReservations(orangeReservationsNew);
      setBlueReservations(blueReservationsNew);
      setBlackReservations(blackReservationsNew);
      setGreyReservations(greyReservationsNew);
      setWhiteReservations(whiteReservationsNew);
      setRedReservations(redReservationsNew);
    } catch (err) {
      console.log(`err`, err);
    }
  }, [reservations, isSpiritual]);

  useEffect(() => {
    switch (currentStatus) {
      case 'green':
        setCurrentReservations(greenReseravtions);
        break;

      case 'orange':
        setCurrentReservations(orangeReservations);
        break;

      case 'blue':
        setCurrentReservations(blueReservations);
        break;

      case 'black':
        setCurrentReservations(blackReservations);
        break;

      case 'grey':
        setCurrentReservations(greyReservations);
        break;

      case 'white':
        setCurrentReservations(whiteReservations);
        break;
      case 'red':
        setCurrentReservations(redReservations);
        break;

      default:
        break;
    }
  }, [
    currentStatus,
    greenReseravtions,
    orangeReservations,
    blueReservations,
    blackReservations,
    greyReservations,
    whiteReservations,
    redReservations,
  ]);

  const handleClick = (id) => {
    navigate(`/app/reservations/${id}`);
    // navigate(`${id}`);
  };

  const filterReservations = (e) => {
    const { statusfilter } = e.currentTarget.dataset;
    // console.log(`statusfilter`, statusfilter);
    setCurrentStatus(statusfilter);
  };

  return (
    <Container>
      <Typography variant='h4' m={2}>
        {t('Reservation Management')}
      </Typography>
      <Box
        mt={3}
        mb={0}
        style={{
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 20,
        }}
      >
        {filterButtons.map((btn) => (
          <FilterButton
            key={v4()}
            currentStatus={currentStatus}
            text={t(btn.text.toUpperCase())}
            handleFilter={filterReservations}
            status={btn.status}
            color={btn.color}
          />
        ))}
      </Box>
      <Box className={classes.main}>
        <Box
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <Button
            onClick={fetchReservations}
            variant='contained'
            color='primary'
            endIcon={<SyncIcon />}
            size='small'
            sx={{ marginRight: 'auto' }}
          >
            {t('FETCH')}
          </Button>
          <Box
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 15,
            }}
          >
            <Typography variant='h5'>{t('Search By')}</Typography>
            <FormControl component='fieldset' size='small'>
              <RadioGroup
                row
                aria-label='gender'
                name='row-radio-buttons-group'
                value={searchBy}
                onChange={(e) => {
                  setFilter('');
                  handleSearchBy(e);
                }}
              >
                <FormControlLabel
                  value='fullName'
                  control={<Radio size='small' />}
                  label={t('fullName')}
                />
                <FormControlLabel
                  value='email'
                  control={<Radio size='small' />}
                  label={t('Email')}
                />
                <FormControlLabel
                  value='date'
                  control={<Radio size='small' />}
                  label={t('Date')}
                />
              </RadioGroup>
            </FormControl>
          </Box>

          <SearchIcon style={{ margin: '0px 3px 0px' }} />
          <TextField
            hiddenLabel
            id='filled-hidden-label-small'
            placeholder={`${t('Search By')} ${t(searchBy)}`}
            size='small'
            style={{ margin: '0px 5px 0px', width: '30%' }}
            className={classes.textInput}
            value={filter}
            onChange={handleSearch}
          />
        </Box>

        {/*  TABLE  */}

        <TableContainer component={Paper} className={classes.table}>
          <Table sx={{ minWidth: 650 }} aria-label='simple table'>
            <TableHead>
              <TableRow>
                <TableCell>{t('Ref Reservation')}</TableCell>
                <TableCell align='center'>{t('reservation date')}</TableCell>
                <TableCell align='center'>{t('Status')}</TableCell>
                <TableCell align='center'>{t('Clients')}</TableCell>
                <TableCell align='center'>{t('Emails')}</TableCell>
                <TableCell align='center'>{t('Telephone')}</TableCell>
                {currentStatus === 'green' && (
                  <TableCell align='center'>{t('Actions')}</TableCell>
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {!loading
                ? currentReservations
                    ?.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                    .map((purchase) => (
                      <TableRow key={v4()}>
                        <TableCell component='th' scope='row'>
                          {/* TODO- Purchase Reference */}
                          {purchase._id.slice(5)}
                        </TableCell>
                        <TableCell align='center'>
                          {/* {formatDistanceToNow(new Date(purchase.createdAt))} */}
                          {new Date(purchase.createdAt).toLocaleDateString()}
                        </TableCell>
                        <TableCell align='center'>{purchase.status}</TableCell>
                        <TableCell align='center'>
                          {purchase.trip ? (
                            <>
                              {purchase.visitor
                                ? purchase.visitor.firstName
                                : 'Visitor Deleted'}
                            </>
                          ) : (
                            // purchase.travelers?.map((traveler) => (
                            //   <React.Fragment key={traveler._id}>
                            //     {' '}
                            //     {`${traveler.firstName} ${traveler.lastName}`}{' '}
                            //     <br />{' '}
                            //   </React.Fragment>
                            // ))
                            <>
                              {purchase?.customTrip?.fullName ||
                                purchase?.visitor?.fullName}
                            </>
                          )}
                        </TableCell>
                        <TableCell align='center'>
                          {purchase.trip ? (
                            <>{purchase?.visitor?.email}</>
                          ) : (
                            <> {purchase.email} </>
                          )}
                        </TableCell>
                        <TableCell align='center'>
                          {purchase.trip ? (
                            <>{purchase?.visitor?.telephoneNumber}</>
                          ) : (
                            <> {purchase.phone} </>
                          )}
                        </TableCell>

                        <TableCell align='center'>
                          <Button
                            endIcon={<Edit />}
                            onClick={handleClick.bind(this, purchase._id)}
                          >
                            {t(currentStatus === 'green' ? 'EDIT' : 'DETAILS')}
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                : [1, 2, 3, 4, 5].map(() => (
                    <TableRow key={v4()}>
                      <TableCell component='th' scope='row'>
                        <Skeleton variant='rect' />
                      </TableCell>
                      <TableCell align='center'>
                        <Skeleton variant='rect' />
                      </TableCell>
                      <TableCell align='center'>
                        <Skeleton variant='rect' />
                      </TableCell>
                      <TableCell align='center'>
                        <Skeleton variant='rect' />
                      </TableCell>
                      <TableCell align='center'>
                        <Skeleton variant='rect' />
                      </TableCell>
                      <TableCell align='center'>
                        <Skeleton variant='rect' />
                      </TableCell>
                      <TableCell align='center'>
                        <Skeleton variant='rect' />
                      </TableCell>
                    </TableRow>
                  ))}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[5, 10, 20]}
            component='div'
            count={reservations?.length || 0}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>
      </Box>
    </Container>
  );
};

export default Reservations;
