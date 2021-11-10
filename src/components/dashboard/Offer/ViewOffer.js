import React, { useContext, useEffect, useState } from 'react';
import cx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';

import StagesTab from './StagesTab';
import FormalitiesTab from './FormalitiesTab';
import { Link } from 'react-router-dom';
// import Carousel from 'react-material-ui-carousel';

import {
  CardMedia,
  Container,
  Grid,
  Skeleton,
  Tab,
  Tabs,
  Typography,
} from '@material-ui/core';
import { useParams } from 'react-router';
import { OffersContext } from 'Contexts/OffersContext';
import useToggleInput from 'hooks/useToggleInput';

import { ConfirmDialog } from 'components/dashboard/Dialogs';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles(() => ({
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  main: {
    backgroundColor: '#f2f2f2',
    minHeight: '75vh',
    borderRadius: '0.5rem',
    padding: '0.1rem',
    margin: '0.7rem 1rem 2rem',
  },
  button: {
    minWidth: '8rem',
    marginRight: '1rem',
  },
  delButton: {
    border: '1px solid red',
    color: 'red',
  },
  flexBetween: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  Tabs: {
    '& .MuiTab-root': {
      backgroundColor: '#e6e6e6',
      color: '#808080',
    },
    '& .Mui-selected': {
      backgroundColor: '#fafafa',
      color: '#333333',
    },
  },
  options2: {
    backgroundColor: '#fff',
    minHeight: '20rem',
  },
}));

const Offer = () => {
  const classes = useStyles();

  const { getOfferById, offers, deleteTrip, archieveTrip } =
    useContext(OffersContext);
  const { id } = useParams();

  const [offer, setOffer] = useState();

  const [isDeleteOpen, toggleDeleteOpen] = useToggleInput(false);
  const [isArchieveOpen, toggleArchieveOpen] = useToggleInput(false);

  useEffect(() => {
    // TODO Uncomment this line
    setOffer(getOfferById(id));
  }, [id, offers]);

  const [tabValue, setTabValue] = React.useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleDelete = () => {
    deleteTrip(id);
    toggleDeleteOpen();
  };

  const handleArchieve = () => {
    archieveTrip(id);
    toggleArchieveOpen();
  };

  return (
    <Container style={{ marginTop: '3rem' }}>
      <Button variant='outlined' component={Link} to='/app/offers'>
        Back to offers
      </Button>
      <Box className={classes.header}>
        <Button
          variant='outlined'
          component={Link}
          to={`/app/offers/${id}/edit`}
          className={classes.button}
        >
          Modify
        </Button>
        <Button
          variant='outlined'
          className={cx(classes.button, classes.delButton)}
          onClick={toggleDeleteOpen}
        >
          Delete
        </Button>
        <Button
          variant='outlined'
          className={classes.button}
          onClick={toggleArchieveOpen}
        >
          Archive
        </Button>
        <Button variant='outlined' className={classes.button}>
          Put Forward
        </Button>
      </Box>
      <Box className={classes.main}>
        <Grid container style={{ padding: '1rem 2rem 1rem' }}>
          <Grid sm={3} style={{ padding: '1.5rem' }}>
            {offer ? (
              <CardMedia
                style={{ height: '8rem' }}
                image={offer.image}
                title='trip'
              />
            ) : (
              <Skeleton variant='rect' height={100} />
            )}
          </Grid>
          <Grid sm={9} style={{ padding: '1.5rem' }}>
            <Box className={classes.flexBetween}>
              {offer ? (
                <Typography variant='h3'>{offer.title}</Typography>
              ) : (
                <Skeleton variant='rect' width='80%' />
              )}
              {offer ? (
                <Typography variant='h4'>
                  {new Date(offer.startingDate).toDateString()}
                </Typography>
              ) : (
                <Skeleton variant='rect' width='80%' />
              )}
            </Box>
            <Box mt={2}>
              <Typography variant='text'>
                {offer ? (
                  offer.description
                ) : (
                  <Skeleton variant='rect' width='80%' />
                )}
              </Typography>
            </Box>
          </Grid>
        </Grid>
        <Box sx={{ width: '100%', padding: '1rem 2rem 1rem' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              aria-label='basic tabs example'
              variant='fullWidth'
              indicatorColor='primary'
              textColor='primary'
              centered
              className={classes.Tabs}
            >
              <Tab label='Journey' {...a11yProps(0)} />
              <Tab label='Formalities' {...a11yProps(1)} />
            </Tabs>
          </Box>
          <Box className={classes.options2}>
            <TabPanel value={tabValue} index={0}>
              <StagesTab stages={offer?.stages} />
            </TabPanel>
            <TabPanel value={tabValue} index={1}>
              <FormalitiesTab formalities={offer?.formalities} />
            </TabPanel>
          </Box>
        </Box>
      </Box>
      <ConfirmDialog
        open={isDeleteOpen}
        toggleDialog={toggleDeleteOpen}
        success={handleDelete}
        dialogTitle='Are you sure you want to Delete this trip ?'
      />
      <ConfirmDialog
        open={isArchieveOpen}
        toggleDialog={toggleArchieveOpen}
        success={handleArchieve}
        dialogTitle='Are you sure you want to Archieve this trip ?'
      />
    </Container>
  );
};

export default Offer;
