import React from 'react';
import { Box, Typography, Grid, TextField } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

const UserInfo = ({ reservationUser, classes, isVisitor, toPrint = false }) => {
  const { t } = useTranslation();
  return (
    <Grid container spacing={2}>
      <Grid item md={5}>
        <Box className={classes.inputBox}>
          <Typography variant='h5' className={classes.typo}>
            {t('First Name')}
          </Typography>
          <TextField
            hiddenLabel
            id='filled-hidden-label-small'
            value={reservationUser.firstName}
            size='small'
            className={classes.textInput}
          />
        </Box>
        <Box className={classes.inputBox}>
          <Typography variant='h5' className={classes.typo}>
            {t('Last Name')}
          </Typography>
          <TextField
            hiddenLabel
            id='filled-hidden-label-small'
            value={reservationUser.lastName}
            size='small'
            className={classes.textInput}
          />
        </Box>
        {isVisitor && !toPrint && (
          <Box className={classes.inputBox}>
            <Typography variant='h5' className={classes.typo}>
              {t('Spouse Name')}
            </Typography>
            <TextField
              hiddenLabel
              id='filled-hidden-label-small'
              value={reservationUser.spouseName}
              size='small'
              className={classes.textInput}
            />
          </Box>
        )}
        <Box m={5}></Box>
        <Box className={classes.inputBox}>
          <Typography variant='h5' className={classes.typo}>
            {t('Address')}
          </Typography>
          <TextField
            hiddenLabel
            id='filled-hidden-label-small'
            value={reservationUser.address}
            size='small'
            className={classes.textInput}
          />
        </Box>
        <Box className={classes.inputBox}>
          <Typography variant='h5' className={classes.typo}>
            {t('Additional Address')}
          </Typography>
          <TextField
            hiddenLabel
            id='filled-hidden-label-small'
            value={reservationUser.additionalAddress}
            size='small'
            className={classes.textInput}
          />
        </Box>
        {isVisitor && (
          <Box className={classes.inputBox}>
            <Typography variant='h5' className={classes.typo}>
              {t('Postal-Code')}
            </Typography>
            <TextField
              hiddenLabel
              id='filled-hidden-label-small'
              value={reservationUser.postalCode}
              size='small'
              className={classes.textInput}
            />
          </Box>
        )}
        <Box className={classes.inputBox}>
          <Typography variant='h5' className={classes.typo}>
            {t('City')}
          </Typography>
          <TextField
            hiddenLabel
            id='filled-hidden-label-small'
            value={reservationUser.city}
            size='small'
            className={classes.textInput}
          />
        </Box>
        {!toPrint && <Box m={11}></Box>}
        <Box className={classes.inputBox}>
          <Typography variant='h5' className={classes.typo}>
            {t('Country')}
          </Typography>
          <TextField
            hiddenLabel
            id='filled-hidden-label-small'
            value={reservationUser.country}
            size='small'
            className={classes.textInput}
          />
        </Box>
        {isVisitor && !toPrint && (
          <Box className={classes.inputBox}>
            <Typography variant='h5' className={classes.typo}>
              Facebook
            </Typography>
            <TextField
              hiddenLabel
              id='filled-hidden-label-small'
              value={reservationUser.facebookProfile}
              size='small'
              className={classes.textInput}
            />
          </Box>
        )}
      </Grid>
      <Grid item md={1}></Grid>
      <Grid item md={6}>
        <Box className={classes.inputBox}>
          <Typography variant='h5' className={classes.typo}>
            {t('Email')}
          </Typography>
          <TextField
            hiddenLabel
            id='filled-hidden-label-small'
            value={reservationUser.email}
            size='small'
            className={classes.textInput}
          />
        </Box>
        {isVisitor && (
          <Box className={classes.inputBox}>
            <Typography variant='h5' className={classes.typo}>
              {t('Mobile')}
            </Typography>
            <TextField
              hiddenLabel
              id='filled-hidden-label-small'
              value={reservationUser.telephoneNumber}
              size='small'
              className={classes.textInput}
            />
          </Box>
        )}
        <Box m={5}></Box>
        <Box className={classes.inputBox}>
          <Typography variant='h5' className={classes.typo}>
            {t('Date of Birth')}
          </Typography>
          <TextField
            hiddenLabel
            id='filled-hidden-label-small'
            value={new Date(reservationUser.dateOfBirth).toLocaleDateString()}
            size='small'
            className={classes.textInput}
          />
        </Box>
        {isVisitor && (
          <Box className={classes.inputBox}>
            <Typography variant='h5' className={classes.typo}>
              {t('Nationality')}
            </Typography>
            <TextField
              hiddenLabel
              id='filled-hidden-label-small'
              value={reservationUser.nationality}
              size='small'
              className={classes.textInput}
            />
          </Box>
        )}
        <Box className={classes.inputBox}>
          <Typography variant='h5' className={classes.typo}>
            {t('Passport No')}
          </Typography>
          <TextField
            hiddenLabel
            id='filled-hidden-label-small'
            value={reservationUser.passportNumber}
            size='small'
            className={classes.textInput}
          />
        </Box>
        {isVisitor && !toPrint && (
          <>
            <Box className={classes.inputBox}>
              <Typography variant='h5' className={classes.typo}>
                {t('Date of Issue')}
              </Typography>
              <TextField
                hiddenLabel
                id='filled-hidden-label-small'
                value={reservationUser.passportDateOfIssue}
                size='small'
                className={classes.textInput}
              />
            </Box>
            <Box className={classes.inputBox}>
              <Typography variant='h5' className={classes.typo}>
                {t('Place of Issue')}
              </Typography>
              <TextField
                hiddenLabel
                id='filled-hidden-label-small'
                value={reservationUser.passportPlaceOfIssue}
                size='small'
                className={classes.textInput}
              />
            </Box>
            <Box m={5}></Box>
            <Box className={classes.inputBox}>
              <Typography variant='h5' className={classes.typo}>
                Twitter
              </Typography>
              <TextField
                hiddenLabel
                id='filled-hidden-label-small'
                value={reservationUser.twitterProfile}
                size='small'
                className={classes.textInput}
              />
            </Box>
            <Box className={classes.inputBox}>
              <Typography variant='h5' className={classes.typo}>
                Snapchat
              </Typography>
              <TextField
                hiddenLabel
                id='filled-hidden-label-small'
                value={reservationUser.snapChatProfile}
                size='small'
                className={classes.textInput}
              />
            </Box>
          </>
        )}
      </Grid>
    </Grid>
  );
};

export default UserInfo;
