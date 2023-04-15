import {BrowserRouter} from 'react-router-dom';
// theme
import ThemeProvider from './third-party/theme';
// components
import SnackbarProvider from "./third-party/components/snackbar";
import {ThemeSettings, SettingsProvider} from './third-party/components/settings';
import {MotionLazyContainer} from './third-party/components/animate';
import ScrollToTop from './third-party/components/scroll-to-top';
import {Route, Routes} from "react-router";
import {faCube} from "@fortawesome/free-solid-svg-icons";
import {library} from "@fortawesome/fontawesome-svg-core";
import {Provider} from "react-redux";
import store from "./redux/store";
import LoginPage from "./Pages/0-SignIn & SignUp/SignInPage";
import SignUpPage from "./Pages/0-SignIn & SignUp/SignUpPage";
import Home from "./Pages/home";
import {MainIndex} from "./Pages";
import CurrentUserSession from "./CurrentUserSession";

// ----------------------------------------------------------------------

export default function App() {
  library.add(faCube);

  return (
    <SettingsProvider>
      <Provider store={store}>
          <CurrentUserSession/>
          <BrowserRouter>
            <ScrollToTop/>
            <MotionLazyContainer>
              <ThemeProvider>
                <ThemeSettings>
                  <SnackbarProvider>
                    {/*---------------Main Routers----------------*/}
                    <Routes>
                      <Route path="/" element={<Home/>}/>
                      <Route path="/home" element={<Home/>}/>
                      <Route path="/*" element={<MainIndex/>}/>
                      <Route path="/login" element={<LoginPage/>}/>
                      <Route path="/signup" element={<SignUpPage/>}/>
                    </Routes>
                    {/*------------------------------------*/}
                  </SnackbarProvider>
                </ThemeSettings>
              </ThemeProvider>
            </MotionLazyContainer>
          </BrowserRouter>
      </Provider>
    </SettingsProvider>
  );
}
