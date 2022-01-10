import { makeStyles } from '@material-ui/styles';
import {
  Box,
  Grid,
  CardMedia,
  Typography,
  Skeleton,
  Tabs,
  Tab,
} from '@material-ui/core';
import React from 'react';
import { TabPanel, a11yProps } from '../../common/TabPanel';
import FormalitiesTab from './FormalitiesTab';
import StagesTab from './StagesTab';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles((theme) => ({
  main: {
    backgroundColor: '#f2f2f2',
    minHeight: '75vh',
    borderRadius: '0.5rem',
    padding: '0.1rem',
    margin: '0.7rem 1rem 2rem',
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

const OfferView = ({ offer }) => {
  const classes = useStyles();

  const [tabValue, setTabValue] = React.useState(0);
  const { t } = useTranslation();

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
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
                {offer.startingDate
                  ? new Date(offer.startingDate).toDateString()
                  : t('Open Offer')}
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
            <Tab label={t('JOURNEY')} {...a11yProps(0)} />
            <Tab label={t('FORMALITIES')} {...a11yProps(1)} />
          </Tabs>
        </Box>
        <Box className={classes.options2}>
          <TabPanel value={tabValue} index={0}>
            <StagesTab stages={offer?.stages} />
          </TabPanel>
          <TabPanel value={tabValue} index={1}>
            <FormalitiesTab formality={offer?.formality} />
          </TabPanel>
        </Box>
      </Box>
    </Box>
  );
};

export default OfferView;
