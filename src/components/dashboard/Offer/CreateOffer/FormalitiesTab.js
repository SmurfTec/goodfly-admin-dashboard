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
import { TabPanel } from '../../../common/TabPanel';

import v4 from 'uuid/dist/v4';
import { makeReq } from 'utils/makeReq';
import { toast } from 'react-toastify';
import parse from 'html-react-parser';

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
        disabled={!currentFormality}
      />
    </TabPanel>
  );
};

export default FormalitiesTab;
