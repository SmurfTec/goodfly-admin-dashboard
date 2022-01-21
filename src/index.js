import ReactDOM from 'react-dom';
import { Suspense } from 'react';
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
import { CategoriesProvider } from 'Contexts/CategoriesContext';

// * ------ Translation ----------

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpApi from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

// * -------------------------------- * //

i18n
  .use(HttpApi)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    supportedLngs: ['en', 'ar', 'fr'],
    fallbackLng: 'en',
    debug: false,
    detection: {
      order: ['path', 'cookie', 'htmlTag'],
      caches: ['cookie'],
    },
    backend: {
      loadPath: '/locales/{{lng}}/translation.json',
    },
  });

const loadingMarkup = (
  <div className='py-4 text-center'>
    <h3>Loading..</h3>
  </div>
);

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
                      <Suspense fallback={loadingMarkup}>
                        <App />
                      </Suspense>
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
