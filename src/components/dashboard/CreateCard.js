import React from 'react';

import { Box, Typography } from '@material-ui/core';
import { Add as AddIcon } from '@material-ui/icons';
import { useNavigate } from 'react-router-dom';

const CreateCard = ({ classes, primaryText, secondarytext, Icon, link }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(link);
  };

  return (
    <Box className={classes.Card} onClick={handleClick}>
      <Typography variant='h5' gutterBottom>
        {primaryText}
      </Typography>
      <Box className={classes.MiniCard} sx={{ backgroundColor: '#cccccc' }}>
        <Box className={classes.image} sx={{ border: '3px dashed #fff' }}>
          <Box>
            <AddIcon size={35} style={{ color: '#fff' }} />
            <Icon size={35} style={{ color: '#fff' }} />
          </Box>
          <Typography style={{ color: '#fff' }}>{secondarytext}</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default CreateCard;
