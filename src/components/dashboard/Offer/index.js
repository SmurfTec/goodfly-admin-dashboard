import React, { useContext, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/styles';

import {
  Typography,
  Box,
  Grid,
  Button,
  Container,
} from '@material-ui/core';
import {
  Plus as PlusIcon,
  Archive as ArchiveIcon,
  Tag as TagIcon,
} from 'react-feather';

import { Link } from 'react-router-dom';
import { OffersContext } from 'Contexts/OffersContext';
import OffersCarousel from './OffersCarousel';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import NewReleasesIcon from '@material-ui/icons/NewReleases';
import { handleCatch, makeReq } from 'utils/makeReq';
import PromosDialog from '../Dialogs/Promos';
import { useToggleInput } from 'hooks';

const styles = makeStyles((theme) => ({
  main: {
    backgroundColor: '#f2f2f2',
    minHeight: '15rem',
    borderRadius: '0.8rem',
    padding: '0.1rem',
    margin: '1rem 0rem 2rem',
  },
  boxBack: {
    minHeight: '12rem',
    backgroundColor: '#f2f2f2',
    borderRadius: '0.5rem',
    margin: '0.4rem',
    [theme.breakpoints.down('lg')]: {
      margin: '0.2rem',
    },
  },
  imgBackground: {
    backgroundColor: '#808080',
    borderRadius: '10px',
    width: '10rem',
    marginBottom: '1rem',
    [theme.breakpoints.down('lg')]: {
      width: '9rem',
    },
  },
  image: {
    minHeight: '8rem',
    margin: '0.5rem',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    border: `2px dashed #fff`,
    borderRadius: '10px',
  },
  carouselCard: {
    display: 'block',
    height: '100%',
    minHeight: 206,
    boxSizing: 'border-box',
    // width: '15rem',
    '& .MuiPaper-root': {
      boxShadow: 'rgba(0, 0, 0, 0.15) 2.4px 2.4px 3.2px',
    },
  },
}));

const BigBox = ({ classes, link, Icon1, Icon2, text }) => (
  <Box className={classes.imgBackground}>
    <Box className={classes.image} component={Link} to={link}>
      <Box>
        <Icon1 size={35} style={{ color: '#fff' }} />
        {Icon2 && <Icon2 size={35} style={{ color: '#fff' }} />}
      </Box>
      <Button style={{ color: '#fff' }}>{text}</Button>
    </Box>
  </Box>
);

const Offers = () => {
  const classes = styles();
  const { offers } = useContext(OffersContext);

  const [isPromosOpen, togglePromosOpen] = useToggleInput(false);
  const [promos, setPromos] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        const { promos } = await makeReq('/promos');
        setPromos(promos);
      } catch (err) {
        setPromos([]);
        handleCatch(err);
      }
    })();
  }, []);
  const deletePromo = async (id) => {
    try {
      await makeReq(`/promos/${id}`, {}, 'DELETE');
      setPromos((st) => st.filter((el) => el._id !== id));
    } catch (err) {
      handleCatch(err);
    }
  };
  const createNewPromoCode = async (promoBody) => {
    togglePromosOpen();
    try {
      const { promo } = await makeReq(
        '/promos',
        { body: promoBody },
        'POST'
      );
      setPromos((st) => [...st, promo]);
    } catch (err) {
      handleCatch(err);
    }
  };

  return (
    <div>
      <Box
        display='flex'
        justifyContent='space-between'
        alignItems='center'
      >
        <Typography variant='h5' m={2}>
          Offers Management
        </Typography>
        <Box>
          <Button
            variant='contained'
            color='success'
            endIcon={<NewReleasesIcon />}
            onClick={togglePromosOpen}
          >
            Promo Codes
          </Button>
        </Box>
      </Box>
      <Grid container sx={{ paddingBottom: '20px' }}>
        <Grid item sm={10}>
          {/* TODO - Fetch Categories and then map them */}

          <OffersCarousel
            classes={classes}
            offers={offers?.filter(
              (offer) =>
                !offer.archieve && offer.category === 'spiritual'
            )}
            title='spiritual'
          />
          <OffersCarousel
            classes={classes}
            offers={offers?.filter(
              (offer) =>
                !offer.archieve && offer.category === 'ethical'
            )}
            title='ethical'
          />
          <OffersCarousel
            classes={classes}
            offers={offers?.filter(
              (offer) =>
                !offer.archieve && offer.category === 'excursions'
            )}
            title='excursions'
          />
        </Grid>
        <Grid item sm={2}>
          <Box
            className={classes.boxBack}
            style={{
              minHeight: '25rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '2rem',
            }}
          >
            <BigBox
              classes={classes}
              link='/app/offers/createoffer'
              Icon1={PlusIcon}
              Icon2={TagIcon}
              text='New Offer'
            />
            <BigBox
              classes={classes}
              link='/app/offers/archieves'
              Icon1={ArchiveIcon}
              text='archives'
            />
            <BigBox
              classes={classes}
              link='/app/offers/flash-sales'
              Icon1={FlashOnIcon}
              text='Flash Sales'
            />
            <BigBox
              classes={classes}
              link='/app/offers/promos'
              Icon1={NewReleasesIcon}
              text='Fresh Arrivals'
            />
          </Box>
        </Grid>
      </Grid>
      <PromosDialog
        open={isPromosOpen}
        toggleDialog={togglePromosOpen}
        success={createNewPromoCode}
        promos={promos}
        deletePromo={deletePromo}
      />
    </div>
  );
};

export default Offers;
