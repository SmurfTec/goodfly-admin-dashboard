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
import { CustomersProvider } from 'Contexts/CustomersContext';
import { StaffersProvider } from 'Contexts/StaffersContext';
import { BlogsProvider } from 'Contexts/BlogsContext';
import { OffersProvider } from 'Contexts/OffersContext';
import { ReservationsProvider } from 'Contexts/ReservationsContext';
import { ProductProvider } from 'Contexts/ProductContext';
import { OrderProvider } from 'Contexts/OrderContext';
import { SocketProvider } from 'Contexts/SocketContext';

// * -------------------------------- * //

ReactDOM.render(
  <BrowserRouter>
    <AuthProvider>
      <SocketProvider>
        <StaffersProvider>
          <CustomersProvider>
            <OrderProvider>
              <ProductProvider>
                <BlogsProvider>
                  <OffersProvider>
                    <ReservationsProvider>
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
                    </ReservationsProvider>
                  </OffersProvider>
                </BlogsProvider>
              </ProductProvider>
            </OrderProvider>
          </CustomersProvider>
        </StaffersProvider>
      </SocketProvider>
    </AuthProvider>
  </BrowserRouter>,
  document.getElementById('root')
);
