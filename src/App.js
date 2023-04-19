import { BrowserRouter } from 'react-router-dom';
// theme
import ThemeProvider from './third-party/theme';
// components
import SnackbarProvider from "./third-party/components/snackbar";
import { ThemeSettings, SettingsProvider } from './third-party/components/settings';
import { MotionLazyContainer } from './third-party/components/animate';
import ScrollToTop from './third-party/components/scroll-to-top';
import { Route, Routes } from "react-router";
import { faCube } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";

import LoginPage from "./Pages/0-SignIn & SignUp/SignInPage";
import SignUpPage from "./Pages/0-SignIn & SignUp/SignUpPage";
import Home from "./Pages/Home/home";
import { MainIndex } from "./Pages";
import CurrentUserSession from "./CurrentUserSession";
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import store from "./redux/store";
import { restoreAuthThunk } from 'redux/users/users-thunks';

// ----------------------------------------------------------------------

export default function App() {
  library.add(faCube);

  const dispatch = useDispatch();

  const authState = useSelector((state) => state.auth.currentUser);

  // Handle local storage updates when auth state changes
  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      localStorage.setItem('auth', JSON.stringify(authState));
    });

    // Cleanup by unsubscribing from the store on component unmount
    return () => {
      unsubscribe();
    };
  }, [authState]);

  // Initialize the state: populate the Redux store with saved authentication info
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
