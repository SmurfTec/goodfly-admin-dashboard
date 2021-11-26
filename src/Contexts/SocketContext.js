import { createContext, useContext, useEffect, useState } from 'react';

import socketIo from 'socket.io-client';
import { AuthContext } from './AuthContext';
import { API_BASE_ORIGIN } from 'utils/makeReq';
import { makeReq, handleCatch } from 'utils/makeReq';
import useArray from 'hooks/useArray';

export const SocketContext = createContext();

export const SocketProvider = (props) => {
  const [socket, setSocket] = useState();
  const { user, setUser } = useContext(AuthContext);

  const [
    notifications,
    setNotifications,
    // pushNotification,
    // filterNotification,
    // updateNotification,
    // removeNotification,
    // clearNotifications,
  ] = useArray([], '_id');

  //* get notification
  useEffect(() => {
    (async () => {
      // If user is logged In , only then fetch data
      if (user) {
        const resData = await makeReq(`/users/notifications`);
        setNotifications(resData.notifications);
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
      console.log(`data`, data);
      console.log(`user`, user);
      console.log(`user._id`, user._id);

      if (data?.newNotification?.isVisitor) return;
      // if (JSON.stringify(data.user._id) !== JSON.stringify(user._id)) return;

      //* update notifications

      setNotifications([...notifications, data.newNotification]);
    });
  }, [socket, user]);

  return (
    <SocketContext.Provider
      value={{ socket, notifications, makeNotficationsAsRead }}
    >
      {props.children}
    </SocketContext.Provider>
  );
};
