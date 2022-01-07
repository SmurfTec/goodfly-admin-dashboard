import { Helmet } from 'react-helmet';

import img1 from 'Assets/img/authbg.png';
import img2 from 'Assets/img/goodfly-logo.png';
import img3 from 'Assets/img/notfound.jpg';
import svg from 'Assets/img/notfound.svg';
import { ReactSVG } from 'react-svg';
import { Typography, Box } from '@material-ui/core';

import useStyles from './notfoundStyles';

const Maintenance = () => {
  const classes = useStyles();
  return (
    <>
      <Helmet>
        <title>Maintenance</title>
      </Helmet>
      <div className={classes.Wrapper}>
        <img src={img1} alt='plane img' className={classes.backgroundImg} />
        <Box className={classes.Main}>
          <img src={img2} alt='img 2' style={{ height: 40 }} />
          <Typography fontSize={40} minWidth={450} my={2} variant='h2'>
            Site under maintenance
          </Typography>

          <img
            src={img3}
            alt='img 2'
            style={{
              marginBottom: '1rem',
            }}
          />
          <ReactSVG src={svg} />
          <Typography
            variant='body1'
            style={{
              fontSize: 30,
              minWidth: 530,
            }}
          >
            The site will be available shortly ...
          </Typography>
        </Box>
      </div>
    </>
  );
};

export default Maintenance;
