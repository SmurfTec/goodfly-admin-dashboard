import React from 'react';
import cx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';

// import Carousel from 'react-material-ui-carousel';

import {
  Avatar,
  Card,
  CardMedia,
  Grid,
  Tab,
  Tabs,
  Typography,
} from '@material-ui/core';

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

const images = [
  {
    id: 1,
    image:
      'https://source.unsplash.com/random/300x200?sig=${Math.random()}',
  },
  {
    id: 2,
    image: 'https://picsum.photos/200/300?random=2',
  },
  {
    id: 3,
    image: 'https://picsum.photos/200/300?random=2',
  },
];

const useStyles = makeStyles(() => ({
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '3rem',
  },
  main: {
    backgroundColor: '#f2f2f2',
    minHeight: '75vh',
    borderRadius: '0.5rem',
    padding: '0.1rem',
    margin: '0.7rem 2rem 2rem',
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
  const [tabValue, setTabValue] = React.useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };
  return (
    <div style={{ marginTop: '3rem' }}>
      <Box className={classes.header}>
        {' '}
        <Button variant='outlined' className={classes.button}>
          {' '}
          Modify
        </Button>
        <Button
          variant='outlined'
          className={cx(classes.button, classes.delButton)}
        >
          {' '}
          Delete
        </Button>
        <Button variant='outlined' className={classes.button}>
          {' '}
          Archive
        </Button>
        <Button variant='outlined' className={classes.button}>
          {' '}
          Put Forward
        </Button>
      </Box>
      <Box className={classes.main}>
        <Grid container style={{ padding: '1rem 2rem 1rem' }}>
          <Grid
            sm={3}
            style={{ padding: '3rem', border: '1px solid black' }}
          >
            {/* <Carousel>
              {images.map((image, i) => (
                <Card style={{ maxWidth: '10rem' }}>
                  <CardMedia
                    style={{ height: '8rem' }}
                    image={image}
                    title='Contemplative Reptile'
                  />
                </Card>
              ))}
            </Carousel> */}
            <Avatar
              alt='Cindy Baker'
              src='/static/images/avatar/3.jpg'
              sx={{ width: 100, height: 100 }}
              style={{ marginTop: 15, margin: '1.5rem' }}
            />{' '}
          </Grid>
          <Grid
            sm={7}
            style={{ padding: '3rem', border: '1px solid black' }}
          >
            <Box className={classes.flexBetween}>
              <Typography variant='h3'>
                #01 Formule hajj 2020
              </Typography>
              <Typography variant='h4'>
                du 5 au 29 avril 2020
              </Typography>
            </Box>
            <Box mt={2}>
              <Typography variant='text'>
                Description Search for French expressions in the
                Description Search for French expressions in the
                French-English Linguee dictionary and in 1000000000
                translations.
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
              <Tab label='Farmalities' {...a11yProps(1)} />
            </Tabs>
          </Box>
          <Box className={classes.options2}>
            <TabPanel value={tabValue} index={0}>
              Item One
            </TabPanel>
            <TabPanel value={tabValue} index={1}>
              Item Two
            </TabPanel>
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default Offer;
