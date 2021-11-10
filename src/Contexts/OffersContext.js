import useArray from 'hooks/useArray';
import React, { useState, useEffect, useContext, memo } from 'react';
import { handleCatch, makeReq } from 'Utils/makeReq';
import { AuthContext } from './AuthContext';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export const OffersContext = React.createContext();

export const OffersProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [
    offers,
    setOffers,
    pushOffer,
    filterOffer,
    updateOffer,
    removeOffer,
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
      removeOffer(id);
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

  const createOffer = async (newOffer) => {
    try {
      const { trip } = await makeReq(`/trips`, { body: newOffer }, 'POST');
      console.log(`trip`, trip);

      pushOffer(trip);
      toast.success('Offer Created Sucessfully !');
      navigate('/app/offers');
    } catch (err) {
      handleCatch(err);
    }
  };

  return (
    <OffersContext.Provider
      value={{ offers, getOfferById, deleteTrip, archieveTrip, createOffer }}
    >
      {children}
    </OffersContext.Provider>
  );
};
