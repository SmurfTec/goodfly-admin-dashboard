import { makeStyles } from '@material-ui/styles';

export const styles = makeStyles((theme) => ({
  root: {
    margin: 'auto',
    '& .react-multiple-carousel__arrow::before': {
      color: 'white',
      marginLeft: '0',
    },

    '& .react-multiple-carousel__arrow': {
      backgroundColor: theme.palette.grey[900],
      borderRadius: 0,
      opacity: 0.6,

      '&:hover': {
        opacity: 1,
      },
    },
    '& .react-multiple-carousel__arrow--right ': {
      right: 0,
      borderBottomLeftRadius: 10,
      borderTopLeftRadius: 10,
    },
    '& .react-multiple-carousel__arrow--left': {
      left: 0,
      borderBottomRightRadius: 10,
      borderTopRightRadius: 10,
    },
    '& .carousel-container': {
      //  margin: '0 1rem',
      '& ul': {
        '& li': {
          padding: theme.spacing(1),
          maxWidth: 400,
        },
      },
    },
  },
}));

export const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 1400 },
    items: 4,
    slidesToSlide: 3,
  },
  Largedesktop: {
    breakpoint: { max: 1400, min: 1200 },
    items: 3,
    slidesToSlide: 1,
  },
  desktop: {
    breakpoint: { max: 1200, min: 992 },
    items: 3,
    slidesToSlide: 1, //
  },
  tablet: {
    breakpoint: { max: 992, min: 768 },
    items: 3,
    slidesToSlide: 1, //
  },
  smTablet: {
    breakpoint: { max: 785, min: 576 },
    items: 2,
  },
  smMobile: {
    breakpoint: { max: 576, min: 0 },
    items: 1,
  },
};
