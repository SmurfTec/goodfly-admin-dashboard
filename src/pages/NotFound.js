import { Helmet } from 'react-helmet';
import { Box, Button, Container, Typography } from '@material-ui/core';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowBack, Home } from '@material-ui/icons';

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <>
      <Helmet>
        <title>Resource Not Found</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          justifyContent: 'center',
        }}
      >
        <Container
          maxWidth='md'
          sx={{
            paddingBlock: '20px',
            height: '90vh',
          }}
        >
          <Typography align='center' color='textPrimary' variant='h1'>
            404: The page you are looking for isn’t here
          </Typography>
          <Typography align='center' color='textPrimary' variant='subtitle2'>
            You either tried some shady route or you came here by mistake.
            Whichever it is, try using the navigation
          </Typography>
          <Box sx={{ textAlign: 'center' }}>
            <img
              alt='Under development'
              src='/static/images/undraw_page_not_found_su7k.svg'
              style={{
                marginTop: 50,
                display: 'inline-block',
                maxWidth: '100%',
                width: 560,
              }}
            />
          </Box>
          <Box
            display='flex'
            justifyContent='center'
            alignItems='center'
            gap='20px'
            marginTop={2}
          >
            <Button
              variant='contained'
              color='primary'
              onClick={() => navigate(-1)}
              startIcon={<ArrowBack />}
            >
              Go Back
            </Button>
            <Button
              variant='contained'
              color='secondary'
              component={Link}
              to='/app'
              startIcon={<Home />}
            >
              Go Home
            </Button>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default NotFound;
