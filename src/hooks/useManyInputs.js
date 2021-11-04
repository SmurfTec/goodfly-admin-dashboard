import React, { useState } from 'react';

const useManyInputs = (initialState) => {
  const [state, setState] = useState(initialState);

  const handleTxtChange = (e) => {
    setState((st) => ({ ...st, [e.target.name]: e.target.value }));
  };

  const handleToggleChange = (e) => {
    setState((st) => ({
      ...st,
      [e.target.name]: !st[e.target.name],
    }));
  };

  const changeInput = (key, value) => {
    setState((st) => ({ ...st, [key]: value }));
  };

  const resetState = () => {
    setState(initialState);
  };

  return [state, handleTxtChange, handleToggleChange, changeInput, resetState];
};

export default useManyInputs;
