import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import styles from 'Styles/Offer';
import { useNavigate } from 'react-router-dom';



const TripCard = ({trip}) => {
  const navigate = useNavigate();

  const classes = styles();
  const { _id, images, date, services, price } = trip;

  const handleClick = () => {
    navigate(`/app/dashboard/${_id}`);
  };

  return (
    <Card className={classes.card}>
      <CardActionArea onClick={handleClick}>
        <CardMedia
          sx={{ height: 250, position: 'relative' }}
          image={images[0]}
        />
        <CardContent
          sx={{
            display: 'flex',
            flexWrap: 'nowrap',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            '& h3,h4,h5,h6': {
              textTransform: 'capitalize',
            },
          }}
        >
          <Typography
            gutterBottom
            variant='h5'
            color='text.secondary'
          >
            {date}
          </Typography>
          {services && services.map((service)=>(
            <Typography variant='subtitle1' color='text.secondary' >
            {service}
          </Typography>
            ))}
          <Typography
            gutterBottom
            variant='subtitle1'
            sx={{ fontWeight: 900 }}
          >
            {price}€
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default TripCard;
