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
  Table,
  TableContainer,
  TableCell,
  TableBody,
  Paper,
} from '@material-ui/core';
import Divider from '@material-ui/core/Divider';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

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
    minHeight: '25rem',
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
  // cell:{
  //   '& .MuiTableCell-body':{
  //     border:'1px solid green',
  //     minHeight:'100px',
  //   }
  // }
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
              <Tab label='Avis' {...a11yProps(0)} />
              <Tab label='Comments' {...a11yProps(1)} />
            </Tabs>
          </Box>

          {/*  map the Product */}

          <Box className={classes.options}>
            <TabPanel value={value} index={0}>
              <Box className={classes.flexLeft}>
                <Typography variant='h5' m={1}>
                  Tours(14)
                </Typography>
                <Typography variant='h5' m={1}>
                  Waiting(3)
                </Typography>
                <Typography variant='h5' m={1}>
                  Approved(11)
                </Typography>
                <Typography variant='h5' m={1}>
                  Undesirable(0)
                </Typography>
                <Typography variant='h5' m={1}>
                  Basket(2)
                </Typography>
              </Box>
              <Box mt={3}></Box>

              <TableContainer
                component={Paper}
                className={classes.root}
              >
                <Table
                  sx={{ minWidth: 650 }}
                  aria-label='simple table'
                >
                  <TableHead>
                    <TableRow>
                      <TableCell align='center'>Author</TableCell>
                      <TableCell align='center'>Comments</TableCell>
                      <TableCell align='center'>Response</TableCell>
                      <TableCell align='center'>Date</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((row) => (
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
                          {row.name}
                        </TableCell>
                        <TableCell align='left'>
                          {row.calories}
                          <Box className={classes.flexLeft} m={2}>
                            <Typography variant='h5' mr={1} style={{color:'green'}}>
                              Approve
                            </Typography>
                            <Typography variant='h5' mr={1}>
                              Reply
                            </Typography>
                            <Typography variant='h5' mr={1}>
                              Modify
                            </Typography>
                            <Typography variant='h5' mr={1}>
                              Undesirable
                            </Typography>
                            <Typography variant='h5' mr={1} style={{color:'red'}}>
                              Basket
                            </Typography>
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
                  </TableBody>
                </Table>
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
        <Dialog open={payment} maxWidth='lg' onClose={closePayment}>
          <DialogTitle>
            <Typography variant='h4'>
              Payment of the due date Ref : GF125487
            </Typography>
          </DialogTitle>
          <DialogContent>content</DialogContent>
          <DialogActions>
            <Button variant='outlined' onClick={closePayment}>
              Cancel
            </Button>
            <Button variant='contained' onClick={closePayment}>
              Validate
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};

export default Comments;
