import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import CompactLayout from '../layouts/compact';
import DashboardLayout from '../layouts/dashboard';
// config
import { PATH_AFTER_LOGIN } from '../config-global';
// screen - routes
import ParcelMainPage from "../../Pages/Buyer/1-Parcels/Parcel-Main";
import ShipmentMainPage from "../../Pages/Buyer/2-Shipments/Shipment-Main";
import GroupMainPage from "../../Pages/Buyer/3-Groups/Group-Main";
import ChangePasswordPage from "../../Pages/Buyer/5-Account/Change-Password";

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: '/',
      children: [
        { element: <Navigate to={PATH_AFTER_LOGIN} replace />, index: true },
        {
          path: 'login',
          element: (
              <LoginPage />
          ),
        },
      ],
    },
    {
      path: '/home',
      element: (
          <DashboardLayout />
      ),
      children: [
        { element: <Navigate to="/dashboard/parcels" replace />, index: true },
        { path: 'parcels', element: <ParcelMainPage /> },
        { path: 'shipments', element: <ShipmentMainPage /> },
        { path: 'groups', element: <GroupMainPage /> },
        {
          path: 'user',
          children: [
            { element: <Navigate to="/dashboard/user/change-password" replace />, index: true },
            { path: 'change-password', element: <ChangePasswordPage /> },
            { path: 'two', element: <PageTwo /> },
            { path: 'three', element: <PageThree/> },
          ],
        },
        {
          path: 'help',
          children: [
            { element: <Navigate to="/dashboard/help/one" replace />, index: true },
            { path: 'one', element: <PageOne /> },
            { path: 'two', element: <PageTwo /> },
            { path: 'three', element: <PageThree/> },
          ],
        },
      ],
    },
    {
      element: <CompactLayout />,
      children: [{ path: '404', element: <Page404 /> }],
    },
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}
