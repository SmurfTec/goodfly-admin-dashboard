import { useEffect } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Button,
  Divider,
  Drawer,
  Hidden,
  List,
  Typography,
} from '@material-ui/core';
import {
  AlertCircle as AlertCircleIcon,
  BarChart as BarChartIcon,
  Lock as LockIcon,
  Settings as SettingsIcon,
  ShoppingBag as ShoppingBagIcon,
  User as UserIcon,
  UserPlus as UserPlusIcon,
  Users as UsersIcon,
  LogOut as LogoutIcon,
  Bell as BellIcon,
  Edit2 as Edit2Icon,
  Columns as ColumnsIcon,
  CreditCard as CreditCardIcon,
  Briefcase as BriefCaseIcon,
  Bold as BoldIcon,
  Home as HomeIcon,
  AlignJustify as AlignJustifyIcon,
} from 'react-feather';
import { makeStyles } from '@material-ui/styles';
import logo from 'Assets/img/airplane.svg';

import NavItem from './NavItem';

const useStyles = makeStyles((theme) => ({
  Drawer: {
    '& .MuiDrawer-paper': {
      top: 0,
    },
  },
}));

const user = {
  avatar: '/static/images/avatars/avatar_6.png',
  jobTitle: 'Senior Developer',
  name: 'Katarina Smith',
};

const items = [
  {
    href: '/Accueil',
    icon: HomeIcon,
    title: 'Accueil',
  },
  {
    href: '/profile',
    icon: UserIcon,
    title: 'Mon proﬁl',
  },
  {
    href: '/notifications',
    icon: BellIcon,
    title: 'Notifications',
  },

  {
    href: '/clients',
    icon: UsersIcon,
    title: 'Gestion des clients',
  },
  {
    href: '/Offres',
    icon: Edit2Icon,
    title: 'Offres',
  },
  {
    href: '/  Inscriptions',
    icon: SettingsIcon,
    title: 'Inscriptions',
  },
  {
    href: '/Catégories',
    icon: ColumnsIcon,
    title: 'Catégories',
  },
  {
    href: '/Boutique',
    icon: ShoppingBagIcon,
    title: 'Boutique',
  },
  {
    href: '/Paiements',
    icon: CreditCardIcon,
    title: 'Paiements',
  },
  {
    href: '/blog',
    icon: BoldIcon,
    title: 'Gestion du blog',
  },
  {
    href: '/reviews',
    icon: AlignJustifyIcon,
    title: 'Avis & commentaires',
  },
  {
    href: '/staffer',
    icon: UserIcon,
    title: 'Gestion des staffers',
  },
];

const DashboardSidebar = ({ onMobileClose, openMobile }) => {
  const location = useLocation();
  const classes = useStyles();

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
  }, [location.pathname]);

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
          Interface d’administration
        </Typography>
        <Typography
          variant='h2'
          noWrap
          style={{
            cursor: 'pointer',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            minWidth: 160,
            fontWeight: 1000,
          }}
          color='primary'
          // onClick={() => history.push('/')}
        >
          GOODFLY
          <img
            src={logo}
            style={{ width: 40, height: 50 }}
            alt='logo'
          />
        </Typography>
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

      <Box sx={{ p: 2 }}>
        <List>
          {items.map((item) => (
            <NavItem
              href={item.href}
              key={item.title}
              title={item.title}
              icon={item.icon}
            />
          ))}
        </List>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            mt: 3,
          }}
        >
          <Avatar
            alt='Cindy Baker'
            src='/static/images/avatar/3.jpg'
            sx={{ width: 100, height: 100 }}
            style={{ marginTop: 15 }}
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
              width: 256,
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
