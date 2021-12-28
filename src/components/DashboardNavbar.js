import { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import {
  AppBar,
  Box,
  Hidden,
  IconButton,
  Toolbar,
  Typography,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import PersonIcon from '@material-ui/icons/Person';
import { AuthContext } from 'Contexts/AuthContext';
import NotificationsPopover from './dashboard/notify/NotificationsPopover';
import AccessTimeIcon from '@material-ui/icons/AccessTime';

const Clock = () => {
  const [time, setTime] = useState([
    new Date()
      .toLocaleTimeString('en-US', { timeZone: 'Europe/Paris' })
      .split(' ')[0],
    new Date()
      .toLocaleTimeString('en-US', { timeZone: 'Asia/Riyadh' })
      .split(' ')[0],
  ]);

  // * Change Time after 60 Seconds
  useEffect(() => {
    const timeIntervel = setInterval(() => {
      let parisTime = new Date()
        .toLocaleTimeString('en-US', { timeZone: 'Europe/Paris' })
        .split(' ')[0];
      let MeccaTime = new Date()
        .toLocaleTimeString('en-US', { timeZone: 'Asia/Riyadh' })
        .split(' ')[0];
      setTime([parisTime, MeccaTime]);
    }, 1000);

    return () => clearInterval(timeIntervel);
  }, []);
  return (
    <Box
      style={{
        backgroundColor: '#666666',
        // padding: ,
        color: '#fff',
        /* position: absolute; */
        width: 'fit-content',
        borderRadius: 10,
        minWidth: 130,
        textAlign: 'center',
        marginLeft: 'auto',
        position: 'relative',
      }}
    >
      <AccessTimeIcon
        style={{ position: 'absolute', right: '10px' }}
      />
      <Typography variant='h6' gutterBottom>
        Paris
      </Typography>
      <Typography variant='h4' gutterBottom>
        {time[0]}
      </Typography>
      <Typography variant='h6' gutterBottom>
        Mecca
      </Typography>
      <Typography variant='h4' gutterBottom>
        {time[1]}
      </Typography>
    </Box>
  );
};
const DashboardNavbar = ({ onMobileNavOpen, ...rest }) => {
  const { user } = useContext(AuthContext);

  return (
    <AppBar elevation={0} {...rest}>
      <Toolbar
        style={{
          backgroundColor: '#f2f2f2',
          color: '#808080',
        }}
      >
        <Box sx={{ flexGrow: 1, maxWidth: 256 }} />
        <Box
          display='flex'
          justifyContent='space-around'
          alignItems='center'
        >
          <PersonIcon />
          <Box display='flex' columnGap={1}>
            <Typography variant='h5'>{user.role}</Typography>
            <Typography variant='h5'>{user.fullName}</Typography>
          </Box>
        </Box>
        <Box
          style={{
            marginLeft: 'auto',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <NotificationsPopover />
          <Hidden mdDown>
            <Typography>{new Date().toDateString()}</Typography>
          </Hidden>
          <Hidden mdUp>
            <IconButton
              color='inherit'
              onClick={onMobileNavOpen}
              size='large'
            >
              <MenuIcon />
            </IconButton>
          </Hidden>
        </Box>
      </Toolbar>
      <Box
        style={{
          backgroundColor: 'white',
          border: '1px solid white',
        }}
      >
        <Clock />
      </Box>
    </AppBar>
  );
};

DashboardNavbar.propTypes = {
  onMobileNavOpen: PropTypes.func,
};

export default DashboardNavbar;
