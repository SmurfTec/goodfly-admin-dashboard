import { useState,useContext } from 'react';
import PropTypes from 'prop-types';
import {
  AppBar,
  Badge,
  Box,
  Hidden,
  IconButton,
  Toolbar,
  Typography,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/NotificationsOutlined';
import PersonIcon from '@material-ui/icons/Person';
import { AuthContext } from 'Contexts/AuthContext';

const DashboardNavbar = ({ onMobileNavOpen, ...rest }) => {
  const [notifications] = useState([]);
  const { user} = useContext(AuthContext);

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
          <Typography variant='h5'>
            {user.role}
          </Typography>
          <Typography variant='h5'>
            {user.name}
          </Typography>
          </Box>
        </Box>
        <Box
          style={{
            marginLeft: 'auto',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Hidden mdDown>
            <IconButton color='inherit' size='large'>
              <Badge
                badgeContent={notifications.length}
                color='primary'
                variant='dot'
              >
                <NotificationsIcon />
              </Badge>
            </IconButton>
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
    </AppBar>
  );
};

DashboardNavbar.propTypes = {
  onMobileNavOpen: PropTypes.func,
};

export default DashboardNavbar;
