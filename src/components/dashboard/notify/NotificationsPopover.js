import PropTypes from 'prop-types';
import { noCase } from 'change-case';
import { useContext, useEffect, useMemo, useRef, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import { Icon } from '@iconify/react';
import clockFill from '@iconify/icons-eva/clock-fill';
import doneAllFill from '@iconify/icons-eva/done-all-fill';

// material
import { alpha, useTheme } from '@material-ui/core/styles';
import {
  Box,
  List,
  Badge,
  Avatar,
  Tooltip,
  Divider,
  IconButton,
  Typography,
  ListItemText,
  ListSubheader,
  ListItemAvatar,
  ListItemButton,
} from '@material-ui/core';
// utils
// components
import Scrollbar from './Scrollbar';
import MenuPopover from './MenuPopover';
import { SocketContext } from 'Contexts/SocketContext';
import NotificationsIcon from '@material-ui/icons/NotificationsOutlined';
import { makeStyles } from '@material-ui/styles';

import { ShoppingBagOutlined } from '@material-ui/icons';
import FlightTakeoffIcon from '@mui/icons-material/Flight';

const useStyles = makeStyles((theme) => ({
  badge: {
    '& .MuiBadge-badge': {
      borderRadius: '50%',
      height: 25,
      width: 25,
    },
  },
}));
// ----------------------------------------------------------------------

// const NOTIFICATIONS = [
//   {
//     _id: faker.datatype.uuid(),
//     title: 'Your order is placed',
//     description: 'waiting for shipping',
//     avatar: null,
//     type: 'order_placed',
//     createdAt: set(new Date(), { hours: 10, minutes: 30 }),
//     isRead: true
//   },
// ];

const renderContent = (notification) => {
  const title = (
    <Typography variant='subtitle2'>
      {notification.title}
      <Typography
        component='span'
        variant='body2'
        sx={{ color: 'text.secondary' }}
      >
        &nbsp; {noCase(notification.description)}
      </Typography>
    </Typography>
  );

  if (notification.type === 'trip') {
    return {
      title,
    };
  }
  if (notification.type === 'order') {
    return {
      title,
    };
  }

  return {
    title,
  };
};

const NotificationItem = ({ notification }) => {
  const { title } = renderContent(notification);
  const theme = useTheme();

  return (
    <ListItemButton
      to={notification.link}
      disableGutters
      component={RouterLink}
      sx={{
        py: 1.5,
        px: 2.5,
        mt: '1px',
        ...(!notification.isRead && {
          bgcolor: 'action.selected',
        }),
      }}
    >
      <ListItemAvatar>
        <Avatar
          // className={classes.}
          sx={{ bgcolor: 'aliceblue' }}
        >
          {notification.type === 'trip' ? (
            <FlightTakeoffIcon style={{ color: theme.palette.primary.main }} />
          ) : (
            <ShoppingBagOutlined
              style={{ color: theme.palette.primary.main }}
            />
          )}
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={title}
        secondary={
          <Typography
            variant='caption'
            sx={{
              mt: 0.5,
              display: 'flex',
              alignItems: 'center',
              color: 'text.disabled',
            }}
          >
            <Box
              component={Icon}
              icon={clockFill}
              sx={{ mr: 0.5, width: 16, height: 16 }}
            />
            {formatDistanceToNow(new Date(notification.createdAt))}
          </Typography>
        }
      />
    </ListItemButton>
  );
};

NotificationItem.propTypes = {
  notification: PropTypes.object.isRequired,
};

const NotificationsPopover = () => {
  const classes = useStyles();

  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);
  const { notifications, makeNotficationsAsRead } = useContext(SocketContext);
  const [localNotifications, setLocalNotifications] = useState([]);
  const totalUnRead = useMemo(() => {
    let unread = localNotifications.filter(
      (item) => item.isRead === false
    ).length;

    return unread;
  }, [localNotifications]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    console.log(`notifications`, notifications);
    if (!notifications) return;
    setLocalNotifications(notifications);
  }, [notifications]);

  const handleMarkAllAsRead = () => {
    setLocalNotifications(
      localNotifications.map((el) => ({
        ...el,
        isRead: true,
      }))
    );
    makeNotficationsAsRead();
  };

  return (
    <>
      <IconButton
        ref={anchorRef}
        size='large'
        color={open ? 'primary' : 'default'}
        onClick={handleOpen}
        sx={{
          ...(open && {
            bgcolor: (theme) =>
              alpha(
                theme.palette.primary.main,
                theme.palette.action.focusOpacity
              ),
          }),
        }}
      >
        <Badge
          badgeContent={totalUnRead}
          className={classes.badge}
          // style={{ border: '2px solid red' }}
          color='primary'
        >
          {/* <Icon icon={bellFill} /> */}
          <NotificationsIcon width={20} height={20} />
        </Badge>
      </IconButton>

      <MenuPopover
        open={open}
        onClose={handleClose}
        anchorEl={anchorRef.current}
        sx={{ width: 360 }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            py: 2,
            px: 2.5,
          }}
        >
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant='subtitle1'>Notifications</Typography>
            <Typography variant='body2' sx={{ color: 'text.secondary' }}>
              You have {totalUnRead} unread messages
            </Typography>
          </Box>

          {totalUnRead > 0 && (
            <Tooltip title=' Mark all as read'>
              <IconButton color='primary' onClick={handleMarkAllAsRead}>
                <Icon icon={doneAllFill} width={20} height={20} />
              </IconButton>
            </Tooltip>
          )}
        </Box>

        <Divider />

        <Scrollbar sx={{ height: { xs: 340, sm: 'auto' } }}>
          <List
            disablePadding
            subheader={
              <ListSubheader
                disableSticky
                sx={{ py: 1, px: 2.5, typography: 'overline' }}
              >
                New
              </ListSubheader>
            }
          >
            {localNotifications.map(
              (notification) =>
                notification.isRead === false && (
                  <NotificationItem
                    key={notification._id}
                    notification={notification}
                  />
                )
            )}
          </List>

          <List
            disablePadding
            subheader={
              <ListSubheader
                disableSticky
                sx={{ py: 1, px: 2.5, typography: 'overline' }}
              >
                Before that
              </ListSubheader>
            }
          >
            {localNotifications.map(
              (notification) =>
                notification.isRead === true && (
                  <NotificationItem
                    key={notification._id}
                    notification={notification}
                  />
                )
            )}
          </List>
        </Scrollbar>
      </MenuPopover>
    </>
  );
};

export default NotificationsPopover;
