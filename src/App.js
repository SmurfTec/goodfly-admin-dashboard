import { useRoutes } from 'react-router-dom';
import { ThemeProvider, StyledEngineProvider } from '@material-ui/core';
import GlobalStyles from './components/GlobalStyles';
import theme from './theme';
import { publicRoutes, protechtedRoutes, loading } from './routes';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from 'Contexts/AuthContext';

import './App.css';

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
