import { makeStyles } from '@material-ui/styles';

const styles = makeStyles((theme) => ({
  Wrapper: {
    height: '100vh',
    width: '100%',
    display: 'relative',
  },
  backgroundImg: {
    display: 'block',
    maxWidth: '100%',
    width: '100%',
    height: 40,
    objectFit: 'cover',
    display: 'absolute',
    opacity: 0.4,
  },
  Main: {
    minHeight: 500,
    width: 350,
    display: 'flex',
    flexDirection: 'column',
    // justifyContent: 'center',
    alignItems: 'center',
    zIndex: 123,
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%,-50%)',
  },
}));

export default styles;
