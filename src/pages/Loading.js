import React from 'react';
import { Box, Typography } from '@material-ui/core';
import { PointSpreadLoading } from 'react-loadingg';

import theme from 'theme';

const Loading = ({ noTitle, title = 'GOODFLY ADMIN' }) => (
  <Box>
    <Box
      className='cPhARM'
      style={{
        margin: 'auto',
        position: 'absolute',
        inset: 0,
        minWidth: 'fit-content',
        transform: 'translateY(-40px)',
      }}
    >
      {!noTitle && (
        <Typography variant='h2' color='primary'>
          {title}
        </Typography>
      )}
    </Box>
    <PointSpreadLoading color={theme.palette.primary.main} />
  </Box>
);

export default Loading;
