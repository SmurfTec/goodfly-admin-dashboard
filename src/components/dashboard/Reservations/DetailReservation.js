import React, {
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  Box,
  Tab,
  Tabs,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  TextField,
  Paper,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  CardMedia,
  Skeleton,
  Container,
} from '@material-ui/core';
import CarouselLayout from 'components/common/Carousel/CarouselLayout';

import {
  Trash2 as Trash2Icon,
  Printer as PrinterIcon,
  Play as PlayIcon,
} from 'react-feather';
import { Plus as PlusIcon, File as FileIcon } from 'react-feather';

import { TabPanel, a11yProps } from '../../common/TabPanel';
import { useParams } from 'react-router';
import { ReservationsContext } from 'Contexts/ReservationsContext';
import OfferView from '../Offer/OfferView';
import CustomerTripView from './CustomTripView';
import LoadingOverlay from 'react-loading-overlay';
import { useArray, useTextInput, useToggleInput } from 'hooks';
import v4 from 'uuid/dist/v4';
import { Delete } from '@material-ui/icons';
import axios from 'axios';
import { toast } from 'react-toastify';
import { CustomersContext } from 'Contexts/CustomersContext';
import PaymentsTable from './paymentsTable';
import useStyles from './styles/detailReservation';
import { AddDeparture as AddDepartureDialog } from '../Dialogs';
import NotFound from 'pages/NotFound';
import UserInfo from './UserInfo';
import { useTranslation } from 'react-i18next';
import { useReactToPrint } from 'react-to-print';
import PrintDetails from './PrintDetails';
import TravelersTable from './TravelersTable';

