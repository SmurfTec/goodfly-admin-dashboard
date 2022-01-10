import React, { useEffect, useMemo, useState, useContext } from 'react';

import {
  Box,
  Button,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TablePagination,
  Paper,
  TableBody,
  Skeleton,
} from '@material-ui/core';
import v4 from 'uuid/dist/v4';
import { useToggleInput } from 'hooks';
import { ProductContext } from 'Contexts/ProductContext';
import CommentReply from './CommentReply';
import CommentDetails from './CommentDetails';
import { useTranslation } from 'react-i18next';

const ProductComments = ({
  comments,
  classes,
  page,
  handleChangePage,
  handleChangeRowsPerPage,
  emptyRows,
  rowsPerPage,
  updateRow,
  showComment,
}) => {
  const [rows, setRows] = useState();
  const [isReplyOpen, toggleReplyOpen] = useToggleInput(false);
  const [isDetailsOpen, toggleDetailsOpen] = useToggleInput(false);
  const [currentCommment, setReplyComment] = useState(null);
  const { t } = useTranslation();

  const { replyComment } = useContext(ProductContext);
  const statuses = useMemo(() => {
    let waiting = 0,
      approved = 0,
      undefireable = 0,
      basket = 0;

    comments?.forEach((el) => {
      switch (el.status) {
        case 'waiting':
          waiting++;
          break;
        case 'approved':
          approved++;
          break;
        case 'undesireable':
          undefireable++;
          break;
        case 'basket':
          basket++;
          break;

        default:
          waiting++;
          break;
      }
    });

    return [waiting, approved, undefireable, basket];
  }, comments);

  useEffect(() => {
    setRows(comments || []);
  }, [comments]);

  const filterComments = (e) => {
    const { status } = e.currentTarget.dataset;

    setRows(comments?.filter((el) => el.status === status) || []);
  };

  const handleUpdate = (e) => {
    e.stopPropagation();
    const { status, id } = e.currentTarget.dataset;
    updateRow(id, { status });
  };

  const handleShowRow = (item) => {
    // const { item } = e.currentTarget.dataset;
    console.log(`item`, item); // [Object , Object]

    showComment(item);
  };

  const handleReply = (reply) => {
    toggleReplyOpen();
    replyComment(currentCommment, reply);
  };

  return (
    <>
      <Box className={classes.flexLeft}>
        <Button m={1} data-status='waiting' onClick={filterComments}>
          {t('WAITING')} : {statuses[0]}
        </Button>
        <Button m={1} data-status='approved' onClick={filterComments}>
          {t('APPROVED')} : {statuses[1]}
        </Button>
        <Button m={1} data-status='undesireable' onClick={filterComments}>
          {t('UNDESIRABLE')} :{statuses[2]}
        </Button>
        <Button m={1} data-status='basket' onClick={filterComments}>
          {t('BASKET')}: {statuses[3]}
        </Button>
      </Box>
      <Box mt={3}></Box>

      <TableContainer component={Paper} className={classes.root}>
        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell align='center'>{t('Author')}</TableCell>
              <TableCell align='center'>{t('Comments')}</TableCell>
              <TableCell align='center'>{t('Product')}</TableCell>
              <TableCell align='center'>{t('Date')}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              ? rows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <TableRow
                      key={row._id}
                      sx={{
                        '&:last-child td, &:last-child th': {
                          border: 0,
                        },
                      }}
                      hover
                      onClick={() => handleShowRow(row)}
                      // data-item={row}
                    >
                      <TableCell
                        component='th'
                        scope='row'
                        style={{
                          minWidth: '10rem',
                        }}
                      >
                        {row.visitor?.fullName || 'Anonymous'}
                      </TableCell>
                      <TableCell align='center'>
                        {row.comment}
                        <Box className={classes.flexLeft} m={2}>
                          <Button
                            data-status='approved'
                            data-id={row._id}
                            onClick={handleUpdate}
                            mr={1}
                            style={{ color: 'green' }}
                          >
                            {t('APPROVE')}
                          </Button>
                          <Button
                            mr={1}
                            onClick={() => {
                              setReplyComment(row);

                              setTimeout(() => {
                                toggleReplyOpen();
                              }, 1000);
                            }}
                          >
                            {t('REPLY')}
                          </Button>
                          <Button
                            mr={1}
                            onClick={() => {
                              setReplyComment(row);

                              setTimeout(() => {
                                toggleDetailsOpen();
                              }, 1000);
                            }}
                          >
                            {t('VIEW')}
                          </Button>
                          <Button
                            data-status='undesireable'
                            data-id={row._id}
                            onClick={handleUpdate}
                            mr={1}
                          >
                            {t('UNDESIRABLE')}
                          </Button>
                          <Button
                            data-status='basket'
                            data-id={row._id}
                            onClick={handleUpdate}
                            mr={1}
                            style={{ color: 'red' }}
                          >
                            {t('BASKET')}
                          </Button>
                        </Box>
                      </TableCell>
                      <TableCell
                        align='center'
                        style={{
                          minWidth: '10rem',
                        }}
                      >
                        {row?.product?.name}
                      </TableCell>
                      <TableCell
                        align='center'
                        style={{
                          minWidth: '10rem',
                        }}
                      >
                        {new Date(row.createdAt).toLocaleDateString()}
                      </TableCell>
                    </TableRow>
                  ))
              : Array(5)
                  .fill(0)
                  .map((row) => (
                    <TableRow
                      key={v4()}
                      sx={{
                        '&:last-child td, &:last-child th': {
                          border: 0,
                        },
                      }}
                    >
                      <TableCell
                        component='th'
                        scope='row'
                        style={{
                          minWidth: '10rem',
                        }}
                      >
                        <Skeleton />
                      </TableCell>
                      <TableCell align='left'>
                        <Skeleton />

                        <Box className={classes.flexLeft} m={2}>
                          <Button mr={1} style={{ color: 'green' }}>
                            <Skeleton />
                          </Button>
                          <Skeleton />
                        </Box>
                      </TableCell>
                      <TableCell
                        align='center'
                        style={{
                          minWidth: '10rem',
                        }}
                      >
                        <Skeleton />
                      </TableCell>
                      <TableCell
                        align='center'
                        style={{
                          minWidth: '10rem',
                        }}
                      >
                        <Skeleton />
                      </TableCell>
                    </TableRow>
                  ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
        </Table>
        <TablePagination
          style={{ marginTop: '1rem' }}
          rowsPerPageOptions={[5, 10, 15]}
          component='div'
          count={comments?.length || 0}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
      <CommentReply
        open={isReplyOpen}
        toggleDialog={toggleReplyOpen}
        success={handleReply}
      />
      <CommentDetails
        open={isDetailsOpen}
        comment={currentCommment}
        toggleDialog={toggleDetailsOpen}
        slug='products'
      />
    </>
  );
};

export default ProductComments;
