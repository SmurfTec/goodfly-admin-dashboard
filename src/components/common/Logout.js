import { AuthContext } from 'Contexts/AuthContext';
import React, { useContext, useEffect } from 'react';

const Logout = () => {
  const { logoutUser } = useContext(AuthContext);
  useEffect(() => {
    logoutUser();
  }, []);
  return <div></div>;
};

export default Logout;