const DetailReservation = () => {
  const classes = useStyles();
  const {
    loading,
    getReservationById,
    reservations,
    modifyReservation,
  } = useContext(ReservationsContext);

  const { modifyCustomer } = useContext(CustomersContext);
  const { id } = useParams();

  const [isDatesModalOpen, toggleIsDatesModalOpen] =
    useToggleInput(false);

  const [reservation, setReservation] = useState();
  const [
    attachments,
    setAttachments,
    pushAttachment,
    ,
    ,
    removeAttachment,
    ,
  ] = useArray([], '_id');

  const [value, setValue] = React.useState(0);
  const [reservationStatus, setReservationStatus] =
    React.useState('');
  const [notFound, setNotFound] = useState(false);
  const { t } = useTranslation();

  const [isPrintOpen, togglePrintOpen] = useToggleInput(false);
  const [installments, handleInstallments, , setInstallments] =
    useTextInput('');

  // const handleIn

  useEffect(() => {
    if (loading) return;
    const newReservation = getReservationById(id);
    if (!newReservation) return setNotFound(true);

    setReservation(newReservation);
  }, [id, reservations, loading]);

  console.log('RESERVATION', reservation);

  const [isImageUploading, toggleImageUploading] =
    useToggleInput(false);
  const [uploadingText, setUploadingText] = useState(
    'Uploading Image...'
  );

  useEffect(() => {
    if (reservation) {
      setReservationStatus(reservation.status);
      setAttachments(reservation.visitor?.attachments || []);
      setInstallments(reservation?.installments?.toString() || '');
    }
  }, [reservation]);

  const handleReservationStatus = (event) => {
    setReservationStatus(event.target.value);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleDeleteAttachment = (id) => {
    console.log(`id`, id);
    removeAttachment(id);
  };

  const handleAttachmentChange = async (e) => {
    setUploadingText('Uploading Attachment ...');
    toggleImageUploading();
    const selectedFile = e.target.files[0];
    const fileType = ['image/'];
    try {
      console.log(`selectedFile.type`, selectedFile.type);
      if (selectedFile && selectedFile.type.includes(fileType)) {
        let reader = new FileReader();
        reader.readAsDataURL(selectedFile);
        reader.onloadend = async (e) => {
          console.log(`result onLoadEnd`, e.target.result);
          const file = e.target.result;

          // TODO  Delete Image from cloudinary if it exists on this user

          // // * 1 Upload Image on Cloudinary
          const formData = new FormData();
          formData.append('file', file);
          formData.append(
            'upload_preset',
            process.env.REACT_APP_CLOUDINARY_PRESET
          );

          const res = await axios.post(
            `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload`,
            formData
          );
          const uploadedAttachment = res.data.url;
          console.log(`res`, res);

          setUploadingText('Updating Attachment ...');

          pushAttachment({ _id: v4(), image: uploadedAttachment });

          toggleImageUploading();
        };
      } else {
        toast.error('Only Image files are acceptable !');
      }
    } catch (err) {
      toast(
        err?.response?.data?.message ||
          err.message ||
          'Something Went Wrong'
      );
      console.log(`err`, err);
    }
  };

  const handleModifyCustomer = async (e) => {
    e.preventDefault();
    const updatedVisitor = {
      ...reservation.visitor,
      attachments,
    };
    const updatedCustomer = await modifyCustomer(
      reservation.visitor._id,
      updatedVisitor
    );
    console.log(`updatedCustomer`, updatedCustomer);
    console.log(`updatedReservation`, {
      ...reservation,
      visitor: updatedCustomer,
    });

    modifyReservation(
      reservation._id,
      { ...reservation, visitor: updatedCustomer },
      true
    );
  };

  const handleAddDates = (dates) => {
    modifyReservation(reservation._id, {
      status: reservationStatus,
      installments,
      ...dates,
    });
  };

  const handleCancel = () => {
    modifyReservation(reservation._id, {
      status: 'cancelled',
    });
  };

  const handleValidate = () => {
    console.log(`reservationStatus`, reservationStatus);
    console.log(`installments`, installments);

    if (reservationStatus === 'cancelled') {
      return;
    }

    if (reservationStatus === 'pre-reservation') {
      toast.error(
        'Plz update reservation status before validation !'
      );
      return;
    }

    if (reservationStatus !== 'cancelled' && !installments) {
      toast.error('Plz select Installments before validation !');
      return;
    }

    if (!reservation.departureDate || !reservation.returnDate) {
      toggleIsDatesModalOpen();
      return;
    }

    modifyReservation(reservation._id, {
      status: reservationStatus,
      installments,
    });
  };

  const PrintPurchaseRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => PrintPurchaseRef.current,
    onAfterPrint: () => {
      togglePrintOpen();
    },
  });

  return (
    <Container>
      {notFound ? (
        <NotFound />
      ) : (
        <div ref={PrintPurchaseRef}>
          <Typography variant='h4' m={1}>
            {loading ? (
              <Skeleton width='30%' />
            ) : (
              ` ${t('Reservation Reference')} : ${reservation?._id}`
            )}
          </Typography>
          <Box
            style={{
              margin: '1rem',
              display: 'flex',
              justifyContent: 'left',
              alignItems: 'center',
              flexWrap: 'wrap',
            }}
          >
            <Typography variant='h5'>
              {' '}
              {t('Reservation Status')} :
            </Typography>
            {loading ? (
              <Skeleton variant='rect' width='30%' />
            ) : (
              <FormControl
                size='small'
                style={{
                  width: 'fit-content',
                  backgroundColor: '#fff',
                  margin: '1rem',
                }}
              >
                <InputLabel id='demo-simple-select-label'>
                  {t('Reservation Status')}
                </InputLabel>

                <Select
                  labelId='demo-simple-select-label'
                  id='demo-simple-select'
                  value={reservationStatus}
                  // value={reservation.status}
                  label={t('Reservation Status')}
                  onChange={handleReservationStatus}
                >
                  <MenuItem
                    value={'pre-reservation'}
                    disabled={
                      reservation?.status !== 'pre-reservation'
                    }
                  >
                    {t('Pre Reservation')}
                  </MenuItem>
                  <MenuItem value={'validated'}>
                    {t('Validated')}
                  </MenuItem>
                  <MenuItem
                    value={'schedule-inProgress'}
                    sx={{ display: 'none' }}
                  >
                    {t('Schedule in Progress')}
                  </MenuItem>
                  <MenuItem
                    value={'reservation-paid'}
                    sx={{ display: 'none' }}
                  >
                    {t('Finalized')}
                  </MenuItem>
                  <MenuItem
                    value={'archived'}
                    sx={{ display: 'none' }}
                  >
                    {t('Archived')}
                  </MenuItem>
                  <MenuItem value={'cancelled'}>
                    {t('Cancelled')}
                  </MenuItem>
                  <MenuItem
                    value={'cancellation-request'}
                    sx={{ display: 'none' }}
                  >
                    {t('Cancellation Request')}
                  </MenuItem>
                  {/* <MenuItem value={20}>Two</MenuItem>
              <MenuItem value={30}>Three</MenuItem> */}
                </Select>
              </FormControl>
            )}
          </Box>
          <Box
            style={{
              width: '50%',
              margin: '1rem',
              display: 'flex',
              justifyContent: 'left',
              alignItems: 'center',
              flexWrap: 'wrap',
            }}
          >
            {' '}
            <Typography variant='h5' style={{ marginRight: '1rem' }}>
              {t('Payment')} :{' '}
            </Typography>
            <FormControl component='fieldset'>
              <RadioGroup
                value={installments}
                onChange={handleInstallments}
                row
                aria-label='gender'
                name='installments'
              >
                <FormControlLabel
                  disabled={reservation?.status !== 'pre-reservation'}
                  value='1'
                  control={<Radio />}
                  label={t('Total')}
                />
                <FormControlLabel
                  disabled={reservation?.status !== 'pre-reservation'}
                  value='3'
                  control={<Radio />}
                  label='3X'
                />
                <FormControlLabel
                  disabled={reservation?.status !== 'pre-reservation'}
                  value='4'
                  control={<Radio />}
                  label='4X'
                />
                <FormControlLabel
                  disabled={reservation?.status !== 'pre-reservation'}
                  value='5'
                  control={<Radio />}
                  label='5X'
                />
              </RadioGroup>
            </FormControl>
          </Box>

          {loading ? (
            <Skeleton variant='rect' width='95%' height={700} />
          ) : isPrintOpen ? (
            <PrintDetails
              reservation={reservation}
              classes={classes}
              t={t}
            />
          ) : (
            <Box
              style={{
                minHeight: '25rem',
                margin: '2rem 1.5rem 0rem',
              }}
            >
              <Box sx={{ width: '100%' }}>
                <Box
                  sx={{
                    borderBottom: 1,
                    borderColor: 'divider',
                    borderRadius: '1rem',
                  }}
                >
                  <Tabs
                    value={value}
                    onChange={handleChange}
                    aria-label='basic tabs example'
                    style={{
                      backgroundColor: 'white',
                    }}
                  >
                    <Tab label={t('OFFER')} {...a11yProps(0)} />
                    <Tab label={t('CLIENT')} {...a11yProps(1)} />
                    {reservation?.type === 'reserveForAnother' && (
                      <Tab
                        label={t('Reservation User')}
                        {...a11yProps(2)}
                      />
                    )}
                    <Tab label={t('PAYMENT')} {...a11yProps(3)} />
                    {reservation?.numOfTravelers > 0 && (
                      <Tab label={t('TRAVELERS')} {...a11yProps(3)} />
                    )}

                    <Box
                      style={{
                        display: 'flex',
                        justifyContent: 'right',
                        alignItems: 'center',
                        width: '100%',
                        margin: '0rem 0.5rem 0rem',
                      }}
                    >
                      {!['reservation-paid', 'cancelled'].includes(
                        reservation?.status
                      ) && (
                        <Box>
                          <PrinterIcon
                            onClick={() => {
                              togglePrintOpen();
                              setTimeout(() => {
                                handlePrint();
                              }, 500);
                            }}
                            className={classes.icons}
                          />
                          <Trash2Icon
                            onClick={handleCancel}
                            className={classes.icons}
                          />
                          <PlayIcon
                            className={classes.icons}
                            onClick={handleValidate}
                          />
                        </Box>
                      )}
                    </Box>
                  </Tabs>
                </Box>

                {/*  map the Product */}

                <Box className={classes.options}>
                  <TabPanel
                    value={value}
                    index={0}
                    style={{ backgroundColor: '#f2f2f2' }}
                  >
                    {reservation &&
                      (reservation.trip ? (
                        <OfferView
                          offer={reservation.trip}
                          departureDate={reservation.departureDate}
                        />
                      ) : (
                        <CustomerTripView
                          offer={reservation.customTrip}
                        />
                      ))}
                  </TabPanel>
                  <TabPanel
                    value={value}
                    index={1}
                    style={{ backgroundColor: '#f2f2f2' }}
                  >
                    {reservation && !reservation.visitor && (
                      <Typography
                        variant='h3'
                        style={{ width: '100%', marginTop: '3rem' }}
                      >
                        {t('Visitor No Longer Exists')}
                      </Typography>
                    )}
                    {reservation?.visitor && (
                      <>
                        <Box className={classes.header}>
                          <Typography variant='h4'>
                            {t('Client Area')}
                          </Typography>
                          <div style={{ display: 'flex' }}>
                            <Typography
                              variant='h5'
                              style={{ margin: '0px 10px 0px' }}
                            >
                              {t('Number')}
                            </Typography>
                            <Paper
                              style={{
                                height: 25,
                                textAlign: 'right',
                                padding: 4,
                              }}
                            >
                              {' '}
                              {reservation.visitor._id}
                            </Paper>
                          </div>

                          <Box>
                            <Typography variant='h5'>
                              <bold
                                style={{
                                  fontSize: 28,
                                  fontWeight: 'bold ',
                                  fontStyle: 'italic',
                                  margin: 5,
                                }}
                              >
                                {reservation.visitor.loyaltyPoints}
                              </bold>
                              Points
                            </Typography>
                          </Box>
                          <Box>
                            <Button
                              variant='outlined'
                              size='medium'
                              style={{
                                color: 'black',
                                border: '1px solid #111111',
                                backgroundColor: '#c6c6c6',
                                minWidth: 140,
                              }}
                              onClick={handleModifyCustomer}
                            >
                              {t('MODIFY')}
                            </Button>
                          </Box>
                        </Box>
                        <Box
                          style={{
                            display: 'flex',
                            // justifyContent: 'space-between',
                            alignItems: 'center',
                            width: '100%',
                          }}
                        >
                          <Typography
                            variant='h5'
                            style={{ width: '25%' }}
                          >
                            {t('Civility')}
                          </Typography>
                          <FormControl component='fieldset'>
                            <RadioGroup
                              row
                              aria-label='gender'
                              name='row-radio-buttons-group'
                              value={reservation?.visitor?.pronoun}
                            >
                              <FormControlLabel
                                value='Mr'
                                control={<Radio />}
                                label={t('Mr')}
                              />
                              <FormControlLabel
                                value='Mrs'
                                control={<Radio />}
                                label={t('Mrs')}
                              />
                              <FormControlLabel
                                value='Ms'
                                control={<Radio />}
                                label={t('Ms')}
                              />
                            </RadioGroup>
                          </FormControl>
                        </Box>
                        {reservation?.visitor && (
                          <UserInfo
                            classes={classes}
                            reservationUser={reservation.visitor}
                            isVisitor
                          />
                        )}

                        {reservation?.visitor && (
                          <>
                            <Typography
                              variant='h3'
                              style={{
                                width: '100%',
                                marginTop: '3rem',
                              }}
                            >
                              {t('Attachments')}
                            </Typography>
                            <Grid container spacing={3}>
                              <Grid item md={9}>
                                <CarouselLayout>
                                  {attachments.map(
                                    (attachment, i) => (
                                      <div
                                        key={attachment._id}
                                        className={
                                          classes.carouselCard
                                        }
                                      >
                                        <CardMedia
                                          style={{ height: '10rem' }}
                                          image={attachment.image}
                                          title='Live from space album cover'
                                        />
                                        <Box
                                          style={{
                                            display: 'flex',
                                            justifyContent:
                                              'flex-end',
                                            alignItems: 'center',
                                          }}
                                        >
                                          <Button
                                            color='error'
                                            startIcon={<Delete />}
                                            onClick={handleDeleteAttachment.bind(
                                              this,
                                              attachment._id
                                            )}
                                          ></Button>
                                        </Box>
                                      </div>
                                    )
                                  )}
                                  {/* one */}
                                </CarouselLayout>
                              </Grid>
                              <Grid item md={3}>
                                <Box
                                  style={{
                                    backgroundColor: '#808080',
                                    borderRadius: '10px',
                                  }}
                                >
                                  <Box style={{ padding: '0.2rem' }}>
                                    <Box>
                                      <input
                                        accept='image/*'
                                        style={{ display: 'none' }}
                                        id='contained-button-file'
                                        type='file'
                                        onChange={
                                          handleAttachmentChange
                                        }
                                        disabled={isImageUploading}
                                      />
                                      <LoadingOverlay
                                        active={isImageUploading}
                                        spinner
                                        text={uploadingText}
                                      >
                                        <label htmlFor='contained-button-file'>
                                          <Box
                                            className={classes.image}
                                          >
                                            <Box>
                                              <PlusIcon
                                                size={35}
                                                style={{
                                                  color: '#fff',
                                                }}
                                              />
                                              <FileIcon
                                                size={35}
                                                style={{
                                                  color: '#fff',
                                                }}
                                              />
                                            </Box>
                                            <Box
                                              style={{
                                                textAlign: 'center',
                                              }}
                                            >
                                              <Typography
                                                style={{
                                                  color: '#fff',
                                                }}
                                              >
                                                {t('Upload Document')}
                                              </Typography>
                                            </Box>
                                          </Box>
                                        </label>
                                      </LoadingOverlay>
                                    </Box>
                                  </Box>
                                </Box>
                              </Grid>
                            </Grid>
                          </>
                        )}
                      </>
                    )}
                  </TabPanel>

                  {reservation?.type === 'reserveForAnother' && (
                    <TabPanel
                      value={value}
                      index={2}
                      style={{ backgroundColor: '#f2f2f2' }}
                    >
                      <UserInfo
                        classes={classes}
                        reservationUser={{ ...reservation }}
                      />
                    </TabPanel>
                  )}
                  <TabPanel
                    value={value}
                    index={
                      reservation?.type === 'reserveForAnother'
                        ? 3
                        : 2
                    }
                    style={{ backgroundColor: '#f2f2f2' }}
                  >
                    <PaymentsTable
                      purchaseAmounts={[
                        reservation?.totalAmount || 0,
                        reservation?.paidAmount || 0,
                      ]}
                      purchaseId={reservation?._id}
                      data={reservation?.payments}
                      classes={classes}
                    />
                  </TabPanel>
                  <TabPanel
                    value={value}
                    index={
                      reservation?.type === 'reserveForAnother'
                        ? 4
                        : 3
                    }
                    style={{ backgroundColor: '#f2f2f2' }}
                  >
                    <TravelersTable
                      data={reservation?.travelers}
                      classes={classes}
                    />
                  </TabPanel>
                </Box>
              </Box>
            </Box>
          )}

          {/*  Dialog */}
          <AddDepartureDialog
            open={isDatesModalOpen}
            toggleDialog={toggleIsDatesModalOpen}
            success={handleAddDates}
          />
        </div>
      )}
    </Container>
  );
};

export default DetailReservation;
