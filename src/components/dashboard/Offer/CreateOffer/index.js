import React, { useContext, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Box, Tab, Tabs } from '@material-ui/core';
import OffersTabs from './OffersTabs';
import StagesTab from './StagesTab';
import FormalitiesTab from './FormalitiesTab';
import { OffersContext } from 'Contexts/OffersContext';
import { removeKeyIncludingString } from 'Utils/objectMethods';

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  options: {
    backgroundColor: '#f2f2f2',
    height: '100%',
  },
  rootContainer: {
    '&.css-19kzrtu': {
      padding: '10px',
    },
  },
  flexBetween: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  tabRoot: {
    '&.MuiTab-root': {
      // color: 'white',
      // backgroundColor: '#46B9F6',
    },
  },
  inputBox: {
    border: 0,
    outline: 0,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    marginTop: '1rem',
  },
  textInput: {
    width: '100%',
    backgroundColor: '#fff',
    marginBottom: 7,
  },
  stageDialog: {
    '& .MuiPaper-root': {
      maxWidth: '90%',
    },
  },
  cover: {
    width: '10rem',
    height: '6rem',
    borderRadius: '5px',
  },
  imgBackground: {
    backgroundColor: '#808080',
    borderRadius: '10px',
    width: '10rem',
    padding: '0.5rem',
    [theme.breakpoints.down('lg')]: {
      width: '8rem',
    },
  },
  dashes: {
    border: `2px dashed #fff`,
    borderRadius: '10px',
  },
  image: {
    height: '8rem',
    width: '10rem',
    [theme.breakpoints.up('lg')]: {
      width: '15rem',
      height: '10rem',
    },
  },
  carouselImages: {
    width: '12rem',
    height: '12rem',
    borderRadius: '5px',
    [theme.breakpoints.down('lg')]: {
      width: '8rem',
      height: '8rem',
    },
  },
  offerImage: {
    width: '17rem',
    height: '14rem',
    borderRadius: '5px',
    [theme.breakpoints.down('lg')]: {
      width: '8rem',
      height: '8rem',
    },
  },
  stageImage: {
    width: '24rem',
    height: '18rem',
    [theme.breakpoints.down('lg')]: {
      width: '14rem',
      height: '12rem',
    },
  },

  demo: {
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    margin: theme.spacing(4, 0, 2),
    padding: '1rem',
  },
  dateFields: {
    backgroundColor: '#fff',
    width: '40%',
    [theme.breakpoints.down('lg')]: {
      width: '48%',
    },
  },
}));

const CreateOffer = () => {
  const classes = useStyles();
  const { createOffer } = useContext(OffersContext);

  const [value, setValue] = useState(0);

  const [state, setState] = useState({});

  const gotoNextStep = () => {
    setValue((st) => st + 1);
  };

  const validateOffersTab = (data, resetData) => {
    console.log(`data`, data);
    setState(data);
    gotoNextStep();
  };

  const validateStagesTab = (data, resetData) => {
    console.log(`data`, data);
    setState((st) => ({ ...st, stages: data }));
    gotoNextStep();
  };

  const validateFormalitiesTab = (data, resetData) => {
    console.log(`data`, data);
    // setState((st) => ({ ...st, formalities: data }));
    let newOffer = {
      ...state,
      formalities: data,
    };

    console.log(`newOffer before`, newOffer);

    // * Fix Services
    let servicesArr = Object.entries(newOffer.services);
    servicesArr = servicesArr.filter(([key, value]) => !!value);
    servicesArr = servicesArr.map(([key, val]) => key);
    newOffer = {
      ...newOffer,
      services: servicesArr,
    };

    // * If No dates, no need to send starting and ending date
    if (newOffer.isDates === 'no') {
      removeKeyIncludingString(newOffer, 'startingDate');
      removeKeyIncludingString(newOffer, 'endingDate');
    }
    // * Same with place
    if (newOffer.isDeparturePlace === 'no') {
      removeKeyIncludingString(newOffer, 'departurePlace');
      removeKeyIncludingString(newOffer, 'destination');
    }
    removeKeyIncludingString(newOffer, 'isDates');
    removeKeyIncludingString(newOffer, 'isDeparturePlace');

    console.log(`newOffer after`, newOffer);
    createOffer(newOffer);
    // gotoNextStep();
  };

  return (
    <div style={{ margin: '3rem 0rem 1rem' }}>
      <Box
        style={{
          minHeight: '25rem',
          margin: '2rem 1rem 0rem',
        }}
      >
        <Box sx={{ width: '100%' }}>
          <Box
            sx={{
              borderBottom: 1,
              borderColor: 'divider',
            }}
          >
            <Tabs
              value={value}
              // onChange={(newValue) => setValue(newValue)}
              aria-label='basic tabs example'
              indicatorColor='primary'
              centered
            >
              <Tab
                disableFocusRipple
                disableRipple
                sx={{ cursor: 'unset' }}
                label='Offer'
                {...a11yProps(0)}
                className={classes.tabRoot}
              />
              <Tab
                disableFocusRipple
                disableRipple
                label='Stages'
                sx={{ cursor: 'unset' }}
                {...a11yProps(1)}
              />
              <Tab
                disableFocusRipple
                disableRipple
                label='Formalities'
                sx={{ cursor: 'unset' }}
                {...a11yProps(2)}
              />
            </Tabs>
          </Box>

          {/*  map the Product */}

          <Box>
            <OffersTabs
              handleNext={validateOffersTab}
              value={value}
              classes={classes}
            />
            <StagesTab
              handleSubmit={validateStagesTab}
              value={value}
              classes={classes}
            />
            <FormalitiesTab
              value={value}
              classes={classes}
              handleNext={validateFormalitiesTab}
            />
          </Box>
        </Box>
      </Box>

      {/*  Stages Dialog */}

      {/*  Formality Dialog  */}
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
// // import DotIndicator from '@mui-treasury/components/indicator/dot';
// import { useArrowDarkButtonStyles } from '@mui-treasury/styles/button/arrowDark';

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
//   // const arrowStyles = useArrowDarkButtonStyles();
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
//         // classes={arrowStyles}
//         disabled={index === 0}
//         onClick={() => onChangeIndex(index - 1)}
//       >
//         <KeyboardArrowLeft />
//       </Button>
//       <Button
//         className={cx(classes.arrow, classes.arrowRight)}
//         // classes={arrowStyles}
//         disabled={index === data.length - 1}
//         onClick={() => onChangeIndex(index + 1)}
//       >
//         <KeyboardArrowRight />
//       </Button>
//       {/* <div className={classes.indicatorContainer}>
//         {data.map(({ id }, i) => (
//           <DotIndicator
// key={id}
//             active={i === index}
//             onClick={() => onChangeIndex(i)}
//           />
//         ))}
//       </div> */}
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
