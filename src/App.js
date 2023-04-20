import { BrowserRouter } from 'react-router-dom';
// theme
import ThemeProvider from './third-party/theme';
// components
import { library } from "@fortawesome/fontawesome-svg-core";
import { faCube } from "@fortawesome/free-solid-svg-icons";
import { Route, Routes } from "react-router";
import { MotionLazyContainer } from './third-party/components/animate';
import ScrollToTop from './third-party/components/scroll-to-top';
import { SettingsProvider, ThemeSettings } from './third-party/components/settings';
import SnackbarProvider from "./third-party/components/snackbar";

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { restoreAuthThunk } from 'redux/users/users-thunks';
import CurrentUserSession from "./CurrentUserSession";
import { MainIndex } from "./Pages";
import LoginPage from "./Pages/0-SignIn & SignUp/SignInPage";
import SignUpPage from "./Pages/0-SignIn & SignUp/SignUpPage";
import Home from "./Pages/Home/home";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// ----------------------------------------------------------------------

export default function App() {
  library.add(faCube);

  const dispatch = useDispatch();

  useEffect(() => {
    const storedAuth = JSON.parse(localStorage.getItem('auth'));

    if (storedAuth) {
      dispatch(restoreAuthThunk(storedAuth));
    }
  }, [dispatch]);

  return (
    <SettingsProvider>

      <CurrentUserSession />
      <BrowserRouter>
        <ScrollToTop />
        <MotionLazyContainer>
          <ThemeProvider>
            <ThemeSettings>
              <SnackbarProvider>
                {/*---------------Main Routers----------------*/}
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/home" element={<Home />} />
                  <Route path="/*" element={<MainIndex />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/signup" element={<SignUpPage />} />
                </Routes>
                {/*------------------------------------*/}
              </SnackbarProvider>
            </ThemeSettings>
          </ThemeProvider>
        </MotionLazyContainer>
      </BrowserRouter>

    </SettingsProvider>
  );
}
