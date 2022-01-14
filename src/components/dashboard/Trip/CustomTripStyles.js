import { makeStyles } from '@material-ui/styles';

const styles = makeStyles((theme) => ({
  main: {
    backgroundColor: '#f2f2f2',
    minHeight: '100vh',
    borderRadius: '0.8rem',
    padding: '1rem',
    margin: '2rem 1.5rem 2rem',
  },
  form: {
    margin: '1.4rem 0rem  3rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10%',
  },
  icons: {
    backgroundColor: '#46B9F6',
    color: '#fff',
    width: '2.3rem',
    height: '2rem',
    margin: '0.5rem 0.2rem',
    padding: '0.2rem',
    cursor: 'pointer',
    '&:hover': {
      transform: 'scale(1.2)',
      transition: '0.3s',
    },
  },
}));

export default styles;
