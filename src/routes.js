import { Navigate } from 'react-router-dom';
import DashboardLayout from './components/DashboardLayout';
import MainLayout from './components/MainLayout';

import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Register from './pages/Register';
import Settings from './pages/Settings';

import Profile from './components/dashboard/profile/Profile';

import CreateBlog from './components/dashboard/Blog/CreateBlog';
import Blogs from './components/dashboard/Blog/Blogs.js';

import Customers from './components/dashboard/Visitor/Visitors.js';
import CreateVisitor from './components/dashboard/Visitor/VisitorProfile.js';
import EditVisitor from './components/dashboard/Visitor/VisitorProfileTwo.js';

import AddStaffer from './components/dashboard/Staffer/AddStaffer.js';
import ViewStaffer from './components/dashboard/Staffer/ViewStaffer.js';
import Staffers from './components/dashboard/Staffer/Staffers.js';

import TourCategories from './components/dashboard/categories/TourCategories.js';

import CustomTrips from './components/dashboard/Trip/CustomTrips.js';
import CustomTrip from './components/dashboard/Trip/CustomTrip.js';

import CreateProduct from './components/dashboard/product/CreateProduct.js';
import Products from './components/dashboard/product/Products.js';

import Reservations from './components/dashboard/Reservation/Reservations.js';

import Orders from './components/dashboard/Order/Orders.js';
import Order from './components/dashboard/Order/Order.js';

import Payments from './components/dashboard/payment/Payments.js';
import DetailReservation from './components/dashboard/Reservation/DetailReservation.js';

import Comments from './components/dashboard/comments/Comments.js';

import OrganizedTrips from './components/dashboard/Trip/OrganizedTrips.js';

import CreateOffer from './components/dashboard/Offer/CreateOffer.js';
import Offers from './components/dashboard/Offer/Offers.js';
import Offer from './components/dashboard/Offer/Offer.js';
import DashboardHome from 'components/dashboard/DashboardHome';
import Loading from 'pages/Loading';
import Logout from 'components/common/Logout';

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
          { path: '/:id/new', element: <CreateVisitor /> },
          { path: '/:id', element: <EditVisitor /> },
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
          { path: 'offer', element: <Offer /> },
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
