import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  chatSection: {
    width: '100%',
    height: '80vh',
    boxShadow: 'unset',
    padding: 20,
    background: '#f2f2f2',
  },
  headBG: {
    backgroundColor: '#e0e0e0',
  },
  borderRight500: {
    borderRight: '1px solid #e0e0e0',
  },
  searchField: {
    '& .MuiInputBase-root': {
      backgroundColor: '#fff',
      borderRadius: 10,
    },
  },
  messageArea: {
    height: '70vh',
    overflowY: 'auto',
    paddingInline: 20,
  },
  messageBox: {
    display: 'flex',
    alignItems: 'flex-start',
    columnGap: 20,
    padding: 0,
  },
  message: {
    width: '50%',
    // marginLeft: 'auto',
    color: '#4d4d4d',
    background: '#f2f2f2',
    borderRadius: 20,
    marginBottom: '1rem',
    padding: 10,
    '& p': {
      fontSize: 12,
    },
    '& span': {
      fontSize: 14,
    },
  },
  myMessage: {
    marginLeft: 'auto',
  },
  otherMessage: {
    marginRight: 'auto',
  },
  ChatTIme: {
    '& p': {
      marginTop: -20,
    },
  },
  numUnread: {
    color: '#Fff',
    width: 20,
    height: 20,
    padding: 0,
    textAlign: 'center',
    borderRadius: '50%',
    backgroundColor: 'rgb(70, 185, 246)',
    margin: '-20px 14px 20px auto',
    // marginLeft: 'auto',
    // marginBottom: 14,
    // marginRight: 20,
  },
  newHeader: {
    width: '100%',
    textAlign: 'center',
    borderBottom: '1px solid #ccc',
    lineHeight: '0.1em',
    margin: '10px 0 20px',
    '& span': {
      background: '#fff',
      padding: '0 10px',
    },
  },
});

export default useStyles;
