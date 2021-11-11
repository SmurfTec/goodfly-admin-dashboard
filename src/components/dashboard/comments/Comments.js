import React from 'react';
import { makeStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import {
  Box,
  Tab,
  Tabs,
  Typography,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TableRow,
  TableHead,
  Avatar,
  Table,
  TableContainer,
  TableCell,
  TableBody,
  TablePagination,
  Paper,
} from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import v4 from 'uuid/dist/v4';
import { a11yProps, TabPanel } from 'components/common/TabPanel';

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData(
    'muhammadzain8@gmail.com',
    'aa Set applied to the cell. The prop defaults to the value  in the p  The prop defaults to the value  in the p adding applied to the cell. The prop defaults to the value  in the padding applied to the cell. The prop defaults to the value  in inherited from the parent Table component.',

    'Formule Maroc 2020',
    '04/06/2019'
  ),
  createData(
    'muhammadzain8@gmail.com',
    'aa Set applied to the cell. The prop defaults to the value  in the p  The prop defaults to the value  in the p adding applied to the cell. The prop defaults to the value  in the padding applied to the cell. The prop defaults to the value  in inherited from the parent Table component.',

    'Formule Maroc 2020',
    '04/06/2019'
  ),
  createData(
    'muhammadzain8@gmail.com',
    'aa Set applied to the cell. The prop defaults to the value  in the p  The prop defaults to the value  in the p adding applied to the cell. The prop defaults to the value  in the padding applied to the cell. The prop defaults to the value  in inherited from the parent Table component.',

    'Formule Maroc 2020',
    '04/06/2019'
  ),
  createData(
    'muhammadzain8@gmail.com',
    'aa Set applied to the cell. The prop defaults to the value  in the p  The prop defaults to the value  in the p adding applied to the cell. The prop defaults to the value  in the padding applied to the cell. The prop defaults to the value  in inherited from the parent Table component.',

    'Formule Maroc 2020',
    '04/06/2019'
  ),
  createData(
    'muhammadzain8@gmail.com',
    'aa Set applied to the cell. The prop defaults to the value  in the p  The prop defaults to the value  in the p adding applied to the cell. The prop defaults to the value  in the padding applied to the cell. The prop defaults to the value  in inherited from the parent Table component.',

    'Formule Maroc 2020',
    '04/06/2019'
  ),
  createData(
    'muhammadzain8@gmail.com',
    'aa Set applied to the cell. The prop defaults to the value  in the p  The prop defaults to the value  in the p adding applied to the cell. The prop defaults to the value  in the padding applied to the cell. The prop defaults to the value  in inherited from the parent Table component.',

    'Formule Maroc 2020',
    '04/06/2019'
  ),
  createData(
    'muhammadzain8@gmail.com',
    'aa Set applied to the cell. The prop defaults to the value  in the p  The prop defaults to the value  in the p adding applied to the cell. The prop defaults to the value  in the padding applied to the cell. The prop defaults to the value  in inherited from the parent Table component.',

    'Formule Maroc 2020',
    '04/06/2019'
  ),
];
const styles = makeStyles((theme) => ({
  options: {
    backgroundColor: '#f2f2f2',
    padding: '1rem',
    minHeight: '20rem',
  },
  options2: {
    backgroundColor: '#fff',
    minHeight: '20rem',
  },

  flexBetween: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: '1rem',
  },
  flexAround: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    margin: '1rem',
  },
  flexLeft: {
    display: 'flex',
    justifyContent: 'left',
    alignItems: 'center',
  },
  root: {
    '& .css-cnltht-MuiTableCell-root': {
      padding: '8px',
    },
  },
}));

