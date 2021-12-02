import React, { useContext, useEffect, useState } from 'react';
import cx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';

import { Link } from 'react-router-dom';
// import Carousel from 'react-material-ui-carousel';

import { Container, Skeleton } from '@material-ui/core';
import { useParams } from 'react-router';
import { OffersContext } from 'Contexts/OffersContext';
import useToggleInput from 'hooks/useToggleInput';

import { AddFlashSale, ConfirmDialog } from 'components/dashboard/Dialogs';
import OfferView from './OfferView';
import { ArrowBack, FlashOn } from '@material-ui/icons';

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

  const { getOfferById, offers, deleteTrip, updateOffer } =
    useContext(OffersContext);
  const { id } = useParams();

  const [offer, setOffer] = useState();

  const [isDeleteOpen, toggleDeleteOpen] = useToggleInput(false);
  const [isArchieveOpen, toggleArchieveOpen] = useToggleInput(false);
  const [isSaleDialogOpen, toggleIsSaleDialogOpen] = useToggleInput(false);

  useEffect(() => {
    // TODO Uncomment this line
    setOffer(getOfferById(id));
  }, [id, offers]);

  const handleDelete = () => {
    deleteTrip(id);
    toggleDeleteOpen();
  };

  const handleUpdate = (status) => {
    updateOffer(id, { archieve: status ?? true }, true);
  };

  const makeFlashSale = (body) => {
    updateOffer(id, { ...body }, true);
  };

  return (
    <Container style={{ marginTop: '3rem' }}>
      <Button
        size='small'
        variant='outlined'
        component={Link}
        to='/app/offers'
        sx={{ marginBottom: 2 }}
        startIcon={<ArrowBack />}
      ></Button>
      {offer ? (
        <Box className={classes.header}>
          <Button
            size='small'
            variant='outlined'
            component={Link}
            to={`/app/offers/${id}/edit`}
            className={classes.button}
          >
            Modify
          </Button>
          <Button
            size='small'
            variant='outlined'
            className={cx(classes.button, classes.delButton)}
            onClick={toggleDeleteOpen}
          >
            Delete
          </Button>
          {offer && offer.archieve ? (
            <Button
              size='small'
              variant='outlined'
              className={classes.button}
              onClick={() => handleUpdate(false)}
            >
              Put Forward
            </Button>
          ) : (
            <Button
              size='small'
              variant='outlined'
              className={classes.button}
              onClick={toggleArchieveOpen}
            >
              Archive
            </Button>
          )}

          {offer && (
            <Button
              variant='outlined'
              // variant='contained'
              color='success'
              className={classes.button}
              onClick={toggleIsSaleDialogOpen}
              endIcon={<FlashOn />}
            >
              Flash Sale
            </Button>
          )}
        </Box>
      ) : (
        <Skeleton sx={{ margin: 'auto' }} variant='rectangular' width='70%' />
      )}
      <OfferView offer={offer} />
      {/* COnfirm Delete Dialog */}
      <ConfirmDialog
        open={isDeleteOpen}
        toggleDialog={toggleDeleteOpen}
        success={handleDelete}
        dialogTitle='Are you sure you want to Delete this trip ?'
      />

      {/* COnfirm Archieve Dialog */}
      <ConfirmDialog
        open={isArchieveOpen}
        toggleDialog={toggleArchieveOpen}
        success={() => {
          handleUpdate();
          toggleArchieveOpen();
        }}
        dialogTitle='Are you sure you want to Archieve this trip ?'
      />

      {/* Flash Sale Dialog */}
      <AddFlashSale
        open={isSaleDialogOpen}
        toggleDialog={toggleIsSaleDialogOpen}
        success={makeFlashSale}
        offer={offer}
      />
    </Container>
  );
};

export default Offer;
