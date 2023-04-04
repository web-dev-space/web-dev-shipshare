import { BrowserRouter } from 'react-router-dom';
// routes
import Router from './routes';
// theme
import ThemeProvider from './theme';
// components
import SnackbarProvider from './components/snackbar';
import { ThemeSettings, SettingsProvider } from './components/settings';
import { MotionLazyContainer } from './components/animate';
import ScrollToTop from './components/scroll-to-top';

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
                <Router />
              </SnackbarProvider>
            </ThemeSettings>
          </ThemeProvider>
        </MotionLazyContainer>
      </BrowserRouter>
    </SettingsProvider>
  );
}
