import React, { useState, useEffect, useContext } from 'react';
import { makeStyles } from '@material-ui/styles';

import {
  Typography,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableContainer,
  TableCell,
  TableBody,
  Box,
  Button,
  TablePagination,
  TextField,
  Skeleton,
} from '@material-ui/core';
import { Search as SearchIcon } from 'react-feather';
import { Link } from 'react-router-dom';
import v4 from 'uuid/dist/v4';
import { StaffersContext } from 'Contexts/StaffersContext';
import useToggleInput from 'hooks/useToggleInput';
import { ConfirmDialog } from '../Dialogs';
import { useTranslation } from 'react-i18next';

const styles = makeStyles((theme) => ({
  main: {
    backgroundColor: '#f2f2f2',
    minHeight: '20rem',
    borderRadius: '0.8rem',
    padding: '1rem',
    margin: '2rem 1.5rem 2rem',
  },
  table: {
    margin: ' 2rem 1rem 1rem',
    padding: '1rem',
    width: 'inherit',
  },
  textInput: {
    width: '80%',
    backgroundColor: '#fff',
    marginBottom: 7,
  },
}));

const Staffers = () => {
  const classes = styles();
  const { staffers, deleteStaffer, loading } = useContext(StaffersContext);
  const { t } = useTranslation();

  const [currentDeleteId, setCurrentDeleteId] = useState();
  const [isDeleteOpen, toggleDeleteOpen] = useToggleInput();

  const [filter, setFilter] = useState('');
  const [filteredStaffers, setFilteredStaffers] = useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  useEffect(() => {
    setFilteredStaffers(staffers);
  }, [staffers]);

  // Avoid a layout jump when reaching the last page with empty rows.

  const emptyRows =
    rowsPerPage -
    Math.min(
      rowsPerPage,
      staffers === 'loading' ? 0 : staffers?.length - page * rowsPerPage
    );
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const handleSearch = (e) => {
    const data = e.target.value;
    setFilter(data);
    console.log(filter);
  };
  //  filtered
  useEffect(() => {
    setFilteredStaffers(
      staffers === 'loading'
        ? 'loading'
        : staffers?.filter(
            (row) =>
              row.fullName.toLowerCase().indexOf(filter.toLowerCase()) !== -1
          )
    );
  }, [filter]);

  const handleDelete = (id) => {
    // console.log(`id`, id);
    setCurrentDeleteId(id);
    toggleDeleteOpen();
  };

  const handleDeleteStaffer = () => {
    // console.log(`id`, id);
    deleteStaffer(currentDeleteId);
    toggleDeleteOpen();
  };

  return (
    <div>
      <Box
        display='flex'
        justifyContent='space-between'
        alignItems='center'
        m={2}
      >
        <Typography variant='h4' m={2}>
          {t('User Management')}
        </Typography>
        <Button
          variant='contained'
          style={{ width: '12rem' }}
          component={Link}
          to='/app/staffers/create'
        >
          {t('ADD A STAFFER')}
        </Button>
      </Box>
      <Box className={classes.main}>
        <Box
          style={{
            display: 'flex',
            justifyContent: 'right',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <Typography variant='text' style={{ margin: '0px 3px 0px' }}>
            {t('Search Staffers')}
          </Typography>
          <SearchIcon style={{ margin: '0px 3px 0px' }} />
          <TextField
            hiddenLabel
            id='filled-hidden-label-small'
            placeholder={t('staffer name')}
            size='small'
            style={{ margin: '0px 5px 0px', width: '30%' }}
            className={classes.textInput}
            value={filter}
            onChange={handleSearch}
          />
        </Box>

        {/*  TABLE  */}

        <TableContainer component={Paper} className={classes.table}>
          <Table sx={{ minWidth: 650 }} aria-label='simple table'>
            <TableHead>
              <TableRow>
                <TableCell>{t('Name')}</TableCell>
                <TableCell align='right'>{t('Reference')}</TableCell>
                <TableCell align='right'>{t('Date of Creation')}</TableCell>
                <TableCell align='right'>{t('Role')}</TableCell>
                <TableCell align='right'>{t('Emails')}</TableCell>
                <TableCell align='right'>{t('Telephone')}</TableCell>
                <TableCell align='right'>{t('Actions')}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading
                ? Array(5)
                    .fill()
                    .map(() => (
                      <TableRow key={v4()}>
                        <TableCell component='th' scope='row'>
                          <Skeleton />
                        </TableCell>
                        <TableCell align='right'>
                          {' '}
                          <Skeleton />
                        </TableCell>
                        <TableCell align='right'>
                          <Skeleton />
                        </TableCell>
                        <TableCell align='right'>
                          {' '}
                          <Skeleton />
                        </TableCell>
                        <TableCell align='right'>
                          {' '}
                          <Skeleton />
                        </TableCell>
                        <TableCell align='right'>
                          <Skeleton />
                        </TableCell>
                        <TableCell align='right'>
                          <Skeleton />
                          <Skeleton />
                        </TableCell>
                      </TableRow>
                    ))
                : filteredStaffers
                    ?.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                    .map((row, index) => (
                      <TableRow key={v4()}>
                        <TableCell component='th' scope='row'>
                          {row.fullName}
                        </TableCell>
                        <TableCell align='right'>{row._id}</TableCell>
                        <TableCell align='right'>
                          {' '}
                          {new Date(row.createdAt).toDateString()}
                        </TableCell>
                        <TableCell align='right'>{row.role}</TableCell>
                        <TableCell align='right'>{row.email}</TableCell>
                        <TableCell align='right'>
                          {row.telephoneNumber}
                        </TableCell>
                        <TableCell align='right'>
                          <Button
                            component={Link}
                            to={`/app/staffers/edit/${row._id}`}
                          >
                            {t('EDIT')}
                          </Button>
                          <Button
                            onClick={handleDelete.bind(this, row._id)}
                            style={{ color: 'red' }}
                          >
                            {t('DELETE')}
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[5, 10, 20]}
            component='div'
            count={staffers === 'loading' ? 0 : staffers?.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>
      </Box>
      <ConfirmDialog
        open={isDeleteOpen}
        toggleDialog={toggleDeleteOpen}
        success={handleDeleteStaffer}
        dialogTitle={`${t('Delete this Staffer')} ?`}
      />
    </div>
  );
};

export default Staffers;
