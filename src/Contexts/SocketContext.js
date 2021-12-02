import { createContext, useContext, useEffect, useState } from 'react';

import socketIo from 'socket.io-client';
import { AuthContext } from './AuthContext';
import { API_BASE_ORIGIN } from 'utils/makeReq';
import { makeReq, handleCatch } from 'utils/makeReq';
import useArray from 'hooks/useArray';

export const SocketContext = createContext();

export const SocketProvider = (props) => {
  const [socket, setSocket] = useState();
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
  }, []);

  useEffect(() => {
    if (!socket) return;
    if (!user || user === null) return;

    socket.on('newNotification', (data) => {
      if (data?.newNotification?.isVisitor) return;
      //* update notifications
      setNotifications([data.newNotification, ...notifications]);
    });

    socket.on('newMessage', ({ chatId, message }) => {
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
  }, [socket, user]);

  const sendNewMessage = (msg, chatId) => {
    console.log(`msg`, msg);
    socket.emit('newMessage', { ...msg, token });
    console.log(`chatId`, chatId);

    // // * Push New Message to that chat
    // setChats((st) =>
    //   st.map((el) =>
    //     el._id === chatId
    //       ? {
    //           ...el,
    //           messages: [
    //             ...el.messages,
    //             {
    //               text: msg.text,
    //               sender: 'goodfly',
    //               createdAt: new Date(),
    //             },
    //           ],
    //         }
    //       : el
    //   )
    // );
  };

  return (
    <SocketContext.Provider
      value={{
        socket,
        notifications,
        makeNotficationsAsRead,
        chats,
        sendNewMessage,
        user,
      }}
    >
      {props.children}
    </SocketContext.Provider>
  );
};
