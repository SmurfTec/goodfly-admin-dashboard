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
  root: {
    '& .css-cnltht-MuiTableCell-root': {
      padding: '8px',
    },
  },
}));

const CreateOffer = () => {
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
                <Button m={1}>Tours(14)</Button>
                <Button m={1}>Waiting(3)</Button>
                <Button m={1}>Approved(11)</Button>
                <Button m={1}>Undesirable(0)</Button>
                <Button m={1}>Basket(2)</Button>
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
        <Dialog
          open={payment}
          fullWidth
          onClose={closePayment}
          className
        >
          <DialogTitle>
            <Typography variant='h5'>Comment 04/06/2021</Typography>
          </DialogTitle>
          <DialogContent>
            <Box className={classes.flexBetween}>
              <Box
                className={classes.flexBetween}
                style={{ margin: 0 }}
              >
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
              <Box
                className={classes.flexBetween}
                style={{ margin: 0 }}
              >
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
              <Typography variant='text'>
                {' '}
                4 jun 2021 a 23H52
              </Typography>
              <Typography
                variant='text'
                mt={2}
                style={{ minHeight: '5rem' }}
              >
                Set applied to the cell. The prop defaults to the
                value in the p The prop defaults to the value in the p
                adding appli
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

export default CreateOffer;

// import React from 'react';
// import { makeStyles } from '@material-ui/styles';
// import Box from '@material-ui/core/Box';
// import Typography from '@material-ui/core/Typography';
// import ParallaxSlide from '@mui-treasury/components/slide/parallax';

// const data = [
//   {
//     id: 1,
//     boxProps: {
//       bgcolor: '#c7ffcf',
//     },
//     title: 'Parallax #1',
//     subtitle: 'Parallax #2',
//   },
//   {
//     id: 2,
//     boxProps: {
//       bgcolor: '#ffcaa9',
//     },
//     title: 'Parallax #1',
//     subtitle: 'Parallax #2',
//   },
//   {
//     id: 3,
//     boxProps: {
//       bgcolor: '#c6d4ff',
//     },
//     title: 'Parallax #1',
//     subtitle: 'Parallax #2',
//   },
// ];

// const useStyles = makeStyles(() => ({
//   root: {
//     fontSize: 48,
//     fontWeight: 900,
//   },
// }));

// const CreateOffer = () => {
//   const classes = useStyles();

//   return (
//     <Box width={'20rem'} height={'20rem'}>
//       <ParallaxSlide>
//         {({ injectStyle }) =>
//           data.map(({ boxProps, title, subtitle, id }, i) => (
//             <Box key={id} {...boxProps}>
//               <Typography
//                 noWrap
//                 align={'center'}
//                 className={classes.root}
//                 style={injectStyle(i, 80)}
//               >
//                 {title}
//               </Typography>
//               <Typography
//                 noWrap
//                 align={'center'}
//                 className={classes.root}
//                 style={injectStyle(i, 40)}
//               >
//                 {subtitle}
//               </Typography>
//               <Typography align={'center'} className={classes.root}>
//                 Static Text
//               </Typography>
//             </Box>
//           ))
//         }
//       </ParallaxSlide>
//     </Box>
//   );
// };

// export default CreateOffer;

// import React from 'react';
// import cx from 'clsx';
// import { makeStyles } from '@material-ui/styles';
// import Typography from '@material-ui/core/Typography';
// import Button from '@material-ui/core/Button';
// import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
// import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
// import ParallaxSlide from '@mui-treasury/components/slide/parallax';
// import DotIndicator from '@mui-treasury/components/indicator/dot';
// import { useArrowDarkButtonStyles } from '@mui-treasury/styles/button/arrowDark';

// const CreateOffer = () => {
//   return (
//     <div>

//     </div>
//   )
// }

// export default CreateOffer

// const data = [
//   {
//     id: 1,
//     title: 'Huarache',
//     subtitle: 'Gripp',
//     image:
//       // eslint-disable-next-line max-len
//       'https://firebasestorage.googleapis.com/v0/b/mui-treasury.appspot.com/o/public%2Fshoes%2Fair-huarache-gripp.png?alt=media',
//   },
//   {
//     id: 2,
//     title: 'Air Max',
//     subtitle: '270 P',
//     image:
//       // eslint-disable-next-line max-len
//       'https://firebasestorage.googleapis.com/v0/b/mui-treasury.appspot.com/o/public%2Fshoes%2Fair-max-270.png?alt=media',
//   },
//   {
//     id: 3,
//     title: 'Air Max',
//     subtitle: 'Deluxe',
//     image:
//       // eslint-disable-next-line max-len
//       'https://firebasestorage.googleapis.com/v0/b/mui-treasury.appspot.com/o/public%2Fshoes%2Fair-max-deluxe.png?alt=media',
//   },
// ];

// const useStyles = makeStyles(({ palette, breakpoints, spacing }) => ({
//   root: {
//     // a must if you want to set arrows, indicator as absolute
//     position: 'relative',
//     width: '100%',
//   },
//   slide: {
//     perspective: 1000, // create perspective
//     overflow: 'hidden',
//     // relative is a must if you want to create overlapping layers in children
//     position: 'relative',
//     paddingTop: spacing(8),
//     [breakpoints.up('sm')]: {
//       paddingTop: spacing(10),
//     },
//     [breakpoints.up('md')]: {
//       paddingTop: spacing(14),
//     },
//   },
//   imageContainer: {
//     display: 'block',
//     position: 'relative',
//     zIndex: 2,
//     paddingBottom: '56.25%',
//   },
//   image: {
//     display: 'block',
//     position: 'absolute',
//     zIndex: 10,
//     width: '100%',
//     height: '100%',
//     objectFit: 'cover',
//     marginLeft: '12%',
//     [breakpoints.up('sm')]: {
//       marginLeft: '4%',
//     },
//   },
//   arrow: {
//     display: 'none',
//     position: 'absolute',
//     top: '50%',
//     transform: 'translateY(-50%)',
//     [breakpoints.up('sm')]: {
//       display: 'inline-flex',
//     },
//   },
//   arrowLeft: {
//     left: 0,
//     [breakpoints.up('lg')]: {
//       left: -64,
//     },
//   },
//   arrowRight: {
//     right: 0,
//     [breakpoints.up('lg')]: {
//       right: -64,
//     },
//   },
//   text: {
//     // shared style for text-top and text-bottom
//     fontFamily: 'Poppins, san-serif',
//     fontWeight: 900,
//     position: 'absolute',
//     color: palette.common.white,
//     padding: '0 8px',
//     transform: 'rotateY(45deg)',
//     lineHeight: 1.2,
//     [breakpoints.up('sm')]: {
//       padding: '0 16px',
//     },
//     [breakpoints.up('md')]: {
//       padding: '0 24px',
//     },
//   },
//   title: {
//     top: 20,
//     left: '20%',
//     height: '40%',
//     fontSize: 40,
//     zIndex: 1,
//     background:
//       'linear-gradient(0deg, rgba(255,255,255,0) 0%, #9c9c9c 100%)',
//     [breakpoints.up('sm')]: {
//       top: 40,
//       fontSize: 72,
//     },
//     [breakpoints.up('md')]: {
//       top: 52,
//       fontSize: 72,
//     },
//   },
//   subtitle: {
//     top: 60,
//     left: '0%',
//     height: '52%',
//     fontSize: 56,
//     zIndex: 2,
//     background:
//       'linear-gradient(0deg, rgba(255,255,255,0) 0%, #888888 100%)',
//     [breakpoints.up('sm')]: {
//       top: 112,
//       left: '6%',
//       fontSize: 96,
//     },
//     [breakpoints.up('md')]: {
//       top: 128,
//       fontSize: 104,
//     },
//   },
//   indicatorContainer: {
//     textAlign: 'center',
//   },
// }));

// const CreateOffer = () => {
//   const classes = useStyles();
//   const arrowStyles = useArrowDarkButtonStyles();
//   const createStyle = (slideIndex, fineIndex) => {
//     const diff = slideIndex - fineIndex;
//     if (Math.abs(diff) > 1) return {};
//     return {
//       transform: `rotateY(${(-diff + 1) * 45}deg)`,
//     };
//   };
//   // eslint-disable-next-line react/prop-types
//   const renderElements = ({ index, onChangeIndex }) => (
//     <>
//       <Button
//         className={cx(classes.arrow, classes.arrowLeft)}
//         classes={arrowStyles}
//         disabled={index === 0}
//         onClick={() => onChangeIndex(index - 1)}
//       >
//         <KeyboardArrowLeft />
//       </Button>
//       <Button
//         className={cx(classes.arrow, classes.arrowRight)}
//         classes={arrowStyles}
//         disabled={index === data.length - 1}
//         onClick={() => onChangeIndex(index + 1)}
//       >
//         <KeyboardArrowRight />
//       </Button>
//       <div className={classes.indicatorContainer}>
//         {data.map(({ id }, i) => (
//           <DotIndicator
// key={id}
//             active={i === index}
//             onClick={() => onChangeIndex(i)}
//           />
//         ))}
//       </div>
//     </>
//   );
//   const renderChildren = ({ injectStyle, fineIndex }) =>
//     data.map(({ id, title, subtitle, image }, i) => (
//       <div key={id} className={classes.slide}>
//         <Typography
//           noWrap
//           className={cx(classes.text, classes.title)}
//           style={{
//             ...injectStyle(i, 60),
//             ...createStyle(i, fineIndex),
//           }}
//         >
//           {title}
//         </Typography>
//         <Typography
//           noWrap
//           className={cx(classes.text, classes.subtitle)}
//           style={{
//             ...injectStyle(i, 40),
//             ...createStyle(i, fineIndex),
//           }}
//         >
//           {subtitle}
//         </Typography>
//         <div className={classes.imageContainer}>
//           <img className={classes.image} src={image} alt={'slide'} />
//         </div>
//       </div>
//     ));
//   return (
//     <div className={classes.root}>
//       <ParallaxSlide renderElements={renderElements}>
//         {renderChildren}
//       </ParallaxSlide>
//     </div>
//   );
// };

// export default CreateOffer;
