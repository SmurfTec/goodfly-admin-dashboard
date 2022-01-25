import useArray from 'hooks/useArray';
import React, { useEffect, useContext } from 'react';
import { handleCatch, makeReq } from 'utils/makeReq';
import { AuthContext } from './AuthContext';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export const OffersContext = React.createContext();

export const OffersProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [offers, setOffers, , , updateOfferById, removeOffer, ,] =
    useArray();

  const [
    customOffers,
    setCustomOffers,
    ,
    ,
    updateCustomOfferById,
    ,
    ,
  ] = useArray();

  const [
    offerComments,
    setOfferComments,
    ,
    ,
    updateOfferComment,
    ,
    ,
  ] = useArray([], '_id');

  const fetchTrips = async () => {
    try {
      const resData1 = await makeReq(`/trips`);
      setOffers(resData1.trips);
    } catch (err) {
      handleCatch(err);
    }
  };

  const fetchCustomTrips = async () => {
    try {
      const resData2 = await makeReq(`/trips/customTrip`);

      setCustomOffers(resData2.trips);
    } catch (err) {
      handleCatch(err);
    }
  };

  const fetchTripsComments = async () => {
    try {
      const resData2 = await makeReq(`/trips/comments`);

      setOfferComments(resData2.comments);
    } catch (err) {
      handleCatch(err);
    }
  };

  useEffect(() => {
    // * If user is logged In , only then fetch data
    if (user) {
      fetchTrips();
      fetchCustomTrips();
      fetchTripsComments();
    }
    // * Clear the State after user is logged Out
    else {
      setOffers();
    }
  }, [user]);

  const getOfferById = (id, isCustom) =>
    isCustom
      ? customOffers?.find((el) => el._id === id)
      : offers?.find((el) => el._id === id);

  const deleteTrip = async (id) => {
    try {
      await makeReq(`/trips/${id}`, {}, 'DELETE');
      removeOffer(id);
      navigate('/app/offers');
      toast.success('Offer Deleted Successfully !');
    } catch (err) {
      handleCatch(err);
    }
  };

  const createOffer = async (newOffer) => {
    try {
      const { trip } = await makeReq(
        `/trips`,
        { body: newOffer },
        'POST'
      );

      setOffers([...offers, trip]);
      toast.success('Offer Created Sucessfully !');
      navigate('/app/offers');
    } catch (err) {
      handleCatch(err);
    }
  };

  const updateOffer = async (id, updatedOffer, dontNavigate) => {
    try {
      const { trip } = await makeReq(
        `/trips/${id}`,
        { body: updatedOffer },
        'PATCH'
      );

      updateOfferById(id, trip);
      toast.success('Offer Updated Sucessfully !');
      if (!dontNavigate) navigate('/app/offers');
    } catch (err) {
      handleCatch(err);
    }
  };

  // * Custom Offers

  const updateCustomOffer = async (id, updatedOffer) => {
    try {
      const { trip, purchase } = await makeReq(
        `/trips/customTrip/${id}`,
        { body: updatedOffer },
        'PATCH'
      );

      updateCustomOfferById(id, trip);
      if (purchase) updateOfferById(purchase._id, purchase);
      toast.success('Offer Updated Sucessfully !');
      navigate('/app/customTrips');
    } catch (err) {
      handleCatch(err);
    }
  };

  // * Modify Offer Comment
  const modifyOfferComment = async (id, updatedBody) => {
    try {
      const resData = await makeReq(
        `/trips/comments/${id}`,
        { body: { ...updatedBody } },
        'PATCH'
      );

      updateOfferComment(id, resData.comment);
      toast.success('Comment Updated Successfully !');
    } catch (err) {
      handleCatch(err);
    }
  };

  return (
    <OffersContext.Provider
      displayName='Offers Context'
      value={{
        offers,
        getOfferById,
        deleteTrip,
        createOffer,
        updateOffer,
        customOffers,
        updateCustomOffer,
        offerComments,
        modifyOfferComment,
      }}
    >
      {children}
    </OffersContext.Provider>
  );
};
