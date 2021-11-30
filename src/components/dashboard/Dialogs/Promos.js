import React from 'react';
import { makeStyles } from '@material-ui/styles';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  DialogActions,
  DialogContent,
  TextField,
  Tooltip,
  Typography,
  useTheme,
  Box,
  IconButton,
} from '@material-ui/core';
import { useManyInputs } from 'hooks';
import { toast } from 'react-toastify';
import { getMuiDateFormat } from 'utils/dateMethods';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { handleCatch, makeReq } from 'utils/makeReq';

const useStyles = makeStyles({
  root: {
    '& .MuiDialogContent-root': {
      paddingTop: 20,
    },
  },
  List: {
    '& span': {
      fontFamily: 'sans-serif',
    },
  },
});

export default function PromosDialog(props) {
  const { open, success, promos, toggleDialog, deletePromo } = props;
  const classes = useStyles();
  const theme = useTheme();

  const initialState = {
    promoExpires: getMuiDateFormat(new Date()),
    limit: 0,
    discountPercentage: 10,
  };

  const [state, handleTxtChange, , , resetState] = useManyInputs(initialState);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (new Date(state.returnDate) <= new Date())
      return toast.error('Promo must NOT be in past');

    success({
      promoExpires: new Date(state.promoExpires),
      limit: state.limit,
      discountPercentage: state.discountPercentage,
    });
    resetState();
  };

  return (
    <Dialog
      aria-labelledby='simple-dialog-title'
      open={open}
      className={classes.root}
      onClose={toggleDialog}
    >
      <DialogTitle id='simple-dialog-title' className={classes.Title}>
        Create PromoCode
      </DialogTitle>
      <DialogContent>
        <form id='form' onSubmit={handleSubmit}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: '20px',
            }}
          >
            <TextField
              variant='outlined'
              value={state.promoExpires}
              onChange={handleTxtChange}
              name='promoExpires'
              label='Promo Expire Date'
              type='date'
              sx={{ marginBottom: 2, flexGrow: 1 }}
            />
            <TextField
              variant='outlined'
              value={state.limit}
              onChange={handleTxtChange}
              name='limit'
              label='Promo Usage Limit'
              type='number'
              inputProps={{ min: 1 }}
              sx={{ marginBottom: 2, flexGrow: 1 }}
            />
          </Box>
          <TextField
            variant='outlined'
            value={state.discountPercentage}
            onChange={handleTxtChange}
            name='discountPercentage'
            fullWidth
            label='Promo Discount Percentage'
            type='number'
            inputProps={{ min: 1, max: 100 }}
          />
        </form>

        <Typography variant='h5' sx={{ marginBlock: '1rem' }}>
          Promo Codes
        </Typography>
        {promos && (
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label='simple table'>
              <TableHead>
                <TableRow>
                  <TableCell>Promo Code</TableCell>
                  <TableCell align='center'>Discount Percentage</TableCell>
                  <TableCell align='center'>Limit</TableCell>
                  <TableCell align='center'>Expiry Date</TableCell>
                  <TableCell align='center'>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {promos.map((row) => (
                  <TableRow
                    key={row._id}
                    sx={{
                      '&:last-child td, &:last-child th': { border: 0 },
                    }}
                  >
                    <CopyToClipboard
                      text={row.promoCode}
                      onCopy={() => toast.info('Copied')}
                    >
                      <Tooltip placement='top' title='Copy'>
                        <TableCell
                          sx={{
                            cursor: 'pointer',
                            ':hover': {
                              color: theme.palette.success.main,
                            },
                          }}
                          component='th'
                          scope='row'
                        >
                          {row.promoCode.slice(0, 30)}
                        </TableCell>
                      </Tooltip>
                    </CopyToClipboard>
                    <TableCell align='center'>
                      {row.discountPercentage} %
                    </TableCell>
                    <TableCell align='center'>{row.limit}</TableCell>
                    <TableCell align='center'>
                      {new Date(row.promoExpires).toLocaleString()}
                    </TableCell>
                    <TableCell align='center'>
                      <IconButton
                        color='error'
                        onClick={() => deletePromo(row._id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </DialogContent>
      <DialogActions>
        <Button variant='contained' color='success' type='submit' form='form'>
          Generate New Promo
        </Button>
        <Button variant='contained' color='error' onClick={toggleDialog}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}
