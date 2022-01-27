import React, { useState, useEffect, useContext } from 'react';
import { makeStyles } from '@material-ui/styles';

import {
  Typography,
  Box,
  Table,
  TableHead,
  TableRow,
  TableContainer,
  TableCell,
  TableBody,
  Button,
  TablePagination,
  TextField,
  Paper,
  Grid,
  CardMedia,
  IconButton,
} from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import Rating from '@material-ui/core/Rating';
import v4 from 'uuid/dist/v4';

import {
  Search as SearchIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
} from 'react-feather';
import { OffersContext } from 'Contexts/OffersContext';
import { useLocation, useNavigate, useParams } from 'react-router';
import Loading from 'pages/Loading';
import { Link } from 'react-router-dom';
import NotFound from '../../../pages/NotFound';

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const styles = makeStyles(() => ({
  main: {
    backgroundColor: '#f2f2f2',
    minHeight: '15rem',
    borderRadius: '0.8rem',
    padding: '0.1rem',
    margin: '2rem 1rem 2rem',
  },
  form: {
    margin: '1rem 0rem  3rem',
    // marginBottom: '1rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  topButtons: {
    color: '#8c8c8c',
    width: '12rem',
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
  '.MuiDialogContent-root': {
    backgroundColor: '#f2f2f2',
  },
  flexLeft: {
    display: 'flex',
    justifyContent: 'left',
    alignItems: 'center',
    margin: '0.5rem',
  },
  flexBetween: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: '0.5rem',
  },
  flexAround: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    margin: '0.5rem',
  },
}));

