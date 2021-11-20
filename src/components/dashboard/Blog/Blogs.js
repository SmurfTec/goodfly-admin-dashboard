import React, { useState, useEffect, useContext } from 'react';
import { makeStyles } from '@material-ui/styles';
import {
  Typography,
  Grid,
  Box,
  Button,
  TextField,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  TablePagination,
} from '@material-ui/core';
import v4 from 'uuid/dist/v4';

import { Search as SearchIcon } from 'react-feather';
import { Link, useNavigate } from 'react-router-dom';

import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { BlogsContext } from 'Contexts/BlogsContext';

const styles = makeStyles((theme) => ({
  main: {
    backgroundColor: '#f2f2f2',
    borderRadius: '10px',
    margin: '2rem',
    padding: '3rem',
    minHeight: 550,
  },
  textInput: {
    width: '80%',
    backgroundColor: '#fff',
    marginBottom: 7,
  },
  root: {
    marginTop: 15,
    minWidth: 220,
    maxWidth: 220,
  },
  media: {
    height: 130,
  },
}));

const Blogs = () => {
  const classes = styles();
  const { blogs } = useContext(BlogsContext);
  const theme = useTheme();
  const lgDown = useMediaQuery(theme.breakpoints.down('sm'));

  const navigate = useNavigate();

  const [filter, setFilter] = useState('');
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(12);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    rowsPerPage -
    Math.min(rowsPerPage, (blogs?.length ?? 0) - page * rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleClick = (e) => {
    const { blogid } = e.currentTarget.dataset;

    navigate(`/app/blogs/${blogid}`);
  };
  const handleSearch = (e) => {
    const data = e.target.value;
    setFilter(data);
    console.log(filter);
  };

  //  filtered the blogs
  useEffect(() => {
    console.clear();
    console.log(`blogs`, blogs);
    setFilteredBlogs(
      blogs?.filter(
        (blog) => blog.title.toLowerCase().indexOf(filter.toLowerCase()) !== -1
      )
    );
  }, [filter, blogs]);

  // data must be updated

  useEffect(() => {
    setFilteredBlogs(blogs);
  }, []);

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
            to='/app/blogs/create'
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
            <Typography variant='text' style={{ margin: '0px 3px 0px' }}>
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
          {filteredBlogs &&
            filteredBlogs
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((blog) => (
                <Grid item lg={3}>
                  <Card className={classes.root} key={blog.id}>
                    <CardActionArea
                      onClick={handleClick}
                      data-blogid={blog._id}
                    >
                      <CardMedia
                        className={classes.media}
                        image={blog.images?.[0]}
                        title={blog.title}
                      />
                      <CardContent>
                        <Box>
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
                              {new Date(blog.createdAt).toDateString()}
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
                              {blog.title}
                            </Typography>
                          </Box>
                        </Box>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Grid>
              ))}
          {emptyRows > 0 && <Box style={{ height: 53 * emptyRows }}></Box>}
        </Grid>
        <TablePagination
          style={{ marginTop: '1rem' }}
          rowsPerPageOptions={[8, 12, 16]}
          component='div'
          count={blogs?.length ?? 0}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Box>
    </div>
  );
};

export default Blogs;
