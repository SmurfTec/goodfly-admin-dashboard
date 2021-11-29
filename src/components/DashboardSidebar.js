import { useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Drawer,
  Hidden,
  Typography,
} from '@material-ui/core';
import {
  LogOut as LogoutIcon,
} from 'react-feather';
import { makeStyles } from '@material-ui/styles';
// import logo from 'Assets/img/airplane.svg';
import NavItem from './NavItem';
import SidebarContent from './SidebarContent';
import { AuthContext } from 'Contexts/AuthContext';
import logo from 'Assets/img/logo.png';
import { useNavigate } from 'react-router';

// import SidebarContent2 from './SidebarContent2';

const useStyles = makeStyles(() => ({
  Drawer: {
    '& .MuiDrawer-paper': {
      top: 0,
    },
  },
}));

const DashboardSidebar = ({ onMobileClose, openMobile }) => {
  const location = useLocation();
  const { user } = useContext(AuthContext);
  const classes = useStyles();
  const navigate = useNavigate();

  useEffect(() => {
    if (openMobile && onMobileClose) {
      // onMobileClose();
    }
  }, [location.pathname, openMobile, onMobileClose]);
  const homePage = () => {
    navigate('/app');
  };
  const content = (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
      }}
    >
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column',
          p: 1,
          mb: 1,
        }}
      >
        <Typography
          color='textPrimary'
          variant='h5'
          style={{ marginBottom: '1rem' }}
        >
          Administration Interface
        </Typography>
        <img
          src={logo}
          style={{
            width: 160,
            cursor: 'pointer',
          }}
          onClick={homePage}
        />
      </Box>
      {/* <Divider /> */}
      <Typography
        variant='h5'
        style={{
          width: '100%',
          backgroundColor: 'rgb(77, 77, 77)',
          color: '#fff',
          padding: 15,
          textAlign: 'center',
        }}
      >
        Tableau de bord
      </Typography>

      <Box sx={{ padding: '5px' }} mt={1}>
        <SidebarContent />

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            mt: 1,
          }}
        >
          <Avatar
            alt='Cindy Baker'
            src={
              user.photo ? user.photo : '/static/images/avatar/3.jpg'
            }
            sx={{ width: 100, height: 100, borderRadius: '50%' }}
          />
          <NavItem
            href='/logout'
            key='Logout'
            title='Logout'
            icon={LogoutIcon}
          />
        </Box>
      </Box>
    </Box>
  );

  return (
    <>
      <Hidden mdUp>
        <Drawer
          anchor='left'
          onClose={onMobileClose}
          open={openMobile}
          variant='temporary'
          PaperProps={{
            sx: {
              width: 300,
            },
          }}
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden mdDown>
        <Drawer
          anchor='left'
          open
          variant='persistent'
          PaperProps={{
            sx: {
              width: 256,
              top: 64,
              height: 'calc(100% - 64px)',
            },
          }}
          className={classes.Drawer}
        >
          {content}
        </Drawer>
      </Hidden>
    </>
  );
};

DashboardSidebar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool,
};

DashboardSidebar.defaultProps = {
  onMobileClose: () => {},
  openMobile: true,
};

export default DashboardSidebar;
