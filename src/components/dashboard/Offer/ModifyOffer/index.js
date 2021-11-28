import React, { useContext, useEffect, useState } from 'react';
import { Box, Tab, Tabs } from '@material-ui/core';
import OffersTabs from '../CreateOffer/OffersTabs';
import StagesTab from '../CreateOffer/StagesTab';
import FormalitiesTab from '../CreateOffer/FormalitiesTab';
import { OffersContext } from 'Contexts/OffersContext';
import {
  removeEntriesWithValue,
  removeKeyIncludingString,
} from 'utils/objectMethods';
import { a11yProps } from 'components/common/TabPanel';
import { useParams } from 'react-router';
import { handleCatch, makeReq } from 'utils/makeReq';

import useStyles from '../styles';

const ModifyOffer = () => {
  const classes = useStyles();
  const { id } = useParams();
  const [formalities, setFormalities] = useState([]);

  const { updateOffer, getOfferById, offers } = useContext(OffersContext);

  const [value, setValue] = useState(0);

  const [state, setState] = useState();

  useEffect(() => {
    setState(getOfferById(id));
  }, [getOfferById, offers, id]);

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
    console.log(`data`, data.services);

    // * filter services with false value
    let newServices = data.services;
    removeEntriesWithValue(newServices, false);

    // * Convert Services Obj into array of services
    // * From { a : true , b :true , ...} to ['a' , 'b' ,'c']
    newServices = Object.keys(newServices);
    // console.log(`newServices`, newServices);

    setState({ ...data, services: newServices });
    gotoNextStep();
  };

  const validateStagesTab = (data, resetData) => {
    console.log(`data`, data);
    setState((st) => ({ ...st, stages: data }));
    gotoNextStep();
  };

  const validateFormalitiesTab = (data, resetData) => {
    console.log(`data`, data);
    // setState((st) => ({ ...st, formalities: data }));
    let newOffer = {
      ...state,
      formalities: data,
    };

    // // * Fix Services
    // console.log(`services before`, newOffer.services);
    // let servicesArr = Object.entries(newOffer.services);
    // servicesArr = servicesArr.filter(([key, value]) => !!value);
    // servicesArr = servicesArr.map(([key, val]) => key);
    // newOffer = {
    //   ...newOffer,
    //   services: servicesArr,
    // };

    // console.log(`new services`, servicesArr);

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

    console.log(`newOffer after`, newOffer);
    updateOffer(id, newOffer);
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
              onChange={(e, newValue) => setValue(newValue)}
              aria-label='basic tabs example'
              indicatorColor='primary'
              centered
            >
              <Tab
                disableFocusRipple
                disableRipple
                label='Offer'
                {...a11yProps(0)}
                className={classes.tabRoot}
              />
              <Tab
                disableFocusRipple
                disableRipple
                label='Stages'
                {...a11yProps(1)}
              />
              <Tab
                disableFocusRipple
                disableRipple
                label='Formalities'
                {...a11yProps(2)}
              />
            </Tabs>
          </Box>

          <Box>
            <OffersTabs
              handleNext={validateOffersTab}
              value={value}
              classes={classes}
              offer={state}
            />
            <StagesTab
              handleSubmit={validateStagesTab}
              value={value}
              classes={classes}
              offer={state}
            />
            <FormalitiesTab
              value={value}
              classes={classes}
              handleNext={validateFormalitiesTab}
              offer={state}
              formalities={formalities}
              offerFormality={state?.formality}
            />
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default ModifyOffer;
