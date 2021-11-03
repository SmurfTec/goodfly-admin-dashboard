import React, { useState } from 'react';

const useTextInput = (initialState = '') => {
  const [state, setState] = useState(initialState);

  const handleChange = (e) => {
    setState(e.target.value);
  };

  const resetState = () => {
    setState(initialState);
  };

  return [state, handleChange, resetState];
};

export default useTextInput;
