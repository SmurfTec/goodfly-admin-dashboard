import React, { useContext, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import {
  Box,
  Tab,
  Tabs,
  Typography,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TableRow,
  TableHead,
  Avatar,
  Table,
  TableContainer,
  TableCell,
  TableBody,
  TablePagination,
  Paper,
} from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import v4 from 'uuid/dist/v4';
import { a11yProps, TabPanel } from 'components/common/TabPanel';
import TourComments from './TourComments';
import BlogComments from './BlogComments';
import ProductComments from './ProductComments';
import { BlogsContext } from 'Contexts/BlogsContext';
import { useToggleInput } from 'hooks';
import { useNavigate } from 'react-router';
import { ProductContext } from 'Contexts/ProductContext';
import { OffersContext } from 'Contexts/OffersContext';

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData(
    'muhammadzain8@gmail.com',
    'aa Set applied to the cell. The prop defaults to the value  in the p  The prop defaults to the value  in the p adding applied to the cell. The prop defaults to the value  in the padding applied to the cell. The prop defaults to the value  in inherited from the parent Table component.',

    'Formule Maroc 2020',
    '04/06/2019'
  ),
  createData(
    'muhammadzain8@gmail.com',
    'aa Set applied to the cell. The prop defaults to the value  in the p  The prop defaults to the value  in the p adding applied to the cell. The prop defaults to the value  in the padding applied to the cell. The prop defaults to the value  in inherited from the parent Table component.',

    'Formule Maroc 2020',
    '04/06/2019'
  ),
  createData(
    'muhammadzain8@gmail.com',
    'aa Set applied to the cell. The prop defaults to the value  in the p  The prop defaults to the value  in the p adding applied to the cell. The prop defaults to the value  in the padding applied to the cell. The prop defaults to the value  in inherited from the parent Table component.',

    'Formule Maroc 2020',
    '04/06/2019'
  ),
  createData(
    'muhammadzain8@gmail.com',
    'aa Set applied to the cell. The prop defaults to the value  in the p  The prop defaults to the value  in the p adding applied to the cell. The prop defaults to the value  in the padding applied to the cell. The prop defaults to the value  in inherited from the parent Table component.',

    'Formule Maroc 2020',
    '04/06/2019'
  ),
  createData(
    'muhammadzain8@gmail.com',
    'aa Set applied to the cell. The prop defaults to the value  in the p  The prop defaults to the value  in the p adding applied to the cell. The prop defaults to the value  in the padding applied to the cell. The prop defaults to the value  in inherited from the parent Table component.',

    'Formule Maroc 2020',
    '04/06/2019'
  ),
  createData(
    'muhammadzain8@gmail.com',
    'aa Set applied to the cell. The prop defaults to the value  in the p  The prop defaults to the value  in the p adding applied to the cell. The prop defaults to the value  in the padding applied to the cell. The prop defaults to the value  in inherited from the parent Table component.',

    'Formule Maroc 2020',
    '04/06/2019'
  ),
  createData(
    'muhammadzain8@gmail.com',
    'aa Set applied to the cell. The prop defaults to the value  in the p  The prop defaults to the value  in the p adding applied to the cell. The prop defaults to the value  in the padding applied to the cell. The prop defaults to the value  in inherited from the parent Table component.',

    'Formule Maroc 2020',
    '04/06/2019'
  ),
];
const styles = makeStyles((theme) => ({
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
  const navigate = useNavigate();
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
  //   {
  //   visitor : {},
  // source : {title : '' , url : ''}
  // }

  // Avoid a layout jump when reaching the last page with empty rows.
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

      {/*  Dialog */}

      <Button onClick={toggleDialogOpen}> Dialog ????</Button>

      <div>
        <Dialog open={isDialogOpen} fullWidth onClose={toggleDialogOpen}>
          <DialogTitle>
            <Typography variant='h5'>
              Comment {new Date(dialogDetails?.createdAt).toLocaleDateString()}
            </Typography>
          </DialogTitle>
          <DialogContent>
            <Box className={classes.flexBetween}>
              <Box className={classes.flexBetween} style={{ margin: 0 }}>
                <Avatar
                  alt='Cindy Baker'
                  src={
                    dialogDetails?.user?.photo || '/static/images/avatar/3.jpg'
                  }
                  sx={{ width: 70, height: 70 }}
                  style={{ margin: '1rem 0.5rem 1rem 0rem' }}
                />
                <Box style={{ display: 'inline-grid' }}>
                  <Typography variant='h5'>
                    {' '}
                    {dialogDetails?.user.fullName}
                  </Typography>
                  <Typography variant='text'>
                    Client {dialogDetails?._id}
                  </Typography>
                  <Typography
                    varaint='text'
                    color='primary'
                    onClick={() =>
                      navigate(`/app/customers/edit/${dialogDetails?.user._id}`)
                    }
                  >
                    Show customer
                  </Typography>
                </Box>
              </Box>
              <Box className={classes.flexBetween} style={{ margin: 0 }}>
                <Box
                  style={{
                    display: 'inline-grid',
                    alignItems: 'center',
                  }}
                >
                  <Typography variant='h5'>
                    {dialogDetails?.source?.title}
                  </Typography>
                  <Typography variant='text'>
                    Id {dialogDetails?.source?._id}
                  </Typography>
                  <Typography
                    varaint='text'
                    color='primary'
                    onClick={() => navigate(`/${dialogDetails?.source?.url}`)}
                  >
                    Show page
                  </Typography>
                </Box>
                <Avatar
                  alt='Cindy Baker'
                  src={
                    dialogDetails?.source?.image ||
                    '/static/images/avatar/3.jpg'
                  }
                  sx={{ width: 70, height: 70 }}
                  style={{ margin: '1rem 1rem 1rem 0.5rem' }}
                />
              </Box>
            </Box>
            <Box style={{ display: 'inline-grid' }}>
              {/* <Typography variant='text'>
                {' '}
                {new Date(
                  dialogDetails?.source?.createdAt
                ).toLocaleDateString()}
              </Typography> */}
              <Typography variant='text' mt={2} style={{ minHeight: '5rem' }}>
                {dialogDetails?.source?.text}
              </Typography>
            </Box>
          </DialogContent>
          <Divider />
          <DialogActions className={classes.flexBetween}>
            {/* <Box>
              <Button mr={1} style={{ color: 'green' }}>
                Approve
              </Button>
              <Button mr={1}>Reply</Button>
              <Button mr={1}>Modify</Button>
              <Button mr={1}>Undesirable</Button>
              <Button mr={1} style={{ color: 'red' }}>
                Basket
              </Button>
            </Box> */}
            <Box>
              <Button variant='outlined' onClick={toggleDialogOpen}>
                Cancel
              </Button>
            </Box>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};

export default Comments;
