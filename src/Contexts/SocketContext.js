import { createContext, useContext, useEffect, useState } from 'react';

import socketIo from 'socket.io-client';
import { AuthContext } from './AuthContext';
import { API_BASE_ORIGIN } from 'utils/makeReq';
import { makeReq, handleCatch } from 'utils/makeReq';
import useArray from 'hooks/useArray';

export const SocketContext = createContext();

export const SocketProvider = (props) => {
  const [socket, setSocket, isLoggedIn] = useState();
  const { user, setUser, token } = useContext(AuthContext);

  const [
    notifications,
    setNotifications,
    // pushNotification,
    // filterNotification,
    // updateNotification,
    // removeNotification,
    // clearNotifications,
  ] = useArray([], '_id');

  const [
    chats,
    setChats,
    pushChat,
    filterChat,
    updateChat,
    removeChat,
    clearChats,
  ] = useArray([], '_id');

  const fetchNotifications = async () => {
    const resData = await makeReq(`/users/notifications`);
    setNotifications(resData.notifications);
  };

  const fetchChats = async () => {
    const resData = await makeReq(`/chat`);
    setChats(resData.chats);
  };

  //* get notification
  useEffect(() => {
    (async () => {
      // If user is logged In , only then fetch data
      if (user) {
        fetchNotifications();
        fetchChats();
      } else {
        setNotifications([]);
      }
    })();
  }, [user]);

  const makeNotficationsAsRead = async () => {
    try {
      await makeReq('/users/read-my-notifications', {}, 'PATCH');
    } catch (err) {
      handleCatch(err);
    }
    console.log('makenotificationRead');
  };

  //* socket connection
  useEffect(() => {
    // socket = socketIo.connect('https://mern-chat-project.herokuapp.com', {
    const newSocket = socketIo.connect(API_BASE_ORIGIN, {
      transports: ['websocket'],
    });
    setSocket(newSocket);
    if (!newSocket) return;
    newSocket.on('connect', () => {
      console.log(`Hurrah Socket ${newSocket.id} Connected`);
    });
    if (!user || user === null) return;

    newSocket.on('newNotification', (data) => {
      if (data?.newNotification?.isVisitor) return;
      //* update notifications
      setNotifications([data.newNotification, ...notifications]);
    });

    newSocket.on('newMessage', ({ chatId, message }) => {
      console.log(`newMessage received :`, message);
      console.log(`chatId :`, chatId);
      // * Push New Message to that chat
      setChats((st) =>
        st.map((el) =>
          el._id === chatId
            ? {
                ...el,
                messages: [...el.messages, message],
              }
            : el
        )
      );
    });
  }, [user]);

  useEffect(() => {
    // console.log('useEffect Called');
    if (!socket) return;
  }, [socket, isLoggedIn]);

  const sendNewMessage = (msg, chatId) => {
    console.log(`msg`, msg);
    socket.emit('newMessage', { ...msg, token, chatId });
    console.log(`chatId`, chatId);
  };

  const readAllMessages = (chatId) => {
    console.log(`chatId`, chatId);
    setChats((el) =>
      el.map((chat) =>
        chat._id === chatId
          ? {
              ...chat,
              messages: chat.messages.map((msg) => ({ ...msg, isRead: true })),
            }
          : chat
      )
    );
    socket.emit('readAllMessages', { token, chatId: chatId });
  };

  return (
    <SocketContext.Provider
      displayName='Socket Context'
      value={{
        socket,
        notifications,
        makeNotficationsAsRead,
        chats,
        sendNewMessage,
        user,
        readAllMessages,
        pushChat,
      }}
    >
      {props.children}
    </SocketContext.Provider>
  );
};
