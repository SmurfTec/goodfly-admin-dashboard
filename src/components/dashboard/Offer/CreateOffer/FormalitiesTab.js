import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from '@material-ui/core';
import { Box } from '@material-ui/system';
import { useArray, useToggleInput, useTextInput } from 'hooks';
import React from 'react';
import AddFormalityDialog from './AddFormalityDialog';
import { TabPanel } from '../../../common/TabPanel';

const FormalitiesTab = ({ value, classes, handleNext }) => {
  const [formality, handleFormality, resetFormality] = useTextInput('');

  const [
    formalities,
    setFormalities,
    pushEl,
    filterCb,
    updateEl,
    removeEl,
    clearFormalities,
  ] = useArray([]);
  const [isDialogOpen, toggleDialogOpen] = useToggleInput(false);

  const handleAddFormality = (data) => {
    console.log(`data`, data);
    pushEl(data);
    toggleDialogOpen();
  };

  const handleSubmit = () => {
    handleNext(formalities);
    // clearFormalities();
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
            value={formality}
            label='Choose an existing formality'
            onChange={handleFormality}
          >
            <MenuItem value={'Formality Omra'}>Formality Omra</MenuItem>
            <MenuItem value={'Formality Malasia'}>Formality Malasia</MenuItem>
            <MenuItem value={'Formality Riyad'}>Formality Riyad</MenuItem>
            <MenuItem value={'Formality Desert'}>Formality Desert</MenuItem>
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
          <Typography variant='h3'> Formality Omra</Typography>
          {/*  map the Formalities */}
          {formalities.map((formality) => (
            <>
              <Box
                style={{
                  display: 'flex',
                  alignItems: 'self-end',
                  justifyContent: 'left',
                }}
              >
                <Typography variant='h1' style={{ fontSize: '3rem' }}>
                  {' '}
                  .{' '}
                </Typography>
                <Typography variant='h4'>{formality.title}</Typography>
              </Box>
              <Box style={{ paddingLeft: '1.5rem' }}>
                <Typography variant='h5'>{formality.subtitle}</Typography>
                <Typography variant='text' style={{ fontSize: '0.8rem' }}>
                  {formality.description}
                </Typography>
              </Box>
            </>
          ))}
        </Box>
      </Box>
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
    </TabPanel>
  );
};

export default FormalitiesTab;
