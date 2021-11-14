import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
  form: {
    margin: '1rem 0rem  2rem',
    // marginBottom: '1rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  table: {
    margin: ' 0.5rem 0.5rem 0.5rem',
  },
  icons: {
    backgroundColor: '#46B9F6',
    color: '#fff',
    width: '2.3rem',
    height: '2rem',
    margin: '0.5rem 0.1rem',
    padding: '0.2rem',
    cursor: 'pointer',
    '&:hover': {
      transform: 'scale(1.2)',
      transition: '0.3s',
    },
  },
  options: {
    padding: '1rem',
    minHeight: '20rem',
  },
  options2: {
    backgroundColor: '#fff',
    minHeight: '20rem',
  },
  address: {
    width: '100%',
    textAlign: 'center',
    margin: '1rem',
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
  Tabs: {
    '& .MuiTab-root': {
      backgroundColor: '#e6e6e6',
      color: '#808080',
    },
    '& .Mui-selected': {
      backgroundColor: '#fafafa',
      color: '#333333',
    },
  },
  header: {
    display: 'inline-flex',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'space-between',
    marginTop: 25,
  },
  textInput: {
    width: '75%',
    backgroundColor: '#fff',
    marginBottom: 7,
  },
  inputBox: {
    border: 0,
    outline: 0,
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  typo: {
    width: '25%',
  },
  image: {
    minHeight: 150,
    margin: 7,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    border: `2px dashed #fff`,
    borderRadius: '10px',
    cursor: 'pointer',
  },
  mainBox: {
    backgroundColor: '#f2f2f2',
    borderRadius: '10px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '3rem 1rem 1rem',
    padding: 20,
  },
}));

export default useStyles;
