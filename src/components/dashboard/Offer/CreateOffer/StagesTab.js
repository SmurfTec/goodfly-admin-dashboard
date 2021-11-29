import React, { memo, useEffect, useState } from 'react';

import {
  Box,
  Button,
  Grid,
  Typography,
  CardMedia,
  Container,
} from '@material-ui/core';
import Gallery from 'react-grid-gallery';
import { TabPanel } from '../../../common/TabPanel';
import { SkipNext, SkipPrevious } from '@material-ui/icons';
import { useArray, useToggleInput } from 'hooks';
import AddStageDialog from './AddStageDialog';
import UpdateStateDialog from './AddStageDialog';
import v4 from 'uuid/dist/v4';

const StagesTab = memo(({ value, classes, handleSubmit, offer }) => {
  const [
    stages,
    setStages,
    pushStage,
    ,
    updateStage,
    removeStage,
    ,
  ] = useArray([], '_id');
  const [isDialogOpen, toggleDialogOpen] = useToggleInput(false);
  const [isUpdateDialogOpen, toggleUpdateDialogOpen] = useToggleInput(false);
  const [currentStage, setCurrentStage] = useState(0);

  useEffect(() => {
    if (!offer) return;
    setStages(offer.stages);
  }, [offer]);

  const addNewStage = (data) => {
    console.log(`data`, data);

    pushStage({ ...data, _id: v4() });

    toggleDialogOpen();
  };
  const updateCurrentStage = (data) => {
    console.log(`data`, data);

    updateStage(stages[currentStage]._id, data);

    toggleUpdateDialogOpen();
  };

  const handleNext = () => {
    setCurrentStage((st) => +st + 1);
  };

  const handlePrevious = () => {
    setCurrentStage((st) => (st === 0 ? 0 : st - 1));
  };

  const handleDelete = (e) => {
    removeStage(stages[currentStage]._id);
    handlePrevious();
  };

  // useEffect(() => {
  //   console.log(`state`, state);
  // }, [state]);

  return (
    <TabPanel value={value} index={1} className={classes.options}>
      <Box
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          // minHeight: 500,
        }}
      >
        <Button
          variant='contained'
          style={{ width: '10rem', marginRight: '1rem' }}
          onClick={toggleDialogOpen}
        >
          Add a Stage
        </Button>
        <Button
          disabled={stages.length === 0}
          variant='contained'
          style={{ width: '10rem' }}
          onClick={() => handleSubmit(stages)}
        >
          Next
        </Button>
      </Box>
      <Container
        sx={{ margin: 3, paddingBlock: '20px' }}
        style={{ backgroundColor: '#ffffff' }}
      >
        {stages.length > 0 ? (
          <>
            <Grid container>
              <Grid
                item
                xs={12}
                sx={{
                  justifyContent: 'flex-end',
                  display: 'flex',
                  columnGap: '20px',
                }}
              >
                {stages?.length > 0 && (
                  <Typography
                    sx={{
                      marginRight: 'auto',
                    }}
                    variant='h5'
                  >
                    Stage {currentStage + 1}
                  </Typography>
                )}
                <Button
                  variant='contained'
                  color='primary'
                  startIcon={<SkipPrevious />}
                  onClick={handlePrevious}
                  disabled={currentStage === 0}
                />
                <Button
                  variant='contained'
                  color='primary'
                  startIcon={<SkipNext />}
                  onClick={handleNext}
                  disabled={currentStage >= stages.length - 1}
                />
              </Grid>
              <Grid
                item
                sm={12}
                md={5}
                style={{
                  padding: '1rem',
                }}
              >
                <Box
                  className={classes.flexBetween}
                  style={{ margin: '0rem 1rem 0.5rem' }}
                >
                  <Typography variant='h5' mr={1}>
                    {stages?.[currentStage]?.title}
                  </Typography>
                  <Typography variant='text'>
                    {stages?.[currentStage]?.distance} km
                  </Typography>
                </Box>
                <Box style={{ margin: '0rem 0.5rem 1rem' }}>
                  <CardMedia
                    className={classes.stageImage}
                    image={stages?.[currentStage]?.images?.[0]?.src}
                    title='Contemplative Reptile'
                  />
                  <Box mt={2}>
                    <Typography variant='text'>
                      {stages?.[currentStage]?.description}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid item sm={12} md={7}>
                <Typography variant='h5' mt={4}>
                  {stages?.[currentStage]?.accomodation?.name}
                </Typography>
                <Box>
                  {stages?.[currentStage]?.accomodation?.images?.length > 0 && (
                    <Gallery
                      images={stages?.[currentStage]?.accomodation?.images}
                      style={{ width: '10rem' }}
                    />
                  )}
                </Box>
              </Grid>
            </Grid>
            <Box
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                paddingBottom: '1rem',
              }}
            >
              <Button
                variant='outlined'
                style={{
                  color: 'red',
                  border: '1px solid red',
                  width: '8rem',
                  marginRight: '1rem',
                }}
                onClick={handleDelete}
              >
                Delete
              </Button>
              <Button
                onClick={toggleUpdateDialogOpen}
                variant='outlined'
                style={{ width: '8rem' }}
              >
                Update
              </Button>
            </Box>
          </>
        ) : (
          <Typography sx={{ textAlign: 'center' }} variant='h5'>
            No Stages to show !
          </Typography>
        )}
      </Container>

      <AddStageDialog
        open={isDialogOpen}
        toggleDialog={toggleDialogOpen}
        classes={classes}
        handleSubmit={addNewStage}
      />

      <UpdateStateDialog
        open={isUpdateDialogOpen}
        toggleDialog={toggleUpdateDialogOpen}
        classes={classes}
        handleUpdate={updateCurrentStage}
        stage={stages?.[currentStage]}
      />
    </TabPanel>
  );
});

export default StagesTab;