const Comments = () => {
  const classes = styles();

  const [value, setValue] = React.useState(0);

  const [payment, setPayment] = React.useState(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const openPayment = () => {
    setPayment(true);
  };

  const closePayment = () => {
    setPayment(false);
  };
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div style={{ margin: '3rem 0rem 1rem' }}>
      <Typography variant='h4' m={2}>
        Opinions & Comments
      </Typography>
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
              centered
              style={{
                backgroundColor: 'white',
              }}
            >
              <Tab label='Opinion' {...a11yProps(0)} />
              <Tab label='Comments' {...a11yProps(1)} />
            </Tabs>
          </Box>

          {/*  map the Product */}

          <Box className={classes.options}>
            <TabPanel value={value} index={0}>
              <Box className={classes.flexLeft}>
                <Button m={1}>Tours(14)</Button>
                <Button m={1}>Waiting(3)</Button>
                <Button m={1}>Approved(11)</Button>
                <Button m={1}>Undesirable(0)</Button>
                <Button m={1}>Basket(2)</Button>
              </Box>
              <Box mt={3}></Box>

              <TableContainer component={Paper} className={classes.root}>
                <Table sx={{ minWidth: 650 }} aria-label='simple table'>
                  <TableHead>
                    <TableRow>
                      <TableCell align='center'>Author</TableCell>
                      <TableCell align='center'>Comments</TableCell>
                      <TableCell align='center'>Response</TableCell>
                      <TableCell align='center'>Date</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((row) => (
                        <TableRow
                          key={row.name}
                          sx={{
                            '&:last-child td, &:last-child th': {
                              border: 0,
                            },
                          }}
                        >
                          <TableCell
                            component='th'
                            scope='row'
                            style={{
                              minWidth: '10rem',
                            }}
                          >
                            {/* {row.name} */}
                            {row.name}
                          </TableCell>
                          <TableCell align='left'>
                            {row.calories}
                            <Box className={classes.flexLeft} m={2}>
                              <Button mr={1} style={{ color: 'green' }}>
                                Approve
                              </Button>
                              <Button mr={1}>Reply</Button>
                              <Button mr={1}>Modify</Button>
                              <Button mr={1}>Undesirable</Button>
                              <Button mr={1} style={{ color: 'red' }}>
                                Basket
                              </Button>
                            </Box>
                          </TableCell>
                          <TableCell
                            align='center'
                            style={{
                              minWidth: '10rem',
                            }}
                          >
                            {row.fat}
                          </TableCell>
                          <TableCell
                            align='center'
                            style={{
                              minWidth: '10rem',
                            }}
                          >
                            {row.carbs}
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
                  style={{ marginTop: '1rem' }}
                  rowsPerPageOptions={[5, 10, 15]}
                  component='div'
                  count={rows.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </TableContainer>
            </TabPanel>
            <TabPanel value={value} index={1}>
              comments
            </TabPanel>
          </Box>
        </Box>
      </Box>

      {/*  Dialog */}

      <Button onClick={openPayment}> Dialog ????</Button>

      <div>
        <Dialog open={payment} fullWidth onClose={closePayment}>
          <DialogTitle>
            <Typography variant='h5'>Comment 04/06/2021</Typography>
          </DialogTitle>
          <DialogContent>
            <Box className={classes.flexBetween}>
              <Box className={classes.flexBetween} style={{ margin: 0 }}>
                <Avatar
                  alt='Cindy Baker'
                  src='/static/images/avatar/3.jpg'
                  sx={{ width: 70, height: 70 }}
                  style={{ margin: '1rem 0.5rem 1rem 0rem' }}
                />
                <Box style={{ display: 'inline-grid' }}>
                  <Typography variant='h5'> Muhammad Zain</Typography>
                  <Typography variant='text'>Client 31312</Typography>
                  <Typography varaint='text' color='primary'>
                    Show customer
                  </Typography>
                </Box>
              </Box>
              <Box className={classes.flexBetween} style={{ margin: 0 }}>
                <Box
                  style={{
                    display: 'inline-grid',
                    alignItems: 'center',
                  }}
                >
                  <Typography variant='h5'> Muhammad Zain</Typography>
                  <Typography variant='text'>Client 31312</Typography>
                  <Typography varaint='text' color='primary'>
                    Show page
                  </Typography>
                </Box>
                <Avatar
                  alt='Cindy Baker'
                  src='/static/images/avatar/3.jpg'
                  sx={{ width: 70, height: 70 }}
                  style={{ margin: '1rem 1rem 1rem 0.5rem' }}
                />
              </Box>
            </Box>
            <Box style={{ display: 'inline-grid' }}>
              <Typography variant='text'> 4 jun 2021 a 23H52</Typography>
              <Typography variant='text' mt={2} style={{ minHeight: '5rem' }}>
                Set applied to the cell. The prop defaults to the value in the p
                The prop defaults to the value in the p adding appli
              </Typography>
            </Box>
          </DialogContent>
          <Divider />
          <DialogActions className={classes.flexBetween}>
            <Box>
              <Button mr={1} style={{ color: 'green' }}>
                Approve
              </Button>
              <Button mr={1}>Reply</Button>
              <Button mr={1}>Modify</Button>
              <Button mr={1}>Undesirable</Button>
              <Button mr={1} style={{ color: 'red' }}>
                Basket
              </Button>
            </Box>
            <Box>
              <Button variant='outlined' onClick={closePayment}>
                Cancel
              </Button>
            </Box>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};

export default Comments;
