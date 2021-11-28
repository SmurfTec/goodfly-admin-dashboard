import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from '@material-ui/core';
import { Box } from '@material-ui/system';
import { useToggleInput, useTextInput } from 'hooks';
import React, { useEffect, useState } from 'react';
import AddFormalityDialog from './AddFormalityDialog';
import UpdateFormalityDialog from './AddFormalityDialog';
import { TabPanel } from '../../../common/TabPanel';

import { handleCatch, makeReq } from 'utils/makeReq';
import { toast } from 'react-toastify';
import parse from 'html-react-parser';
import { Delete, Edit } from '@material-ui/icons';
import { ConfirmDialog as ConfirmDelFormality } from '../../Dialogs';

const FormalitiesTab = ({
  value,
  classes,
  handleNext,
  formalities,
  offerFormality,
}) => {
  const [formalitiesState, setFormalities] = useState([]); //* For MenuItems
  const [formality, handleFormality, resetFormality, setFormality] =
    useTextInput(''); //* for Menu Select

  const [currentFormality, setCurrentFormality] = useState();

  const [isDialogOpen, toggleDialogOpen] = useToggleInput(false);
  const [isUpdateFormalityOpen, toggleUpdateFormalityOpen] =
    useToggleInput(false);
  const [isDelFormalityOpen, toggleDelFormalityOpen] = useToggleInput(false);

  const handleAddFormality = async (data) => {
    console.log(`data`, data);
    try {
      const resData = await makeReq(`/formalities`, { body: data }, 'POST');
      setFormalities((st) => [...st, resData.formality]);
      setCurrentFormality(resData.formality);
    } catch (err) {
      toast.error('Error Creating Formality');
    }
    toggleDialogOpen();
  };
  const updateFormality = async (data) => {
    console.log(`data`, data);

    try {
      const resData = await makeReq(
        `/formalities/${currentFormality._id}`,
        { body: data },
        'PATCH'
      );
      setFormalities((st) =>
        st.map((el) =>
          el._id === currentFormality._id ? resData.formality : el
        )
      );
      setCurrentFormality(resData.formality);
      toast.success('Formality Updated Successfully !');
    } catch (err) {
      toast.error('Error Updating Formality');
    }
    toggleUpdateFormalityOpen();
  };

  const handleSubmit = () => {
    handleNext({ formality: currentFormality._id });
  };

  useEffect(() => {
    setFormalities(formalities);
  }, [formalities]);

  useEffect(() => {
    if (!offerFormality) return;

    setCurrentFormality(offerFormality);
    // setFormality(offerFormality);
  }, [offerFormality]);

  const handleFormalityChange = (e) => {
    // console.log(`e.target.value`, e.target.value);
    const selectedItem = e.target.value;
    handleFormality(e);

    setCurrentFormality(selectedItem);
  };

  const handleDeleteFormality = () => {
    // console.log(`id`, currentFormality._id);
    toggleDelFormalityOpen();
    makeReq(`/formalities/${currentFormality._id}`, {}, 'DELETE')
      .then(() => {
        setCurrentFormality(formalities[0]);
        setFormalities((st) =>
          st.filter((el) => el._id !== currentFormality._id)
        );
        toast.success('Formality Deleted Successfully!');
      })
      .catch((err) => handleCatch(err));
  };

  const handleUpdateFormality = () => {
    toggleUpdateFormalityOpen();
  };

  return (
    <TabPanel value={value} index={2} className={classes.options}>
      <Box
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <FormControl
          size='small'
          style={{
            width: '30%',
            backgroundColor: '#fff',
            margin: '1rem',
          }}
        >
          <InputLabel id='demo-simple-select-label'>
            Choose an existing formality
          </InputLabel>

          <Select
            labelId='demo-simple-select-label'
            id='formality'
            value={formality?.title}
            label='Choose an existing formality'
            onChange={handleFormalityChange}
          >
            {formalitiesState?.map((el) => (
              <MenuItem key={el._id} value={el}>
                {el.title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button
          variant='contained'
          style={{ width: '12rem' }}
          onClick={toggleDialogOpen}
        >
          {' '}
          Add a Formality
        </Button>
      </Box>
      {currentFormality && (
        <Box
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Box
            style={{
              display: 'grid',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography variant='h3'>{currentFormality.title || ''}</Typography>

            <Box style={{ paddingLeft: '1.5rem' }}>
              {parse(currentFormality.content.toString())}
            </Box>
            <Box
              display='flex'
              justifyContent='center'
              alignItems='center'
              flexWrap='wrap'
              columnGap='20px'
            >
              <Button
                variant='contained'
                style={{ width: '8rem' }}
                onClick={toggleDelFormalityOpen}
                endIcon={<Delete />}
                color='error'
              >
                {' '}
                Delete
              </Button>
              <Button
                endIcon={<Edit />}
                variant='contained'
                style={{ width: '8rem' }}
                onClick={handleUpdateFormality}
              >
                Update
              </Button>
            </Box>
          </Box>
        </Box>
      )}
      <Box
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '4rem 0rem 0.5rem',
        }}
      >
        <Button
          variant='contained'
          style={{ width: '8rem' }}
          onClick={handleSubmit}
        >
          {' '}
          Validate
        </Button>
      </Box>
      <AddFormalityDialog
        open={isDialogOpen}
        toggleDialog={toggleDialogOpen}
        submit={handleAddFormality}
      />
      <UpdateFormalityDialog
        open={isUpdateFormalityOpen}
        toggleDialog={toggleUpdateFormalityOpen}
        submit={updateFormality}
        formality={currentFormality}
      />
      <ConfirmDelFormality
        open={isDelFormalityOpen}
        toggleDialog={toggleDelFormalityOpen}
        success={handleDeleteFormality}
        dialogTitle='Delete this formality ?'
      />
    </TabPanel>
  );
};

export default FormalitiesTab;
