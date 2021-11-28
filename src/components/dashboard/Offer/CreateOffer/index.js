import React, { useContext, useEffect, useState } from 'react';
import { Box, Tab, Tabs } from '@material-ui/core';
import OffersTabs from './OffersTabs';
import StagesTab from './StagesTab';
import FormalitiesTab from './FormalitiesTab';
import { OffersContext } from 'Contexts/OffersContext';
import { removeKeyIncludingString } from 'utils/objectMethods';
import { a11yProps } from 'components/common/TabPanel';
import { handleCatch, makeReq } from 'utils/makeReq';

import useStyles from '../styles';

const CreateOffer = () => {
  const classes = useStyles();
  const { createOffer } = useContext(OffersContext);
  const [formalities, setFormalities] = useState([]);

  // TODO Edit it to 0
  const [value, setValue] = useState(0);

  const [state, setState] = useState({});

  useEffect(() => {
    (async () => {
      try {
        const resData = await makeReq(`/formalities`);
        setFormalities(resData.formalities);
      } catch (err) {
        handleCatch(err);
      }
    })();
  }, []);

  const gotoNextStep = () => {
    setValue((st) => st + 1);
  };

  const validateOffersTab = (data, resetData) => {
    // console.log(`data`, data);
    setState(data);
    gotoNextStep();
  };

  const validateStagesTab = (data, resetData) => {
    // console.log(`data`, data);
    setState((st) => ({ ...st, stages: data }));
    gotoNextStep();
  };

  const validateFormalitiesTab = (data, resetData) => {
    // console.log(`data`, data);
    // setState((st) => ({ ...st, formalities: data }));
    let newOffer = {
      ...state,
      formality: data.formality,
    };

    // console.log(`newOffer before`, newOffer);

    // * Fix Services
    let servicesArr = Object.entries(newOffer.services);
    servicesArr = servicesArr.filter(([key, value]) => !!value);
    servicesArr = servicesArr.map(([key, val]) => key);
    newOffer = {
      ...newOffer,
      services: servicesArr,
    };

    // * If No dates, no need to send starting and ending date
    if (newOffer.isDates === 'no') {
      removeKeyIncludingString(newOffer, 'startingDate');
      removeKeyIncludingString(newOffer, 'endingDate');
    }
    // * Same with place
    if (newOffer.isDeparturePlace === 'no') {
      removeKeyIncludingString(newOffer, 'departurePlace');
      removeKeyIncludingString(newOffer, 'destination');
    }
    removeKeyIncludingString(newOffer, 'isDates');
    removeKeyIncludingString(newOffer, 'isDeparturePlace');

    // * Change Country and Region from  { code: 'AD', label: 'Andorra', phone: '376' } to 'Andorra'
    newOffer.country = newOffer.country.label;
    newOffer.region = newOffer.region.label;
    // console.log(`newOffer.region.label`, newOffer.region.label);

    // console.log(`newOffer after`, newOffer);

    // console.log(`newOffer after`, newOffer);
    createOffer(newOffer);
    // gotoNextStep();
  };

  return (
    <div style={{ margin: '3rem 0rem 1rem' }}>
      <Box
        style={{
          minHeight: '25rem',
          margin: '2rem 1rem 0rem',
        }}
      >
        <Box sx={{ width: '100%' }}>
          <Box
            sx={{
              borderBottom: 1,
              borderColor: 'divider',
            }}
          >
            <Tabs
              value={value}
              // onChange={(newValue) => setValue(newValue)}
              aria-label='basic tabs example'
              indicatorColor='primary'
              centered
            >
              <Tab
                disableFocusRipple
                disableRipple
                sx={{ cursor: 'unset' }}
                label='Offer'
                {...a11yProps(0)}
                className={classes.tabRoot}
              />
              <Tab
                disableFocusRipple
                disableRipple
                label='Stages'
                sx={{ cursor: 'unset' }}
                {...a11yProps(1)}
              />
              <Tab
                disableFocusRipple
                disableRipple
                label='Formalities'
                sx={{ cursor: 'unset' }}
                {...a11yProps(2)}
              />
            </Tabs>
          </Box>

          {/*  map the Product */}

          <Box>
            <OffersTabs
              handleNext={validateOffersTab}
              value={value}
              classes={classes}
            />
            <StagesTab
              handleSubmit={validateStagesTab}
              value={value}
              classes={classes}
            />
            <FormalitiesTab
              value={value}
              classes={classes}
              handleNext={validateFormalitiesTab}
              formalities={formalities}
            />
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default CreateOffer;
