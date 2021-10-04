import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from 'Contexts/AuthContext';

ReactDOM.render(
  <BrowserRouter>
    <AuthProvider>
      <ToastContainer
        position='top-right'
        autoClose={3500}
        hideProgressBar
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <App />
    </AuthProvider>
  </BrowserRouter>,
  document.getElementById('root')
);
