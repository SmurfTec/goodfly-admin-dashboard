import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import TreeView from '@mui/lab/TreeView';
import TreeItem from '@mui/lab/TreeItem';
// import TreeView from '@material-ui/lab/TreeView';
// import TreeItem from '@material-ui/lab/TreeItem';

import Typography from '@material-ui/core/Typography';

import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import { useNavigate } from 'react-router';
import {
  Bell,
  CreditCard,
  Folder,
  Home,
  Info,
  MessageSquare,
  ShoppingCart,
  Tag,
  User,
  Users,
  MessageCircle,
} from 'react-feather';
import { FiberManualRecord } from '@material-ui/icons';
import { AuthContext } from 'Contexts/AuthContext';
import { BorderColor } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

const NavItems = [
  {
    id: '/',
    labelText: 'Home',
    icon: Home,
  },
  {
    id: '/profile',
    labelText: 'Profile',
    icon: User,
  },
  {
    id: '/messages',
    labelText: 'Messages',
    icon: MessageCircle,
  },
  {
    id: '/customers',
    labelText: 'Customer Management',
    icon: Users,
  },
  {
    id: '/offers',
    labelText: 'Offers',
    icon: Tag,
    children: [
      {
        id: '/offers',
        labelText: 'Offer Management',
        icon: FiberManualRecord,
        color: '#1a73e8',
        bgColor: '#e8f0fe',
      },
      // {
      //   id: '/registration',
      //   labelText: 'Registration Management',
      //   icon: FiberManualRecord,
      //   color: '#1a73e8',
      //   bgColor: '#e8f0fe',
      // },
      {
        id: '/customtrips',
        labelText: 'CustomTrips Management',
        icon: FiberManualRecord,
        color: '#1a73e8',
        bgColor: '#e8f0fe',
      },
    ],
  },
  {
    id: '/reservations',
    labelText: 'Registration',
    icon: BorderColor,
    children: [
      {
        id: '/reservations/organized',
        labelText: 'Organized Trips',
        icon: FiberManualRecord,
        color: '#1a73e8',
        bgColor: '#e8f0fe',
      },
      {
        id: '/reservations/spiritual',
        labelText: 'Spiritual Trips',
        icon: FiberManualRecord,
        color: '#1a73e8',
        bgColor: '#e8f0fe',
      },
    ],
  },
  {
    id: '/categories',
    labelText: 'Product Categories',
    icon: Folder,
    // children: [
    //   {
    //     id: '/categories',
    //     labelText: 'Category Management',
    //     icon: FiberManualRecord,
    //     color: '#1a73e8',
    //     bgColor: '#e8f0fe',
    //   },
    //   {
    //     id: '11',
    //     labelText: 'Sub Category Management',
    //     icon: FiberManualRecord,
    //     color: '#1a73e8',
    //     bgColor: '#e8f0fe',
    //   },
    // ],
  },
  {
    id: '/products',
    labelText: 'Shop',
    icon: ShoppingCart,
    children: [
      {
        id: '/products',
        labelText: 'Product Management',
        icon: FiberManualRecord,
        color: '#1a73e8',
        bgColor: '#e8f0fe',
      },
      {
        id: '/orders',
        labelText: 'Order Management',
        icon: FiberManualRecord,
        color: '#1a73e8',
        bgColor: '#e8f0fe',
      },
    ],
  },
  // {
  //   id: '/payments',
  //   labelText: 'Payments',
  //   icon: Category,
  // },
  {
    id: '/blogs',
    labelText: 'Blog Management',
    icon: MessageSquare,
  },
  {
    id: '/comments',
    labelText: 'Reviews and Comments',
    icon: Info,
  },
];

