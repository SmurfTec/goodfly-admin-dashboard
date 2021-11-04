import React from 'react';
import { makeStyles } from '@material-ui/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
// import { useNavigate } from 'react-router-dom';
import { Box } from '@material-ui/system';
import { Switch } from '@material-ui/core';

const styles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.down('lg')]: {
      width: '8rem',
    },
  },
  content: {
    flex: '1 0 auto',
    [theme.breakpoints.down('lg')]: {
      padding: '0.1rem',
    },
  },
  cover: {
    width: '12rem',
    height: '7rem',
    margin: '0.5rem',
    [theme.breakpoints.down('lg')]: {
      width: '8rem',
    },
  },
}));

const TripCard = ({ trip }) => {
  // const navigate = useNavigate();

  const classes = styles();
  // const { _id, name, category, images, date, services, price } = trip;
  const [status, setStatus] = React.useState(true);

  const toggle = (event) => {
    setStatus(event.target.status);
  };
  // const handleClick = () => {
  //   // navigate(`/app/dashboard/${_id}`);
  //   window.alert(' clicked ');
  // };

  return (
    <>
      <Typography variant='h5'>name</Typography>
      <Card className={classes.root}>
        <CardMedia
          className={classes.cover}
          image='https://picsum.photos/200/300?random=2'
          title='Live from space album cover'
        />
        <div className={classes.details}>
          <CardContent className={classes.content}>
            <Typography component='h5' variant='h5'>
              Live From Space
            </Typography>
            <Typography variant='subtitle1' color='textSecondary'>
              Mac Miller
            </Typography>
            <Typography variant='subtitle1' color='textSecondary'>
              Mac Miller
            </Typography>
            <Box
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Typography variant='h3'>5100$</Typography>
              <Switch
                status={status}
                onChange={toggle}
                inputProps={{ 'aria-label': 'controlled' }}
              />
            </Box>
          </CardContent>
        </div>
      </Card>
    </>
  );
};

export default TripCard;
