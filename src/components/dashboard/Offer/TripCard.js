import React from 'react';
import { makeStyles } from '@material-ui/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { useNavigate } from 'react-router-dom';
import { Box } from '@material-ui/system';
import { CardActionArea, Switch } from '@material-ui/core';

const styles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    minHeight: 206,
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
    paddingBlock: 20,
    flexBasis: '60%',
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
  const navigate = useNavigate();
  const { _id, title, upload, image, services, price } = trip;

  const classes = styles();

  const handleClick = () => {
    navigate(`/app/offers/${_id}`);
  };

  return (
    <>
      <Typography variant='h5'>{title.toUpperCase()}</Typography>
      <Card className={classes.root}>
        <CardMedia className={classes.cover} image={image} title={title} />
        <CardActionArea onClick={handleClick}>
          <div className={classes.details}>
            <CardContent className={classes.content}>
              <Typography component='h5' variant='h5'>
                {title.toUpperCase()}
              </Typography>
              {services.slice(0, 3).map((service) => (
                <Typography variant='subtitle1' color='textSecondary'>
                  {service}
                </Typography>
              ))}
              <Box
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Typography variant='h3' sx={{ color: '#ff4747' }}>
                  {price}€
                </Typography>
                <Switch
                  checked={!!upload}
                  inputProps={{ 'aria-label': 'controlled' }}
                />
              </Box>
            </CardContent>
          </div>
        </CardActionArea>
      </Card>
    </>
  );
};

export default TripCard;
