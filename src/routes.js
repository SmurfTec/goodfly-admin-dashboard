import { Navigate } from 'react-router-dom';
import DashboardLayout from './components/DashboardLayout';
import MainLayout from './components/MainLayout';

import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Register from './pages/Register';
import Settings from './pages/Settings';

import Profile from './components/dashboard/profile/Profile';

import CreateBlog from './components/dashboard/Blog/CreateBlog';
import Blogs from './components/dashboard/Blog/Blogs';

import Customers from './components/dashboard/Visitor/Visitors';
import CreateVisitor from './components/dashboard/Visitor/CreateVisitor';
import EditVisitor from './components/dashboard/Visitor/EditVisitor';

import AddStaffer from './components/dashboard/Staffer/AddStaffer';
import ViewStaffer from './components/dashboard/Staffer/ViewStaffer';
import Staffers from './components/dashboard/Staffer/Staffers';

import TourCategories from './components/dashboard/categories/TourCategories';

import CustomTrips from './components/dashboard/Trip/CustomTrips';
import CustomTrip from './components/dashboard/Trip/CustomTrip';

import CreateProduct from './components/dashboard/product/CreateProduct';
import Products from './components/dashboard/product/Products';

import Reservations from './components/dashboard/Reservation/Reservations';

import Orders from './components/dashboard/Order/Orders';
import Order from './components/dashboard/Order/Order';

import Payments from './components/dashboard/payment/Payments';
import DetailReservation from './components/dashboard/Reservation/DetailReservation';

import Comments from './components/dashboard/comments/Comments';

import OrganizedTrips from './components/dashboard/Trip/OrganizedTrips';

import CreateOffer from './components/dashboard/Offer/CreateOffer';
import Offers from './components/dashboard/Offer/Offers';
import ViewOffer from './components/dashboard/Offer/ViewOffer';
import DashboardHome from 'components/dashboard/DashboardHome';
import Loading from 'pages/Loading';
import Logout from 'components/common/Logout';
import ModifyOffer from 'components/dashboard/Offer/ModifyOffer';

export const protechtedRoutes = [
  {
    path: 'app',
    element: <DashboardLayout />,
    children: [
      //-----------------   MY PAGES ------------------------------
      { path: '/', element: <DashboardHome /> },
      { path: 'profile', element: <Profile /> },

      {
        path: 'blogs',
        children: [
          {
            path: '/',
            element: <Blogs />,
          },
          { path: 'create', element: <CreateBlog /> },
        ],
      },

      {
        path: 'customers',
        children: [
          {
            path: '/',
            element: <Customers />,
          },
          { path: '/new', element: <CreateVisitor /> },
          { path: 'edit/:id', element: <EditVisitor /> },
        ],
      },

      {
        path: 'staffers',
        children: [
          {
            path: '/',
            element: <Staffers />,
          },
          {
            path: '/:id',
            element: <ViewStaffer />,
          },
          {
            path: '/create',
            element: <AddStaffer />,
          },
        ],
      },
      { path: '/categories', element: <TourCategories /> },

      {
        path: 'trips',
        children: [
          { path: '/organizedTrips', element: <OrganizedTrips /> },
          { path: '/customtrips', element: <CustomTrips /> },
          { path: '/customtrips/:id', element: <CustomTrip /> },
        ],
      },

      {
        path: 'products',
        children: [
          {
            path: '/',
            element: <Products />,
          },
          { path: '/create', element: <CreateProduct /> },
        ],
      },

      { path: 'reservations', element: <Reservations /> },

      {
        path: 'orders',
        children: [
          {
            path: '/',
            element: <Orders />,
          },
          {
            path: '/:id',
            element: <Order />,
          },
        ],
      },

      { path: 'payments', element: <Payments /> },

      { path: 'detailReservation', element: <DetailReservation /> },

      { path: 'comments', element: <Comments /> },

      {
        path: 'offers',
        children: [
          { path: '/', element: <Offers /> },
          { path: 'createOffer', element: <CreateOffer /> },
          { path: '/:id', element: <ViewOffer /> },
          { path: '/:id/edit', element: <ModifyOffer /> },
        ],
      },

      //  Other

      // { path: 'account', element: <Account /> },
      // { path: 'customers', element: <CustomerList /> },
      // { path: 'dashboard', element: <Dashboard /> },
      // { path: 'products', element: <ProductList /> },
      { path: 'settings', element: <Settings /> },
      { path: '*', element: <NotFound /> },
    ],
  },
  { path: 'logout', element: <Logout /> },

  { path: '*', element: <Navigate to='/app' /> },
];

export const publicRoutes = [
  { path: 'login', element: <Login /> },
  { path: '*', element: <Navigate to='/login' /> },
];

export const loading = [{ path: '*', element: <Loading /> }];
