import React from 'react';

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
} from '@material-ui/core';

const TourComments = ({
  comments,
  classes,
  page,
  handleChangePage,
  handleChangeRowsPerPage,
  emptyRows,
  rowsPerPage,
}) => {
  return (
    <>
      <Box className={classes.flexLeft}>
        <Button m={1}>Waiting(3)</Button>
        <Button m={1}>Approved(11)</Button>
        <Button m={1}>Undesirable(0)</Button>
        <Button m={1}>Basket(2)</Button>
      </Box>
      <Box mt={3}></Box>

      <TableContainer component={Paper} className={classes.root}>
        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell align='center'>Author</TableCell>
              <TableCell align='center'>Comments</TableCell>
              <TableCell align='center'>Response</TableCell>
              <TableCell align='center'>Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {comments
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableRow
                  key={row.name}
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
                    {/* {row.name} */}
                    {row.name}
                  </TableCell>
                  <TableCell align='left'>
                    {row.calories}
                    <Box className={classes.flexLeft} m={2}>
                      <Button mr={1} style={{ color: 'green' }}>
                        Approve
                      </Button>
                      <Button mr={1}>Reply</Button>
                      <Button mr={1}>Modify</Button>
                      <Button mr={1}>Undesirable</Button>
                      <Button mr={1} style={{ color: 'red' }}>
                        Basket
                      </Button>
                    </Box>
                  </TableCell>
                  <TableCell
                    align='center'
                    style={{
                      minWidth: '10rem',
                    }}
                  >
                    {row.fat}
                  </TableCell>
                  <TableCell
                    align='center'
                    style={{
                      minWidth: '10rem',
                    }}
                  >
                    {row.carbs}
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
          count={comments.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </>
  );
};

export default TourComments;
