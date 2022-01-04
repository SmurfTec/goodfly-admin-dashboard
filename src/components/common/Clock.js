import { Box, Typography } from '@material-ui/core';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import { useState, useEffect } from 'react';

const Clock = () => {
  const initialState = [
    new Date()
      .toLocaleTimeString('en-US', { timeZone: 'Europe/Paris' })
      .split(' ')[0],
    new Date()
      .toLocaleTimeString('en-US', { timeZone: 'Asia/Riyadh' })
      .split(' ')[0],
  ];
  const [time, setTime] = useState(initialState);

  // * Change Time after 60 Seconds
  useEffect(() => {
    const timeIntervel = setInterval(() => {
      let parisTime = new Date()
        .toLocaleTimeString('en-US', { timeZone: 'Europe/Paris' })
        .split(' ')[0];
      let MeccaTime = new Date()
        .toLocaleTimeString('en-US', { timeZone: 'Asia/Riyadh' })
        .split(' ')[0];
      setTime([parisTime, MeccaTime]);
    }, 1000);

    return () => clearInterval(timeIntervel);
  }, []);
  return (
    <Box
      style={{
        backgroundColor: '#666666',
        // padding: ,
        color: '#fff',
        /* position: absolute; */
        width: 'fit-content',
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        marginRight: '2rem',
        paddingBottom: 10,
        minWidth: 130,
        textAlign: 'center',
        marginLeft: 'auto',
        position: 'relative',
      }}
    >
      <AccessTimeIcon style={{ position: 'absolute', right: '10px' }} />
      <Typography variant='h6' gutterBottom>
        Paris
      </Typography>
      <Typography variant='h4' gutterBottom>
        {time[0]}
      </Typography>
      <Typography variant='h6' gutterBottom>
        Mecca
      </Typography>
      <Typography variant='h4' gutterBottom>
        {time[1]}
      </Typography>
    </Box>
  );
};

export default Clock;
