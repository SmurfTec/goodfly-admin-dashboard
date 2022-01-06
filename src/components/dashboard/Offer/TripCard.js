import React, { useMemo } from 'react';
import { makeStyles } from '@material-ui/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { useNavigate, useLocation } from 'react-router-dom';
import { Box } from '@material-ui/system';
import { CardActionArea, Switch } from '@material-ui/core';
import clsx from 'clsx';

const styles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    minHeight: 170,
    maxHeight: 170,
    minWidth: 270,
    '& .MuiCardContent-root': {
      padding: 5,
    },
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
  DiscountPrice: {
    backgroundColor: '#fff',
    padding: theme.spacing(1.2),
    borderRadius: 15,
    transform: 'scale(0.9)',
    opacity: 0.5,
    textDecoration: 'line-through solid red',
  },
  Price: {
    backgroundColor: '#fff',
    padding: theme.spacing(1.2),
    borderRadius: 15,
  },
}));

const TripCard = ({ trip, isSpecialOffer }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    _id,
    title,
    upload,
    image,
    description,
    price,
    promoExpires,
    saleExpires,
    sale,
  } = trip;

  const classes = styles();

  const isSalesPage = useMemo(
    () => location.pathname.toLowerCase().includes('flash-sales'),
    [location.pathname]
  );

  const handleClick = () => {
    navigate(`/app/offers/${_id}`);
  };

  return (
    <>
      <Typography variant='h5'>{title.toUpperCase()}</Typography>
      {isSpecialOffer && (
        <Typography variant='h6' sx={{ marginBottom: 1 }}>
          {promoExpires &&
            `Till ${new Date(promoExpires).toLocaleDateString()}`}
          {saleExpires &&
            `Sale Till ${new Date(saleExpires).toLocaleDateString()}`}
        </Typography>
      )}
      <Card className={classes.root}>
        <CardMedia className={classes.cover} image={image} title={title} />
        <CardActionArea onClick={handleClick}>
          <div className={classes.details}>
            <CardContent className={classes.content}>
              <Typography component='h5' variant='h5'>
                {title.toUpperCase()}
              </Typography>
              {/* {services.slice(0, 3).map((service) => (
                <Typography variant='subtitle1' color='textSecondary'>
                  {service}
                </Typography>
              ))} */}
              <Typography
                variant='subtitle1'
                color='textSecondary'
                style={{
                  wordBreak: 'break-all',
                }}
              >
                {description.slice(0, 70)}...
              </Typography>

              <Box
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Typography
                  sx={{ px: 0 }}
                  variant='h4'
                  className={clsx(
                    clsx({
                      [classes.DiscountPrice]:
                        sale && new Date(saleExpires) > new Date(), //always applies
                    })
                  )}
                >
                  {price} €
                </Typography>
                {sale && new Date(saleExpires) > new Date() && (
                  <Box>
                    <Typography
                      sx={{ px: 0 }}
                      variant='h4'
                      className={classes.Price}
                    >
                      {price - (price * trip.discount) / 100} €
                    </Typography>
                  </Box>
                )}

                <Switch
                  checked={!!upload}
                  inputProps={{ 'aria-label': 'controlled' }}
                  sx={{ ml: 'auto' }}
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
