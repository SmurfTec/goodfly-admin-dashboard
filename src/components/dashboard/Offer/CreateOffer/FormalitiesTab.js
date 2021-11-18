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
import React, { useEffect } from 'react';
import AddFormalityDialog from './AddFormalityDialog';
import { TabPanel } from '../../../common/TabPanel';

import v4 from 'uuid/dist/v4';

const defaultFormalities = [
  {
    heading: 'Formalities Omra',
    _id: v4(),
    title: 'Formalités administratives',
    subtitle: 'Prise en charge du dossier et de l’enregistrement.',
    description: 'Notre équipe s’occupe de tout bla bla bla bla bla',
  },
  {
    heading: 'Formalities Hajj',
    _id: v4(),
    title: 'Formalités administratives',
    subtitle: 'Prise en charge du dossier et de l’enregistrement.',
    description: 'Notre équipe s’occupe de tout bla bla bla bla bla',
  },
  {
    heading: 'Formalities Desert',
    _id: v4(),
    title: 'Formalités administratives',
    subtitle: 'Prise en charge du dossier et de l’enregistrement.',
    description: 'Notre équipe s’occupe de tout bla bla bla bla bla',
  },
  {
    heading: 'Formalities Malaysia',
    _id: v4(),
    title: 'Formalités administratives',
    subtitle: 'Prise en charge du dossier et de l’enregistrement.',
    description: 'Notre équipe s’occupe de tout bla bla bla bla bla',
  },
];

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
    setFormalities([
      {
        title: data.title,
        subtitle: data.subtitle,
        description: data.description,
      },
    ]);
    toggleDialogOpen();
  };

  const handleSubmit = () => {
    handleNext(formalities);
    // clearFormalities();
  };

  useEffect(() => {
    setFormalities([
      {
        title: formality.title,
        subtitle: formality.subtitle,
        description: formality.description,
      },
    ]);
  }, [formality]);

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
            {defaultFormalities.map((el) => (
              <MenuItem key={el._id} value={el.heading}>
                {el.heading}
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
