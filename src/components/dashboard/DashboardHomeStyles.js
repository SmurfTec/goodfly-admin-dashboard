const { makeStyles } = require('@material-ui/styles');

const useStyles = makeStyles((theme) => ({
  MiniCard: {
    // backgroundColor: '#cccccc',
    borderRadius: '10px',
    padding: 10,
    minWidth: 180,
    cursor: 'pointer',
  },
  image: {
    /* width: 180px; */
    // border: '3px dashed #fff',
    display: 'flex',
    minHeight: 130,
    alignItems: 'center',
    borderRadius: 10,
    flexDirection: 'column',
    justifyContent: 'center',
    paddingInline: 10,
  },
  Card: {
    textAlign: 'center',
  },

  InfoItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    maxWidth: 200,
  },
  InfoButtonGrid: {
    display: 'flex',
    flexDirection: 'column',
    // justifyContent: 'center',
    alignItems: 'center',
    rowGap: '20px',
    flexBasis: '30%',
    minWidth: '9rem',
  },
  InfoButton: {
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    rowGap: 10,
    width: '80%',
    '& .MuiButton-root': {
      borderRadius: 10,
    },
  },
  FollowersGrid: {
    '& svg': {
      width: 20,
      height: 20,
      // stroke: '#fff',
    },
    paddingInline: 20,
  },
  SocialIcons: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    backgroundColor: theme.palette.primary.main,
    color: '#fff',
    marginTop: 10,
    borderRadius: 15,
    rowGap: 10,
    '& .MuiBox-root': {
      flexBasis: '50%',
      display: 'flex',
      alignItems: 'center',
      columnGap: 5,
    },
  },
  ActionsGrid: {
    display: 'flex',
    justifyContent: 'space-evenly',
    padding: '0.5rem',
    columnGap: 10,
    backgroundColor: '#f2f2f2',
    paddingInline: 20,
    borderRadius: '0.5rem',
  },
  Badge: {
    '& .MuiBadge-badge': {
      borderRadius: '50%',
      height: 25,
      width: 25,
    },
  },

  mainBox: {
    backgroundColor: '#f2f2f2',
    borderRadius: '10px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 25,
    padding: 20,
  },
  textInput: {
    backgroundColor: '#fff',
    marginTop: '8px',
  },
}));

export default useStyles;
