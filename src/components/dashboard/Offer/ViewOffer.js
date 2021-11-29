import React, { useContext, useEffect, useState } from 'react';
import cx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';

import { Link } from 'react-router-dom';
// import Carousel from 'react-material-ui-carousel';

import {
  Container,
} from '@material-ui/core';
import { useParams } from 'react-router';
import { OffersContext } from 'Contexts/OffersContext';
import useToggleInput from 'hooks/useToggleInput';

import { ConfirmDialog } from 'components/dashboard/Dialogs';
import OfferView from './OfferView';

const useStyles = makeStyles(() => ({
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  button: {
    minWidth: '8rem',
    marginRight: '1rem',
  },
  delButton: {
    border: '1px solid red',
    color: 'red',
  },
}));

const Offer = () => {
  const classes = useStyles();

  const { getOfferById, offers, deleteTrip, archieveTrip } =
    useContext(OffersContext);
  const { id } = useParams();

  const [offer, setOffer] = useState();

  const [isDeleteOpen, toggleDeleteOpen] = useToggleInput(false);
  const [isArchieveOpen, toggleArchieveOpen] = useToggleInput(false);

  useEffect(() => {
    // TODO Uncomment this line
    setOffer(getOfferById(id));
  }, [id, offers]);

  const handleDelete = () => {
    deleteTrip(id);
    toggleDeleteOpen();
  };

  const handleArchieve = () => {
    archieveTrip(id);
    toggleArchieveOpen();
  };

  return (
    <Container style={{ marginTop: '3rem' }}>
      <Button
        variant='outlined'
        component={Link}
        to='/app/offers'
        sx={{ marginBottom: 2 }}
      >
        Back to offers
      </Button>
      <Box className={classes.header}>
        <Button
          variant='outlined'
          component={Link}
          to={`/app/offers/${id}/edit`}
          className={classes.button}
        >
          Modify
        </Button>
        <Button
          variant='outlined'
          className={cx(classes.button, classes.delButton)}
          onClick={toggleDeleteOpen}
        >
          Delete
        </Button>
        <Button
          variant='outlined'
          className={classes.button}
          onClick={toggleArchieveOpen}
        >
          Archive
        </Button>
        <Button variant='outlined' className={classes.button}>
          Put Forward
        </Button>
      </Box>
      <OfferView offer={offer} />
      <ConfirmDialog
        open={isDeleteOpen}
        toggleDialog={toggleDeleteOpen}
        success={handleDelete}
        dialogTitle='Are you sure you want to Delete this trip ?'
      />
      <ConfirmDialog
        open={isArchieveOpen}
        toggleDialog={toggleArchieveOpen}
        success={handleArchieve}
        dialogTitle='Are you sure you want to Archieve this trip ?'
      />
    </Container>
  );
};

export default Offer;
