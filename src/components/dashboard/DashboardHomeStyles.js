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
      justifyContent: 'space-around',
      alignItems: 'center',
    },
  },
  ActionsGrid: {
    display: 'flex',
    justifyContent: 'flex-end',
    columnGap: 10,
    backgroundColor: '#f2f2f2',
    paddingInline: 20,
  },
}));

export default useStyles;
