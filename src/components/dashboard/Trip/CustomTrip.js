import React, { useContext, useEffect, useRef } from 'react';
import { Button, TextField, Typography } from '@material-ui/core';
import { Box } from '@material-ui/core';

import {
  Settings as SettingsIcon,
  Trash2 as Trash2Icon,
  Download as DownloadIcon,
  Play as PlayIcon,
  ArrowLeft as ArrowLeftIcon,
} from 'react-feather';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { OffersContext } from 'Contexts/OffersContext';
import { getMuiDateFormat } from 'utils/dateMethods';
import { useManyInputs, useToggleInput } from 'hooks';
import { ConfirmDialog } from '../Dialogs';
import { useTranslation } from 'react-i18next';

import styles from './CustomTripStyles';
import PrintCustomTrip from './PrintCustomTrip';
import ReactToPrint from 'react-to-print';
import { useReactToPrint } from 'react-to-print';

const CustomTrip = () => {
  const { getOfferById, customOffers, updateCustomOffer } =
    useContext(OffersContext);
  const classes = styles();
  const { t } = useTranslation();
  const [isDeleteOpen, toggleDeleteOpen] = useToggleInput(false);
  const initialState = {};
  const [offer, handleTxtChange, , , , setOffer] = useManyInputs(initialState);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const newOffer = getOfferById(id, true);
    if (newOffer) {
      setOffer({
        ...newOffer,
        departureDate: getMuiDateFormat(newOffer.departureDate),
        desiredReturnOn: getMuiDateFormat(newOffer.desiredReturnOn),
      });
    }
  }, [id, customOffers]);

  const handleDelete = () => {
    toggleDeleteOpen();
    updateCustomOffer(id, { ...offer, status: 'rejected' });
  };

  const handleSave = () => {
    updateCustomOffer(id, { ...offer, status: 'validated' });
  };

  const PrintOfferRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => PrintOfferRef.current,
  });

  return (
    <div>
      <Typography variant='h4' m={2}>
        {t('Tailor-made Travel Management')}
      </Typography>
      {offer ? (
        <Box className={classes.main}>
          <Box
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '100%',
            }}
          >
            <Button variant='outlined' component={Link} to='/app/customtrips'>
              <ArrowLeftIcon />
              {t('Back to the List')}
            </Button>
            <Box display='flex' alignItems='center' style={{ gap: '20px' }}>
              <div>
                {offer.status !== 'pending' && (
                  <Typography variant='h5'>{offer?.status}</Typography>
                )}
              </div>
              <div>
                <SettingsIcon className={classes.icons} />
                <DownloadIcon className={classes.icons} onClick={handlePrint} />
                {offer?.status === 'pending' && (
                  <>
                    {' '}
                    <Trash2Icon
                      onClick={toggleDeleteOpen}
                      className={classes.icons}
                    />
                    <PlayIcon onClick={handleSave} className={classes.icons} />{' '}
                  </>
                )}
              </div>
            </Box>
          </Box>
          <PrintCustomTrip
            classes={classes}
            id={id}
            t={t}
            offer={offer}
            handleTxtChange={handleTxtChange}
            ref={PrintOfferRef}
          />
        </Box>
      ) : (
        <div className='loader'></div>
      )}
      <ConfirmDialog
        open={isDeleteOpen}
        toggleDialog={toggleDeleteOpen}
        success={handleDelete}
        dialogTitle='Cancel This Trip'
      />
    </div>
  );
};

export default CustomTrip;
