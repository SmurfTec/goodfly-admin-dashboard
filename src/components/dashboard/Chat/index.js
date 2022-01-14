import React, { useContext, useEffect, useMemo, useState } from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import SendIcon from '@material-ui/icons/Send';
import { Container, Skeleton, Typography } from '@material-ui/core';
import { SocketContext } from 'Contexts/SocketContext';
import v4 from 'uuid/dist/v4';
import clsx from 'clsx';
import { useTextInput } from 'hooks';
import useStyles from './styles';
import { useTheme } from '@material-ui/styles';
import ChatMsg from './ChatMsg';
import { useTranslation } from 'react-i18next';

const Chat = () => {
  const classes = useStyles();
  const theme = useTheme();
  const { chats, sendNewMessage, user, readAllMessages } =
    useContext(SocketContext);
  const [messageTxt, handleTxtChange, resetMessageTxt] = useTextInput('');
  const [searchVal, handleSearch] = useTextInput('');

  const [activeChat, setActiveChat] = useState();
  const { t } = useTranslation();

  useEffect(() => {
    if (!chats?.length) return;

    // * Update Active Chat (if any)
    if (activeChat)
      setActiveChat(chats.find((el) => el._id === activeChat._id));
    // setActiveChat(chats[0]);
  }, [chats]);

  useEffect(() => {
    const messagedContainer = document.getElementById('messageArea');
    messagedContainer.scrollTop = messagedContainer.scrollHeight;
  }, [activeChat?.messages]);

  const handleChatClick = (e) => {
    const { selected } = e.currentTarget.dataset;
    // console.log(`selected`, selected);
    let selectedChat = chats.find((el) => el._id === selected);
    if (getChatUnreadLength(selectedChat) > 0)
      readAllMessages(selectedChat._id);

    setActiveChat(selectedChat);
  };

  const handleCreateMessage = (e) => {
    e.preventDefault();

    sendNewMessage(
      { text: messageTxt, receiver: activeChat.visitor?._id },
      activeChat._id
    );

    resetMessageTxt();
  };

  const chatTime = (chat) => {
    let latestMsgTime = new Date(
      chat.messages[chat.messages.length - 1]?.createdAt || new Date()
    );
    let today = new Date();
    // * Check if msg was today or before today
    if (
      latestMsgTime.getDate() === today.getDate() &&
      latestMsgTime.getMonth() === today.getMonth() &&
      latestMsgTime.getFullYear() === today.getFullYear()
    )
      return `${latestMsgTime.getHours()}:${latestMsgTime.getMinutes()}`;

    return latestMsgTime.toLocaleDateString();
    // return `${latestMsgTime.getMonth}/${latestMsgTime.getMinutes}`;
  };

  const getChatUnreadLength = (chat) => {
    if (!chat || !chat.messages?.length) return 0;

    let totalUnread = 0;
    chat.messages.forEach((msg) => {
      if (msg.isRead == false) totalUnread++;
    });

    return totalUnread;
  };

  const readMessages = useMemo(() => {
    if (!activeChat) return [];

    return activeChat.messages.filter((el) => el.isRead);
  }, [activeChat]);

  const unReadMessages = useMemo(() => {
    if (!activeChat) return [];

    return activeChat.messages.filter((el) => !el.isRead);
  }, [activeChat]);

  return (
    <Container disableGutters sx={{ my: 1 }}>
      <Grid container component={Paper} className={classes.chatSection}>
        <Grid item xs={3} className={classes.borderRight500}>
          <Divider />
          <Grid item xs={12} sx={{ margin: 1, marginLeft: 0 }}>
            <TextField
              id='outlined-basic-email'
              label={t('Search')}
              variant='outlined'
              fullWidth
              size='small'
              sx={{ marginBottom: 2 }}
              className={classes.searchField}
              value={searchVal}
              onChange={handleSearch}
            />
          </Grid>
          <Divider />
          <List>
            {/* {1 === 5 */}
            {chats
              ? chats
                  .filter((el) =>
                    el.visitor?.fullName?.includes(searchVal.toLowerCase())
                  )
                  .map((chat) => (
                    <React.Fragment key={chat._id}>
                      <ListItem
                        button
                        sx={{ marginBlock: 2 }}
                        data-selected={chat._id}
                        onClick={handleChatClick}
                        sx={{
                          backgroundColor:
                            activeChat?._id === chat._id &&
                            '#cccccc !important',
                          pl: '5px',
                        }}
                      >
                        <ListItemIcon>
                          <Avatar
                            alt='Remy Sharp'
                            src={
                              chat?.visitor?.photo ||
                              `https://ui-avatars.com/api/?rounded=true&name=${chat?.visitor?.fullName
                                .split(' ')
                                .join('+')}`
                            }
                          />
                        </ListItemIcon>
                        <ListItemText
                          primary={chat.visitor?.fullName}
                          secondary={
                            chat.messages[chat.messages.length - 1]?.text.slice(
                              0,
                              15
                            ) || ''
                          }
                        />
                        <ListItemText
                          // secondary={'08:55'}
                          align='right'
                          secondary={chatTime(chat)}
                          align='right'
                          className={classes.ChatTIme}
                        />
                      </ListItem>
                      {getChatUnreadLength(chat) > 0 && (
                        <Typography
                          variant='subtitle2'
                          className={classes.numUnread}
                        >
                          {getChatUnreadLength(chat)}
                        </Typography>
                      )}
                      <Divider />
                    </React.Fragment>
                  ))
              : Array(5)
                  .fill()
                  .map(() => (
                    <Skeleton
                      key={v4()}
                      variant='rect'
                      width='200px'
                      height='50px'
                      sx={{
                        marginBottom: 2,
                        marginInline: 'auto',
                        borderRadius: '5px',
                      }}
                    />
                  ))}
          </List>
        </Grid>
        <Grid item xs={9} sx={{ backgroundColor: '#fff' }}>
          <List id='messageArea' className={classes.messageArea}>
            {readMessages.map((message) => (
              <React.Fragment key={message._id}>
                <ChatMsg
                  message={message}
                  classes={classes}
                  activeChat={activeChat}
                  user={user}
                />
              </React.Fragment>
            ))}

            {unReadMessages.length > 0 && (
              <Typography
                className={classes.newHeader}
                color='textSecondary'
                variant='body2'
              >
                <span>new</span>
              </Typography>
            )}
            {unReadMessages.map((message) => (
              <React.Fragment key={message._id}>
                <ChatMsg
                  message={message}
                  classes={classes}
                  activeChat={activeChat}
                  user={user}
                />
              </React.Fragment>
            ))}
          </List>
          <Divider />
          {activeChat && (
            <Grid container style={{ padding: '20px', alignItems: 'center' }}>
              <Grid item xs={11}>
                <form id='messageForm' onSubmit={handleCreateMessage}>
                  <TextField
                    id='outlined-basic-email'
                    label='Type Something'
                    fullWidth
                    value={messageTxt}
                    onChange={handleTxtChange}
                    required
                  />
                </form>
              </Grid>
              <Grid item xs={1} align='right'>
                <Button
                  color='primary'
                  aria-label='add'
                  type='submit'
                  form='messageForm'
                  variant='contained'
                  sx={{ marginLeft: 1 }}
                >
                  <SendIcon />
                </Button>
              </Grid>
            </Grid>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default Chat;
