import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import {
  Typography,
  Grid,
  Box,
  Button,
  TextField,
  Switch,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
} from '@material-ui/core';

import { Search as SearchIcon } from 'react-feather';

const styles = makeStyles((theme) => ({
  main: {
    backgroundColor: '#f2f2f2',
    borderRadius: '10px',
    margin: '10px 100px 20px 30px',
    padding: 20,
    minHeight: 550,
  },
  textInput: {
    width: '80%',
    backgroundColor: '#fff',
    marginBottom: 7,
  },
  root: {
    marginTop: 10,
    maxWidth: 230,
  },
  media: {
    height: 130,
  },
}));

const Blogs = () => {
  const classes = styles();

  const handleClick = () => {};
  return (
    <div>
      <Typography variant='h5' style={{ margin: '60px 20px 40px ' }}>
        Blog post management
      </Typography>
      <Box className={classes.main}>
        <Box
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <Button variant='contained' style={{ width: 200 }}>
            {' '}
            Add New Blog{' '}
          </Button>
          <Box
            style={{
              display: 'flex',
              justifyContent: 'right',
              alignItems: 'center',
              width: '100%',
            }}
          >
            <Typography
              variant='text'
              style={{ margin: '0px 3px 0px' }}
            >
              Search Article
            </Typography>
            <SearchIcon style={{ margin: '0px 3px 0px' }} />
            <TextField
              hiddenLabel
              id='filled-hidden-label-small'
              defaultValue='search'
              size='small'
              style={{ margin: '0px 5px 0px', width: '30%' }}
              className={classes.textInput}
            />
          </Box>
        </Box>
        <Grid container>
          <Grid item md={10}>
            <Card className={classes.root}>
              <CardActionArea>
                <CardMedia
                  className={classes.media}
                  image='https://images.unsplash.com/photo-1583499882110-688e720b025e?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8ZHViYWl8ZW58MHwyfDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
                  title='Contemplative Reptile'
                  onClick={handleClick}
                />
                <CardContent>
                  <Box onClick={handleClick}>
                    <Box
                      style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      <Typography
                        gutterBottom
                        variant='h5'
                        component='h2'
                        align='center'
                        style={{ marginRight: 20, color: '#828282' }}
                      >
                        4/10/2021
                      </Typography>
                    </Box>
                    <Typography
                      color='textSecondary'
                      align='center'
                      variant='subtitle2'
                    >
                      theme
                    </Typography>
                    <Typography
                      color='textSecondary'
                      variant='subtitle2'
                      gutterBottom
                      align='center'
                    >
                      the great blog related to trips
                    </Typography>
                  </Box>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default Blogs;
