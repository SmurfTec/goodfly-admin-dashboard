import useArray from 'hooks/useArray';
import React, { useEffect, useContext } from 'react';
import { makeReq, handleCatch } from 'utils/makeReq';
import { AuthContext } from './AuthContext';
import { toast } from 'react-toastify';

export const OrderContext = React.createContext();

export const OrderProvider = ({ children }) => {
  const { user } = useContext(AuthContext);

  const [
    orders,
    setOrders,
    ,
    ,
    updateOrder,
    ,
    ,
  ] = useArray('loading', '_id');

  useEffect(() => {
    (async () => {
      // If user is logged In , only then fetch data
      if (user) {
        const resData = await makeReq(`/orders`);
        setOrders(resData.orders);
      }
      // Clear the State after user is logged Out
      else {
        setOrders('loading');
      }
    })();
  }, [user]);

  // Update order
  const modifyOrder = async (id, updatedOrder) => {
    // console.log(`updatedOrder`, updatedOrder);
    try {
      const resData = await makeReq(
        `/orders/${id}`,
        { body: { ...updatedOrder } },
        'PATCH'
      );
      toast.success('Order Updated Successfully !');
      updateOrder(id, resData.order);
    } catch (err) {
      handleCatch(err);
    }
  };

  const getOrderById = (id) =>
    orders === 'loading' ? 'loading' : orders?.find((el) => el._id === id);

  return (
    <OrderContext.Provider
      displayName='Order Context'
      value={{ orders, getOrderById, modifyOrder }}
    >
      {children}
    </OrderContext.Provider>
  );
};