const OrganizedTrips = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const classes = styles();
  const { offerOrganizeds: offers, getOrganizedOfferByIndex } =
    useContext(OffersContext);
  const [filter, setFilter] = useState('');
  const [filteredItems, setFilteredItems] = useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [rating, setRating] = React.useState(2);

  const [rows, setRows] = useState([]);
  const [offer, setOffer] = useState();
  const [notFound, setNotFound] = useState();
  const [offerIndex, setOfferIndex] = useState(0);

  useEffect(() => {
    if (!offers) return;
    console.log('id', id);

    let newOffer = offers.find((el, idx) => {
      if (el._id === id) {
        setOfferIndex(idx);
        return true;
      }
      return false;
    });
    if (!newOffer) return setNotFound(true);

    setOffer(newOffer);
    setRows(newOffer.purchases);
  }, [offers, id]);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

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
    console.log(filter);
  };
  //  filtered
  useEffect(() => {
    if (!offer) return;
    setFilteredItems(
      offer.purchases.filter(
        (row) =>
          row.visitor?.fullName?.toLowerCase().indexOf(filter.toLowerCase()) !==
          -1
      )
    );
  }, [filter]);

  const handlenNext = () => {
    navigate(`/app/registration/${offers?.[offerIndex + 1]?._id}`);
  };

  const handlePrev = () => {
    navigate(`/app/registration/${offers?.[offerIndex - 1]?._id}`);
  };

  const handleRowClick = (e) => {
    const { visitorid } = e.currentTarget.dataset;
    navigate(`/app/customers/edit/${visitorid}`);
  };

  if (!offers || !offer) return <Loading noTitle />;

  if (notFound) return <NotFound />;

  return (
    <div>
      <Typography variant='h5' m={2}>
        {' '}
        Organized trips
      </Typography>
      <Box className={classes.main}>
        <Box className={classes.flexBetween}>
          <Box className={classes.flexLeft}>
            <Typography variant='h5' mr={5}>
              {offer.title}
            </Typography>
          </Box>
          <Box
            style={{
              display: 'flex',
              alignItems: 'center',
              margin: '1rem',
            }}
          >
            <IconButton onClick={handlePrev} disabled={offerIndex === 0}>
              <ChevronLeftIcon />
            </IconButton>
            <Divider
              style={{ margin: '0rem 0.4rem 0rem 0.4rem' }}
              orientation='vertical'
              flexItem
            />
            <IconButton
              onClick={handlenNext}
              disabled={offerIndex === offers.length - 1}
            >
              <ChevronRightIcon />
            </IconButton>
          </Box>
        </Box>
        <Box
          style={{
            backgroundColor: '#ffffff',
            margin: '0rem 1rem 1rem 1rem',
            borderRadius: '0.4rem',
            minHeight: '10rem',
          }}
        >
          <Grid
            container
            style={{
              padding: '0.5rem',
              minHeight: '10rem',
              margin: '0.5rem 0.5rem  1rem',
            }}
          >
            <Grid item xs={6} sm={3}>
              <Typography variant='h5' mt={1}>
                {new Date(offer.startingDate).toDateString()}
              </Typography>
              <Typography variant='h2' mt={1}>
                €{offer.price}
              </Typography>
              <Typography variant='text' mt={1}>
                {offer.description}
              </Typography>
            </Grid>
            <Grid item xs={6} sm={2}>
              <Typography variant='h5' mt={1}>
                {offer.stages?.[0].title}
              </Typography>
              <Typography variant='text' mt={1}>
                {offer.stages?.[0].description}
              </Typography>{' '}
            </Grid>
            <Grid item xs={6} sm={2}>
              <Box style={{ margin: '1rem' }}>
                {' '}
                <CardMedia
                  style={{ height: '8rem' }}
                  image={offer.stages?.[0].images?.[0]?.src}
                  title='trip'
                />
              </Box>
            </Grid>
            <Grid item xs={6} sm={5}>
              <Box
                style={{
                  backgroundColor: '#f2f2f2',
                  padding: '0.5rem',
                  margin: '0.5rem',
                }}
              >
                <Box className={classes.flexLeft}>
                  <Typography variant='h5'>
                    {' '}
                    {offer.stages?.[0]?.accodomodation?.name}
                  </Typography>
                  <Rating
                    name='simple-controlled'
                    value={rating}
                    onChange={(event, newValue) => {
                      setRating(newValue);
                    }}
                    disabled
                  />
                </Box>
                <Box className={classes.flexBetween}>
                  <CardMedia
                    style={{ height: '5rem', width: '5rem' }}
                    image={offer.stages?.[0]?.accodomodation?.images?.[0]?.src}
                    title='trip'
                  />
                  <Typography variant='text' style={{ width: '20rem' }}>
                    {offer.stages?.[0]?.accodomodation?.boardType}
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
        <Box
          style={{
            display: 'flex',
            justifyContent: 'right',
            alignItems: 'center',
            margin: '1rem',
          }}
        >
          <Button
            variant='outlined'
            style={{ marginRight: '0.5rem', minWidth: '7rem' }}
            component={Link}
            to={`/app/offers/${offer?._id}/edit`}
          >
            {' '}
            Modify
          </Button>
          {/* <Button
            component={Link}
            to={`/app/offers/${offer?._id}/edit`}
            variant='outlined'
            style={{ color: 'red', minWidth: '7rem' }}
          >
            {' '}
            Delete
          </Button> */}
        </Box>
      </Box>
      <Box className={classes.main} style={{ minHeight: '25rem' }}>
        <Box
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
            margin: '1rem',
          }}
        >
          <Typography variant='h5'> List of Travelers</Typography>
          <Box
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography variant='text' style={{ margin: '0px 3px 0px' }}>
              Search By Name
            </Typography>
            <SearchIcon style={{ margin: '0px 3px 0px' }} />
            <TextField
              hiddenLabel
              id='filled-hidden-label-small'
              placeholder='client name'
              size='small'
              style={{ width: '50%' }}
              className={classes.textInput}
              value={filter}
              onChange={handleSearch}
            />
          </Box>
        </Box>

        {/*  TABLE  */}

        <TableContainer component={Paper} className={classes.table}>
          <Table sx={{ minWidth: 650 }} aria-label='simple table'>
            <TableHead>
              <TableRow>
                <TableCell align='right'>firstName</TableCell>
                <TableCell align='right'>lastName</TableCell>
                <TableCell align='right'>dateOfBirth</TableCell>
                <TableCell align='right'>passportNumber</TableCell>
                <TableCell align='right'>email</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => (
                  <TableRow
                    key={v4()}
                    data-visitorid={row.visitor?._id}
                    hover
                    onClick={handleRowClick}
                  >
                    <TableCell component='th' scope='row'>
                      {row.visitor
                        ? row.visitor.firstName
                        : 'Visitor No Longer Exists'}
                    </TableCell>
                    <TableCell align='right'>
                      {row.visitor
                        ? row.visitor.lastName
                        : 'Visitor No Longer Exists'}
                    </TableCell>
                    <TableCell align='right'>
                      {row.visitor
                        ? new Date(row.visitor.dateOfBirth).toLocaleDateString()
                        : 'Visitor No Longer Exists'}
                    </TableCell>
                    <TableCell align='right'>
                      {row.visitor
                        ? row.visitor.passportNumber
                        : 'Visitor No Longer Exists'}
                    </TableCell>
                    <TableCell align='right'>
                      {row.visitor
                        ? row.visitor.email
                        : 'Visitor No Longer Exists'}
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
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>
      </Box>
    </div>
  );
};

export default OrganizedTrips;
