import { Navigate } from 'react-router-dom';
import DashboardLayout from './components/DashboardLayout';
import MainLayout from './components/MainLayout';
import Account from './pages/Account';
import CustomerList from './pages/CustomerList';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import ProductList from './pages/ProductList';
import Register from './pages/Register';
import Settings from './pages/Settings';

import Profile from './components/dashboard/Profile';

import CreateBlog from './components/dashboard/CreateBlog';
import Blogs from './components/dashboard/Blogs.js';

import Visitors from './components/dashboard/Visitors.js';
import VisitorProfile from './components/dashboard/VisitorProfile.js';
import VisitorProfileTwo from './components/dashboard/VisitorProfileTwo.js';

import AddStaffer from './components/dashboard/AddStaffer.js';
import ViewStaffer from './components/dashboard/ViewStaffer.js';
import Staffers from './components/dashboard/Staffers.js';

const routes = [
  {
    path: 'app',
    element: <DashboardLayout />,
    children: [
      //-----------------   MY PAGES ------------------------------
      { path: 'profile', element: <Profile /> },

      { path: 'blog', element: <CreateBlog /> },
      { path: 'blogs', element: <Blogs /> },

      { path: 'visitorProfile', element: <VisitorProfile /> },
      { path: 'visitorProfileTwo', element: <VisitorProfileTwo /> },
      { path: 'allVisitors', element: <Visitors /> },

      { path: 'addStaffer', element: <AddStaffer /> },
      { path: 'viewStaffer', element: <ViewStaffer /> },
      { path: 'allStaffers', element: <Staffers /> },

      { path: 'account', element: <Account /> },
      { path: 'customers', element: <CustomerList /> },
      { path: 'dashboard', element: <Dashboard /> },
      { path: 'products', element: <ProductList /> },
      { path: 'settings', element: <Settings /> },
      { path: '*', element: <Navigate to='/404' /> },
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
