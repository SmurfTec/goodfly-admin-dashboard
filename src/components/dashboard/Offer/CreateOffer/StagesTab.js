import React, { useState } from 'react';

import {
  Box,
  Button,
  Grid,
  Typography,
  CardMedia,
  List,
  ListItem,
  ListItemText,
  Container,
} from '@material-ui/core';
import Gallery from 'react-grid-gallery';
import TabPanel from './TabPanel';
import { SkipNext, SkipPrevious } from '@material-ui/icons';
import { useArray, useToggleInput } from 'hooks';
import AddStageDialog from './AddStageDialog';
import UpdateStateDialog from './AddStageDialog';
import v4 from 'uuid/dist/v4';

const StagesTab = ({ value, classes, handleSubmit }) => {
  const [
    stages,
    setStages,
    pushStage,
    filterStages,
    updateStage,
    removeStage,
    clearStages,
  ] = useArray([], '_id');
  const [isDialogOpen, toggleDialogOpen] = useToggleInput(false);
  const [isUpdateDialogOpen, toggleUpdateDialogOpen] = useToggleInput(false);
  const [currentStage, setCurrentStage] = useState(0);

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
    setCurrentStage((st) => st + 1);
  };

  const handlePrevious = () => {
    setCurrentStage((st) => st - 1);
  };

  const handleDelete = (e) => {
    removeStage(stages[currentStage]._id);
    handlePrevious();
  };

  return (
    <TabPanel value={value} index={1} className={classes.options}>
      <Box
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Button
          variant='contained'
          style={{ width: '10rem', marginRight: '1rem' }}
          onClick={toggleDialogOpen}
        >
          Add a Step
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
                  {stages?.[currentStage]?.images?.length > 0 && (
                    <Gallery
                      images={stages?.[currentStage]?.accomodation?.images}
                      style={{ width: '10rem' }}
                    />
                  )}
                  {/* <CardMedia
                          className={classes.cover}
                          image='https://picsum.photos/200/300?random=2'
                          title='Live from space album cover'
                        /> */}
                </Box>
                {/* <Typography variant='h5'> </Typography>
                      <Typography variant='h5'>
                        Service Includes
                      </Typography>
          
                      {/*  map the Services */}
                {/* {services &&
                        services.map((s) => (
                          <Box>
                            <Box
                              style={{
                                display: 'flex',
                                alignItems: 'self-end',
                                justifyContent: 'left',
                                marginTop: 0,
                              }}
                            >
                              <Typography
                                variant='h1'
                                style={{ fontSize: '3rem' }}
                              >
                                .
                              </Typography>
                              <Typography variant='text'>
                                <bold>.</bold>Half pension
                              </Typography>
                            </Box>
                          </Box>
                        ))} */}
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
};

export default StagesTab;
