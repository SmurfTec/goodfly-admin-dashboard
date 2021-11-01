import React, { useState, useEffect } from 'react';
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
import { Link } from 'react-router-dom';

let blogs = [
  {
    id: 1,
    title: 'zaincl',
    image: 'https://picsum.photos/200/300?random=2',
    date: '12/12/12',
    theme: ' type theme ',
    description: ' description description',
  },
  {
    id: 2,
    title: 'zainal',
    image: 'https://picsum.photos/200/300?random=2',
    date: '12/12/12',
    theme: ' type theme ',
    description: ' description description',
  },
  {
    id: 3,
    title: 'zainbl',
    image: 'https://picsum.photos/200/300?random=2',
    date: '12/12/12',
    theme: ' type theme ',
    description: ' description description',
  },
  {
    id: 4,
    title: 'sohail',
    image: 'https://picsum.photos/200/300?random=2',
    date: '12/12/12',
    theme: ' type theme ',
    description: ' description description',
  },
  {
    id: 5,
    title: 'umar',
    image: 'https://picsum.photos/200/300?random=2',
    date: '12/12/12',
    theme: ' type theme ',
    description: ' description description',
  },
  {
    id: 6,
    title: 'ali',
    image: 'https://picsum.photos/200/300?random=2',
    date: '12/12/12',
    theme: ' type theme ',
    description: ' description description',
  },
];

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
    marginTop: 15,
    maxWidth: 220,
  },
  media: {
    height: 130,
  },
}));

const Blogs = () => {
  const classes = styles();
  const [filter, setFilter] = useState('');
  const [filteredItems, setFilteredItems] = useState([]);

  const handleClick = () => {};
  const handleSearch = (e) => {
    const data = e.target.value;
    setFilter(data);
    console.log(filter);
  };

  //  filtered the blogs
  useEffect(() => {
    setFilteredItems(
      blogs.filter(
        (blog) =>
          blog.title.toLowerCase().indexOf(filter.toLowerCase()) !==
          -1
      )
    );
  }, [filter]);

  // data must be updated

  useEffect(() => {
    setFilteredItems(blogs);
  }, [blogs]);

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
          <Button
            variant='contained'
            style={{ width: 200 }}
            component={Link}
            to='/app/blog'
          >
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
              placeholder='search'
              size='small'
              style={{ margin: '0px 5px 0px', width: '30%' }}
              className={classes.textInput}
              value={filter}
              onChange={handleSearch}
            />
          </Box>
        </Box>
        <Grid container spacing={3}>
          {filteredItems &&
            filteredItems.map((blog) => (
              <Grid item lg={3}>
                <Card className={classes.root} key={blog.id}>
                  <CardActionArea>
                    <CardMedia
                      className={classes.media}
                      image={blog.image}
                      title={blog.title}
                      onClick={handleClick}
                    />
                    <CardContent>
                      <Box onClick={handleClick}>
                        <Box
                          style={{
                            display: 'grid',
                            justifyContent: 'left',
                            alignItems: 'center',
                          }}
                        >
                          <Typography
                            gutterBottom
                            variant='h5'
                            component='h2'
                            style={{
                              color: '#c6c6c6',
                            }}
                          >
                            {blog.date}
                          </Typography>
                          <Typography
                            color='textSecondary'
                            variant='subtitle2'
                          >
                            {blog.theme}
                          </Typography>
                          <Typography
                            color='textSecondary'
                            variant='subtitle2'
                            gutterBottom
                          >
                            {blog.description}
                          </Typography>
                        </Box>
                      </Box>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
        </Grid>
      </Box>
    </div>
  );
};

export default Blogs;
