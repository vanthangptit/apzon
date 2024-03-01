import React, { useContext } from 'react';
import {
  Routes as Router,
  Route,
  Navigate,
  Outlet
} from 'react-router-dom';
import { AuthContext } from '@src/contexts/AuthContext';

import PurchaseOrder from '@pages/PurchaseOrder';
import SalesOrder from '@pages/SalesOrder';
import Home from '@pages/Home';

const PrivateRoutes = () => {
  const { authenticated = true} = useContext(AuthContext);
  return authenticated ? <Outlet /> : <Navigate to='/login' state={{ from: location }} replace />;
};

const PublicRoutes = () => <Outlet />;

const Routes = () => {
  return (
    <Router>
      <Route element={<PublicRoutes />}>
        <Route path='/' element={<Home />} />
      </Route>

      <Route element={<PrivateRoutes />}>
        <Route path='/quan-ly-nhap-hang' element={<PurchaseOrder />} />
        <Route path='/quan-ly-ban-hang' element={<SalesOrder />} />
      </Route>

      <Route path='*' element={<h1>The page you requested was not found.</h1>} />
    </Router>
  );
};

export default Routes;
