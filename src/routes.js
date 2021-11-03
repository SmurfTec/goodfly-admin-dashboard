import { Navigate } from 'react-router-dom';
import DashboardLayout from './components/DashboardLayout';
import MainLayout from './components/MainLayout';

import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Register from './pages/Register';
import Settings from './pages/Settings';

import Profile from './components/dashboard/Profile';

import CreateBlog from './components/dashboard/CreateBlog';
import Blogs from './components/dashboard/Blogs.js';

import Customers from './components/dashboard/Visitors.js';
import VisitorProfile from './components/dashboard/VisitorProfile.js';
import ViewVisitor from './components/dashboard/VisitorProfileTwo.js';

import AddStaffer from './components/dashboard/AddStaffer.js';
import ViewStaffer from './components/dashboard/ViewStaffer.js';
import Staffers from './components/dashboard/Staffers.js';

import TourCategories from './components/dashboard/TourCategories.js';

import CustomTrips from './components/dashboard/CustomTrips.js';
import CustomTrip from './components/dashboard/CustomTrip.js';

import CreateProduct from './components/dashboard/CreateProduct.js';
import Products from './components/dashboard/Products.js';

import Reservations from './components/dashboard/Reservations.js';

import Orders from './components/dashboard/Orders.js';
import Order from './components/dashboard/Order.js';

import Payments from './components/dashboard/Payments.js';
import DetailReservation from './components/dashboard/DetailReservation.js';

import Comments from './components/dashboard/Comments.js';

import OrganizedTrips from './components/dashboard/OrganizedTrips.js';

import CreateOffer from './components/dashboard/Offer/CreateOffer.js';
import Offers from './components/dashboard/Offer/Offers.js';
import Offer from './components/dashboard/Offer/Offer.js';
import DashboardHome from 'components/dashboard/DashboardHome';

const routes = [
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
          { path: '/:id/edit', element: <VisitorProfile /> },
          { path: '/:id', element: <ViewVisitor /> },
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

  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
      { path: '404', element: <NotFound /> },
      { path: '/', element: <Navigate to='/app/dashboard' /> },
      { path: '*', element: <Navigate to='/404' /> },
    ],
  },
];

export default routes;
