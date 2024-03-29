import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { styles } from './CarouselProp';

export const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 1500 },
    items: 3,
    slidesToSlide: 1,
  },
  Largedesktop: {
    breakpoint: { max: 1499, min: 1201 },
    items: 2,
    slidesToSlide: 1,
  },
  desktop: {
    breakpoint: { max: 1200, min: 992 },
    items: 1,
    slidesToSlide: 1, //
  },
  tablet: {
    breakpoint: { max: 992, min: 768 },
    items: 1,
    slidesToSlide: 1, //
  },
  smTablet: {
    breakpoint: { max: 785, min: 576 },
    items: 1,
  },
  smMobile: {
    breakpoint: { max: 576, min: 0 },
    items: 1,
  },
};

function CarouselLayout({ children, deviceType }) {
  const classes = styles();
  const settings = {
    swipeable: true,
    draggable: true,
    showDots: false,
    responsive: responsive,
    ssr: false, // means to render carousel on server-side.
    infinite: false,
    //   autoPlay: props.deviceType !== 'mobile' ? true : false,
    //   autoPlaySpeed: 3000,
    //   autoPlay: false,
    keyBoardControl: true,
    //   customTransition: 'all .5',
    //   transitionDuration: 500,
    containerClass: 'carousel-container',
    deviceType: deviceType,
    dotListClass: 'custom-dot-list-style',
    itemClass: 'carousel-item-padding-40-px',
    //   customLeftArrow: props.customArrow,
    //   customRightArrow: props.customArrow,
  };

  return (
    <div className={classes.root}>
      <Carousel {...settings} responsive={responsive}>
        {children}
      </Carousel>
    </div>
  );
}

export default CarouselLayout;
