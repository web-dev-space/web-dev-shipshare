import { BrowserRouter } from 'react-router-dom';
// theme
import ThemeProvider from './third-party/theme';
// components
import SnackbarProvider from './third-party/components/snackbar';
import { ThemeSettings, SettingsProvider } from './third-party/components/settings';
import { MotionLazyContainer } from './third-party/components/animate';
import ScrollToTop from './third-party/components/scroll-to-top';

import ParcelMainPage from "./Pages/1-Parcels/Parcel-Main";
import ChangePassword from "./Pages/5-Account/Change-Password";
import Profile from "./Pages/5-Account/Profile";
import CalculateFee from "./Pages/5-Account/CalculateFee";
import TimeCost from "./Pages/5-Account/TimeCost";
import Warehouse from "./Pages/5-Account/Warehouse";

// ----------------------------------------------------------------------

export default function App() {
  return (
    <SettingsProvider>
      <BrowserRouter>
        <ScrollToTop />
        <MotionLazyContainer>
          <ThemeProvider>
            <ThemeSettings>
              <SnackbarProvider>
                {/*---------------Main Page----------------*/}
                <Warehouse/>
                {/*------------------------------------*/}
              </SnackbarProvider>
            </ThemeSettings>
          </ThemeProvider>
        </MotionLazyContainer>
      </BrowserRouter>
    </SettingsProvider>
  );
}
