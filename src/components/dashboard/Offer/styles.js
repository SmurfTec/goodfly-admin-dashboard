import { makeStyles } from '@material-ui/styles';

const styles = makeStyles((theme) => ({
  options: {
    backgroundColor: '#f2f2f2',
    height: '100%',
    minHeight: 500,
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
    // width: '12rem',
    height: '12rem',
    borderRadius: '5px',
    [theme.breakpoints.down('lg')]: {
      // width: '8rem',
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
  carouselGrid: {
    '& .react-multi-carousel-item': {
      width: 'unset !important',
    },
  },
}));

export default styles;
