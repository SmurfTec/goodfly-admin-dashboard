import useArray from 'hooks/useArray';
import React, { useState, useEffect, useContext, memo } from 'react';
import { handleCatch, makeReq } from 'Utils/makeReq';
import { AuthContext } from './AuthContext';

export const OffersContext = React.createContext();

export const OffersProvider = ({ children }) => {
  const { user } = useContext(AuthContext);

  const [
    offers,
    setOffers,
    pushOffer,
    removeOffer,
    filterOffer,
    updateOffer,
    clearOffers,
  ] = useArray();

  useEffect(() => {
    // * If user is logged In , only then fetch data
    if (user) {
      (async () => {
        try {
          const resData = await makeReq(`/trips`);
          setOffers(resData.trips);
        } catch (err) {
          handleCatch(err);
        }
      })();
    }
    // * Clear the State after user is logged Out
    else {
      setOffers();
    }
  }, [user]);

  const getOfferById = (id) => offers?.find((el) => el._id === id);

  const deleteTrip = async (id) => {
    try {
      await makeReq(`/trips/${id}`, {}, 'DELETE');
    } catch (err) {
      handleCatch(err);
    }
  };

  const archieveTrip = async (id) => {
    try {
      const resData = await makeReq(
        `/trips/${id}`,
        {
          body: { archieve: true },
        },
        'PATCH'
      );
      updateOffer(id, resData.trip);
    } catch (err) {
      handleCatch(err);
    }
  };

  return (
    <OffersContext.Provider
      value={{ offers, getOfferById, deleteTrip, archieveTrip }}
    >
      {children}
    </OffersContext.Provider>
  );
};
