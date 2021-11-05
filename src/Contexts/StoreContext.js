import useArray from 'hooks/useArray';
import React, { useState, useEffect, useContext, memo } from 'react';
import { makeReq } from 'Utils/makeReq';
import { AuthContext } from './AuthContext';

export const StoreContext = React.createContext();

export const StoreProvider = ({ children }) => {
  const { user } = useContext(AuthContext);

  const [
    products,
    setProducts,
    pushProduct,
    removeProduct,
    filterProduct,
    updateProduct,
    clearProducts,
  ] = useArray('loading');

  const [
    orders,
    setOrders,
    pushOrder,
    removeOrder,
    filterOrder,
    updateOrder,
    clearOrders,
  ] = useArray('loading');

  useEffect(() => {
    // * If user is logged In , only then fetch data
    if (user) {
    }
    // * Clear the State after user is logged Out
    else {
      setOrders('loading');
      setProducts('loading');
    }
  }, [user]);

  return (
    <StoreContext.Provider value={{ orders, products }}>
      {children}
    </StoreContext.Provider>
  );
};
