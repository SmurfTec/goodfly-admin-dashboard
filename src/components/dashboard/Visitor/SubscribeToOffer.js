import React, { useState, useEffect, useContext } from 'react';

// material
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import {
  Card,
  Table,
  Avatar,
  Button,
  TableRow,
  TableBody,
  TableCell,
  Typography,
  TableContainer,
  Checkbox,
  Box,
  Skeleton,
} from '@material-ui/core';
// components
import UserListHead from './UserListHead';
//

import { withStyles } from '@material-ui/styles';
import v4 from 'uuid/dist/v4';
import { useTranslation } from 'react-i18next';

const Styles = {
  Dialog: {
    '& .MuiDialog-paper': {
      maxWidth: 'unset',
      width: 800,
    },
  },
};

const SubscribeToOfferModal = (props) => {
  const { open, toggleDialog, offers, handleAdd } = props;
  const { t } = useTranslation();

  const tableHeadings = [
    { id: 'title', label: t('Title'), alignRight: false },
    // { id: 'image', label: 'Name', alignRight: false },
  ];

  const [selected, setSelected] = useState();

  useEffect(() => {
    if (!offers || offers === null) return;
  }, [offers]);

  const handleSubmit = (e) => {
    console.log('where');
    handleAdd(selected);
    setSelected(null);
    toggleDialog();
    e.preventDefault();
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={toggleDialog}
        aria-labelledby='form-dialog-title'
      >
        <DialogTitle id='form-dialog-title'>
          {t('Subscribe to an Offer')}
        </DialogTitle>
        <DialogContent>
          <Card>
            <TableContainer>
              <TableContainer>
                <UserListHead headLabel={tableHeadings} />

                <TableBody>
                  {offers
                    ? offers.map((row) => {
                        const { _id, title, image } = row;

                        return (
                          <TableRow
                            hover
                            key={_id}
                            tabIndex={-1}
                            role='checkbox'
                            selected={false}
                            aria-checked={false}
                            padd
                          >
                            <TableCell padding='checkbox'>
                              <Checkbox
                                checked={selected === _id}
                                onChange={() => setSelected(_id)}
                                // disabled={isAlreadyHere(targetId, row.employees)}
                              />
                            </TableCell>
                            <TableCell
                              component='th'
                              scope='row'
                              padding='normal'
                            >
                              <Box
                                style={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: 10,
                                }}
                              >
                                <Avatar alt={title} src={image} />
                                <Typography variant='subtitle2' noWrap>
                                  {title}
                                </Typography>
                              </Box>
                            </TableCell>
                          </TableRow>
                        );
                      })
                    : Array(5)
                        .fill()
                        .map(() => (
                          <TableRow key={v4()}>
                            <TableCell></TableCell>
                            <TableCell>
                              <Skeleton />
                            </TableCell>
                            <TableCell>
                              <Skeleton />
                            </TableCell>
                            <TableCell>
                              <Skeleton />
                            </TableCell>
                            <TableCell>
                              <Skeleton />
                            </TableCell>
                            <TableCell>
                              <Skeleton />
                            </TableCell>
                          </TableRow>
                        ))}
                </TableBody>
              </TableContainer>
            </TableContainer>
          </Card>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubmit} variant='contained' color='primary'>
            {t('ADD')}
          </Button>
          <Button onClick={toggleDialog} variant='contained' color='error'>
            {t('CANCEL')}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default withStyles(Styles)(SubscribeToOfferModal);
