import React from 'react';
import { Box, Typography, Grid, TextField } from '@material-ui/core';

const UserInfo = ({ reservationUser, classes, isVisitor }) => {
  return (
    <Grid container>
      <Grid item md={5}>
        <Box className={classes.inputBox}>
          <Typography variant='h5' className={classes.typo}>
            firstName
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
            Last Name
          </Typography>
          <TextField
            hiddenLabel
            id='filled-hidden-label-small'
            value={reservationUser.lastName}
            size='small'
            className={classes.textInput}
          />
        </Box>
        {isVisitor && (
          <Box className={classes.inputBox}>
            <Typography variant='h5' className={classes.typo}>
              Spouse Name
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
            Address
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
            Additional Address
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
              Postal-Code
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
            City
          </Typography>
          <TextField
            hiddenLabel
            id='filled-hidden-label-small'
            value={reservationUser.city}
            size='small'
            className={classes.textInput}
          />
        </Box>
        <Box m={11}></Box>
        <Box className={classes.inputBox}>
          <Typography variant='h5' className={classes.typo}>
            Country
          </Typography>
          <TextField
            hiddenLabel
            id='filled-hidden-label-small'
            value={reservationUser.country}
            size='small'
            className={classes.textInput}
          />
        </Box>
        {isVisitor && (
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
            Email
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
              Mobile
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
            Date of Birth
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
              Nationality
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
            Passport No
          </Typography>
          <TextField
            hiddenLabel
            id='filled-hidden-label-small'
            value={reservationUser.passportNumber}
            size='small'
            className={classes.textInput}
          />
        </Box>
        {isVisitor && (
          <>
            <Box className={classes.inputBox}>
              <Typography variant='h5' className={classes.typo}>
                Date of issue
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
                Place of Issue
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
