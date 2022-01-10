import { useRoutes } from 'react-router-dom';
import { ThemeProvider, StyledEngineProvider } from '@material-ui/core';
import GlobalStyles from './components/GlobalStyles';
import theme from './theme';
import { publicRoutes, protechtedRoutes, loading } from './routes';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from 'Contexts/AuthContext';

import { useTranslation } from 'react-i18next';
import i18next from 'i18next';
import cookies from 'js-cookie';

import './App.css';

const languages = [
  {
    code: 'fr',
    name: 'Français',
    country_code: 'fr',
  },
  {
    code: 'en',
    name: 'English',
    country_code: 'gb',
  },
];

const App = () => {
  const [routes, setRoutes] = useState(loading);
  const { user, token } = useContext(AuthContext);
  const content = useRoutes(routes);

  useEffect(() => {
    if (token && user) setRoutes(protechtedRoutes);
    else if (token) setRoutes(loading);
    else setRoutes(publicRoutes);
  }, [user, token]);

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        {content}
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default App;
