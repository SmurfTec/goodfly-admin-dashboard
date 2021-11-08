import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

import { ToastContainer } from 'react-toastify';

// * ------ Styles Sheets for modules ----------
import 'react-toastify/dist/ReactToastify.css';
import 'react-multi-carousel/lib/styles.css';
import 'react-perfect-scrollbar/dist/css/styles.css';
import 'react-loading-skeleton/dist/skeleton.css';
// * -------------------------------- * //

// * ------ Contexts ----------
import { AuthProvider } from 'Contexts/AuthContext';
import { StoreProvider } from 'Contexts/StoreContext';
import { CustomersProvider } from 'Contexts/CustomersContext';
import { StaffersProvider } from 'Contexts/StaffersContext';
import { BlogsProvider } from 'Contexts/BlogsContext';
import { OffersProvider } from 'Contexts/OffersContext';
// * -------------------------------- * //

ReactDOM.render(
  <BrowserRouter>
    <AuthProvider>
      <StoreProvider>
        <StaffersProvider>
          <CustomersProvider>
            <BlogsProvider>
              <OffersProvider>
                <ToastContainer
                  position='top-right'
                  autoClose={3000}
                  hideProgressBar
                  newestOnTop={true}
                  closeOnClick
                  rtl={false}
                  pauseOnFocusLoss
                  draggable
                  pauseOnHover
                />
                <App />
              </OffersProvider>
            </BlogsProvider>
          </CustomersProvider>
        </StaffersProvider>
      </StoreProvider>
    </AuthProvider>
  </BrowserRouter>,
  document.getElementById('root')
);
