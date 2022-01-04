import {
  Avatar,
  Grid,
  ListItem,
  ListItemIcon,
  Box,
  ListItemText,
} from '@material-ui/core';
import clsx from 'clsx';
import React from 'react';

const ChatMsg = ({ message, classes, activeChat, user }) => {
  return (
    <React.Fragment key={message._id}>
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
        <Grid
          container
          className={classes.message}
          className={clsx(classes.message, {
            // classes.drawer is applied always
            [classes.myMessage]: message.sender === 'goodfly', // classes.drawerOpen is applied always, bool = true
            [classes.otherMessage]: message.sender !== 'goodfly', // you can also use boolean variable
          })}
        >
          <Grid item xs={12}>
            <ListItemText
              align={message.sender === 'goodfly' ? 'right' : 'left'}
              primary={message.text}
            ></ListItemText>
          </Grid>
          <Grid item xs={12}>
            <ListItemText
              align={message.sender === 'goodfly' ? 'right' : 'left'}
              secondary={new Date(message.createdAt).toLocaleString()}
            ></ListItemText>
          </Grid>
        </Grid>
        {message.sender === 'goodfly' && (
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
    </React.Fragment>
  );
};

export default ChatMsg;
