import React, { useContext, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Box, Tab, Tabs, Typography } from '@material-ui/core';
import { a11yProps, TabPanel } from 'components/common/TabPanel';
import TourComments from './TourComments';
import BlogComments from './BlogComments';
import ProductComments from './ProductComments';
import { BlogsContext } from 'Contexts/BlogsContext';
import { useToggleInput } from 'hooks';
import { ProductContext } from 'Contexts/ProductContext';
import { OffersContext } from 'Contexts/OffersContext';

const styles = makeStyles(() => ({
  options: {
    backgroundColor: '#f2f2f2',
    padding: '1rem',
    minHeight: '20rem',
  },
  options2: {
    backgroundColor: '#fff',
    minHeight: '20rem',
  },

  flexBetween: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: '1rem',
  },
  flexAround: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    margin: '1rem',
  },
  flexLeft: {
    display: 'flex',
    justifyContent: 'left',
    alignItems: 'center',
  },
  root: {
    '& .css-cnltht-MuiTableCell-root': {
      padding: '8px',
    },
  },
}));

const Comments = () => {
  const classes = styles();
  const { blogComments, modifyBlogComment } = useContext(BlogsContext);
  const { productComments, modifyProductComment } = useContext(ProductContext);
  const { offerComments, modifyOfferComment } = useContext(OffersContext);

  const [blogReviews, setBlogReviews] = useState();
  const [productReviews, setProductReviews] = useState();
  const [offerReviews, setOfferReviews] = useState();

  const [value, setValue] = React.useState(0);

  const [isDialogOpen, toggleDialogOpen] = useToggleInput(false);

  // * get Comments from Contexes
  useEffect(() => {
    setBlogReviews(blogComments);
    setProductReviews(productComments);
    setOfferReviews(offerComments);
  }, [blogComments, productComments]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [dialogDetails, setDialogDetails] = useState();

  const emptyBlogRows =
    rowsPerPage -
    Math.min(rowsPerPage, (blogComments?.length || 0) - page * rowsPerPage);

  const emptyTourRows =
    rowsPerPage -
    Math.min(rowsPerPage, (offerComments?.length || 0) - page * rowsPerPage);

  const emptyProductRows =
    rowsPerPage -
    Math.min(rowsPerPage, (productReviews?.length || 0) - page * rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleShowBlogComment = (comment) => {
    // console.log(`comment`, comment);
    setDialogDetails({
      ...comment,
      source: {
        title: comment.blog.title,
        url: `/app/blogs/${comment.blog._id}`,
        image: comment.blog.images?.[0],
        createdAt: comment.createdAt,
        text: comment.text,
      },
    });
    toggleDialogOpen();
  };

  const handleShowOfferComment = (comment) => {
    setDialogDetails({
      ...comment,
      user: comment.visitor,
      source: {
        title: comment.trip.name,
        url: `/app/offers/${comment.trip._id}`,
        image: comment.trip.image,
        createdAt: comment.createdAt,
        text: comment.comment,
      },
    });
    toggleDialogOpen();
  };
  const handleShowProductComment = (comment) => {
    setDialogDetails({
      ...comment,
      user: comment.visitor,
      source: {
        title: comment.product.name,
        url: `/app/products/${comment.product._id}`,
        image: comment.product.images?.[0]?.image,
        createdAt: comment.createdAt,
        text: comment.comment,
      },
    });
    toggleDialogOpen();
  };

  return (
    <div style={{ margin: '3rem 0rem 1rem' }}>
      <Typography variant='h4' m={2}>
        Opinions & Comments
      </Typography>
      <Box
        style={{
          minHeight: '25rem',
          margin: '2rem 1.5rem 0rem',
        }}
      >
        <Box sx={{ width: '100%' }}>
          <Box
            sx={{
              borderBottom: 1,
              borderColor: 'divider',
              borderRadius: '1rem',
            }}
          >
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label='basic tabs example'
              centered
              style={{
                backgroundColor: 'white',
              }}
            >
              <Tab label='Tour Reviews' {...a11yProps(0)} />
              <Tab label='Product Reviews' {...a11yProps(1)} />
              <Tab label='Blog Reviews' {...a11yProps(2)} />
            </Tabs>
          </Box>

          {/*  map the Product */}

          <Box className={classes.options}>
            <TabPanel value={value} index={0}>
              <TourComments
                comments={offerReviews}
                classes={classes}
                page={page}
                handleChangePage={handleChangePage}
                handleChangeRowsPerPage={handleChangeRowsPerPage}
                emptyRows={emptyTourRows}
                rowsPerPage={rowsPerPage}
                updateRow={modifyOfferComment}
                showComment={handleShowOfferComment}
              />
            </TabPanel>
            <TabPanel value={value} index={1}>
              <ProductComments
                comments={productReviews}
                classes={classes}
                page={page}
                handleChangePage={handleChangePage}
                handleChangeRowsPerPage={handleChangeRowsPerPage}
                emptyRows={emptyProductRows}
                rowsPerPage={rowsPerPage}
                updateRow={modifyProductComment}
                showComment={handleShowProductComment}
              />
            </TabPanel>
            <TabPanel value={value} index={2}>
              <BlogComments
                comments={blogReviews}
                classes={classes}
                page={page}
                handleChangePage={handleChangePage}
                handleChangeRowsPerPage={handleChangeRowsPerPage}
                emptyRows={emptyBlogRows}
                rowsPerPage={rowsPerPage}
                updateRow={modifyBlogComment}
                showComment={handleShowBlogComment}
              />
            </TabPanel>
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default Comments;
