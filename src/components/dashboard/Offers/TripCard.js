import React from 'react';
import { makeStyles } from '@material-ui/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import useStyles from 'Styles/Offer';
import { useNavigate } from 'react-router-dom';
import { Box } from '@material-ui/system';

const styles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    border: '1px solid green',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: '14rem',
    height: '6rem',
    margin: '0.5rem',
  },
}));

const TripCard = ({ trip }) => {
  const navigate = useNavigate();

  const classes = styles();
  const { _id, name, category, images, date, services, price } = trip;

  const handleClick = () => {
    // navigate(`/app/dashboard/${_id}`);
    window.alert(' clicked ');
  };

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
          </CardContent>
        </div>
      </Card>
    </>
  );
};

export default TripCard;
