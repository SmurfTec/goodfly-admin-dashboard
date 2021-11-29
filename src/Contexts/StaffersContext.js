import useArray from 'hooks/useArray';
import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { handleCatch, makeReq } from 'utils/makeReq';
import { AuthContext } from './AuthContext';
import { removeKeyIncludingString } from 'utils/objectMethods';

export const StaffersContext = React.createContext();

export const StaffersProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [
    staffers,
    setStaffers,
    pushStaffer,
    ,
    updateStaffer,
    removeStaffer,
    ,
  ] = useArray('loading', '_id');

  useEffect(() => {
    (async () => {
      // If user is logged In , only then fetch data
      if (user) {
        const resData = await makeReq(`/users?role=staffer`);
        setStaffers(resData.users);
      }
      // Clear the State after user is logged Out
      else {
        setStaffers('loading');
      }
    })();
  }, [user]);

  const deleteStaffer = async (id) => {
    try {
      await makeReq(`/users/${id}`, {}, 'DELETE');
      toast.success('Staffer Deleted Successfully !');
      removeStaffer(id);
    } catch (err) {
      handleCatch(err);
    }
  };

  // Update Staffer
  const modifyStaffer = async (id, updatedStaffer) => {
    console.log(`updatedStaffer`, updatedStaffer);

    // * Remove pass and passConfirm from req body, separate route for that purpose
    removeKeyIncludingString(updatedStaffer, 'password');
    removeKeyIncludingString(updatedStaffer, 'passwordConfirm');

    try {
      const resData = await makeReq(
        `/users/${id}`,
        { body: { ...updatedStaffer } },
        'PATCH'
      );
      toast.success('Staffer Updated Successfully !');
      // Update Staffer in the context array
      updateStaffer(id, resData.user);
      // setTimeout(() => {
      //   navigate('/app/staffers');
      // }, 2000);
    } catch (err) {
      handleCatch(err);
    }
  };

  // Update Staffer
  const modifyPassword = async (id, updatedPassword) => {
    console.log(`updatedPassword`, updatedPassword);

    try {
      const resData = await makeReq(
        `/users/updatepassword/${id}`,
        { body: { ...updatedPassword } },
        'PATCH'
      );
      toast.success('Staffer Updated Successfully !');
      // Update Staffer in the context array
      updateStaffer(id, resData.user);
      // setTimeout(() => {
      //   navigate('/app/staffers');
      // }, 2000);
    } catch (err) {
      handleCatch(err);
    }
  };
  const getStafferById = (id) =>
    staffers === 'loading' ? 'loading' : staffers?.find((el) => el._id === id);

  // Create New Staffer
  const createNewStaffer = async (newStafferProfile, resetForm) => {
    try {
      const resData = await makeReq(
        `/users/staffer`,
        { body: { ...newStafferProfile } },
        'POST'
      );
      resetForm();
      console.log('STAFFER', resData.user);
      pushStaffer(resData.user);
      toast.success('Staffer Created Successfully !');
      setTimeout(() => {
        navigate('/app/staffers');
      }, 2000);
    } catch (err) {
      handleCatch(err);
    }
  };

  return (
    <StaffersContext.Provider
      displayName='Staffers Context'
      value={{
        staffers,
        deleteStaffer,
        getStafferById,
        modifyStaffer,
        modifyPassword,
        createNewStaffer,
      }}
    >
      {children}
    </StaffersContext.Provider>
  );
};
