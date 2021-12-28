import { useMemo, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { styled } from '@material-ui/styles';
import DashboardNavbar from './DashboardNavbar';
import DashboardSidebar from './DashboardSidebar';
import { Helmet } from 'react-helmet';

const DashboardLayoutRoot = styled('div')(({ theme }) => ({
  backgroundColor: '#fff',
  display: 'flex',
  height: '100%',
  overflow: 'hidden',
  width: '100%',
  marginTop: '7rem',
}));

const DashboardLayoutWrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  flex: '1 1 auto',
  overflow: 'hidden',
  paddingTop: 64,
  [theme.breakpoints.up('md')]: {
    paddingLeft: 256,
  },
}));

const DashboardLayoutContainer = styled('div')({
  display: 'flex',
  flex: '1 1 auto',
  overflow: 'hidden',
});

const DashboardLayoutContent = styled('div')({
  flex: '1 1 auto',
  height: '100%',
  overflow: 'auto',
});

const DashboardLayout = () => {
  const [isMobileNavOpen, setMobileNavOpen] = useState(false);
  const location = useLocation();

  const title = useMemo(() => {
    if (location.pathname === '/app/') return 'Dashboard Home';
    else if (location.pathname.includes('/app/'))
      return location.pathname.split('/')[2];
  }, [location.pathname]);

  return (
    <DashboardLayoutRoot>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <DashboardNavbar
        onMobileNavOpen={() => setMobileNavOpen(true)}
      />
      <DashboardSidebar
        onMobileClose={() => setMobileNavOpen(false)}
        openMobile={isMobileNavOpen}
      />
      <DashboardLayoutWrapper>
        <DashboardLayoutContainer>
          <DashboardLayoutContent>
            <Outlet />
          </DashboardLayoutContent>
        </DashboardLayoutContainer>
      </DashboardLayoutWrapper>
    </DashboardLayoutRoot>
  );
};

export default DashboardLayout;
