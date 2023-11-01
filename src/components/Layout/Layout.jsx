import { Outlet, useLocation } from 'react-router-dom';

import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import SideMenu from '../SideMenu/SideMenu';

function Layout() {
  const { pathname } = useLocation();

  return (
    <div className="page__container">
      <Header />
      <Outlet />
      {pathname !== '/profile' ? <Footer /> : null}
      <SideMenu />
    </div>
  );
}

export default Layout;
