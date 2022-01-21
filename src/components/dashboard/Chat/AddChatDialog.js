import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@material-ui/core';
import { Add, Close } from '@material-ui/icons';
import { Button } from '@mui/material';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import SelectStaffersTable from './SelectStaffersTable';

const AddChatDialog = ({ open, toggleDialog, handleSelect }) => {
  const [selected, setSelected] = useState([]);

  const handleAdd = () => {
    if (!selected) return toast.error('Select Atleast 1 staffer');
    handleSelect(selected);
  };

  return (
    <Dialog open={open} onClose={toggleDialog}>
      <DialogTitle>Add Chat with Staffer</DialogTitle>
      <DialogContent>
        <SelectStaffersTable selected={selected} setSelected={setSelected} />
      </DialogContent>
      <DialogActions>
        <Button
          variant='contained'
          size='small'
          color='success'
          endIcon={<Add />}
          onClick={handleAdd}
        >
          Add
        </Button>

        <Button
          variant='contained'
          size='small'
          color='error'
          endIcon={<Close />}
          onClick={toggleDialog}
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddChatDialog;
