import useArray from 'hooks/useArray';
import React, { useEffect, useContext, useState } from 'react';
import { handleCatch, makeReq } from 'utils/makeReq';
import { AuthContext } from './AuthContext';
import { toast } from 'react-toastify';

export const ReservationsContext = React.createContext();

export const ReservationsProvider = ({ children }) => {
  const { user } = useContext(AuthContext);

  const [loading, setLoading] = useState(true);

  const [
    reservations,
    setReservations,
    ,
    ,
    updateReservation,
    removeReservation,
    ,
  ] = useArray([], '_id');

  const fetchReservations = async () => {
    try {
      const resData = await makeReq(`/purchases`);
      setReservations(resData.purchases);
    } catch (err) {
      handleCatch(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // * If user is logged In , only then fetch data
    if (user) {
      fetchReservations();
    }
    // * Clear the State after user is logged Out
    else {
      setReservations();
    }
  }, [user]);

  const getReservationById = (id) => reservations?.find((el) => el._id === id);

  const deleteReservation = async (id) => {
    try {
      removeReservation(id);
    } catch (err) {
      handleCatch(err);
    }
  };

  const modifyReservation = async (
    id,
    updatedReservation,
    updateOnlyInContext
  ) => {
    if (updateOnlyInContext) {
      updateReservation(id, updatedReservation);
    } else {
      try {
        const resData = await makeReq(
          `/purchases/${id}`,
          { body: { ...updatedReservation } },
          'PATCH'
        );
        // console.log(`resData.purchase`, resData.purchase);
        updateReservation(id, resData.purchase);
        toast.success('Reservation updated Successfully !');
      } catch (err) {
        handleCatch(err);
      }
    }
  };

  const makePayment = async (purchaseId, paymentId, updatedPayment) => {
    try {
      const resData = await makeReq(
        `/purchases/${purchaseId}/payment/${paymentId}`,
        { body: { ...updatedPayment } },
        'PATCH'
      );
      // console.log(`resData.purchase`, resData.purchase);
      updateReservation(purchaseId, resData.purchase);
      toast.success('Reservation updated Successfully !');
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
        deleteReservation,
        modifyReservation,
        makePayment,
        fetchReservations,
        loading,
      }}
    >
      {children}
    </ReservationsContext.Provider>
  );
};
