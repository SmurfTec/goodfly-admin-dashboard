import useArray from 'hooks/useArray';
import React, { useState, useEffect, useContext, memo } from 'react';
import { handleCatch, makeReq } from 'Utils/makeReq';
import { AuthContext } from './AuthContext';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export const ReservationsContext = React.createContext();

export const ReservationsProvider = ({ children }) => {
  const { user } = useContext(AuthContext);

  const [
    reservations,
    setReservations,
    pushReservation,
    filterReservation,
    updateReservation,
    removeReservation,
    clearReservations,
  ] = useArray();

  useEffect(() => {
    // * If user is logged In , only then fetch data
    if (user) {
      (async () => {
        try {
          const resData = await makeReq(`/trips/purchase`);
          setReservations(resData.purchases);
        } catch (err) {
          handleCatch(err);
        }
      })();
    }
    // * Clear the State after user is logged Out
    else {
      setReservations();
    }
  }, [user]);

  const getReservationById = (id) => reservations?.find((el) => el._id === id);

  const modifyReservation = async (id) => {
    try {
      removeReservation(id);
    } catch (err) {
      handleCatch(err);
    }
  };

  return (
    <ReservationsContext.Provider
      displayName='Reservations Context'
      value={{
        reservations,
        getReservationById,
        modifyReservation,
      }}
    >
      {children}
    </ReservationsContext.Provider>
  );
};