const useTreeItemStyles = makeStyles((theme) => ({
  root: {
    color: theme.palette.text.secondary,
    '&:hover > $content': {
      // backgroundColor: theme.palette.action.hover,
      // background: '#8cb3ff',
      // color: '#fff',
    },
    '&:focus > $content, &$selected > $content': {
      backgroundColor: `var(--tree-view-bg-color, ${theme.palette.grey[400]})`,
      color: 'var(--tree-view-color)',

      // color: '#fff',
    },
    '&:focus > $content $label, &:hover > $content $label, &$selected > $content $label':
      {
        backgroundColor: 'transparent',
      },
  },
  content: {
    color: theme.palette.text.secondary,
    // borderTopRightRadius: theme.spacing(2),
    // borderBottomRightRadius: theme.spacing(2),
    paddingRight: theme.spacing(1),
    fontWeight: theme.typography.fontWeightMedium,
    '$expanded > &': {
      fontWeight: theme.typography.fontWeightRegular,
    },
    // marginBlock: 10,
  },
  group: {
    marginLeft: 0,
    '& $content': {
      paddingLeft: theme.spacing(2),
    },
  },
  expanded: {},
  selected: {
    backgroundColor: 'dodgerblue !important',
    color: '#fff !important',
    '& svg': {
      stroke: '#fff',
    },
  },
  label: {
    fontWeight: 'inherit',
    color: 'inherit',
  },
  labelRoot: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0.5, 0),
  },
  labelIcon: {
    marginRight: theme.spacing(1),
    fontSize: 13,
  },
  labelText: {
    fontWeight: 'inherit',
    flexGrow: 1,
  },
}));

const StyledTreeItem = (props) => {
  const classes = useTreeItemStyles();
  const {
    labelText,
    labelIcon: LabelIcon,
    labelInfo,
    color,
    bgColor,
    ...other
  } = props;

  return (
    <div>
      <TreeItem
        label={
          <div className={classes.labelRoot}>
            <LabelIcon
              color='#4d4d4d'
              size='20px'
              className={classes.labelIcon}
            />
            <Typography variant='body2' className={classes.labelText}>
              {labelText}
            </Typography>
            <Typography variant='caption' color='inherit'>
              {labelInfo}
            </Typography>
          </div>
        }
        style={{
          '--tree-view-color': color,
          '--tree-view-bg-color': bgColor,
        }}
        classes={{
          root: classes.root,
          content: classes.content,
          expanded: classes.expanded,
          selected: classes.selected,
          group: classes.group,
          label: classes.label,
        }}
        {...other}
      />
    </div>
  );
};

StyledTreeItem.propTypes = {
  bgColor: PropTypes.string,
  color: PropTypes.string,
  labelIcon: PropTypes.elementType.isRequired,
  labelInfo: PropTypes.string,
  labelText: PropTypes.string.isRequired,
};

const useStyles = makeStyles({
  root: {
    height: 500,
    flexGrow: 1,
    maxWidth: 400,
  },
});

const SidebarContent = () => {
  const classes = useStyles();
  const { t } = useTranslation();

  const { user } = useContext(AuthContext);

  const navigate = useNavigate();
  const handleNodeSelect = (e, value) => {
    console.log(`value`, value);
    navigate(`/app/${value}`);
  };

  return (
    <div>
      <TreeView
        className={classes.root}
        defaultExpanded={['3']}
        // defaultCollapseIcon={<ArrowDropDownIcon />}
        defaultExpandIcon={<ArrowRightIcon />}
        defaultEndIcon={<div style={{ width: 24 }} />}
        onNodeSelect={handleNodeSelect}
        expanded={['/offers', '/categories', '/products', '/reservations']}
      >
        {NavItems.map((item) => (
          <StyledTreeItem
            nodeId={item.id}
            labelText={t(item.labelText)}
            labelIcon={item.icon}
            key={item.id}
          >
            {item.children?.map((el) => (
              <StyledTreeItem
                nodeId={el.id}
                labelText={t(el.labelText)}
                labelIcon={el.icon}
                // labelInfo={'90'}
                color='#1a73e8'
                bgColor='#e8f0fe'
                key={el.id}
              />
            ))}
          </StyledTreeItem>
        ))}
        {user?.role === 'admin' && (
          <StyledTreeItem
            nodeId='/staffers'
            labelText='Staff Management'
            labelIcon={Users}
            key='/staffers'
          ></StyledTreeItem>
        )}
      </TreeView>
    </div>
  );
};

export default SidebarContent;
