import useArray from 'hooks/useArray';
import React, {
  useState,
  useEffect,
  useContext,
  memo,
  useCallback,
} from 'react';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { handleCatch, makeReq } from 'Utils/makeReq';
import { AuthContext } from './AuthContext';

export const CustomersContext = React.createContext();

export const CustomersProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [
    customers,
    setCustomers,
    pushCustomer,
    filterCustomers,
    updateCustomer,
    removeCustomer,
    clearCustomers,
  ] = useArray('loading', '_id');

  useEffect(() => {
    (async () => {
      // If user is logged In , only then fetch data
      if (user) {
        const resData = await makeReq(`/users?role=visitor`);
        setCustomers(resData.users);
      }
      // Clear the State after user is logged Out
      else {
        setCustomers('loading');
      }
    })();
  }, [user]);

  const deleteCustomer = async (id) => {
    try {
      await makeReq(`/users/${id}`, {}, 'DELETE');
      toast.success('Customer Deleted Successfully !');
      removeCustomer(id);
    } catch (err) {
      handleCatch(err);
    }
  };

  // Update Customer
  const modifyCustomer = async (id, updatedCustomer) => {
    try {
      const resData = await makeReq(
        `/users/${id}`,
        { body: { ...updatedCustomer } },
        'PATCH'
      );
      toast.success('Customer Updated Successfully !');

      // Update Customer in the context array
      updateCustomer(id, resData.suer);
    } catch (err) {
      handleCatch(err);
    }
  };

  const getCustomerById = (id) =>
    customers === 'loading'
      ? 'loading'
      : customers?.find((el) => el._id === id);

  // Create New Customer
  const createNewCustomer = async (newCustomerProfile, resetForm) => {
    try {
      const resData = await makeReq(
        `/users`,
        { body: { ...newCustomerProfile } },
        'POST'
      );

      resetForm();

      pushCustomer(resData.user);
      toast.success('Customer Created Successfully !');
      setTimeout(() => {
        navigate('/app/customers');
      }, 2000);
    } catch (err) {
      handleCatch(err);
    }
  };

  return (
    <CustomersContext.Provider
      value={{
        customers,
        deleteCustomer,
        getCustomerById,
        modifyCustomer,
        createNewCustomer,
      }}
    >
      {children}
    </CustomersContext.Provider>
  );
};
