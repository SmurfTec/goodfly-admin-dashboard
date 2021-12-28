import React, { useContext, useEffect, useState } from 'react';
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

  const [installments, handleInstallments, , setInstallments] =
    useTextInput('');

  // const handleIn

  useEffect(() => {
    if (loading) return;
    const newReservation = getReservationById(id);
    if (!newReservation) return setNotFound(true);

    setReservation(newReservation);
  }, [id, reservations, loading]);

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

  const handleValidate = () => {
    console.log(`reservationStatus`, reservationStatus);
    console.log(`installments`, installments);

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

  return (
    <Container>
      {notFound ? (
        <NotFound />
      ) : (
        <>
          <Typography variant='h4' m={1}>
            {loading ? (
              <Skeleton width='30%' />
            ) : (
              ` Reservation Reference : ${reservation?._id}`
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
              Reservation Status :
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
                  Reservation Status
                </InputLabel>

                <Select
                  labelId='demo-simple-select-label'
                  id='demo-simple-select'
                  value={reservationStatus}
                  // value={reservation.status}
                  label='Reservation Status'
                  onChange={handleReservationStatus}
                >
                  <MenuItem
                    value={'pre-reservation'}
                    disabled={
                      reservation?.status !== 'pre-reservation'
                    }
                  >
                    Pre Reservation
                  </MenuItem>
                  <MenuItem value={'validated'}>Validated</MenuItem>
                  <MenuItem
                    value={'schedule-inProgress'}
                    sx={{ display: 'none' }}
                  >
                    Schedule in Progress
                  </MenuItem>
                  <MenuItem
                    value={'reservation-paid'}
                    sx={{ display: 'none' }}
                  >
                    Finalized
                  </MenuItem>
                  <MenuItem
                    value={'archived'}
                    sx={{ display: 'none' }}
                  >
                    Archived
                  </MenuItem>
                  <MenuItem value={'cancelled'}>Cancelled</MenuItem>
                  <MenuItem
                    value={'cancellation-request'}
                    sx={{ display: 'none' }}
                  >
                    Cancellation Request
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
              Payment :{' '}
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
                  label='Total'
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
                    <Tab label='Offer' {...a11yProps(0)} />
                    <Tab label='Client' {...a11yProps(1)} />
                    <Tab label='Payment' {...a11yProps(2)} />

                    <Box
                      style={{
                        display: 'flex',
                        justifyContent: 'right',
                        alignItems: 'center',
                        width: '100%',
                        margin: '0rem 0.5rem 0rem',
                      }}
                    >
                      <Box>
                        <PrinterIcon className={classes.icons} />
                        <Trash2Icon className={classes.icons} />
                        <PlayIcon
                          className={classes.icons}
                          onClick={handleValidate}
                        />
                      </Box>
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
                        <OfferView offer={reservation.trip} />
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
                        Visitor No Longer Exists
                      </Typography>
                    )}
                    {reservation?.visitor && (
                      <>
                        <Box className={classes.header}>
                          <Typography variant='h4'>
                            Client Area
                          </Typography>
                          <div style={{ display: 'flex' }}>
                            <Typography
                              variant='h5'
                              style={{ margin: '0px 10px 0px' }}
                            >
                              Number
                            </Typography>
                            <Paper
                              style={{
                                width: 150,
                                height: 25,
                                textAlign: 'right',
                                padding: 4,
                              }}
                            >
                              {' '}
                              0001
                            </Paper>
                          </div>

                          <Box style={{ width: 155 }}>
                            <Typography variant='h5'>
                              {' '}
                              N Fidelite{' '}
                              <bold
                                style={{
                                  fontSize: 28,
                                  fontWeight: 'bold ',
                                  fontStyle: 'italic',
                                  margin: 2,
                                }}
                              >
                                827
                              </bold>{' '}
                            </Typography>
                          </Box>
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
                                1725
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
                              Modify
                            </Button>{' '}
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
                            Civilite
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
                                label='Mr'
                              />
                              <FormControlLabel
                                value='Mrs'
                                control={<Radio />}
                                label='Mrs'
                              />
                              <FormControlLabel
                                value='Ms'
                                control={<Radio />}
                                label='Ms'
                              />
                            </RadioGroup>
                          </FormControl>
                        </Box>
                        {reservation?.visitor && (
                          <Grid container>
                            <Grid item md={5}>
                              <Box className={classes.inputBox}>
                                <Typography
                                  variant='h5'
                                  className={classes.typo}
                                >
                                  firstName
                                </Typography>
                                <TextField
                                  hiddenLabel
                                  id='filled-hidden-label-small'
                                  value={
                                    reservation?.visitor.firstName
                                  }
                                  size='small'
                                  className={classes.textInput}
                                />
                              </Box>{' '}
                              <Box className={classes.inputBox}>
                                <Typography
                                  variant='h5'
                                  className={classes.typo}
                                >
                                  Last Name
                                </Typography>
                                <TextField
                                  hiddenLabel
                                  id='filled-hidden-label-small'
                                  value={
                                    reservation?.visitor.lastName
                                  }
                                  size='small'
                                  className={classes.textInput}
                                />
                              </Box>{' '}
                              <Box className={classes.inputBox}>
                                <Typography
                                  variant='h5'
                                  className={classes.typo}
                                >
                                  Spouse Name
                                </Typography>
                                <TextField
                                  hiddenLabel
                                  id='filled-hidden-label-small'
                                  value={
                                    reservation?.visitor.spouseName
                                  }
                                  size='small'
                                  className={classes.textInput}
                                />
                              </Box>{' '}
                              <Box m={5}></Box>
                              <Box className={classes.inputBox}>
                                <Typography
                                  variant='h5'
                                  className={classes.typo}
                                >
                                  Address
                                </Typography>
                                <TextField
                                  hiddenLabel
                                  id='filled-hidden-label-small'
                                  value={reservation?.visitor.address}
                                  size='small'
                                  className={classes.textInput}
                                />
                              </Box>{' '}
                              <Box className={classes.inputBox}>
                                <Typography
                                  variant='h5'
                                  className={classes.typo}
                                >
                                  Additional Address
                                </Typography>
                                <TextField
                                  hiddenLabel
                                  id='filled-hidden-label-small'
                                  value={
                                    reservation?.visitor
                                      .additionalAddress
                                  }
                                  size='small'
                                  className={classes.textInput}
                                />
                              </Box>{' '}
                              <Box className={classes.inputBox}>
                                <Typography
                                  variant='h5'
                                  className={classes.typo}
                                >
                                  Postal-Code
                                </Typography>
                                <TextField
                                  hiddenLabel
                                  id='filled-hidden-label-small'
                                  value={
                                    reservation?.visitor.postalCode
                                  }
                                  size='small'
                                  className={classes.textInput}
                                />
                              </Box>{' '}
                              <Box className={classes.inputBox}>
                                <Typography
                                  variant='h5'
                                  className={classes.typo}
                                >
                                  City
                                </Typography>
                                <TextField
                                  hiddenLabel
                                  id='filled-hidden-label-small'
                                  value={reservation?.visitor.city}
                                  size='small'
                                  className={classes.textInput}
                                />
                              </Box>{' '}
                              <Box m={11}></Box>
                              <Box className={classes.inputBox}>
                                <Typography
                                  variant='h5'
                                  className={classes.typo}
                                >
                                  Country
                                </Typography>
                                <TextField
                                  hiddenLabel
                                  id='filled-hidden-label-small'
                                  value={reservation?.visitor.country}
                                  size='small'
                                  className={classes.textInput}
                                />
                              </Box>{' '}
                              <Box className={classes.inputBox}>
                                <Typography
                                  variant='h5'
                                  className={classes.typo}
                                >
                                  Facebook
                                </Typography>
                                <TextField
                                  hiddenLabel
                                  id='filled-hidden-label-small'
                                  value={
                                    reservation?.visitor
                                      .facebookProfile
                                  }
                                  size='small'
                                  className={classes.textInput}
                                />
                              </Box>{' '}
                            </Grid>
                            <Grid item md={1}></Grid>
                            <Grid item md={6}>
                              <Box className={classes.inputBox}>
                                <Typography
                                  variant='h5'
                                  className={classes.typo}
                                >
                                  Email
                                </Typography>
                                <TextField
                                  hiddenLabel
                                  id='filled-hidden-label-small'
                                  value={reservation?.visitor.email}
                                  size='small'
                                  className={classes.textInput}
                                />
                              </Box>{' '}
                              <Box className={classes.inputBox}>
                                <Typography
                                  variant='h5'
                                  className={classes.typo}
                                >
                                  Mobile
                                </Typography>
                                <TextField
                                  hiddenLabel
                                  id='filled-hidden-label-small'
                                  value={
                                    reservation?.visitor
                                      .telephoneNumber
                                  }
                                  size='small'
                                  className={classes.textInput}
                                />
                              </Box>{' '}
                              <Box m={5}></Box>
                              <Box className={classes.inputBox}>
                                <Typography
                                  variant='h5'
                                  className={classes.typo}
                                >
                                  Date of Birth
                                </Typography>
                                <TextField
                                  hiddenLabel
                                  id='filled-hidden-label-small'
                                  value={new Date(
                                    reservation?.visitor.dateOfBirth
                                  ).toLocaleDateString()}
                                  size='small'
                                  className={classes.textInput}
                                />
                              </Box>{' '}
                              <Box className={classes.inputBox}>
                                <Typography
                                  variant='h5'
                                  className={classes.typo}
                                >
                                  Nationality
                                </Typography>
                                <TextField
                                  hiddenLabel
                                  id='filled-hidden-label-small'
                                  value={
                                    reservation?.visitor.nationality
                                  }
                                  size='small'
                                  className={classes.textInput}
                                />
                              </Box>{' '}
                              <Box className={classes.inputBox}>
                                <Typography
                                  variant='h5'
                                  className={classes.typo}
                                >
                                  Passport No
                                </Typography>
                                <TextField
                                  hiddenLabel
                                  id='filled-hidden-label-small'
                                  value={
                                    reservation?.visitor
                                      .passportNumber
                                  }
                                  size='small'
                                  className={classes.textInput}
                                />
                              </Box>{' '}
                              <Box className={classes.inputBox}>
                                <Typography
                                  variant='h5'
                                  className={classes.typo}
                                >
                                  Date of issue
                                </Typography>
                                <TextField
                                  hiddenLabel
                                  id='filled-hidden-label-small'
                                  value={
                                    reservation?.visitor
                                      .passportDateOfIssue
                                  }
                                  size='small'
                                  className={classes.textInput}
                                />
                              </Box>{' '}
                              <Box className={classes.inputBox}>
                                <Typography
                                  variant='h5'
                                  className={classes.typo}
                                >
                                  Place of Issue
                                </Typography>
                                <TextField
                                  hiddenLabel
                                  id='filled-hidden-label-small'
                                  value={
                                    reservation?.visitor
                                      .passportPlaceOfIssue
                                  }
                                  size='small'
                                  className={classes.textInput}
                                />
                              </Box>{' '}
                              <Box m={5}></Box>
                              <Box className={classes.inputBox}>
                                <Typography
                                  variant='h5'
                                  className={classes.typo}
                                >
                                  Twitter
                                </Typography>
                                <TextField
                                  hiddenLabel
                                  id='filled-hidden-label-small'
                                  value={
                                    reservation?.visitor
                                      .twitterProfile
                                  }
                                  size='small'
                                  className={classes.textInput}
                                />
                              </Box>{' '}
                              <Box className={classes.inputBox}>
                                <Typography
                                  variant='h5'
                                  className={classes.typo}
                                >
                                  Snapchat
                                </Typography>
                                <TextField
                                  hiddenLabel
                                  id='filled-hidden-label-small'
                                  value={
                                    reservation?.visitor
                                      .snapChatProfile
                                  }
                                  size='small'
                                  className={classes.textInput}
                                />
                              </Box>{' '}
                            </Grid>
                          </Grid>
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
                              Attachments
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
                                                Upload Document
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

                  <TabPanel
                    value={value}
                    index={2}
                    style={{ backgroundColor: '#f2f2f2' }}
                  >
                    <PaymentsTable
                      purchaseId={reservation?._id}
                      data={reservation?.payments}
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
        </>
      )}
    </Container>
  );
};

export default DetailReservation;
