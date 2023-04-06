import { BrowserRouter } from 'react-router-dom';
// theme
import ThemeProvider from './third-party/theme';
// components
import SnackbarProvider from './third-party/components/snackbar';
import { ThemeSettings, SettingsProvider } from './third-party/components/settings';
import { MotionLazyContainer } from './third-party/components/animate';
import ScrollToTop from './third-party/components/scroll-to-top';

import ParcelMainPage from "./Pages/1-Parcels/Parcel-Main";
import GroupMainPage from "./Pages/3-Groups/Group-Main";

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
                {/*<ParcelMainPage />*/}
                <GroupMainPage />
                {/*------------------------------------*/}
              </SnackbarProvider>
            </ThemeSettings>
          </ThemeProvider>
        </MotionLazyContainer>
      </BrowserRouter>
    </SettingsProvider>
  );
}
