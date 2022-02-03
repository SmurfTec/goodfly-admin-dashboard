import {
  Avatar,
  Grid,
  ListItem,
  ListItemIcon,
  Box,
  ListItemText,
} from '@material-ui/core';
import clsx from 'clsx';
import React, { useMemo } from 'react';

const ChatMsg = ({ message, classes, activeChat, user }) => {
  const isMyMessage = useMemo(() => {
    if (!message || !user) return false;

    let condition;
    if (message.senderUser) {
      condition = message.senderUser._id === user._id;
    } else {
      condition = message.sender === 'goodfly';
    }
    return condition;
  }, [message, user]);

  return (
    <ListItem component={Box} className={classes.messageBox}>
      {message.sender !== 'goodfly' && (
        <ListItemIcon>
          <Avatar
            alt={activeChat?.visitor?.fullName}
            src={
              activeChat?.visitor?.photo ||
              `https://ui-avatars.com/api/?rounded=true&name=${activeChat.visitor.fullName
                .split(' ')
                .join('+')}`
            }
            style={{
              height: 50,
              width: 50,
            }}
          />
        </ListItemIcon>
      )}
      {isMyMessage === false && (
        <ListItemIcon>
          <Avatar
            alt={message.senderUser?.fullName}
            src={
              message.senderUser?.photo ||
              `https://ui-avatars.com/api/?rounded=true&name=${message.senderUser?.fullName
                ?.split(' ')
                ?.join('+')}`
            }
            style={{
              height: 50,
              width: 50,
            }}
          />
        </ListItemIcon>
      )}
      <Grid
        container
        className={classes.message}
        className={clsx(classes.message, {
          // classes.drawer is applied always
          [classes.myMessage]: isMyMessage === true, // classes.drawerOpen is applied always, bool = true
          [classes.otherMessage]: message.sender !== 'goodfly', // you can also use boolean variable
        })}
      >
        <Grid item xs={12}>
          <ListItemText
            align={isMyMessage === true ? 'right' : 'left'}
            primary={message.text}
          ></ListItemText>
        </Grid>
        <Grid item xs={12}>
          <ListItemText
            align={isMyMessage === true ? 'right' : 'left'}
            secondary={new Date(message.createdAt).toLocaleString()}
          ></ListItemText>
        </Grid>
      </Grid>
      {isMyMessage === true && (
        <ListItemIcon>
          <Avatar
            alt='Remy Sharp'
            src={
              user?.photo ||
              `https://ui-avatars.com/api/?rounded=true&name=${user?.fullName
                .split(' ')
                .join('+')}`
            }
            style={{
              height: 50,
              width: 50,
            }}
          />
        </ListItemIcon>
      )}
    </ListItem>
  );
};

export default ChatMsg;
